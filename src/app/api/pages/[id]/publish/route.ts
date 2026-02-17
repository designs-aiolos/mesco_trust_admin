import { NextResponse } from "next/server";
import { getPage, updatePage, listPages } from "@/lib/storage";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

// POST /api/pages/[id]/publish — publish or unpublish a page
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const page = await getPage(id);

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.publish) {
    // Generate slug from title, ensure uniqueness
    let slug = page.slug || slugify(page.title);
    const index = await listPages();
    const conflict = index.find((p) => p.slug === slug && p.id !== id);
    if (conflict) {
      slug = `${slug}-${id.slice(0, 5)}`;
    }

    const updated = await updatePage(id, {
      status: "published",
      slug,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json(updated);
  } else {
    // Unpublish
    const updated = await updatePage(id, {
      status: "draft",
      publishedAt: null,
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json(updated);
  }
}
