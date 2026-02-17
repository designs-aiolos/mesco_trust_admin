import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

// ── Page Data Model ──

export interface Page {
  id: string;
  title: string;
  components: ComponentInstance[];
  globalStyles: GlobalStyles;
  updatedAt: string;
}

export interface GlobalStyles {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  baseFontSize: number;
}

export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, unknown>;
  visible: boolean;
}

// ── Component Definition (Registry) ──

export type ComponentGroup =
  | "navigation"
  | "hero"
  | "content"
  | "social-proof"
  | "contact"
  | "layout";

export interface ComponentDefinition {
  type: string;
  label: string;
  icon: LucideIcon;
  group: ComponentGroup;
  defaultProps: Record<string, unknown>;
  fields: FieldDefinition[];
  component: ComponentType<Record<string, unknown>>;
  constraints?: {
    maxInstances?: number;
    position?: "top" | "bottom" | "any";
  };
}

// ── Field Definitions (drives config panel) ──

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "url"
  | "color"
  | "number"
  | "select"
  | "boolean"
  | "array"
  | "group"
  | "icon";

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: unknown;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  fields?: FieldDefinition[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// ── Saved Page (server persistence) ──

export interface SavedPage extends Page {
  slug: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  description?: string;
}

export interface PageIndexEntry {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  updatedAt: string;
  createdAt: string;
  publishedAt: string | null;
}

export type PageIndex = PageIndexEntry[];

// ── Sidebar Group ──

export interface SidebarGroup {
  label: string;
  icon: LucideIcon;
  types: string[];
}
