# Page Builder Admin Panel — Implementation Plan
## Based on MESCO Reference Design Analysis

---

## Reference Design Analysis (5 Screenshots)

From the MESCO website screenshots, I identified **16 distinct component patterns**:

| # | Component | Source Screenshot | Description |
|---|---|---|---|
| 1 | **Navbar** | Screenshot 1 | Logo + nav links + CTA button, sticky dark bar |
| 2 | **Hero Slider** | Screenshot 1 | Full-width image carousel with overlay text, dots, arrows, CTA buttons |
| 3 | **Services Row** | Screenshot 1 | "What we do" — 4 icon cards in a row (icon + title + short desc) |
| 4 | **Projects Grid** | Screenshot 2 | Filterable project cards with image + overlay title + category tag |
| 5 | **Stats Counter Bar** | Screenshot 2 | Animated number counters (385 Projects, 30 Locations, etc.) with icons |
| 6 | **About Split** | Screenshot 2 | Image left + heading + paragraph + skill progress bars on right |
| 7 | **Services Grid** | Screenshot 3 | 3-column cards with large icon, title, description, "Read More" link |
| 8 | **Team Section** | Screenshot 3 | Team member cards — photo, name, role, social media icon links |
| 9 | **Testimonials Carousel** | Screenshot 4 | Quote icon, client photo, name, role, testimonial text, navigation |
| 10 | **Blog/News Grid** | Screenshot 4 | Blog cards — featured image, date badge, title, excerpt, "Read More" |
| 11 | **Map + Contact Form** | Screenshot 5 | Google Map embed left + contact form right (name, email, subject, message) |
| 12 | **Footer** | Screenshot 5 | Dark 4-column footer — About, Quick Links, Services, Newsletter + social icons |
| 13 | **Copyright Bar** | Screenshot 5 | Bottom bar with copyright text |
| 14 | **Section Heading** | Multiple | Reusable centered heading with subtitle and decorative underline |
| 15 | **CTA Banner** | Screenshot 2/4 | Full-width colored banner with text + action button |
| 16 | **Divider/Spacer** | Multiple | Configurable spacing/divider between sections |

---

## 1. Recommended Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + TypeScript | SSR for preview/export, API routes, dominant ecosystem |
| **Drag & Drop** | dnd-kit (`@dnd-kit/core` + `@dnd-kit/sortable`) | Nested drop zones, sortable lists, custom collision detection |
| **State Management** | Zustand (global page state, undo/redo) | Lightweight, minimal boilerplate, great DevTools |
| **Styling** | Tailwind CSS v4 | Zero runtime, utility-first, design token enforcement |
| **UI Components (Admin)** | shadcn/ui (Radix UI + Tailwind) | Accessible admin panel components — forms, dialogs, sheets, tabs |
| **Icons** | Lucide React | Tree-shakeable, consistent, pairs with shadcn/ui |
| **Forms** | React Hook Form + Zod | Schema validation for component config panels |
| **Carousel/Slider** | Embla Carousel | Lightweight, used for Hero Slider + Testimonials Carousel |
| **Animations** | Framer Motion | Scroll-triggered counters, fade-ins, progress bar animations |
| **Maps** | React Leaflet (free) or Google Maps embed | For the Map + Contact Form block |
| **Persistence** | localStorage (MVP) → PostgreSQL + Prisma (production) | JSON configs serialize naturally |
| **Image Storage** | Base64/public folder (MVP) → Cloudflare R2 / AWS S3 (production) | Scalable media storage |

---

## 2. File Structure

```
project-3/
├── public/
│   └── images/
│       ├── placeholder-hero-1.jpg
│       ├── placeholder-hero-2.jpg
│       ├── placeholder-project.jpg
│       ├── placeholder-team.jpg
│       ├── placeholder-avatar.jpg
│       ├── placeholder-blog.jpg
│       └── placeholder-about.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (fonts, metadata)
│   │   ├── page.tsx                    # Redirect → /builder
│   │   ├── builder/
│   │   │   └── page.tsx                # Main page builder (admin panel)
│   │   ├── preview/
│   │   │   └── page.tsx                # Full-page preview (iframe target)
│   │   └── api/
│   │       └── pages/
│   │           └── route.ts            # Save/load page configs
│   │
│   ├── components/
│   │   ├── builder/                    # ── Editor UI (admin panel) ──
│   │   │   ├── BuilderCanvas.tsx       # Central canvas with sortable drop zone
│   │   │   ├── ComponentSidebar.tsx    # Left panel: draggable component palette
│   │   │   ├── ConfigPanel.tsx         # Right panel: selected component settings
│   │   │   ├── BuilderToolbar.tsx      # Top bar: save, preview, export, undo/redo, device toggle
│   │   │   ├── DraggableBlock.tsx      # Sidebar draggable item wrapper
│   │   │   ├── SortableBlock.tsx       # Canvas sortable item wrapper
│   │   │   ├── CanvasBlock.tsx         # Block on canvas with selection UI, drag handle, actions
│   │   │   ├── DevicePreview.tsx       # Responsive preview frame (desktop/tablet/mobile)
│   │   │   └── EmptyCanvas.tsx         # Empty state: "Drag components here"
│   │   │
│   │   ├── page-components/            # ── Renderable Page Blocks (16 components) ──
│   │   │   │
│   │   │   │  # ── Navigation & Layout ──
│   │   │   ├── NavbarBlock.tsx         # Sticky header: logo + nav links + CTA button
│   │   │   ├── FooterBlock.tsx         # Dark 4-column footer with newsletter
│   │   │   ├── CopyrightBarBlock.tsx   # Bottom copyright strip
│   │   │   ├── DividerBlock.tsx        # Spacing / decorative divider
│   │   │   ├── SectionHeadingBlock.tsx # Reusable centered heading + subtitle + underline
│   │   │   │
│   │   │   │  # ── Hero & Banners ──
│   │   │   ├── HeroSliderBlock.tsx     # Full-width image carousel + overlay text + CTA
│   │   │   ├── CtaBannerBlock.tsx      # Colored full-width banner + text + button
│   │   │   ├── StatsCounterBlock.tsx   # Animated number counters with icons
│   │   │   │
│   │   │   │  # ── Content Sections ──
│   │   │   ├── ServicesRowBlock.tsx    # 3-4 icon cards in a row (compact "What we do")
│   │   │   ├── ServicesGridBlock.tsx   # 3-col large cards with icon, desc, "Read More"
│   │   │   ├── ProjectsGridBlock.tsx   # Filterable project cards with image + overlay
│   │   │   ├── AboutSplitBlock.tsx     # Image + text side-by-side + skill progress bars
│   │   │   ├── TeamBlock.tsx           # Team member cards (photo, name, role, socials)
│   │   │   ├── TestimonialsBlock.tsx   # Testimonial carousel (photo, quote, name, role)
│   │   │   ├── BlogGridBlock.tsx       # Blog cards (image, date, title, excerpt)
│   │   │   └── ContactBlock.tsx        # Map embed + contact form side-by-side
│   │   │
│   │   ├── config-fields/              # ── Config Panel Field Renderers ──
│   │   │   ├── TextField.tsx           # Single-line text input
│   │   │   ├── TextareaField.tsx       # Multi-line text
│   │   │   ├── RichTextField.tsx       # Basic rich text (bold, italic, links)
│   │   │   ├── ImageField.tsx          # Image URL input + preview thumbnail
│   │   │   ├── UrlField.tsx            # URL input with validation
│   │   │   ├── ColorField.tsx          # Color picker
│   │   │   ├── NumberField.tsx         # Number input with min/max
│   │   │   ├── SelectField.tsx         # Dropdown select
│   │   │   ├── ToggleField.tsx         # Boolean toggle switch
│   │   │   ├── ArrayField.tsx          # Repeatable items (slides, projects, team members)
│   │   │   ├── GroupField.tsx          # Nested field group
│   │   │   └── FieldRenderer.tsx       # Dynamic renderer: field.type → component
│   │   │
│   │   └── ui/                         # shadcn/ui components (auto-generated)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── sheet.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── separator.tsx
│   │       ├── scroll-area.tsx
│   │       ├── tooltip.tsx
│   │       ├── switch.tsx
│   │       ├── slider.tsx
│   │       ├── badge.tsx
│   │       ├── popover.tsx
│   │       └── toast.tsx (+ toaster, use-toast)
│   │
│   ├── lib/
│   │   ├── component-registry.ts       # Master registry: type → definition + schema
│   │   ├── store.ts                    # Zustand store (page state, selection, history)
│   │   ├── types.ts                    # TypeScript types (Page, ComponentInstance, FieldDef, etc.)
│   │   ├── utils.ts                    # cn() helper, nanoid wrapper
│   │   ├── export.ts                   # Export page → JSON / static HTML
│   │   ├── default-page.ts             # Starter page config with sample MESCO-like content
│   │   └── constants.ts                # Color palette, font options, default images
│   │
│   └── styles/
│       └── globals.css                 # Tailwind directives + design tokens
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── plan.md
```

---

## 3. Design Considerations

### 3.1 Architecture — Component Registry Pattern

Every page block is registered in a central registry:

```typescript
// Each component type registered with:
{
  type: "hero-slider",              // Unique key
  label: "Hero Slider",            // Display name in sidebar
  icon: SlidersHorizontal,         // Lucide icon for sidebar
  group: "hero",                   // Sidebar grouping
  defaultProps: { ... },           // Initial values when dropped
  fields: [ ... ],                 // Schema → drives config panel auto-generation
  component: HeroSliderBlock,      // React component to render
  thumbnail: "/thumbs/hero.png",   // Optional preview image in sidebar
}
```

**Adding a new component = 2 files**: the render component + a registry entry. The config panel auto-generates from the field schema.

### 3.2 Data Model

```typescript
interface Page {
  id: string;
  title: string;
  components: ComponentInstance[];
  globalStyles: {
    primaryColor: string;       // e.g. "#E53E3E" (MESCO red)
    secondaryColor: string;     // e.g. "#1A202C" (dark)
    accentColor: string;
    fontFamily: string;         // e.g. "Inter" | "Poppins" | "Roboto"
    baseFontSize: number;
  };
  updatedAt: string;
}

interface ComponentInstance {
  id: string;                    // nanoid
  type: string;                  // "navbar" | "hero-slider" | "services-row" | ...
  props: Record<string, any>;   // Configured values
  visible: boolean;              // Toggle visibility without deleting
}

interface ComponentDefinition {
  type: string;
  label: string;
  icon: LucideIcon;
  group: "navigation" | "hero" | "content" | "social-proof" | "contact" | "layout";
  defaultProps: Record<string, any>;
  fields: FieldDefinition[];
  component: React.ComponentType<any>;
  constraints?: {
    maxInstances?: number;       // e.g. Navbar: max 1
    position?: "top" | "bottom" | "any";
  };
}

interface FieldDefinition {
  name: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "image" | "url" | "color"
      | "number" | "select" | "boolean" | "array" | "group";
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  fields?: FieldDefinition[];    // For array/group sub-fields
  validation?: { min?: number; max?: number; pattern?: string };
}
```

### 3.3 Zustand Store Design

```
PageBuilderStore {
  // ── Page Data ──
  page: Page

  // ── Selection ──
  selectedBlockId: string | null
  hoveredBlockId: string | null

  // ── Block Operations ──
  addBlock(type, afterId?)        — Insert from sidebar drag/click
  removeBlock(id)                 — Delete with confirmation
  duplicateBlock(id)              — Clone with new ID
  moveBlock(fromIndex, toIndex)   — Reorder via drag
  updateBlockProps(id, props)     — Update from config panel
  toggleBlockVisibility(id)       — Show/hide without removing
  selectBlock(id | null)          — Select for editing

  // ── Global Styles ──
  updateGlobalStyles(styles)      — Update page-level colors/fonts

  // ── History ──
  past: Page[]
  future: Page[]
  undo()
  redo()
  canUndo: boolean
  canRedo: boolean

  // ── Persistence ──
  savePage()                      — Save to localStorage / API
  loadPage()                      — Load from localStorage / API
  exportJSON()                    — Download as .json
  importJSON(json)                — Load from .json file
}
```

### 3.4 Editor Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOOLBAR:  [← Undo] [Redo →] │ [Save] [Preview] [Export ▾] │ [📱 💻 🖥️] │
├────────────┬──────────────────────────────────────┬─────────────────────┤
│            │                                      │                     │
│ COMPONENT  │         CANVAS / PREVIEW             │   CONFIG PANEL      │
│ SIDEBAR    │                                      │                     │
│            │  ┌──────────────────────────────┐    │   📝 Hero Slider    │
│ ▸ Navigation│  │ ▓▓ Navbar ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │    │   ───────────────  │
│   Navbar   │  │                              │    │                     │
│            │  │ ▓▓▓▓▓ Hero Slider ▓▓▓▓▓▓▓▓▓ │    │   Heading           │
│ ▸ Hero     │  │ ▓▓ [We Create Quality...] ▓▓ │    │   [____________]    │
│   Hero     │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │    │                     │
│   CTA Banner│  │                              │    │   Subheading        │
│   Stats    │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ │    │   [____________]    │
│            │  │  │ 🔧 │ │ 🏗 │ │ 📐 │ │ 🏠 │ │    │                     │
│ ▸ Content  │  │  │Svc1│ │Svc2│ │Svc3│ │Svc4│ │    │   Slides            │
│   Services │  │  └────┘ └────┘ └────┘ └────┘ │    │   [Slide 1] [✕]     │
│   Projects │  │                              │    │   [Slide 2] [✕]     │
│   About    │  │  ▓▓ Projects Grid ▓▓▓▓▓▓▓▓▓ │    │   [+ Add Slide]     │
│   Team     │  │                              │    │                     │
│            │  └──────────────────────────────┘    │   CTA Text          │
│ ▸ Social   │                                      │   [____________]    │
│   Testimonial│                                     │                     │
│   Blog     │                                      │   Overlay Opacity   │
│            │                                      │   [━━━━●━━━━] 60%  │
│ ▸ Contact  │                                      │                     │
│   Contact  │                                      │   [🗑 Delete Block]  │
│            │                                      │                     │
│ ▸ Layout   │                                      │                     │
│   Heading  │                                      │                     │
│   Divider  │                                      │                     │
│   Footer   │                                      │                     │
│   Copyright│                                      │                     │
├────────────┴──────────────────────────────────────┴─────────────────────┤
│  Auto-saved 2 seconds ago                                  Page: Home   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Component Sidebar Grouping

| Group | Components | Icon |
|---|---|---|
| **Navigation** | Navbar | Menu |
| **Hero & Banners** | Hero Slider, CTA Banner, Stats Counter | SlidersHorizontal, Megaphone, Hash |
| **Content** | Services Row, Services Grid, Projects Grid, About Split | Grid3x3, LayoutGrid, FolderOpen, User |
| **Social Proof** | Team, Testimonials, Blog Grid | Users, Quote, Newspaper |
| **Contact** | Contact (Map + Form) | Mail |
| **Layout** | Section Heading, Divider/Spacer, Footer, Copyright Bar | Type, Minus, PanelBottom, Copyright |

### 3.6 Design Tokens (MESCO-inspired defaults)

```css
/* globals.css — configurable via Global Styles panel */
:root {
  --primary: #E53E3E;          /* Red accent (MESCO red) */
  --secondary: #1A202C;        /* Dark navy/charcoal */
  --accent: #F6AD55;           /* Orange/gold accent */
  --background: #FFFFFF;
  --foreground: #1A202C;
  --muted: #718096;
  --card-bg: #F7FAFC;
  --footer-bg: #1A202C;
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Open Sans', sans-serif;
}
```

---

## 4. All 16 Component Specifications

### 4.1 NavbarBlock
- **Props**: `logoText`, `logoImageUrl`, `navLinks[]` { label, url }, `ctaText`, `ctaUrl`, `backgroundColor`, `sticky` (boolean)
- **Render**: Fixed/sticky top bar — logo left, horizontal nav links center/right, CTA button far right. Mobile hamburger menu.
- **Constraints**: `maxInstances: 1`, `position: "top"`

### 4.2 HeroSliderBlock
- **Props**: `slides[]` { imageUrl, alt, heading, subheading, ctaText, ctaUrl }, `autoplay` (boolean), `interval` (ms), `overlayColor`, `overlayOpacity`, `showDots`, `showArrows`
- **Render**: Full-width Embla Carousel. Each slide has background image with dark overlay, large heading, subtitle, CTA button. Dot indicators + arrow navigation.

### 4.3 ServicesRowBlock
- **Props**: `heading`, `subtitle`, `services[]` { icon (select from Lucide set), title, description }, `columns` (3|4), `backgroundColor`
- **Render**: Section heading + row of compact cards each with icon circle, title, short description. "What we do" style.

### 4.4 ProjectsGridBlock
- **Props**: `heading`, `subtitle`, `categories[]` (string tags for filter), `projects[]` { title, category, imageUrl, linkUrl }, `columns` (2|3|4), `showFilter` (boolean)
- **Render**: Section heading + optional category filter tabs + responsive grid. Each card is image with hover overlay showing title + category.

### 4.5 StatsCounterBlock
- **Props**: `counters[]` { icon, number, suffix ("+", "%"), label }, `backgroundColor`, `textColor`
- **Render**: Full-width colored bar with 3-4 animated count-up numbers (triggered on scroll into view). Each has icon, large number, and label below.

### 4.6 AboutSplitBlock
- **Props**: `heading`, `subtitle`, `description` (richtext), `imageUrl`, `imagePosition` ("left"|"right"), `skills[]` { label, percentage }, `ctaText`, `ctaUrl`
- **Render**: 2-column split. Image on one side, text content + animated progress bars on the other. Progress bars fill on scroll.

### 4.7 ServicesGridBlock
- **Props**: `heading`, `subtitle`, `services[]` { icon, title, description, linkUrl, linkText }, `columns` (2|3), `cardStyle` ("bordered"|"shadow"|"flat")
- **Render**: Section heading + grid of large cards. Each card has icon, title, multi-line description, "Read More" link. Hover lift effect.

### 4.8 TeamBlock
- **Props**: `heading`, `subtitle`, `members[]` { name, role, photoUrl, bio, twitterUrl, linkedinUrl, emailUrl }, `columns` (3|4)
- **Render**: Section heading + grid of team cards. Each card: photo (circular or square), name, role, row of social media icon links. Hover reveals bio overlay.

### 4.9 TestimonialsBlock
- **Props**: `heading`, `subtitle`, `testimonials[]` { quote, clientName, clientRole, clientPhoto }, `autoplay`, `backgroundColor`
- **Render**: Section heading + Embla Carousel. Each slide shows large quote icon, testimonial text, client photo (small circle), name, role. Navigation dots.

### 4.10 BlogGridBlock
- **Props**: `heading`, `subtitle`, `posts[]` { title, excerpt, imageUrl, date, author, linkUrl }, `columns` (2|3), `showDate`, `showAuthor`
- **Render**: Section heading + card grid. Each card: image top with date badge overlay, title, excerpt text (truncated), "Read More" link.

### 4.11 ContactBlock
- **Props**: `heading`, `subtitle`, `mapEmbedUrl`, `showMap` (boolean), `mapPosition` ("left"|"right"), `formFields[]` { label, type, required }, `submitText`, `email`, `phone`, `address`
- **Render**: 2-column layout. Map embed on one side, contact form on the other (name, email, subject, message textarea, send button). Contact info below or beside.

### 4.12 FooterBlock
- **Props**: `aboutText`, `columns[]` { heading, links[] { label, url } }, `newsletterEnabled`, `newsletterHeading`, `socialLinks` { twitter, linkedin, facebook, instagram }, `backgroundColor`
- **Render**: Dark full-width footer. 3-4 columns: About blurb, Quick Links, Services links, Newsletter signup + social icons. Responsive grid.
- **Constraints**: `position: "bottom"`

### 4.13 CopyrightBarBlock
- **Props**: `text`, `backgroundColor`, `textColor`, `links[]` { label, url }
- **Render**: Thin bar at very bottom with centered copyright text. Optional links (Privacy, Terms).
- **Constraints**: `maxInstances: 1`, `position: "bottom"`

### 4.14 SectionHeadingBlock
- **Props**: `heading`, `subtitle`, `alignment` ("left"|"center"|"right"), `showUnderline` (boolean), `underlineColor`
- **Render**: Large heading + smaller subtitle text + decorative colored underline bar. Used as a standalone heading between sections.

### 4.15 CtaBannerBlock
- **Props**: `heading`, `description`, `ctaText`, `ctaUrl`, `backgroundColor`, `textColor`, `backgroundImageUrl`, `overlayOpacity`
- **Render**: Full-width colored/image banner with centered text + prominent CTA button. Parallax option.

### 4.16 DividerBlock
- **Props**: `height` (px), `style` ("none"|"line"|"dashed"|"dotted"), `lineColor`, `maxWidth` (%)
- **Render**: Configurable vertical spacing with optional visible divider line.

---

## 5. Step-by-Step Implementation Plan

### Phase 1: Project Setup & Foundation (Steps 1-5)
1. Initialize Next.js 15 project with TypeScript, Tailwind CSS v4, App Router
2. Install and configure shadcn/ui (`npx shadcn@latest init` + add: button, card, input, label, select, tabs, separator, scroll-area, tooltip, sheet, dialog, switch, slider, badge, popover, toast)
3. Install deps: `zustand`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `nanoid`, `lucide-react`, `embla-carousel-react`, `embla-carousel-autoplay`, `framer-motion`, `react-hook-form`, `zod`
4. Create directory structure (builder, page-components, config-fields, lib, styles)
5. Define all TypeScript types in `lib/types.ts` (Page, ComponentInstance, ComponentDefinition, FieldDefinition)

### Phase 2: Core Infrastructure (Steps 6-9)
6. Create `lib/utils.ts` — cn() helper, generateId() wrapper, debounce
7. Create `lib/constants.ts` — default colors, font options, icon options map, placeholder images
8. Implement Zustand store (`lib/store.ts`) — page state, selection, CRUD ops, undo/redo (snapshot-based), auto-save debounced to localStorage
9. Create `lib/component-registry.ts` — empty registry structure with register/lookup functions

### Phase 3: Page Components — Navigation & Layout (Steps 10-14)
10. Build `NavbarBlock` — sticky header, logo, nav links, mobile hamburger, CTA button
11. Build `FooterBlock` — dark 4-column layout, about text, link columns, newsletter, social icons
12. Build `CopyrightBarBlock` — thin bottom strip with copyright text
13. Build `SectionHeadingBlock` — centered heading + subtitle + decorative underline
14. Build `DividerBlock` — configurable spacing + optional line

### Phase 4: Page Components — Hero & Banners (Steps 15-17)
15. Build `HeroSliderBlock` — Embla Carousel, full-width slides, overlay text, CTA, dots/arrows
16. Build `CtaBannerBlock` — full-width colored banner with heading + CTA button
17. Build `StatsCounterBlock` — animated count-up numbers on scroll (Framer Motion)

### Phase 5: Page Components — Content Sections (Steps 18-22)
18. Build `ServicesRowBlock` — compact icon + title + description cards (3-4 column)
19. Build `ServicesGridBlock` — larger service cards with icon, description, "Read More"
20. Build `ProjectsGridBlock` — image cards with hover overlay, optional category filter tabs
21. Build `AboutSplitBlock` — image + text split layout with animated skill progress bars
22. Build `TeamBlock` — team member cards (photo, name, role, social links, hover bio)

### Phase 6: Page Components — Social Proof & Contact (Steps 23-25)
23. Build `TestimonialsBlock` — Embla Carousel, quote icon, client info, navigation dots
24. Build `BlogGridBlock` — blog post cards with image, date badge, title, excerpt
25. Build `ContactBlock` — map embed + contact form side-by-side layout

### Phase 7: Register All Components & Default Page (Steps 26-27)
26. Register all 16 components in `lib/component-registry.ts` with field schemas + defaults
27. Create `lib/default-page.ts` — sample page config resembling the MESCO layout (Navbar → Hero → Services Row → Projects → Stats → About → Services Grid → Team → Testimonials → Blog → CTA Banner → Contact → Footer → Copyright)

### Phase 8: Config Panel & Field Renderers (Steps 28-33)
28. Build `FieldRenderer.tsx` — dynamic dispatch: field.type → appropriate field component
29. Build basic fields: `TextField`, `TextareaField`, `NumberField`, `UrlField`, `ToggleField`, `SelectField`
30. Build `ColorField` — color picker popover with preset swatches
31. Build `ImageField` — URL input + image preview thumbnail + upload button (future)
32. Build `ArrayField` — repeatable items with add/remove/reorder (for slides, team members, etc.)
33. Build `GroupField` — nested field groups (for complex sub-objects)

### Phase 9: Builder UI — Sidebar & Canvas (Steps 34-40)
34. Build main builder layout (`builder/page.tsx`) — 3-column responsive grid
35. Build `ComponentSidebar` — grouped accordion list with component thumbnails, draggable items
36. Build `BuilderCanvas` — dnd-kit DndContext + SortableContext wrapper
37. Build `SortableBlock` — dnd-kit useSortable wrapper for each block on canvas
38. Build `CanvasBlock` — renders page component + blue selection border + drag handle + hover action bar (delete, duplicate, visibility toggle, move up/down)
39. Implement drag-from-sidebar → add new block to canvas
40. Implement drag-to-reorder existing blocks on canvas

### Phase 10: Config Panel Integration (Steps 41-43)
41. Build `ConfigPanel` — reads selected block's ComponentDefinition, renders FieldRenderer for each field, updates store on change
42. Add "Global Styles" tab in config panel (primary color, font, etc.) — updates `page.globalStyles`
43. Build `EmptyCanvas` — illustrated empty state with "Drag components here to get started"

### Phase 11: Toolbar & Preview (Steps 44-48)
44. Build `BuilderToolbar` — logo, save button, undo/redo, preview toggle, export dropdown, device size selector
45. Build `DevicePreview` — wraps canvas in resizable container (1440 / 768 / 375 px)
46. Build preview page (`preview/page.tsx`) — renders all page components in order from stored config, no editor UI
47. Implement JSON export (download `page-config.json`)
48. Implement JSON import (upload .json file → load into store)

### Phase 12: Polish & UX (Steps 49-55)
49. Add keyboard shortcuts: Ctrl+Z (undo), Ctrl+Shift+Z (redo), Ctrl+S (save), Delete (remove selected), Escape (deselect), Ctrl+D (duplicate)
50. Add toast notifications for save, load, export, import actions
51. Add block duplication in canvas action bar
52. Add block visibility toggle (eye icon) — dims block on canvas without removing
53. Add smooth reorder animations (dnd-kit + CSS transitions)
54. Responsive admin panel — collapsible sidebar on smaller screens
55. Add "Page Settings" dialog — page title, meta description, favicon URL

### Phase 13: Advanced Features (Future)
56. Static HTML + CSS export (server-render components → downloadable .html + .css)
57. Image upload handling with drag-and-drop (local → cloud storage)
58. Multiple pages support (page list, create, duplicate, delete pages)
59. Page versioning / revision history
60. Template library — pre-built page templates (Portfolio, Agency, Landing Page)
61. Authentication for the admin panel
62. Collaborative editing (real-time via WebSocket)

---

## 6. MESCO Design Patterns to Replicate

### Color System
- **Primary red** (#E53E3E) for CTAs, active states, accent elements
- **Dark navy** (#1A202C) for navbar, footer, text
- **White/light gray** for content backgrounds, alternating section backgrounds
- **Warm accent** for secondary highlights

### Typography Hierarchy
- Section headings: Large (32-40px), bold, uppercase or title case
- Subtitles: Smaller (14-16px), muted color, below heading
- Body text: 16px, relaxed line-height, gray-700
- Card titles: 18-20px, semi-bold
- Decorative underline bar (short colored line below section headings)

### Component Patterns
- **Alternating backgrounds**: Sections alternate between white and light gray (#F7FAFC)
- **Card hover effects**: Subtle lift (translateY + shadow increase) on project/service/team cards
- **Overlay on images**: Dark gradient overlay on hero slides and project card hovers
- **Progress bars**: Animated fill from 0% → target% on scroll into view
- **Counter animation**: Numbers count from 0 → target on scroll into view
- **Section spacing**: Consistent vertical padding (~80-100px top/bottom per section)
- **Icon circles**: Circular background behind icons in service cards

### Responsive Breakpoints
- Desktop: 4-column grids → Tablet: 2-column → Mobile: 1-column stacked
- Navbar collapses to hamburger menu on mobile
- Hero text scales down, CTA becomes full-width on mobile
- Footer columns stack vertically on mobile

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| dnd-kit maintenance slower since 2023 | Abstract drag logic; swap to Pragmatic DnD if needed |
| 16 components is a lot for MVP | Build in phases; Navigation + Hero + 2 content sections first |
| Embla Carousel complexity | Wrap in custom hook; carousel logic isolated from page component |
| Framer Motion bundle size | Only import `motion` and `useInView`; tree-shake rest |
| Image storage for MVP | Base64 for small images; URL input for external images; defer uploads |
| Config panel complexity for array fields | Build ArrayField with sub-form pattern; test with slides[] and projects[] |
| Style leakage between editor and preview | Use Tailwind `@layer` scoping; iframe isolation for full preview |

---

## 8. MVP Scope (Phase 1-11)

**In scope for MVP:**
- [ ] All 16 page components with full configurable props
- [ ] Drag-from-sidebar to add new blocks
- [ ] Drag-to-reorder blocks on canvas
- [ ] Click-to-select → config panel edits props
- [ ] Block actions: delete, duplicate, visibility toggle
- [ ] Global styles (colors, fonts)
- [ ] Undo/redo
- [ ] Auto-save to localStorage
- [ ] JSON export/import
- [ ] Responsive preview (desktop/tablet/mobile)
- [ ] Default page template resembling MESCO layout

**Deferred:**
- [ ] Static HTML export
- [ ] Cloud image uploads
- [ ] Multi-page support
- [ ] Page versioning
- [ ] Template library
- [ ] Authentication
- [ ] Collaborative editing
