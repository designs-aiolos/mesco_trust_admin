import { promises as fs } from "node:fs";
import path from "node:path";
import type { SavedPage, PageIndex, PageIndexEntry } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "pages");
const INDEX_PATH = path.join(DATA_DIR, "index.json");

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readIndex(): Promise<PageIndex> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(INDEX_PATH, "utf-8");
    return JSON.parse(data) as PageIndex;
  } catch {
    return [];
  }
}

async function writeIndex(index: PageIndex): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), "utf-8");
}

function toIndexEntry(page: SavedPage): PageIndexEntry {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    status: page.status,
    updatedAt: page.updatedAt,
    createdAt: page.createdAt,
    publishedAt: page.publishedAt,
  };
}

// ── Public API ──

export async function listPages(): Promise<PageIndex> {
  return readIndex();
}

export async function getPage(id: string): Promise<SavedPage | null> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as SavedPage;
  } catch {
    return null;
  }
}

export async function createPage(page: SavedPage): Promise<SavedPage> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${page.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(page, null, 2), "utf-8");

  const index = await readIndex();
  // Remove existing entry if any (shouldn't happen, but safe)
  const filtered = index.filter((e) => e.id !== page.id);
  filtered.push(toIndexEntry(page));
  await writeIndex(filtered);

  return page;
}

export async function updatePage(
  id: string,
  data: Partial<SavedPage>
): Promise<SavedPage | null> {
  const existing = await getPage(id);
  if (!existing) return null;

  const updated: SavedPage = { ...existing, ...data, id };
  const filePath = path.join(DATA_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");

  const index = await readIndex();
  const newIndex = index.map((e) =>
    e.id === id ? toIndexEntry(updated) : e
  );
  await writeIndex(newIndex);

  return updated;
}

export async function deletePage(id: string): Promise<boolean> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    await fs.unlink(filePath);
  } catch {
    return false;
  }

  const index = await readIndex();
  const newIndex = index.filter((e) => e.id !== id);
  await writeIndex(newIndex);
  return true;
}

export async function getPageBySlug(
  slug: string
): Promise<SavedPage | null> {
  const index = await readIndex();
  const entry = index.find((e) => e.slug === slug);
  if (!entry) return null;
  return getPage(entry.id);
}
