import React from "react";
import { TESTIMONIAL_BULLETS, TESTIMONIAL_CARDS } from "@/data/home-data";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-[#f9f8f6] via-[#f5f2ec] to-[#eee9e0]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/60 shadow-xs mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b58342]">
              Testimonial
            </span>
          </div>

          <div className="w-12 h-0.5 bg-[#cc9955] mx-auto mt-1 mb-5" />

          {/* Bullet Points List styled as sleek chips */}
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-700 max-w-3xl mx-auto">
            {TESTIMONIAL_BULLETS.map((bullet, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-100 shadow-xs text-xs sm:text-sm font-medium text-gray-700 hover:border-amber-200 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9955] shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3 Testimonial Cards: Left white, Middle dark/featured, Right white */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4 sm:pt-6">
          {TESTIMONIAL_CARDS.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                t.isFeatured
                  ? "bg-linear-to-b from-gray-900 via-[#1a1c22] to-black text-white shadow-2xl border-2 border-[#cc9955]/60 md:-translate-y-2 lg:-translate-y-3 ring-1 ring-white/10"
                  : "bg-white text-gray-800 shadow-sm border border-gray-150/90 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Top featured tag if applicable */}
              {t.isFeatured && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cc9955]/20 border border-[#cc9955]/40 text-[11px] font-semibold text-[#eb9a00] uppercase tracking-wider">
                  Featured Review
                </div>
              )}

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#eb9a00]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote symbol */}
                <div
                  className={`text-3xl font-serif leading-none mb-3 ${
                    t.isFeatured ? "text-[#cc9955]" : "text-gray-700"
                  }`}
                >
                  “
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    t.isFeatured ? "text-gray-500" : "text-gray-800"
                  }`}
                >
                  {t.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div
                className={`mt-6 sm:mt-8 pt-4 sm:pt-5 border-t flex items-center gap-3.5 ${
                  t.isFeatured ? "border-white/10" : "border-gray-800"
                }`}
              >
                {/* Avatar Initials Circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    t.isFeatured
                      ? "bg-linear-to-br from-[#cc9955] to-[#eb9a00] text-gray-950 shadow-md"
                      : "bg-amber-100/70 text-gray-900 border border-amber-200/50"
                  }`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <div
                    className={`font-bold text-sm sm:text-base ${
                      t.isFeatured ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-xs uppercase tracking-wider font-semibold mt-0.5 ${
                      t.isFeatured ? "text-[#eb9a00]" : "text-gray-500"
                    }`}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
