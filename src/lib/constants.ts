import type { GlobalStyles, SidebarGroup } from "./types";
import {
  Menu,
  SlidersHorizontal,
  Megaphone,
  Hash,
  Grid3X3,
  LayoutGrid,
  FolderOpen,
  User,
  Users,
  Quote,
  Newspaper,
  Mail,
  Type,
  Minus,
  PanelBottom,
  Copyright,
} from "lucide-react";

export const DEFAULT_GLOBAL_STYLES: GlobalStyles = {
  primaryColor: "#E53E3E",
  secondaryColor: "#1A202C",
  accentColor: "#F6AD55",
  fontFamily: "Inter",
  baseFontSize: 16,
};

export const FONT_OPTIONS = [
  { label: "Inter", value: "Inter" },
  { label: "Poppins", value: "Poppins" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Roboto", value: "Roboto" },
  { label: "Lato", value: "Lato" },
];

export const ICON_OPTIONS = [
  { label: "Wrench", value: "Wrench" },
  { label: "Building", value: "Building2" },
  { label: "Ruler", value: "Ruler" },
  { label: "Home", value: "Home" },
  { label: "Briefcase", value: "Briefcase" },
  { label: "Code", value: "Code" },
  { label: "Palette", value: "Palette" },
  { label: "Rocket", value: "Rocket" },
  { label: "Shield", value: "Shield" },
  { label: "Heart", value: "Heart" },
  { label: "Star", value: "Star" },
  { label: "Zap", value: "Zap" },
  { label: "Globe", value: "Globe" },
  { label: "Camera", value: "Camera" },
  { label: "Phone", value: "Phone" },
  { label: "Settings", value: "Settings" },
  { label: "Target", value: "Target" },
  { label: "Award", value: "Award" },
  { label: "TrendingUp", value: "TrendingUp" },
  { label: "Layers", value: "Layers" },
];

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  { label: "Navigation", icon: Menu, types: ["navbar"] },
  {
    label: "Hero & Banners",
    icon: SlidersHorizontal,
    types: ["hero-slider", "cta-banner", "stats-counter"],
  },
  {
    label: "Content",
    icon: Grid3X3,
    types: [
      "services-row",
      "services-grid",
      "projects-grid",
      "about-split",
      "team",
    ],
  },
  {
    label: "Social Proof",
    icon: Quote,
    types: ["testimonials", "blog-grid"],
  },
  { label: "Contact", icon: Mail, types: ["contact"] },
  {
    label: "Layout",
    icon: Type,
    types: ["section-heading", "divider", "footer", "copyright-bar"],
  },
];

export const GROUP_ICONS: Record<string, typeof Menu> = {
  navigation: Menu,
  hero: SlidersHorizontal,
  content: Grid3X3,
  "social-proof": Quote,
  contact: Mail,
  layout: Type,
};

export const PLACEHOLDER_IMAGES = {
  hero1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  hero2: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  hero3: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80",
  project1: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
  project2: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  project3: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  project4: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  project5: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80",
  project6: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  team1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  team2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  team3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  team4: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  about: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  blog1: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  blog2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  blog3: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
};

export const DEVICE_SIZES = {
  desktop: { width: 1440, label: "Desktop" },
  tablet: { width: 768, label: "Tablet" },
  mobile: { width: 375, label: "Mobile" },
} as const;

export type DeviceSize = keyof typeof DEVICE_SIZES;
