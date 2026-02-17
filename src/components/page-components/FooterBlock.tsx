"use client";

import { Twitter, Linkedin, Facebook, Instagram, Send } from "lucide-react";

interface FooterLink { label: string; url: string; }
interface FooterColumn { heading: string; links: FooterLink[]; }

interface FooterBlockProps {
  aboutText?: string;
  columns?: FooterColumn[];
  newsletterEnabled?: boolean;
  newsletterHeading?: string;
  socialLinks?: { twitter?: string; linkedin?: string; facebook?: string; instagram?: string };
  backgroundColor?: string;
  [key: string]: unknown;
}

export default function FooterBlock({
  aboutText = "We are dedicated to delivering excellence and innovation.",
  columns = [],
  newsletterEnabled = true,
  newsletterHeading = "Newsletter",
  socialLinks = {},
  backgroundColor = "#1A202C",
}: FooterBlockProps) {
  return (
    <footer style={{ backgroundColor }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About column */}
          <div>
            <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">About Us</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400 mb-3 sm:mb-4">{aboutText}</p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-[var(--color-primary,#E53E3E)] flex items-center justify-center transition-colors">
                  <Twitter size={12} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-[var(--color-primary,#E53E3E)] flex items-center justify-center transition-colors">
                  <Linkedin size={12} />
                </a>
              )}
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-[var(--color-primary,#E53E3E)] flex items-center justify-center transition-colors">
                  <Facebook size={12} />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-[var(--color-primary,#E53E3E)] flex items-center justify-center transition-colors">
                  <Instagram size={12} />
                </a>
              )}
            </div>
          </div>
          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">{col.heading}</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.url} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Newsletter */}
          {newsletterEnabled && (
            <div>
              <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">{newsletterHeading}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Subscribe to get the latest updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-2.5 sm:px-3 py-2 bg-gray-700 border border-gray-600 rounded-l text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none"
                />
                <button
                  className="px-3 sm:px-4 py-2 rounded-r text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
