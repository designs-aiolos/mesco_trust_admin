"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  clientName: string;
  clientRole: string;
  clientPhoto: string;
}

interface TestimonialsBlockProps {
  heading?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  autoplay?: boolean;
  backgroundColor?: string;
  [key: string]: unknown;
}

export default function TestimonialsBlock({
  heading = "What Clients Say",
  subtitle = "Testimonials from our valued clients",
  testimonials = [],
  backgroundColor = "#F7FAFC",
}: TestimonialsBlockProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  if (testimonials.length === 0) {
    return (
      <section className="py-12 sm:py-16 px-4" style={{ backgroundColor }}>
        <div className="text-center text-gray-400">Add testimonials to display</div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4" style={{ backgroundColor }}>
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
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 px-2 sm:px-4">
                  <div className="text-center">
                    <Quote className="mx-auto mb-4 sm:mb-6 opacity-20 w-8 h-8 sm:w-10 sm:h-10" style={{ color: "var(--color-primary, #E53E3E)" }} />
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6 sm:mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      {t.clientPhoto && (
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cover bg-center border-2"
                          style={{ backgroundImage: `url(${t.clientPhoto})`, borderColor: "var(--color-primary, #E53E3E)" }}
                        />
                      )}
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-bold text-gray-900">{t.clientName}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{t.clientRole}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {testimonials.length > 1 && (
            <>
              <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all"
                  style={{ backgroundColor: i === selectedIndex ? "var(--color-primary, #E53E3E)" : "#CBD5E0" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
