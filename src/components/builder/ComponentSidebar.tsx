"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { SIDEBAR_GROUPS } from "@/lib/constants";
import { componentRegistry } from "@/lib/component-registry";

function DraggableSidebarItem({ type }: { type: string }) {
  const def = componentRegistry.get(type);
  if (!def) return null;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { type, fromSidebar: true },
  });

  const Icon = def.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-grab active:cursor-grabbing text-sm transition-colors hover:bg-gray-100 ${
        isDragging ? "opacity-50 bg-gray-100" : ""
      }`}
    >
      <GripVertical size={14} className="text-gray-300 flex-shrink-0" />
      <Icon size={16} className="text-gray-500 flex-shrink-0" />
      <span className="text-gray-700 truncate">{def.label}</span>
    </div>
  );
}

export default function ComponentSidebar() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(SIDEBAR_GROUPS.map((g) => g.label))
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <div className="w-60 border-r border-gray-200 bg-white flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Components</h2>
        <p className="text-xs text-gray-400 mt-0.5">Drag to add to page</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {SIDEBAR_GROUPS.map((group) => {
          const isExpanded = expandedGroups.has(group.label);
          const GroupIcon = group.icon;

          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center gap-2 px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronRight size={12} />
                )}
                <GroupIcon size={14} />
                <span>{group.label}</span>
              </button>
              {isExpanded && (
                <div className="ml-1 space-y-0.5">
                  {group.types.map((type) => (
                    <DraggableSidebarItem key={type} type={type} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
