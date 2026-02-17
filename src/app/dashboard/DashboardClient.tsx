"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  Globe,
  FileText,
  Loader2,
} from "lucide-react";
import type { PageIndexEntry } from "@/lib/types";
import { fetchPages, deletePageFromServer } from "@/lib/api-client";

export default function DashboardClient() {
  const [pages, setPages] = useState<PageIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await fetchPages();
      setPages(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deletePageFromServer(id);
      setPages((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete page.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Page Builder</h1>
            <p className="text-sm text-gray-500">Manage your pages</p>
          </div>
          <a
            href="/builder"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
          >
            <Plus size={16} />
            New Page
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              No pages yet
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Create your first page to get started.
            </p>
            <a
              href="/builder"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
            >
              <Plus size={16} />
              Create Page
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {pages
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .map((page) => (
                <div
                  key={page.id}
                  className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {page.title}
                        </h3>
                        {page.status === "published" ? (
                          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-green-100 text-green-700 flex-shrink-0">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Updated{" "}
                        {new Date(page.updatedAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {page.status === "published" && page.slug && (
                      <a
                        href={`/site/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                        title="View live site"
                      >
                        <Globe size={16} />
                      </a>
                    )}
                    <a
                      href={`/builder?id=${page.id}`}
                      className="p-2 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit page"
                    >
                      <Pencil size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(page.id, page.title)}
                      disabled={deletingId === page.id}
                      className="p-2 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Delete page"
                    >
                      {deletingId === page.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
