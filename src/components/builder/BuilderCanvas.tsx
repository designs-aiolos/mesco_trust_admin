"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { usePageBuilderStore } from "@/lib/store";
import CanvasBlock from "./CanvasBlock";
import { LayoutTemplate } from "lucide-react";

export default function BuilderCanvas() {
  const { page, selectBlock } = usePageBuilderStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-droppable" });

  const blockIds = page.components.map((c) => c.id);

  return (
    <div
      className="flex-1 overflow-y-auto builder-canvas"
      onClick={() => selectBlock(null)}
    >
      <div
        ref={setNodeRef}
        className={`min-h-full bg-white shadow-sm transition-colors ${
          isOver ? "ring-2 ring-primary/30 ring-inset bg-primary/5" : ""
        }`}
      >
        {page.components.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 gap-4">
            <LayoutTemplate size={48} strokeWidth={1.5} />
            <div className="text-center">
              <p className="text-lg font-medium text-gray-500">
                Start building your page
              </p>
              <p className="text-sm mt-1">
                Drag components from the sidebar and drop them here
              </p>
            </div>
          </div>
        ) : (
          <SortableContext
            items={blockIds}
            strategy={verticalListSortingStrategy}
          >
            {page.components.map((block, index) => (
              <CanvasBlock
                key={block.id}
                block={block}
                index={index}
                total={page.components.length}
              />
            ))}
            {/* Drop zone at bottom for adding new blocks */}
            {isOver && (
              <div className="h-20 border-2 border-dashed border-primary/40 bg-primary/5 rounded-lg m-4 flex items-center justify-center">
                <span className="text-sm text-primary/60 font-medium">
                  Drop here to add
                </span>
              </div>
            )}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
