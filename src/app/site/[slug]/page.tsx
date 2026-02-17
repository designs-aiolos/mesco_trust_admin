import { notFound } from "next/navigation";
import { getPageBySlug, listPages } from "@/lib/storage";
import type { Metadata } from "next";
import PageRenderer from "@/components/site/PageRenderer";

export const dynamic = "force-dynamic";

interface SitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.status !== "published") {
    return { title: "Not Found" };
  }

  return {
    title: page.title,
    description: page.description || `${page.title} - Built with Page Builder`,
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  return (
    <PageRenderer
      page={{
        id: page.id,
        title: page.title,
        components: page.components,
        globalStyles: page.globalStyles,
        updatedAt: page.updatedAt,
      }}
    />
  );
}
