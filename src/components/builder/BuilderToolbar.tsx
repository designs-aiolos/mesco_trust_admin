"use client";

import {
  Undo2,
  Redo2,
  Save,
  ExternalLink,
  Download,
  Upload,
  Monitor,
  Tablet,
  Smartphone,
  Globe,
  ArrowLeft,
  Loader2,
  Check,
} from "lucide-react";
import { usePageBuilderStore } from "@/lib/store";
import { useRef, useState } from "react";
import type { DeviceSize } from "@/lib/constants";

interface BuilderToolbarProps {
  deviceSize: DeviceSize;
  onDeviceChange: (size: DeviceSize) => void;
}

export default function BuilderToolbar({
  deviceSize,
  onDeviceChange,
}: BuilderToolbarProps) {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    savePage,
    exportJSON,
    importJSON,
    page,
    saveToServer,
    publishToServer,
    unpublishFromServer,
    isSaving,
    isPublishing,
    pageStatus,
    pageSlug,
    lastServerSaveAt,
    updateTitle,
  } = usePageBuilderStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [showPublishMenu, setShowPublishMenu] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleExport = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page.title.toLowerCase().replace(/\s+/g, "-")}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      importJSON(json);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handlePreview = () => {
    window.open("/preview", "_blank");
  };

  const handleSaveToServer = async () => {
    await saveToServer();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleTitleClick = () => {
    setTitleDraft(page.title);
    setEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setEditingTitle(false);
    if (titleDraft.trim() && titleDraft !== page.title) {
      updateTitle(titleDraft.trim());
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === "Escape") {
      setEditingTitle(false);
    }
  };

  const deviceButtons = [
    { key: "desktop" as const, icon: Monitor, label: "Desktop" },
    { key: "tablet" as const, icon: Tablet, label: "Tablet" },
    { key: "mobile" as const, icon: Smartphone, label: "Mobile" },
  ];

  return (
    <div className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4 flex-shrink-0">
      {/* Left: Back + Title + Status */}
      <div className="flex items-center gap-3">
        <a
          href="/dashboard"
          className="p-1.5 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} />
        </a>
        <div className="h-5 w-px bg-gray-200" />

        {/* Editable title */}
        {editingTitle ? (
          <input
            type="text"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="text-sm font-bold text-gray-800 bg-gray-50 border border-gray-300 rounded px-2 py-0.5 outline-none focus:border-blue-400 w-48"
          />
        ) : (
          <button
            type="button"
            onClick={handleTitleClick}
            className="text-sm font-bold text-gray-800 hover:bg-gray-50 rounded px-2 py-0.5 transition-colors truncate max-w-48"
            title="Click to edit title"
          >
            {page.title}
          </button>
        )}

        {/* Status badge */}
        {pageStatus === "published" ? (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-green-100 text-green-700">
            Published
          </span>
        ) : (
          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-gray-100 text-gray-500">
            Draft
          </span>
        )}

        <div className="h-5 w-px bg-gray-200" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          className="p-1.5 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={16} />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          className="p-1.5 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* Center: Device toggle */}
      <div className="flex items-center bg-gray-100 rounded-md p-0.5">
        {deviceButtons.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onDeviceChange(key)}
            className={`p-1.5 rounded transition-colors ${
              deviceSize === key
                ? "bg-white shadow-sm text-gray-800"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title={label}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600 rounded hover:bg-gray-100 transition-colors"
          title="Import JSON"
        >
          <Upload size={14} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600 rounded hover:bg-gray-100 transition-colors"
          title="Export JSON"
        >
          <Download size={14} />
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600 rounded hover:bg-gray-100 transition-colors"
          title="Preview in new tab"
        >
          <ExternalLink size={14} />
        </button>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        {/* Save to server */}
        <button
          type="button"
          onClick={handleSaveToServer}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          title="Save to server (Ctrl+S)"
        >
          {isSaving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : justSaved ? (
            <Check size={14} className="text-green-600" />
          ) : (
            <Save size={14} />
          )}
          {isSaving ? "Saving..." : justSaved ? "Saved" : "Save"}
        </button>

        {/* Publish */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (pageStatus === "published") {
                setShowPublishMenu(!showPublishMenu);
              } else {
                publishToServer();
              }
            }}
            disabled={isPublishing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded transition-colors disabled:opacity-50"
            style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
            title={pageStatus === "published" ? "Manage publication" : "Publish page"}
          >
            {isPublishing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Globe size={14} />
            )}
            {isPublishing
              ? "Publishing..."
              : pageStatus === "published"
              ? "Published"
              : "Publish"}
          </button>

          {/* Publish dropdown menu */}
          {showPublishMenu && pageStatus === "published" && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowPublishMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                {pageSlug && (
                  <a
                    href={`/site/${pageSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowPublishMenu(false)}
                  >
                    <ExternalLink size={14} />
                    View live site
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    publishToServer();
                    setShowPublishMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Globe size={14} />
                  Update published page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unpublishFromServer();
                    setShowPublishMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <Globe size={14} />
                  Unpublish
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
