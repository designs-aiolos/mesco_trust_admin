"use client";

import * as Icons from "lucide-react";

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesRowBlockProps {
  heading?: string;
  subtitle?: string;
  services?: Service[];
  columns?: number;
  backgroundColor?: string;
  [key: string]: unknown;
}

function getIcon(name: string) {
  const IconComp = (Icons as Record<string, unknown>)[name] as
    | React.ComponentType<{ size?: number; className?: string }>
    | undefined;
  return IconComp || Icons.Wrench;
}

export default function ServicesRowBlock({
  heading = "What We Do",
  subtitle = "We provide the best services for your needs",
  services = [],
  columns = 4,
  backgroundColor = "#ffffff",
}: ServicesRowBlockProps) {
  const gridCols =
    columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-4";

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto">
        {(heading || subtitle) && (
          <div className="text-center mb-8 sm:mb-12">
            {heading && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
                {heading}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
            )}
            <div className="w-16 h-1 mx-auto mt-4" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }} />
          </div>
        )}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4 sm:gap-6 md:gap-8`}>
          {services.map((svc, i) => {
            const IconComp = getIcon(svc.icon);
            return (
              <div
                key={i}
                className="text-center group p-4 sm:p-6 rounded-lg border-2 border-transparent hover:border-[var(--color-primary,#E53E3E)] hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
                >
                  <IconComp size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{svc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
