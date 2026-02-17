"use client";

interface SectionHeadingBlockProps {
  heading?: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  showUnderline?: boolean;
  underlineColor?: string;
  [key: string]: unknown;
}

export default function SectionHeadingBlock({
  heading = "Section Title",
  subtitle = "",
  alignment = "center",
  showUnderline = true,
  underlineColor = "",
}: SectionHeadingBlockProps) {
  const alignClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";
  const underlineAlign = alignment === "left" ? "mr-auto" : alignment === "right" ? "ml-auto" : "mx-auto";

  return (
    <div className={`py-6 sm:py-8 px-4 ${alignClass}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">{heading}</h2>
        {subtitle && (
          <p
            className="text-sm sm:text-base text-gray-500 mt-2 max-w-2xl"
            style={{
              marginLeft: alignment === "center" ? "auto" : undefined,
              marginRight: alignment === "center" ? "auto" : undefined,
            }}
          >
            {subtitle}
          </p>
        )}
        {showUnderline && (
          <div
            className={`w-16 h-1 mt-3 ${underlineAlign}`}
            style={{ backgroundColor: underlineColor || "var(--color-primary, #E53E3E)" }}
          />
        )}
      </div>
    </div>
  );
}
