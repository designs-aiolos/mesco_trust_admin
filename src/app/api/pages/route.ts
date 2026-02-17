import { NextResponse } from "next/server";
import { listPages, createPage } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { DEFAULT_GLOBAL_STYLES } from "@/lib/constants";
import type { SavedPage } from "@/lib/types";

export const dynamic = "force-dynamic";

// GET /api/pages — list all pages
export async function GET() {
  const pages = await listPages();
  return NextResponse.json(pages);
}

// POST /api/pages — create a new page
export async function POST(request: Request) {
  const body = await request.json();
  const now = new Date().toISOString();

  const newPage: SavedPage = {
    id: body.id || generateId(),
    title: body.title || "Untitled Page",
    components: body.components || [],
    globalStyles: body.globalStyles || { ...DEFAULT_GLOBAL_STYLES },
    updatedAt: now,
    createdAt: now,
    slug: "",
    status: "draft",
    publishedAt: null,
    description: body.description || "",
  };

  const saved = await createPage(newPage);
  return NextResponse.json(saved, { status: 201 });
}
