"use client";

interface CtaBannerBlockProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  backgroundImageUrl?: string;
  overlayOpacity?: number;
  [key: string]: unknown;
}

export default function CtaBannerBlock({
  heading = "Ready to Get Started?",
  description = "Contact us today and let's discuss your next project.",
  ctaText = "Contact Us",
  ctaUrl = "#",
  backgroundColor = "#E53E3E",
  textColor = "#ffffff",
  backgroundImageUrl = "",
  overlayOpacity = 0.7,
}: CtaBannerBlockProps) {
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
      <div className="relative z-10 max-w-4xl mx-auto text-center" style={{ color: textColor }}>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4">{heading}</h2>
        {description && (
          <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">{description}</p>
        )}
        {ctaText && (
          <a
            href={ctaUrl}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white font-bold text-sm sm:text-base rounded transition-all hover:shadow-lg uppercase tracking-wide"
            style={{ color: backgroundColor }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
