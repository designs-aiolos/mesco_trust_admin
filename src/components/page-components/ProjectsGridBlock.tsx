"use client";

import { useState } from "react";

interface Project {
  title: string;
  category: string;
  imageUrl: string;
  linkUrl: string;
}

interface ProjectsGridBlockProps {
  heading?: string;
  subtitle?: string;
  categories?: string[];
  projects?: Project[];
  columns?: number;
  showFilter?: boolean;
  [key: string]: unknown;
}

export default function ProjectsGridBlock({
  heading = "Our Projects",
  subtitle = "Explore our recent works",
  categories = [],
  projects = [],
  columns = 3,
  showFilter = true,
}: ProjectsGridBlockProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const allCategories = ["All", ...categories];
  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "sm:grid-cols-2 md:grid-cols-3";

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
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
        {showFilter && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: "var(--color-primary, #E53E3E)" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-3 sm:gap-4 md:gap-6`}>
          {filtered.map((project, i) => (
            <a
              key={i}
              href={project.linkUrl || "#"}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm sm:text-lg font-bold">{project.title}</h3>
                <span className="text-gray-300 text-xs sm:text-sm mt-1">{project.category}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
