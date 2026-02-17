import { create } from "zustand";
import type { Page, ComponentInstance, GlobalStyles } from "./types";
import { generateId } from "./utils";
import { DEFAULT_GLOBAL_STYLES } from "./constants";
import { componentRegistry } from "./component-registry";
import {
  fetchPage,
  savePageToServer,
  createPageOnServer,
  publishPage as publishPageApi,
} from "./api-client";

const STORAGE_KEY = "page-builder-data";
const MAX_HISTORY = 50;

interface PageBuilderStore {
  // Page data
  page: Page;

  // Selection
  selectedBlockId: string | null;
  hoveredBlockId: string | null;

  // History
  past: Page[];
  future: Page[];
  canUndo: boolean;
  canRedo: boolean;

  // Server persistence
  serverPageId: string | null;
  pageSlug: string;
  pageStatus: "draft" | "published";
  isSaving: boolean;
  isPublishing: boolean;
  lastServerSaveAt: string | null;

  // Block operations
  addBlock: (type: string, afterId?: string | null) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  updateBlockProps: (id: string, props: Record<string, unknown>) => void;
  toggleBlockVisibility: (id: string) => void;
  selectBlock: (id: string | null) => void;
  setHoveredBlock: (id: string | null) => void;

  // Global styles
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;

  // Page metadata
  updateTitle: (title: string) => void;

  // History
  undo: () => void;
  redo: () => void;

  // Local persistence (crash recovery)
  savePage: () => void;
  loadPage: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
  setPage: (page: Page) => void;

  // Server persistence
  saveToServer: () => Promise<void>;
  publishToServer: () => Promise<void>;
  unpublishFromServer: () => Promise<void>;
  loadFromServer: (id: string) => Promise<void>;
}

function createEmptyPage(): Page {
  return {
    id: generateId(),
    title: "My Page",
    components: [],
    globalStyles: { ...DEFAULT_GLOBAL_STYLES },
    updatedAt: new Date().toISOString(),
  };
}

function pushHistory(state: PageBuilderStore): Partial<PageBuilderStore> {
  const past = [...state.past, structuredClone(state.page)].slice(-MAX_HISTORY);
  return { past, future: [], canUndo: true, canRedo: false };
}

export const usePageBuilderStore = create<PageBuilderStore>((set, get) => ({
  page: createEmptyPage(),
  selectedBlockId: null,
  hoveredBlockId: null,
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  // Server state
  serverPageId: null,
  pageSlug: "",
  pageStatus: "draft",
  isSaving: false,
  isPublishing: false,
  lastServerSaveAt: null,

  addBlock: (type, afterId = null) => {
    const def = componentRegistry.get(type);
    if (!def) return;

    if (def.constraints?.maxInstances) {
      const count = get().page.components.filter((c) => c.type === type).length;
      if (count >= def.constraints.maxInstances) return;
    }

    const newBlock: ComponentInstance = {
      id: generateId(),
      type,
      props: structuredClone(def.defaultProps),
      visible: true,
    };

    set((state) => {
      const history = pushHistory(state);
      const components = [...state.page.components];

      if (afterId) {
        const idx = components.findIndex((c) => c.id === afterId);
        components.splice(idx + 1, 0, newBlock);
      } else {
        components.push(newBlock);
      }

      return {
        ...history,
        page: {
          ...state.page,
          components,
          updatedAt: new Date().toISOString(),
        },
        selectedBlockId: newBlock.id,
      };
    });

    get().savePage();
  },

  removeBlock: (id) => {
    set((state) => {
      const history = pushHistory(state);
      return {
        ...history,
        page: {
          ...state.page,
          components: state.page.components.filter((c) => c.id !== id),
          updatedAt: new Date().toISOString(),
        },
        selectedBlockId:
          state.selectedBlockId === id ? null : state.selectedBlockId,
      };
    });
    get().savePage();
  },

  duplicateBlock: (id) => {
    set((state) => {
      const idx = state.page.components.findIndex((c) => c.id === id);
      if (idx === -1) return state;

      const history = pushHistory(state);
      const original = state.page.components[idx];
      const duplicate: ComponentInstance = {
        ...structuredClone(original),
        id: generateId(),
      };

      const components = [...state.page.components];
      components.splice(idx + 1, 0, duplicate);

      return {
        ...history,
        page: {
          ...state.page,
          components,
          updatedAt: new Date().toISOString(),
        },
        selectedBlockId: duplicate.id,
      };
    });
    get().savePage();
  },

  moveBlock: (fromIndex, toIndex) => {
    set((state) => {
      if (
        fromIndex < 0 ||
        fromIndex >= state.page.components.length ||
        toIndex < 0 ||
        toIndex >= state.page.components.length
      )
        return state;

      const history = pushHistory(state);
      const components = [...state.page.components];
      const [moved] = components.splice(fromIndex, 1);
      components.splice(toIndex, 0, moved);

      return {
        ...history,
        page: {
          ...state.page,
          components,
          updatedAt: new Date().toISOString(),
        },
      };
    });
    get().savePage();
  },

  updateBlockProps: (id, props) => {
    set((state) => {
      const history = pushHistory(state);
      return {
        ...history,
        page: {
          ...state.page,
          components: state.page.components.map((c) =>
            c.id === id ? { ...c, props: { ...c.props, ...props } } : c
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });
    get().savePage();
  },

  toggleBlockVisibility: (id) => {
    set((state) => {
      const history = pushHistory(state);
      return {
        ...history,
        page: {
          ...state.page,
          components: state.page.components.map((c) =>
            c.id === id ? { ...c, visible: !c.visible } : c
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });
    get().savePage();
  },

  selectBlock: (id) => set({ selectedBlockId: id }),
  setHoveredBlock: (id) => set({ hoveredBlockId: id }),

  updateGlobalStyles: (styles) => {
    set((state) => {
      const history = pushHistory(state);
      return {
        ...history,
        page: {
          ...state.page,
          globalStyles: { ...state.page.globalStyles, ...styles },
          updatedAt: new Date().toISOString(),
        },
      };
    });
    get().savePage();
  },

  updateTitle: (title) => {
    set((state) => ({
      page: { ...state.page, title, updatedAt: new Date().toISOString() },
    }));
    get().savePage();
  },

  undo: () => {
    set((state) => {
      if (state.past.length === 0) return state;
      const past = [...state.past];
      const previous = past.pop()!;
      return {
        past,
        future: [structuredClone(state.page), ...state.future].slice(0, MAX_HISTORY),
        page: previous,
        canUndo: past.length > 0,
        canRedo: true,
        selectedBlockId: null,
      };
    });
    get().savePage();
  },

  redo: () => {
    set((state) => {
      if (state.future.length === 0) return state;
      const future = [...state.future];
      const next = future.shift()!;
      return {
        past: [...state.past, structuredClone(state.page)].slice(-MAX_HISTORY),
        future,
        page: next,
        canUndo: true,
        canRedo: future.length > 0,
        selectedBlockId: null,
      };
    });
    get().savePage();
  },

  // Local persistence (localStorage for crash recovery)
  savePage: () => {
    try {
      const page = get().page;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(page));
    } catch {
      // localStorage may not be available in SSR
    }
  },

  loadPage: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const page = JSON.parse(data) as Page;
        set({ page, past: [], future: [], canUndo: false, canRedo: false });
      }
    } catch {
      // Ignore parse errors
    }
  },

  exportJSON: () => {
    return JSON.stringify(get().page, null, 2);
  },

  importJSON: (json) => {
    try {
      const page = JSON.parse(json) as Page;
      set((state) => ({
        ...pushHistory(state),
        page,
        selectedBlockId: null,
      }));
      get().savePage();
    } catch {
      // Ignore invalid JSON
    }
  },

  setPage: (page) => {
    set((state) => ({
      ...pushHistory(state),
      page,
      selectedBlockId: null,
    }));
    get().savePage();
  },

  // Server persistence
  saveToServer: async () => {
    const { page, serverPageId } = get();
    set({ isSaving: true });
    try {
      if (serverPageId) {
        const saved = await savePageToServer(serverPageId, page);
        set({
          lastServerSaveAt: new Date().toISOString(),
          pageStatus: saved.status,
          pageSlug: saved.slug,
        });
      } else {
        const saved = await createPageOnServer(page);
        set({
          serverPageId: saved.id,
          lastServerSaveAt: new Date().toISOString(),
          pageStatus: saved.status,
          pageSlug: saved.slug,
        });
        // Update URL to include the page ID
        window.history.replaceState(null, "", `/builder?id=${saved.id}`);
      }
    } catch (err) {
      console.error("Failed to save to server:", err);
    } finally {
      set({ isSaving: false });
    }
  },

  publishToServer: async () => {
    const { serverPageId, page } = get();
    set({ isPublishing: true });
    try {
      // Save first if not saved yet
      let pageId = serverPageId;
      if (!pageId) {
        const saved = await createPageOnServer(page);
        pageId = saved.id;
        set({ serverPageId: saved.id });
        window.history.replaceState(null, "", `/builder?id=${saved.id}`);
      } else {
        // Save current state first
        await savePageToServer(pageId, page);
      }
      // Then publish
      const published = await publishPageApi(pageId, true);
      set({
        pageStatus: "published",
        pageSlug: published.slug,
        lastServerSaveAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to publish:", err);
    } finally {
      set({ isPublishing: false });
    }
  },

  unpublishFromServer: async () => {
    const { serverPageId } = get();
    if (!serverPageId) return;
    set({ isPublishing: true });
    try {
      await publishPageApi(serverPageId, false);
      set({ pageStatus: "draft" });
    } catch (err) {
      console.error("Failed to unpublish:", err);
    } finally {
      set({ isPublishing: false });
    }
  },

  loadFromServer: async (id: string) => {
    try {
      const saved = await fetchPage(id);
      set({
        page: {
          id: saved.id,
          title: saved.title,
          components: saved.components,
          globalStyles: saved.globalStyles,
          updatedAt: saved.updatedAt,
        },
        serverPageId: saved.id,
        pageStatus: saved.status,
        pageSlug: saved.slug,
        lastServerSaveAt: saved.updatedAt,
        past: [],
        future: [],
        canUndo: false,
        canRedo: false,
        selectedBlockId: null,
      });
      // Also cache in localStorage
      get().savePage();
    } catch (err) {
      console.error("Failed to load from server:", err);
    }
  },
}));
