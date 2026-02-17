"use client";

interface DividerBlockProps {
  height?: number;
  style?: "none" | "line" | "dashed" | "dotted";
  lineColor?: string;
  maxWidth?: number;
  [key: string]: unknown;
}

export default function DividerBlock({
  height = 40,
  style = "none",
  lineColor = "#E2E8F0",
  maxWidth = 100,
}: DividerBlockProps) {
  return (
    <div className="flex items-center justify-center px-4" style={{ height: `${height}px` }}>
      {style !== "none" && (
        <hr
          className="border-0"
          style={{
            width: `${maxWidth}%`,
            borderTopWidth: "1px",
            borderTopStyle: style === "dashed" ? "dashed" : style === "dotted" ? "dotted" : "solid",
            borderTopColor: lineColor,
          }}
        />
      )}
    </div>
  );
}
