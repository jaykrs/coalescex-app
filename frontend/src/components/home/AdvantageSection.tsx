import React from "react";
import { ADVANTAGE_ITEMS } from "@/data/home-data";

export function AdvantageSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 mb-3.5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#b58342]">
            Why Choose Us
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Coalescex Advantage
        </h2>
        <div className="w-16 h-1 bg-[#cc9955] mx-auto mt-4 rounded-full" />
      </div>

      {/* 6 Advantage Cards in 3 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {ADVANTAGE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl p-5 sm:p-7 border border-gray-150/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300/80 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Top subtle highlight */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#cc9955] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Authentic SVG icon container */}
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-amber-50/70 border border-amber-100/80 flex items-center justify-center shrink-0 mb-4 sm:mb-5 p-3 sm:p-3.5 text-gray-800 group-hover:scale-105 group-hover:text-[#cc9955] group-hover:bg-amber-100/50 transition-all duration-300">
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-2.5 group-hover:text-[#b58342] transition-colors tracking-tight">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom callout divider badge */}
      <div className="text-center mt-14 pt-8 border-t border-gray-200/80">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#cc9955]" />
          Here are more reasons to choose us
        </span>
      </div>
    </section>
  );
}
