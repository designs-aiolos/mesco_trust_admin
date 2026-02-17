"use client";

import { Settings, Trash2, Palette } from "lucide-react";
import { usePageBuilderStore } from "@/lib/store";
import { componentRegistry } from "@/lib/component-registry";
import FieldRenderer from "@/components/config-fields/FieldRenderer";
import ColorField from "@/components/config-fields/ColorField";
import SelectField from "@/components/config-fields/SelectField";
import NumberField from "@/components/config-fields/NumberField";
import { FONT_OPTIONS } from "@/lib/constants";
import { useState } from "react";

export default function ConfigPanel() {
  const {
    page,
    selectedBlockId,
    updateBlockProps,
    removeBlock,
    updateGlobalStyles,
  } = usePageBuilderStore();
  const [tab, setTab] = useState<"block" | "global">("block");

  const selectedBlock = selectedBlockId
    ? page.components.find((c) => c.id === selectedBlockId)
    : null;
  const def = selectedBlock ? componentRegistry.get(selectedBlock.type) : null;

  return (
    <div className="w-72 border-l border-gray-200 bg-white flex flex-col h-full overflow-hidden">
      {/* Tab header */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab("block")}
          className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
            tab === "block"
              ? "text-primary border-b-2"
              : "text-gray-500 hover:text-gray-700"
          }`}
          style={
            tab === "block"
              ? { color: "var(--color-primary, #E53E3E)", borderColor: "var(--color-primary, #E53E3E)" }
              : {}
          }
        >
          <Settings size={14} className="inline mr-1.5 -mt-0.5" />
          Block Settings
        </button>
        <button
          type="button"
          onClick={() => setTab("global")}
          className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${
            tab === "global"
              ? "text-primary border-b-2"
              : "text-gray-500 hover:text-gray-700"
          }`}
          style={
            tab === "global"
              ? { color: "var(--color-primary, #E53E3E)", borderColor: "var(--color-primary, #E53E3E)" }
              : {}
          }
        >
          <Palette size={14} className="inline mr-1.5 -mt-0.5" />
          Global Styles
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "block" ? (
          selectedBlock && def ? (
            <div className="p-4 space-y-4">
              {/* Block type header */}
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <def.icon size={18} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-800">
                  {def.label}
                </span>
              </div>

              {/* Fields */}
              {def.fields.map((field) => (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  value={selectedBlock.props[field.name]}
                  onChange={(val) =>
                    updateBlockProps(selectedBlock.id, { [field.name]: val })
                  }
                />
              ))}

              {/* Delete */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => removeBlock(selectedBlock.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete Block
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
              <Settings size={32} strokeWidth={1.5} className="mb-3" />
              <p className="text-sm font-medium text-gray-500">No block selected</p>
              <p className="text-xs mt-1">Click a block on the canvas to edit its settings</p>
            </div>
          )
        ) : (
          /* Global styles tab */
          <div className="p-4 space-y-4">
            <p className="text-xs text-gray-500 pb-2 border-b border-gray-100">
              These settings apply to the entire page.
            </p>
            <ColorField
              label="Primary Color"
              value={page.globalStyles.primaryColor}
              onChange={(val) => updateGlobalStyles({ primaryColor: val })}
            />
            <ColorField
              label="Secondary Color"
              value={page.globalStyles.secondaryColor}
              onChange={(val) => updateGlobalStyles({ secondaryColor: val })}
            />
            <ColorField
              label="Accent Color"
              value={page.globalStyles.accentColor}
              onChange={(val) => updateGlobalStyles({ accentColor: val })}
            />
            <SelectField
              label="Font Family"
              value={page.globalStyles.fontFamily}
              onChange={(val) => updateGlobalStyles({ fontFamily: val })}
              options={FONT_OPTIONS}
            />
            <NumberField
              label="Base Font Size (px)"
              value={page.globalStyles.baseFontSize}
              onChange={(val) => updateGlobalStyles({ baseFontSize: val })}
              min={12}
              max={24}
            />
          </div>
        )}
      </div>
    </div>
  );
}
