"use client";

import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { FieldDefinition } from "@/lib/types";
import FieldRenderer from "./FieldRenderer";

interface ArrayFieldProps {
  label: string;
  value: unknown[];
  onChange: (value: unknown[]) => void;
  fields?: FieldDefinition[];
}

export default function ArrayField({ label, value = [], onChange, fields = [] }: ArrayFieldProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const items = Array.isArray(value) ? value : [];

  const addItem = () => {
    const newItem: Record<string, unknown> = {};
    for (const field of fields) {
      newItem[field.name] = field.defaultValue ?? "";
    }
    onChange([...items, newItem]);
    setExpandedIndex(items.length);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const updateItem = (index: number, key: string, val: unknown) => {
    const next = items.map((item, i) => {
      if (i !== index) return item;
      return { ...(item as Record<string, unknown>), [key]: val };
    });
    onChange(next);
  };

  const getItemLabel = (item: unknown, index: number): string => {
    if (typeof item === "string") return item || `Item ${index + 1}`;
    const obj = item as Record<string, unknown>;
    // Try common label fields
    for (const key of ["title", "label", "name", "heading", "quote"]) {
      if (obj[key] && typeof obj[key] === "string") {
        const str = obj[key] as string;
        return str.length > 30 ? str.slice(0, 30) + "..." : str;
      }
    }
    return `Item ${index + 1}`;
  };

  // Simple array of strings (like categories)
  if (fields.length === 1 && fields[0].name === "value") {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-700">{label}</label>
        <div className="space-y-2">
          {items.map((item, i) => {
            const val = typeof item === "string" ? item : (item as Record<string, unknown>)?.value || "";
            return (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={val as string}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = e.target.value;
                    onChange(next);
                  }}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="flex items-center gap-1 text-xs font-medium mt-2 transition-colors"
          style={{ color: "var(--color-primary, #E53E3E)" }}
        >
          <Plus size={14} /> Add Item
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-md overflow-hidden">
            <div
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            >
              <GripVertical size={14} className="text-gray-300" />
              {expandedIndex === i ? (
                <ChevronDown size={14} className="text-gray-400" />
              ) : (
                <ChevronRight size={14} className="text-gray-400" />
              )}
              <span className="text-xs text-gray-600 flex-1 truncate">
                {getItemLabel(item, i)}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeItem(i); }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
            {expandedIndex === i && (
              <div className="p-3 space-y-3 border-t border-gray-100">
                {fields.map((field) => (
                  <FieldRenderer
                    key={field.name}
                    field={field}
                    value={(item as Record<string, unknown>)?.[field.name]}
                    onChange={(val) => updateItem(i, field.name, val)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1 text-xs font-medium mt-2 transition-colors"
        style={{ color: "var(--color-primary, #E53E3E)" }}
      >
        <Plus size={14} /> Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}
