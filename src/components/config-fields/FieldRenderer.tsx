"use client";

import type { FieldDefinition } from "@/lib/types";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import NumberField from "./NumberField";
import UrlField from "./UrlField";
import ColorField from "./ColorField";
import SelectField from "./SelectField";
import ToggleField from "./ToggleField";
import ImageField from "./ImageField";
import IconField from "./IconField";
import ArrayField from "./ArrayField";
import GroupField from "./GroupField";

interface FieldRendererProps {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          label={field.label}
          value={value as string}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case "textarea":
    case "richtext":
      return (
        <TextareaField
          label={field.label}
          value={value as string}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case "number":
      return (
        <NumberField
          label={field.label}
          value={value as number}
          onChange={onChange as (v: number) => void}
          min={field.validation?.min}
          max={field.validation?.max}
          step={field.validation?.max && field.validation.max <= 1 ? 0.1 : 1}
        />
      );

    case "url":
      return (
        <UrlField
          label={field.label}
          value={value as string}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      );

    case "color":
      return (
        <ColorField
          label={field.label}
          value={value as string}
          onChange={onChange}
        />
      );

    case "select":
      return (
        <SelectField
          label={field.label}
          value={String(value ?? "")}
          onChange={onChange}
          options={field.options || []}
        />
      );

    case "boolean":
      return (
        <ToggleField
          label={field.label}
          value={Boolean(value)}
          onChange={onChange as (v: boolean) => void}
        />
      );

    case "image":
      return (
        <ImageField
          label={field.label}
          value={value as string}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      );

    case "icon":
      return (
        <IconField
          label={field.label}
          value={value as string}
          onChange={onChange}
        />
      );

    case "array":
      return (
        <ArrayField
          label={field.label}
          value={value as unknown[]}
          onChange={onChange as (v: unknown[]) => void}
          fields={field.fields}
        />
      );

    case "group":
      return (
        <GroupField
          label={field.label}
          value={value as Record<string, unknown>}
          onChange={onChange as (v: Record<string, unknown>) => void}
          fields={field.fields || []}
        />
      );

    default:
      return (
        <TextField
          label={field.label}
          value={String(value ?? "")}
          onChange={onChange}
        />
      );
  }
}
