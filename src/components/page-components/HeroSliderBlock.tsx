"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  imageUrl: string;
  alt: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaUrl: string;
}

interface HeroSliderBlockProps {
  slides?: Slide[];
  autoplay?: boolean;
  interval?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  showDots?: boolean;
  showArrows?: boolean;
  [key: string]: unknown;
}

export default function HeroSliderBlock({
  slides = [],
  autoplay = true,
  interval = 5000,
  overlayColor = "#000000",
  overlayOpacity = 0.55,
  showDots = true,
  showArrows = true,
}: HeroSliderBlockProps) {
  const plugins = autoplay
    ? [Autoplay({ delay: interval, stopOnInteraction: false })]
    : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-800 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Add slides to your hero section</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
              <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${slide.imageUrl})` }} />
              <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
                {slide.subheading && (
                  <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-white/80 mb-2 md:mb-4 font-medium">
                    {slide.subheading}
                  </p>
                )}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 md:mb-6 max-w-5xl leading-tight">
                  {slide.heading}
                </h1>
                <div className="w-12 md:w-20 h-1 mb-4 md:mb-8" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }} />
                {slide.ctaText && (
                  <a href={slide.ctaUrl || "#"} className="px-5 sm:px-7 md:px-10 py-2 sm:py-2.5 md:py-3.5 text-white font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider rounded transition-all hover:brightness-110" style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}>
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button onClick={scrollPrev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white transition-all">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button onClick={scrollNext} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white transition-all">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} className={`rounded-full transition-all ${i === selectedIndex ? "w-7 sm:w-8 h-2 sm:h-2.5" : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70"}`} style={i === selectedIndex ? { backgroundColor: "var(--color-primary, #E53E3E)" } : {}} />
          ))}
        </div>
      )}
    </div>
  );
}
