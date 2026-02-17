"use client";

import { ICON_OPTIONS } from "@/lib/constants";
import * as Icons from "lucide-react";

interface IconFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function IconField({ label, value, onChange }: IconFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select
        value={value || "Wrench"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
      >
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
