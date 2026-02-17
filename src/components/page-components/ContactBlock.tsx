"use client";

import { Mail, Phone, MapPin } from "lucide-react";

interface ContactBlockProps {
  heading?: string;
  subtitle?: string;
  mapEmbedUrl?: string;
  showMap?: boolean;
  mapPosition?: "left" | "right";
  submitText?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
}

export default function ContactBlock({
  heading = "Get In Touch",
  subtitle = "We would love to hear from you",
  mapEmbedUrl = "",
  showMap = true,
  mapPosition = "left",
  submitText = "Send Message",
  email = "info@example.com",
  phone = "+1 234 567 890",
  address = "123 Main Street, City, Country",
}: ContactBlockProps) {
  const mapContent = showMap && (
    <div className="rounded-lg overflow-hidden h-[250px] sm:h-[300px] md:h-full md:min-h-[400px]">
      {mapEmbedUrl ? (
        <iframe src={mapEmbedUrl} className="w-full h-full border-0" loading="lazy" title="Map" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <MapPin className="text-gray-400 w-10 h-10 sm:w-12 sm:h-12" />
        </div>
      )}
    </div>
  );

  const formContent = (
    <div>
      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input type="text" placeholder="Your Name" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
          <input type="email" placeholder="Your Email" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
        </div>
        <input type="text" placeholder="Subject" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
        <textarea placeholder="Your Message" rows={4} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" />
        <button
          type="button"
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm font-bold rounded-lg transition-opacity hover:opacity-90 uppercase tracking-wide"
          style={{ backgroundColor: "var(--color-primary, #E53E3E)" }}
        >
          {submitText}
        </button>
      </div>
      <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
        {email && (
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary, #E53E3E)" }} />
            {email}
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary, #E53E3E)" }} />
            {phone}
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary, #E53E3E)" }} />
            {address}
          </div>
        )}
      </div>
    </div>
  );

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
        <div className={`grid grid-cols-1 ${showMap ? "md:grid-cols-2" : "max-w-2xl mx-auto"} gap-6 sm:gap-8 md:gap-10`}>
          {showMap ? (
            mapPosition === "left" ? <>{mapContent}{formContent}</> : <>{formContent}{mapContent}</>
          ) : (
            formContent
          )}
        </div>
      </div>
    </section>
  );
}
