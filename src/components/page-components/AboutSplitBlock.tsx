"use client";

import { useEffect, useRef, useState } from "react";

interface Skill {
  label: string;
  percentage: number;
}

interface AboutSplitBlockProps {
  heading?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imagePosition?: "left" | "right";
  skills?: Skill[];
  ctaText?: string;
  ctaUrl?: string;
  [key: string]: unknown;
}

function ProgressBar({ label, percentage }: { label: string; percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(percentage); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={ref} className="mb-3 sm:mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs sm:text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs sm:text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: "var(--color-primary, #E53E3E)" }}
        />
      </div>
    </div>
  );
}

export default function AboutSplitBlock({
  heading = "About Our Company",
  subtitle = "Who We Are",
  description = "We are a leading company committed to delivering excellence in every project. With decades of experience, our team brings innovative solutions.",
  imageUrl = "",
  imagePosition = "left",
  skills = [],
  ctaText = "Learn More",
  ctaUrl = "#",
}: AboutSplitBlockProps) {
  const imageContent = (
    <div className="relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-auto md:h-full md:min-h-[350px]">
      {imageUrl ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Add an image</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }} />
    </div>
  );

  const textContent = (
    <div className="py-2 md:py-4">
      {subtitle && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-primary, #E53E3E)" }}>
          {subtitle}
        </p>
      )}
      {heading && (
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">{heading}</h2>
      )}
      {description && (
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">{description}</p>
      )}
      {skills.length > 0 && (
        <div className="mb-4 sm:mb-6">
          {skills.map((skill, i) => (
            <ProgressBar key={i} label={skill.label} percentage={skill.percentage} />
          ))}
        </div>
      )}
      {ctaText && (
        <a
          href={ctaUrl}
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-bold rounded transition-opacity hover:opacity-90 uppercase tracking-wide"
          style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
        >
          {ctaText}
        </a>
      )}
    </div>
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {imagePosition === "left" ? <>{imageContent}{textContent}</> : <>{textContent}{imageContent}</>}
        </div>
      </div>
    </section>
  );
}
