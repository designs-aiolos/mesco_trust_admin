"use client";

import type { Page } from "@/lib/types";
import { componentRegistry } from "@/lib/component-registry";

interface PageRendererProps {
  page: Page;
}

export default function PageRenderer({ page }: PageRendererProps) {
  return (
    <div
      style={{
        ["--color-primary" as string]: page.globalStyles.primaryColor,
        fontFamily: page.globalStyles.fontFamily || "Inter",
        fontSize: `${page.globalStyles.baseFontSize || 16}px`,
      }}
    >
      {page.components
        .filter((block) => block.visible)
        .map((block) => {
          const def = componentRegistry.get(block.type);
          if (!def) return null;
          const Component = def.component;
          return (
            <Component
              key={block.id}
              {...(block.props as Record<string, unknown>)}
            />
          );
        })}
    </div>
  );
}
