import type { ComponentDefinition } from "./types";
import { PLACEHOLDER_IMAGES } from "./constants";
import {
  Menu,
  SlidersHorizontal,
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
  Hash,
  Megaphone,
} from "lucide-react";

import NavbarBlock from "@/components/page-components/NavbarBlock";
import HeroSliderBlock from "@/components/page-components/HeroSliderBlock";
import ServicesRowBlock from "@/components/page-components/ServicesRowBlock";
import ProjectsGridBlock from "@/components/page-components/ProjectsGridBlock";
import StatsCounterBlock from "@/components/page-components/StatsCounterBlock";
import AboutSplitBlock from "@/components/page-components/AboutSplitBlock";
import ServicesGridBlock from "@/components/page-components/ServicesGridBlock";
import TeamBlock from "@/components/page-components/TeamBlock";
import TestimonialsBlock from "@/components/page-components/TestimonialsBlock";
import BlogGridBlock from "@/components/page-components/BlogGridBlock";
import ContactBlock from "@/components/page-components/ContactBlock";
import FooterBlock from "@/components/page-components/FooterBlock";
import CopyrightBarBlock from "@/components/page-components/CopyrightBarBlock";
import SectionHeadingBlock from "@/components/page-components/SectionHeadingBlock";
import CtaBannerBlock from "@/components/page-components/CtaBannerBlock";
import DividerBlock from "@/components/page-components/DividerBlock";

const definitions: ComponentDefinition[] = [
  // ── Navigation ──
  {
    type: "navbar",
    label: "Navbar",
    icon: Menu,
    group: "navigation",
    component: NavbarBlock as ComponentDefinition["component"],
    constraints: { maxInstances: 1, position: "top" },
    defaultProps: {
      logoText: "MESCO",
      logoImageUrl: "",
      navLinks: [
        { label: "Home", url: "#" },
        { label: "About", url: "#about" },
        { label: "Services", url: "#services" },
        { label: "Projects", url: "#projects" },
        { label: "Contact", url: "#contact" },
      ],
      ctaText: "Get Quote",
      ctaUrl: "#contact",
      backgroundColor: "#1A202C",
      sticky: true,
    },
    fields: [
      { name: "logoText", label: "Logo Text", type: "text", required: true },
      { name: "logoImageUrl", label: "Logo Image URL", type: "image" },
      {
        name: "navLinks",
        label: "Navigation Links",
        type: "array",
        fields: [
          { name: "label", label: "Label", type: "text", required: true },
          { name: "url", label: "URL", type: "url" },
        ],
      },
      { name: "ctaText", label: "CTA Button Text", type: "text" },
      { name: "ctaUrl", label: "CTA Button URL", type: "url" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "sticky", label: "Sticky Header", type: "boolean" },
    ],
  },

  // ── Hero Slider ──
  {
    type: "hero-slider",
    label: "Hero Slider",
    icon: SlidersHorizontal,
    group: "hero",
    component: HeroSliderBlock as ComponentDefinition["component"],
    defaultProps: {
      slides: [
        {
          imageUrl: PLACEHOLDER_IMAGES.hero1,
          alt: "Slide 1",
          heading: "We Create Quality Products",
          subheading: "Building excellence in every project we deliver",
          ctaText: "Our Services",
          ctaUrl: "#services",
        },
        {
          imageUrl: PLACEHOLDER_IMAGES.hero2,
          alt: "Slide 2",
          heading: "Innovation Meets Design",
          subheading: "Transforming ideas into reality with precision",
          ctaText: "View Projects",
          ctaUrl: "#projects",
        },
      ],
      autoplay: true,
      interval: 5000,
      overlayColor: "#000000",
      overlayOpacity: 0.5,
      showDots: true,
      showArrows: true,
    },
    fields: [
      {
        name: "slides",
        label: "Slides",
        type: "array",
        fields: [
          { name: "imageUrl", label: "Image URL", type: "image", required: true },
          { name: "alt", label: "Alt Text", type: "text" },
          { name: "heading", label: "Heading", type: "text", required: true },
          { name: "subheading", label: "Subheading", type: "text" },
          { name: "ctaText", label: "Button Text", type: "text" },
          { name: "ctaUrl", label: "Button URL", type: "url" },
        ],
      },
      { name: "autoplay", label: "Autoplay", type: "boolean" },
      { name: "interval", label: "Interval (ms)", type: "number", validation: { min: 1000, max: 10000 } },
      { name: "overlayColor", label: "Overlay Color", type: "color" },
      { name: "overlayOpacity", label: "Overlay Opacity", type: "number", validation: { min: 0, max: 1 } },
      { name: "showDots", label: "Show Dots", type: "boolean" },
      { name: "showArrows", label: "Show Arrows", type: "boolean" },
    ],
  },

  // ── Services Row ──
  {
    type: "services-row",
    label: "Services Row",
    icon: Grid3X3,
    group: "content",
    component: ServicesRowBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "What We Do",
      subtitle: "We provide the best services for your needs",
      services: [
        { icon: "Wrench", title: "Construction", description: "Building innovative structures with modern techniques" },
        { icon: "Building2", title: "Architecture", description: "Designing spaces that inspire and function beautifully" },
        { icon: "Ruler", title: "Engineering", description: "Precision engineering solutions for complex challenges" },
        { icon: "Home", title: "Interior Design", description: "Creating beautiful interiors that match your vision" },
      ],
      columns: 4,
      backgroundColor: "#ffffff",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "services",
        label: "Services",
        type: "array",
        fields: [
          { name: "icon", label: "Icon", type: "icon" },
          { name: "title", label: "Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
      { name: "columns", label: "Columns", type: "select", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
      { name: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },

  // ── Projects Grid ──
  {
    type: "projects-grid",
    label: "Projects Grid",
    icon: FolderOpen,
    group: "content",
    component: ProjectsGridBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Our Projects",
      subtitle: "Explore our recent works and achievements",
      categories: ["Residential", "Commercial", "Industrial"],
      projects: [
        { title: "Modern Villa", category: "Residential", imageUrl: PLACEHOLDER_IMAGES.project1, linkUrl: "#" },
        { title: "Office Tower", category: "Commercial", imageUrl: PLACEHOLDER_IMAGES.project2, linkUrl: "#" },
        { title: "Factory Complex", category: "Industrial", imageUrl: PLACEHOLDER_IMAGES.project3, linkUrl: "#" },
        { title: "Luxury Apartments", category: "Residential", imageUrl: PLACEHOLDER_IMAGES.project4, linkUrl: "#" },
        { title: "Shopping Mall", category: "Commercial", imageUrl: PLACEHOLDER_IMAGES.project5, linkUrl: "#" },
        { title: "Warehouse", category: "Industrial", imageUrl: PLACEHOLDER_IMAGES.project6, linkUrl: "#" },
      ],
      columns: 3,
      showFilter: true,
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "categories",
        label: "Filter Categories",
        type: "array",
        fields: [{ name: "value", label: "Category Name", type: "text" }],
      },
      {
        name: "projects",
        label: "Projects",
        type: "array",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "category", label: "Category", type: "text" },
          { name: "imageUrl", label: "Image URL", type: "image", required: true },
          { name: "linkUrl", label: "Link URL", type: "url" },
        ],
      },
      { name: "columns", label: "Columns", type: "select", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
      { name: "showFilter", label: "Show Category Filter", type: "boolean" },
    ],
  },

  // ── Stats Counter ──
  {
    type: "stats-counter",
    label: "Stats Counter",
    icon: Hash,
    group: "hero",
    component: StatsCounterBlock as ComponentDefinition["component"],
    defaultProps: {
      counters: [
        { icon: "Briefcase", number: 385, suffix: "+", label: "Projects Completed" },
        { icon: "Globe", number: 30, suffix: "+", label: "Locations" },
        { icon: "Users", number: 200, suffix: "+", label: "Happy Clients" },
        { icon: "Award", number: 15, suffix: "+", label: "Awards Won" },
      ],
      backgroundColor: "#1A202C",
      textColor: "#ffffff",
    },
    fields: [
      {
        name: "counters",
        label: "Counters",
        type: "array",
        fields: [
          { name: "icon", label: "Icon", type: "icon" },
          { name: "number", label: "Number", type: "number", required: true },
          { name: "suffix", label: "Suffix (+, %, etc.)", type: "text" },
          { name: "label", label: "Label", type: "text", required: true },
        ],
      },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "textColor", label: "Text Color", type: "color" },
    ],
  },

  // ── About Split ──
  {
    type: "about-split",
    label: "About Section",
    icon: User,
    group: "content",
    component: AboutSplitBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "About Our Company",
      subtitle: "Who We Are",
      description: "With over 20 years of experience, we have established ourselves as a leader in the industry. Our commitment to quality and innovation drives everything we do, from initial design to final delivery.",
      imageUrl: PLACEHOLDER_IMAGES.about,
      imagePosition: "left",
      skills: [
        { label: "Construction", percentage: 90 },
        { label: "Architecture", percentage: 85 },
        { label: "Engineering", percentage: 95 },
        { label: "Interior Design", percentage: 80 },
      ],
      ctaText: "Learn More",
      ctaUrl: "#",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Image URL", type: "image" },
      { name: "imagePosition", label: "Image Position", type: "select", options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ]},
      {
        name: "skills",
        label: "Skill Progress Bars",
        type: "array",
        fields: [
          { name: "label", label: "Skill Name", type: "text", required: true },
          { name: "percentage", label: "Percentage", type: "number", validation: { min: 0, max: 100 } },
        ],
      },
      { name: "ctaText", label: "CTA Text", type: "text" },
      { name: "ctaUrl", label: "CTA URL", type: "url" },
    ],
  },

  // ── Services Grid ──
  {
    type: "services-grid",
    label: "Services Grid",
    icon: LayoutGrid,
    group: "content",
    component: ServicesGridBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Our Services",
      subtitle: "What we offer to our clients",
      services: [
        { icon: "Building2", title: "Architecture Design", description: "Creating innovative architectural designs that blend form and function for modern living.", linkUrl: "#", linkText: "Read More" },
        { icon: "Wrench", title: "Construction Management", description: "Expert management of construction projects from planning through completion.", linkUrl: "#", linkText: "Read More" },
        { icon: "Ruler", title: "Structural Engineering", description: "Providing robust structural solutions for buildings and infrastructure projects.", linkUrl: "#", linkText: "Read More" },
        { icon: "Home", title: "Interior Solutions", description: "Transforming interior spaces with creative design and quality materials.", linkUrl: "#", linkText: "Read More" },
        { icon: "Shield", title: "Safety Consulting", description: "Ensuring workplace safety through comprehensive consulting services.", linkUrl: "#", linkText: "Read More" },
        { icon: "Palette", title: "Renovation Services", description: "Breathing new life into existing structures with modern renovation techniques.", linkUrl: "#", linkText: "Read More" },
      ],
      columns: 3,
      cardStyle: "shadow",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "services",
        label: "Services",
        type: "array",
        fields: [
          { name: "icon", label: "Icon", type: "icon" },
          { name: "title", label: "Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "linkUrl", label: "Link URL", type: "url" },
          { name: "linkText", label: "Link Text", type: "text" },
        ],
      },
      { name: "columns", label: "Columns", type: "select", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
      ]},
      { name: "cardStyle", label: "Card Style", type: "select", options: [
        { label: "Shadow", value: "shadow" },
        { label: "Bordered", value: "bordered" },
        { label: "Flat", value: "flat" },
      ]},
    ],
  },

  // ── Team ──
  {
    type: "team",
    label: "Team Section",
    icon: Users,
    group: "social-proof",
    component: TeamBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Meet the Team",
      subtitle: "The people behind our success",
      members: [
        { name: "John Smith", role: "CEO & Founder", photoUrl: PLACEHOLDER_IMAGES.team1, bio: "", twitterUrl: "#", linkedinUrl: "#", emailUrl: "" },
        { name: "Sarah Johnson", role: "Lead Architect", photoUrl: PLACEHOLDER_IMAGES.team2, bio: "", twitterUrl: "#", linkedinUrl: "#", emailUrl: "" },
        { name: "Mike Williams", role: "Project Manager", photoUrl: PLACEHOLDER_IMAGES.team3, bio: "", twitterUrl: "#", linkedinUrl: "#", emailUrl: "" },
        { name: "Emma Davis", role: "Design Director", photoUrl: PLACEHOLDER_IMAGES.team4, bio: "", twitterUrl: "#", linkedinUrl: "#", emailUrl: "" },
      ],
      columns: 4,
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "members",
        label: "Team Members",
        type: "array",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "role", label: "Role", type: "text" },
          { name: "photoUrl", label: "Photo URL", type: "image" },
          { name: "bio", label: "Bio", type: "textarea" },
          { name: "twitterUrl", label: "Twitter URL", type: "url" },
          { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
          { name: "emailUrl", label: "Email", type: "text" },
        ],
      },
      { name: "columns", label: "Columns", type: "select", options: [
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },

  // ── Testimonials ──
  {
    type: "testimonials",
    label: "Testimonials",
    icon: Quote,
    group: "social-proof",
    component: TestimonialsBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "What Clients Say",
      subtitle: "Testimonials from our valued clients",
      testimonials: [
        { quote: "Outstanding quality and professionalism. They delivered our project on time and exceeded our expectations.", clientName: "David Brown", clientRole: "CEO, TechCorp", clientPhoto: PLACEHOLDER_IMAGES.avatar },
        { quote: "The team was incredible to work with. Their attention to detail and commitment to excellence is unmatched.", clientName: "Lisa Chen", clientRole: "Director, InnovateCo", clientPhoto: PLACEHOLDER_IMAGES.avatar },
        { quote: "We have worked with many firms over the years, and none compare to the level of service we received here.", clientName: "James Wilson", clientRole: "Manager, BuildRight", clientPhoto: PLACEHOLDER_IMAGES.avatar },
      ],
      autoplay: false,
      backgroundColor: "#F7FAFC",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "testimonials",
        label: "Testimonials",
        type: "array",
        fields: [
          { name: "quote", label: "Quote", type: "textarea", required: true },
          { name: "clientName", label: "Client Name", type: "text", required: true },
          { name: "clientRole", label: "Client Role", type: "text" },
          { name: "clientPhoto", label: "Client Photo URL", type: "image" },
        ],
      },
      { name: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },

  // ── Blog Grid ──
  {
    type: "blog-grid",
    label: "Blog Grid",
    icon: Newspaper,
    group: "social-proof",
    component: BlogGridBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Latest News",
      subtitle: "Stay updated with our latest articles and insights",
      posts: [
        { title: "The Future of Sustainable Architecture", excerpt: "Exploring how green building practices are shaping the future of construction and design.", imageUrl: PLACEHOLDER_IMAGES.blog1, date: "Jan 15, 2026", author: "John Smith", linkUrl: "#" },
        { title: "5 Trends in Modern Interior Design", excerpt: "Discover the latest trends that are transforming interior spaces around the world.", imageUrl: PLACEHOLDER_IMAGES.blog2, date: "Jan 10, 2026", author: "Sarah Johnson", linkUrl: "#" },
        { title: "How Technology is Changing Construction", excerpt: "From drones to AI, technology is revolutionizing the construction industry.", imageUrl: PLACEHOLDER_IMAGES.blog3, date: "Jan 5, 2026", author: "Mike Williams", linkUrl: "#" },
      ],
      columns: 3,
      showDate: true,
      showAuthor: true,
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      {
        name: "posts",
        label: "Blog Posts",
        type: "array",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "image" },
          { name: "date", label: "Date", type: "text" },
          { name: "author", label: "Author", type: "text" },
          { name: "linkUrl", label: "Link URL", type: "url" },
        ],
      },
      { name: "columns", label: "Columns", type: "select", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
      ]},
      { name: "showDate", label: "Show Date", type: "boolean" },
      { name: "showAuthor", label: "Show Author", type: "boolean" },
    ],
  },

  // ── Contact ──
  {
    type: "contact",
    label: "Contact Section",
    icon: Mail,
    group: "contact",
    component: ContactBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Get In Touch",
      subtitle: "We would love to hear from you",
      mapEmbedUrl: "",
      showMap: true,
      mapPosition: "left",
      submitText: "Send Message",
      email: "info@example.com",
      phone: "+1 234 567 890",
      address: "123 Main Street, City, Country",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "showMap", label: "Show Map", type: "boolean" },
      { name: "mapEmbedUrl", label: "Map Embed URL", type: "url", placeholder: "Google Maps embed URL" },
      { name: "mapPosition", label: "Map Position", type: "select", options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ]},
      { name: "submitText", label: "Submit Button Text", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "address", label: "Address", type: "text" },
    ],
  },

  // ── Footer ──
  {
    type: "footer",
    label: "Footer",
    icon: PanelBottom,
    group: "layout",
    component: FooterBlock as ComponentDefinition["component"],
    constraints: { position: "bottom" },
    defaultProps: {
      aboutText: "We are dedicated to delivering excellence and innovation in every project we undertake.",
      columns: [
        {
          heading: "Quick Links",
          links: [
            { label: "Home", url: "#" },
            { label: "About Us", url: "#about" },
            { label: "Services", url: "#services" },
            { label: "Projects", url: "#projects" },
            { label: "Contact", url: "#contact" },
          ],
        },
        {
          heading: "Our Services",
          links: [
            { label: "Architecture", url: "#" },
            { label: "Construction", url: "#" },
            { label: "Engineering", url: "#" },
            { label: "Interior Design", url: "#" },
          ],
        },
      ],
      newsletterEnabled: true,
      newsletterHeading: "Newsletter",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        facebook: "#",
        instagram: "#",
      },
      backgroundColor: "#1A202C",
    },
    fields: [
      { name: "aboutText", label: "About Text", type: "textarea" },
      {
        name: "columns",
        label: "Link Columns",
        type: "array",
        fields: [
          { name: "heading", label: "Column Heading", type: "text", required: true },
          {
            name: "links",
            label: "Links",
            type: "array",
            fields: [
              { name: "label", label: "Label", type: "text", required: true },
              { name: "url", label: "URL", type: "url" },
            ],
          },
        ],
      },
      { name: "newsletterEnabled", label: "Show Newsletter", type: "boolean" },
      { name: "newsletterHeading", label: "Newsletter Heading", type: "text" },
      { name: "socialLinks", label: "Social Links", type: "group", fields: [
        { name: "twitter", label: "Twitter URL", type: "url" },
        { name: "linkedin", label: "LinkedIn URL", type: "url" },
        { name: "facebook", label: "Facebook URL", type: "url" },
        { name: "instagram", label: "Instagram URL", type: "url" },
      ]},
      { name: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },

  // ── Copyright Bar ──
  {
    type: "copyright-bar",
    label: "Copyright Bar",
    icon: Copyright,
    group: "layout",
    component: CopyrightBarBlock as ComponentDefinition["component"],
    constraints: { maxInstances: 1, position: "bottom" },
    defaultProps: {
      text: `© ${new Date().getFullYear()} Company. All rights reserved.`,
      backgroundColor: "#111827",
      textColor: "#9CA3AF",
      links: [
        { label: "Privacy Policy", url: "#" },
        { label: "Terms of Service", url: "#" },
      ],
    },
    fields: [
      { name: "text", label: "Copyright Text", type: "text" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "textColor", label: "Text Color", type: "color" },
      {
        name: "links",
        label: "Links",
        type: "array",
        fields: [
          { name: "label", label: "Label", type: "text", required: true },
          { name: "url", label: "URL", type: "url" },
        ],
      },
    ],
  },

  // ── Section Heading ──
  {
    type: "section-heading",
    label: "Section Heading",
    icon: Type,
    group: "layout",
    component: SectionHeadingBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Section Title",
      subtitle: "A brief description for this section",
      alignment: "center",
      showUnderline: true,
      underlineColor: "",
    },
    fields: [
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "alignment", label: "Alignment", type: "select", options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ]},
      { name: "showUnderline", label: "Show Underline", type: "boolean" },
      { name: "underlineColor", label: "Underline Color", type: "color" },
    ],
  },

  // ── CTA Banner ──
  {
    type: "cta-banner",
    label: "CTA Banner",
    icon: Megaphone,
    group: "hero",
    component: CtaBannerBlock as ComponentDefinition["component"],
    defaultProps: {
      heading: "Ready to Start Your Project?",
      description: "Contact us today and let's discuss how we can bring your vision to life.",
      ctaText: "Contact Us",
      ctaUrl: "#contact",
      backgroundColor: "#E53E3E",
      textColor: "#ffffff",
      backgroundImageUrl: "",
      overlayOpacity: 0.7,
    },
    fields: [
      { name: "heading", label: "Heading", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "ctaText", label: "Button Text", type: "text" },
      { name: "ctaUrl", label: "Button URL", type: "url" },
      { name: "backgroundColor", label: "Background Color", type: "color" },
      { name: "textColor", label: "Text Color", type: "color" },
      { name: "backgroundImageUrl", label: "Background Image URL", type: "image" },
      { name: "overlayOpacity", label: "Overlay Opacity", type: "number", validation: { min: 0, max: 1 } },
    ],
  },

  // ── Divider ──
  {
    type: "divider",
    label: "Divider / Spacer",
    icon: Minus,
    group: "layout",
    component: DividerBlock as ComponentDefinition["component"],
    defaultProps: {
      height: 40,
      style: "none",
      lineColor: "#E2E8F0",
      maxWidth: 100,
    },
    fields: [
      { name: "height", label: "Height (px)", type: "number", validation: { min: 8, max: 200 } },
      { name: "style", label: "Line Style", type: "select", options: [
        { label: "None (Spacer)", value: "none" },
        { label: "Solid Line", value: "line" },
        { label: "Dashed", value: "dashed" },
        { label: "Dotted", value: "dotted" },
      ]},
      { name: "lineColor", label: "Line Color", type: "color" },
      { name: "maxWidth", label: "Max Width (%)", type: "number", validation: { min: 10, max: 100 } },
    ],
  },
];

// Build the registry map
export const componentRegistry = new Map<string, ComponentDefinition>();
for (const def of definitions) {
  componentRegistry.set(def.type, def);
}

export const allComponentDefinitions = definitions;
