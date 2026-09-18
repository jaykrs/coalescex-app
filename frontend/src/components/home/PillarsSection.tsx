import React from "react";
import Image from "next/image";
import { PILLARS_OF_EXCELLENCE } from "@/data/home-data";

export function PillarsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-150">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 mb-3.5 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b58342]">
              Academic & Career Disciplines
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Our Pillars of Excellence
          </h2>
          <div className="w-16 h-1 bg-[#cc9955] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Alternating Blocks */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {PILLARS_OF_EXCELLENCE.map((pillar, idx) => {
            const isImageLeft = pillar.imagePosition === "left";
            const pillarNumber = `0${idx + 1}`;

            return (
              <div
                key={pillar.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center"
              >
                {/* Image Column */}
                <div
                  className={`relative h-60 sm:h-80 md:h-96 lg:h-105 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100 ring-1 ring-black/5 group ${
                    isImageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-40" />
                </div>

                {/* Content Column */}
                <div
                  className={`space-y-5 ${
                    isImageLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* Pillar Index Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-widest">
                    <span>Pillar {pillarNumber}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight tracking-tight">
                    {pillar.title}
                  </h3>

                  {pillar.tagline && (
                    <div className="text-sm sm:text-base font-semibold text-[#b58342] italic">
                      {pillar.tagline}
                    </div>
                  )}

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  {pillar.bulletGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2.5 pt-2">
                      {group.heading && (
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
                          {group.heading}
                        </h4>
                      )}
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-amber-100 text-[#b58342] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {pillar.closingTagline && (
                    <div className="pt-3">
                      <div className="inline-block px-3.5 py-1.5 rounded-lg bg-amber-50/80 border-l-3 border-[#cc9955] text-xs sm:text-sm font-semibold text-gray-900">
                        {pillar.closingTagline}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-24 h-0.5 bg-[#cc9955] mx-auto mt-20" />
      </div>
    </section>
  );
}
