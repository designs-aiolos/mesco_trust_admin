"use client";

import { useEffect, useState } from "react";
import type { Page } from "@/lib/types";
import PageRenderer from "@/components/site/PageRenderer";

const STORAGE_KEY = "page-builder-data";

export default function PreviewPage() {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        setPage(JSON.parse(data));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading preview...
      </div>
    );
  }

  return <PageRenderer page={page} />;
}
