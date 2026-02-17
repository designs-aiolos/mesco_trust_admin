"use client";

import { ImageIcon } from "lucide-react";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ImageField({ label, value, onChange, placeholder }: ImageFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-md border border-gray-200 flex-shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center">
          {value ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${value})` }}
            />
          ) : (
            <ImageIcon size={16} className="text-gray-300" />
          )}
        </div>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Image URL..."}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        />
      </div>
    </div>
  );
}
