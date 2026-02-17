import type { SavedPage, PageIndex, Page } from "./types";

const BASE = "/api/pages";

export async function fetchPages(): Promise<PageIndex> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
}

export async function fetchPage(id: string): Promise<SavedPage> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch page");
  return res.json();
}

export async function createPageOnServer(
  page: Partial<Page>
): Promise<SavedPage> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(page),
  });
  if (!res.ok) throw new Error("Failed to create page");
  return res.json();
}

export async function savePageToServer(
  id: string,
  page: Page
): Promise<SavedPage> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(page),
  });
  if (!res.ok) throw new Error("Failed to save page");
  return res.json();
}

export async function publishPage(
  id: string,
  publish: boolean
): Promise<SavedPage> {
  const res = await fetch(`${BASE}/${id}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publish }),
  });
  if (!res.ok) throw new Error("Failed to publish page");
  return res.json();
}

export async function deletePageFromServer(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete page");
}
