"use client";

import type { FieldDefinition } from "@/lib/types";
import FieldRenderer from "./FieldRenderer";

interface GroupFieldProps {
  label: string;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
  fields: FieldDefinition[];
}

export default function GroupField({ label, value = {}, onChange, fields }: GroupFieldProps) {
  const data = value || {};

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <div className="pl-3 border-l-2 border-gray-200 space-y-3">
        {fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={data[field.name]}
            onChange={(val) => onChange({ ...data, [field.name]: val })}
          />
        ))}
      </div>
    </div>
  );
}
