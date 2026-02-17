"use client";

import * as Icons from "lucide-react";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
}

interface ServicesGridBlockProps {
  heading?: string;
  subtitle?: string;
  services?: ServiceItem[];
  columns?: number;
  cardStyle?: "bordered" | "shadow" | "flat";
  [key: string]: unknown;
}

function getIcon(name: string) {
  const IconComp = (Icons as Record<string, unknown>)[name] as
    | React.ComponentType<{ size?: number; className?: string }>
    | undefined;
  return IconComp || Icons.Wrench;
}

export default function ServicesGridBlock({
  heading = "Our Services",
  subtitle = "What we offer",
  services = [],
  columns = 3,
  cardStyle = "shadow",
}: ServicesGridBlockProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3";
  const cardClass =
    cardStyle === "bordered"
      ? "border-2 border-gray-200 hover:border-[var(--color-primary,#E53E3E)]"
      : cardStyle === "shadow"
        ? "shadow-md hover:shadow-xl"
        : "hover:bg-gray-50";

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {(heading || subtitle) && (
          <div className="text-center mb-8 sm:mb-12">
            {heading && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{heading}</h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
            )}
            <div className="w-16 h-1 mx-auto mt-4" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }} />
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-6 md:gap-8`}>
          {services.map((svc, i) => {
            const IconComp = getIcon(svc.icon);
            return (
              <div key={i} className={`bg-white rounded-lg p-5 sm:p-6 md:p-8 transition-all duration-300 group ${cardClass}`}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white mb-4 sm:mb-5" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}>
                  <IconComp size={22} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">{svc.description}</p>
                {svc.linkText && (
                  <a href={svc.linkUrl || "#"} className="text-xs sm:text-sm font-semibold transition-colors hover:underline" style={{ color: "var(--color-primary, #E53E3E)" }}>
                    {svc.linkText} &rarr;
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
