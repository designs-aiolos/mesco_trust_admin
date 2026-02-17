import type { Page } from "./types";
import { DEFAULT_GLOBAL_STYLES } from "./constants";
import { componentRegistry } from "./component-registry";
import { generateId } from "./utils";

export function createDefaultPage(): Page {
  const blockTypes = [
    "navbar",
    "hero-slider",
    "services-row",
    "projects-grid",
    "stats-counter",
    "about-split",
    "services-grid",
    "team",
    "testimonials",
    "blog-grid",
    "cta-banner",
    "contact",
    "footer",
    "copyright-bar",
  ];

  const components = blockTypes
    .map((type) => {
      const def = componentRegistry.get(type);
      if (!def) return null;
      return {
        id: generateId(),
        type,
        props: structuredClone(def.defaultProps),
        visible: true,
      };
    })
    .filter(Boolean) as Page["components"];

  return {
    id: generateId(),
    title: "My Page",
    components,
    globalStyles: { ...DEFAULT_GLOBAL_STYLES },
    updatedAt: new Date().toISOString(),
  };
}
