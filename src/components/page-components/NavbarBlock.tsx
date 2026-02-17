"use client";

import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

interface NavLink {
  label: string;
  url: string;
}

interface NavbarBlockProps {
  logoText?: string;
  logoImageUrl?: string;
  navLinks?: NavLink[];
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
  sticky?: boolean;
  showTopBar?: boolean;
  phone?: string;
  email?: string;
  [key: string]: unknown;
}

export default function NavbarBlock({
  logoText = "MESCO",
  navLinks = [],
  ctaText = "Get a Quote",
  ctaUrl = "#",
  backgroundColor = "#1A202C",
  sticky = true,
  showTopBar = true,
  phone = "+1 234 567 890",
  email = "info@mesco.com",
}: NavbarBlockProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`w-full z-50 ${sticky ? "sticky top-0" : "relative"}`}>
      {/* Top bar */}
      {showTopBar && (
        <div className="bg-gray-900 text-gray-400 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
            <div className="flex items-center gap-4">
              {phone && (
                <span className="flex items-center gap-1.5">
                  <Phone size={10} /> {phone}
                </span>
              )}
              {email && (
                <span className="hidden sm:flex items-center gap-1.5">
                  <Mail size={10} /> {email}
                </span>
              )}
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px]">
              <span>Mon - Sat: 8:00 - 18:00</span>
            </div>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-white text-xl md:text-2xl font-extrabold tracking-wider uppercase">
                {logoText}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
                  />
                </a>
              ))}
              {ctaText && (
                <a
                  href={ctaUrl}
                  className="ml-4 px-6 py-2.5 text-sm font-semibold text-white rounded transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
                >
                  {ctaText}
                </a>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-700 space-y-1 pt-2">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="block px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {ctaText && (
                <a
                  href={ctaUrl}
                  className="block mx-3 mt-3 px-4 py-2.5 text-sm font-semibold text-white rounded text-center"
                  style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
                >
                  {ctaText}
                </a>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
