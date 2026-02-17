"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { usePageBuilderStore } from "@/lib/store";
import { componentRegistry } from "@/lib/component-registry";
import type { ComponentInstance } from "@/lib/types";

interface CanvasBlockProps {
  block: ComponentInstance;
  index: number;
  total: number;
}

export default function CanvasBlock({ block, index, total }: CanvasBlockProps) {
  const {
    selectedBlockId,
    hoveredBlockId,
    selectBlock,
    setHoveredBlock,
    removeBlock,
    duplicateBlock,
    toggleBlockVisibility,
    moveBlock,
  } = usePageBuilderStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: { type: "canvas-block", block },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  const def = componentRegistry.get(block.type);
  if (!def) return null;

  const Component = def.component;
  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group/block ${isDragging ? "opacity-40" : ""} ${
        !block.visible ? "opacity-40" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
      onMouseEnter={() => setHoveredBlock(block.id)}
      onMouseLeave={() => setHoveredBlock(null)}
    >
      {/* Selection / hover outline */}
      {(isSelected || isHovered) && (
        <div
          className={`absolute inset-0 pointer-events-none transition-all ${
            isSelected ? "z-10" : "z-10"
          }`}
          style={{
            outline: isSelected
              ? "2px solid var(--color-primary, #E53E3E)"
              : "1px dashed #718096",
            outlineOffset: isSelected ? "-1px" : "-1px",
          }}
        />
      )}

      {/* Block type label */}
      {(isSelected || isHovered) && (
        <div
          className="absolute top-0 left-0 z-20 px-2 py-0.5 text-[10px] font-medium text-white"
          style={{
            backgroundColor: isSelected
              ? "var(--color-primary, #E53E3E)"
              : "#718096",
          }}
        >
          {def.label}
        </div>
      )}

      {/* Action bar — inside the block, top-right */}
      {(isSelected || isHovered) && (
        <div className="absolute top-0 right-0 z-20 flex items-center gap-0.5 p-1">
          {/* Drag handle */}
          <div
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            className="p-1 bg-gray-700/80 text-white rounded cursor-grab active:cursor-grabbing hover:bg-gray-800"
          >
            <GripVertical size={12} />
          </div>
          {/* Move up */}
          {index > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, index - 1);
              }}
              className="p-1 bg-gray-700/80 text-white rounded hover:bg-gray-800"
            >
              <ChevronUp size={12} />
            </button>
          )}
          {/* Move down */}
          {index < total - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, index + 1);
              }}
              className="p-1 bg-gray-700/80 text-white rounded hover:bg-gray-800"
            >
              <ChevronDown size={12} />
            </button>
          )}
          {/* Toggle visibility */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleBlockVisibility(block.id);
            }}
            className="p-1 bg-gray-700/80 text-white rounded hover:bg-gray-800"
          >
            {block.visible ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          {/* Duplicate */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              duplicateBlock(block.id);
            }}
            className="p-1 bg-gray-700/80 text-white rounded hover:bg-gray-800"
          >
            <Copy size={12} />
          </button>
          {/* Delete */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            className="p-1 bg-red-500/90 text-white rounded hover:bg-red-600"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Rendered component — allow seeing it but intercept pointer events */}
      <div className="pointer-events-none select-none">
        <Component {...(block.props as Record<string, unknown>)} />
      </div>
    </div>
  );
}
