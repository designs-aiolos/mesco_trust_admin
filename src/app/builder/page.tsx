"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  pointerWithin,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type CollisionDetection,
} from "@dnd-kit/core";

import { usePageBuilderStore } from "@/lib/store";
import { componentRegistry } from "@/lib/component-registry";
import { createDefaultPage } from "@/lib/default-page";
import type { DeviceSize } from "@/lib/constants";
import { DEVICE_SIZES } from "@/lib/constants";

import BuilderToolbar from "@/components/builder/BuilderToolbar";
import ComponentSidebar from "@/components/builder/ComponentSidebar";
import BuilderCanvas from "@/components/builder/BuilderCanvas";
import ConfigPanel from "@/components/builder/ConfigPanel";

// Custom collision detection: for sidebar items use rectIntersection (wider catch),
// for canvas reorder use closestCenter (precise placement)
const customCollisionDetection: CollisionDetection = (args) => {
  const activeData = args.active.data.current;

  if (activeData?.fromSidebar) {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) return pointerCollisions;
    return rectIntersection(args);
  }

  return closestCenter(args);
};

function BuilderContent() {
  const searchParams = useSearchParams();
  const {
    page,
    loadPage,
    setPage,
    addBlock,
    moveBlock,
    selectBlock,
    undo,
    redo,
    saveToServer,
    removeBlock,
    duplicateBlock,
    selectedBlockId,
    loadFromServer,
    lastServerSaveAt,
    pageStatus,
  } = usePageBuilderStore();

  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");
  const [activeDragType, setActiveDragType] = useState<string | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load page on mount — from server if ?id= present, else from localStorage/default
  useEffect(() => {
    setMounted(true);
    const serverId = searchParams.get("id");
    if (serverId) {
      loadFromServer(serverId);
    } else {
      const stored = localStorage.getItem("page-builder-data");
      if (stored) {
        loadPage();
      } else {
        setPage(createDefaultPage());
      }
    }
  }, [searchParams, loadFromServer, loadPage, setPage]);

  // Keyboard shortcuts — Ctrl+S now saves to server
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveToServer();
      }
      if (e.key === "Escape") {
        selectBlock(null);
      }
      if (e.key === "Delete" && selectedBlockId) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          target.tagName !== "SELECT"
        ) {
          removeBlock(selectedBlockId);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "d" && selectedBlockId) {
        e.preventDefault();
        duplicateBlock(selectedBlockId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    undo,
    redo,
    saveToServer,
    selectBlock,
    removeBlock,
    duplicateBlock,
    selectedBlockId,
  ]);

  // DnD sensors — increase distance to 8px to avoid accidental drags
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;
    if (data?.fromSidebar) {
      setActiveDragType(data.type as string);
    } else {
      setActiveDragId(active.id as string);
    }
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveDragType(null);
      setActiveDragId(null);

      if (!over) return;

      const activeData = active.data.current;

      // Dragging from sidebar -> add new block
      if (activeData?.fromSidebar) {
        const type = activeData.type as string;
        if (
          over.id !== "canvas-droppable" &&
          String(over.id).indexOf("sidebar-") !== 0
        ) {
          addBlock(type, over.id as string);
        } else {
          addBlock(type);
        }
        return;
      }

      // Reordering on canvas
      if (active.id !== over.id && over.id !== "canvas-droppable") {
        const oldIndex = page.components.findIndex((c) => c.id === active.id);
        const newIndex = page.components.findIndex((c) => c.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          moveBlock(oldIndex, newIndex);
        }
      }
    },
    [addBlock, moveBlock, page.components]
  );

  if (!mounted) return null;

  const canvasWidth =
    deviceSize === "desktop"
      ? "100%"
      : `${DEVICE_SIZES[deviceSize].width}px`;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
        <BuilderToolbar
          deviceSize={deviceSize}
          onDeviceChange={setDeviceSize}
        />

        <div className="flex flex-1 overflow-hidden">
          <ComponentSidebar />

          {/* Canvas wrapper with device sizing */}
          <div className="flex-1 overflow-auto bg-gray-100 flex justify-center p-0">
            <div
              className="transition-all duration-300 h-full"
              style={{
                width: canvasWidth,
                maxWidth: "100%",
              }}
            >
              <BuilderCanvas />
            </div>
          </div>

          <ConfigPanel />
        </div>

        {/* Status bar */}
        <div className="h-7 border-t border-gray-200 bg-white flex items-center justify-between px-4 text-[10px] text-gray-400 flex-shrink-0">
          <span>
            {page.components.length} block
            {page.components.length !== 1 ? "s" : ""}
          </span>
          <span>
            {lastServerSaveAt
              ? `Server saved ${new Date(lastServerSaveAt).toLocaleTimeString()}`
              : page.updatedAt
              ? `Auto-saved ${new Date(page.updatedAt).toLocaleTimeString()}`
              : "\u2014"}
          </span>
          <span>
            {pageStatus === "published" ? "Published" : "Draft"} &middot;{" "}
            {DEVICE_SIZES[deviceSize].label} ({DEVICE_SIZES[deviceSize].width}
            px)
          </span>
        </div>
      </div>

      {/* Drag overlay for sidebar items */}
      <DragOverlay dropAnimation={null}>
        {activeDragType &&
          (() => {
            const def = componentRegistry.get(activeDragType);
            if (!def) return null;
            const Icon = def.icon;
            return (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-xl border-2 border-primary/30 text-sm font-medium text-gray-700">
                <Icon
                  size={16}
                  style={{ color: "var(--color-primary, #E53E3E)" }}
                />
                {def.label}
              </div>
            );
          })()}
      </DragOverlay>
    </DndContext>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-400 text-sm">Loading builder...</div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
