"use client";

interface BlogPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  linkUrl: string;
}

interface BlogGridBlockProps {
  heading?: string;
  subtitle?: string;
  posts?: BlogPost[];
  columns?: number;
  showDate?: boolean;
  showAuthor?: boolean;
  [key: string]: unknown;
}

export default function BlogGridBlock({
  heading = "Latest News",
  subtitle = "Stay updated with our latest articles",
  posts = [],
  columns = 3,
  showDate = true,
  showAuthor = true,
}: BlogGridBlockProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3";

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
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
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden aspect-[16/10]">
                {post.imageUrl ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${post.imageUrl})` }} />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
                {showDate && post.date && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 text-white text-[10px] sm:text-xs font-medium rounded" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}>
                    {post.date}
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 md:p-6">
                {showAuthor && post.author && (
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">By {post.author}</p>
                )}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3 mb-3 sm:mb-4">{post.excerpt}</p>
                <a href={post.linkUrl || "#"} className="text-xs sm:text-sm font-semibold transition-colors hover:underline" style={{ color: "var(--color-primary, #E53E3E)" }}>
                  Read More &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
