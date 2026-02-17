# Save & Publish Feature - Implementation Plan

## Overview
Add ability for users to save pages to the server (as JSON files) and publish them as live websites accessible via `/site/[slug]` URLs. Includes a dashboard for managing multiple pages.

## Architecture Decisions
- **Storage**: File-based JSON (no database needed)
- **Published pages**: Next.js dynamic routes at `/site/[slug]`
- **Auth**: None (single-user tool)
- **Auto-save**: Keep localStorage for crash recovery; explicit Save button pushes to server

## New Files (10 files)

| # | File | Purpose |
|---|------|---------|
| 1 | `src/lib/storage.ts` | Server-side file CRUD (read/write JSON files in `data/pages/`) |
| 2 | `src/lib/api-client.ts` | Client-side fetch wrappers for API calls |
| 3 | `src/app/api/pages/route.ts` | `GET /api/pages` (list) + `POST /api/pages` (create) |
| 4 | `src/app/api/pages/[id]/route.ts` | `GET/PUT/DELETE /api/pages/[id]` |
| 5 | `src/app/api/pages/[id]/publish/route.ts` | `POST /api/pages/[id]/publish` (publish/unpublish) |
| 6 | `src/app/dashboard/page.tsx` | Dashboard - list all pages, create/edit/delete/publish |
| 7 | `src/app/dashboard/DashboardClient.tsx` | Dashboard client interactions |
| 8 | `src/app/site/[slug]/page.tsx` | Published page route (server-rendered, SEO meta) |
| 9 | `src/components/site/PageRenderer.tsx` | Shared page rendering component |
| 10 | `.gitignore` | Ignore `data/pages/` directory |

## Modified Files (5 files)

| # | File | Changes |
|---|------|---------|
| 1 | `src/lib/types.ts` | Add `SavedPage`, `PageIndexEntry` types |
| 2 | `src/lib/utils.ts` | Add `slugify()` function |
| 3 | `src/lib/store.ts` | Add `saveToServer`, `publishToServer`, `loadFromServer`, title editing, status tracking |
| 4 | `src/app/builder/page.tsx` | Load from API when `?id=xxx` present, Suspense boundary |
| 5 | `src/components/builder/BuilderToolbar.tsx` | Save/Publish buttons, editable title, status badge, dashboard link |
| 6 | `src/app/page.tsx` | Redirect to `/dashboard` instead of `/builder` |

## Implementation Steps

### Step 1: Types & Utils
- Add `SavedPage` (extends Page with slug, status, dates) to types.ts
- Add `slugify()` to utils.ts

### Step 2: File Storage Layer (`storage.ts`)
- Pages stored as `data/pages/{id}.json`
- Index file `data/pages/index.json` for fast listing
- CRUD: `listPages`, `getPage`, `createPage`, `updatePage`, `deletePage`, `getPageBySlug`
- Auto-creates `data/pages/` directory on first use

### Step 3: API Routes
- `GET /api/pages` → list all pages from index
- `POST /api/pages` → create new page (status: draft)
- `GET /api/pages/[id]` → get full page data
- `PUT /api/pages/[id]` → update/save page
- `POST /api/pages/[id]/publish` → publish (generate slug) or unpublish
- `DELETE /api/pages/[id]` → delete page + index entry

### Step 4: API Client (`api-client.ts`)
- Thin fetch wrappers: `fetchPages`, `fetchPage`, `createPage`, `savePage`, `publishPage`, `deletePage`

### Step 5: Store Updates
- Add `serverPageId`, `pageStatus`, `isSaving`, `isPublishing` state
- `saveToServer()` → POST (new) or PUT (existing) to API
- `publishToServer()` → POST to publish endpoint
- `loadFromServer(id)` → GET page and populate store
- Keep localStorage auto-save for crash recovery

### Step 6: Builder UI Updates
- Toolbar: Dashboard back link, editable title, status badge, Save + Publish buttons
- Builder page: read `?id=xxx` from URL, load from server if present
- Ctrl+S calls `saveToServer()` instead of just localStorage

### Step 7: PageRenderer Component
- Extract rendering logic from preview page into shared component
- Used by both `/site/[slug]` and `/preview`

### Step 8: Published Page Route (`/site/[slug]`)
- Server component loads page data by slug
- Returns 404 if not found or not published
- Sets SEO metadata (title, description)
- Renders via PageRenderer client component

### Step 9: Dashboard
- Server component fetches page list
- Client component renders table with: title, status badge, slug link, dates, actions
- Actions: Create New, Edit (→ builder), Publish/Unpublish, Delete (with confirm)
- Empty state for no pages

### Step 10: Navigation & Cleanup
- Root `/` redirects to `/dashboard`
- Add `data/pages/` to `.gitignore`

## User Flow

```
/dashboard (home)
  ├── "Create New Page" → POST /api/pages → /builder?id=xxx
  ├── "Edit" on existing page → /builder?id=xxx
  └── "Publish" → generates slug → page live at /site/my-page

/builder?id=xxx
  ├── Auto-saves to localStorage (crash recovery)
  ├── "Save" button → PUT /api/pages/xxx (server save)
  ├── "Publish" button → POST /api/pages/xxx/publish → shows live URL
  └── "Preview" → /preview (unchanged)

/site/my-page (public)
  └── Server-rendered published page with SEO meta tags
```
