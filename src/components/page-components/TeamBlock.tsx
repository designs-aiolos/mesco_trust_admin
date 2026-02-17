"use client";

import { Twitter, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  twitterUrl: string;
  linkedinUrl: string;
  emailUrl: string;
}

interface TeamBlockProps {
  heading?: string;
  subtitle?: string;
  members?: TeamMember[];
  columns?: number;
  [key: string]: unknown;
}

export default function TeamBlock({
  heading = "Meet the Team",
  subtitle = "The people behind our success",
  members = [],
  columns = 4,
}: TeamBlockProps) {
  const gridCols = columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

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
          {members.map((member, i) => (
            <div key={i} className="group text-center">
              <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 aspect-square">
                {member.photoUrl ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${member.photoUrl})` }} />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100">
                  {member.twitterUrl && (
                    <a href={member.twitterUrl} className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[var(--color-primary,#E53E3E)] transition-colors">
                      <Twitter size={14} />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a href={member.linkedinUrl} className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[var(--color-primary,#E53E3E)] transition-colors">
                      <Linkedin size={14} />
                    </a>
                  )}
                  {member.emailUrl && (
                    <a href={`mailto:${member.emailUrl}`} className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-[var(--color-primary,#E53E3E)] transition-colors">
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
