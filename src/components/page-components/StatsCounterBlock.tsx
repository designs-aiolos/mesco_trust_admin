"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";

interface Counter {
  icon: string;
  number: number;
  suffix: string;
  label: string;
}

interface StatsCounterBlockProps {
  counters?: Counter[];
  backgroundColor?: string;
  textColor?: string;
  backgroundImageUrl?: string;
  overlayOpacity?: number;
  [key: string]: unknown;
}

function getIcon(name: string) {
  const IconComp = (Icons as Record<string, unknown>)[name] as
    | React.ComponentType<{ size?: number; className?: string }>
    | undefined;
  return IconComp || Icons.Hash;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsCounterBlock({
  counters = [],
  backgroundColor = "#1A202C",
  textColor = "#ffffff",
  backgroundImageUrl = "",
  overlayOpacity = 0.85,
}: StatsCounterBlockProps) {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      {backgroundImageUrl ? (
        <>
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
          <div className="absolute inset-0" style={{ backgroundColor, opacity: overlayOpacity }} />
        </>
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor }} />
      )}
      <div className="relative z-10 max-w-7xl mx-auto" style={{ color: textColor }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {counters.map((counter, i) => {
            const IconComp = getIcon(counter.icon);
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <IconComp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-80" />
                </div>
                <AnimatedCounter target={counter.number} suffix={counter.suffix} />
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm opacity-70 uppercase tracking-wider font-medium">
                  {counter.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
