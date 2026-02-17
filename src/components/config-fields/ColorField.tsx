"use client";

import { useState, useRef, useEffect } from "react";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PRESET_COLORS = [
  "#E53E3E", "#DD6B20", "#D69E2E", "#38A169", "#3182CE",
  "#805AD5", "#D53F8C", "#1A202C", "#2D3748", "#4A5568",
  "#718096", "#A0AEC0", "#E2E8F0", "#F7FAFC", "#FFFFFF",
];

export default function ColorField({ label, value, onChange }: ColorFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="space-y-1.5" ref={ref}>
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-md border border-gray-200 flex-shrink-0 cursor-pointer"
          style={{ backgroundColor: value || "#ffffff" }}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white font-mono"
        />
      </div>
      {open && (
        <div className="grid grid-cols-5 gap-1.5 p-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => { onChange(color); setOpen(false); }}
              className="w-7 h-7 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer col-span-5 mt-1"
          />
        </div>
      )}
    </div>
  );
}
