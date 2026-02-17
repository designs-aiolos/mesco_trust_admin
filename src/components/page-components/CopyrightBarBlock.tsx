"use client";

interface CopyrightBarBlockProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  links?: { label: string; url: string }[];
  [key: string]: unknown;
}

export default function CopyrightBarBlock({
  text = "\u00A9 2026 Company. All rights reserved.",
  backgroundColor = "#111827",
  textColor = "#9CA3AF",
  links = [],
}: CopyrightBarBlockProps) {
  return (
    <div className="py-3 sm:py-4 px-4 text-center text-xs sm:text-sm" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        <p>{text}</p>
        {links.length > 0 && (
          <div className="flex gap-3 sm:gap-4">
            {links.map((link, i) => (
              <a key={i} href={link.url} className="hover:text-white transition-colors text-xs sm:text-sm">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
