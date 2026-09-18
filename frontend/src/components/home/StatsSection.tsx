import React from "react";
import { STATS_ITEMS } from "@/data/home-data";

// Helper for Stats section icons with modern styling
function StatIcon({ type }: { type: string }) {
  switch (type) {
    case "city":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 3.39L18.42 9 12 12.49 5.58 9 12 6.39zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      );
    case "courses":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1v14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
        </svg>
      );
    case "partners":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      );
    case "students":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );
    case "hours":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      );
    case "trainers":
      return (
        <svg className="w-7 h-7 text-[#eb9a00]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
      );
    default:
      return null;
  }
}

export function StatsSection() {
  return (
    <section
      className="relative py-14 sm:py-20 text-white bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/home/stats-bg.jpg')",
      }}
    >
      {/* Deep gradient overlay for rich contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0b0d13]/95 via-[#0e1017]/90 to-[#0b0d13]/95 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Global Leader in Professional Training Courses
          </h2>
          <div className="w-16 h-1 bg-[#eb9a00] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-6">
          {STATS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center text-center p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-black/[0.50] hover:bg-black/[0.70] border border-white/10 hover:border-amber-400/40 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Container with subtle amber glow */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                <StatIcon type={item.iconType} />
              </div>

              {/* Stat Value */}
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#eb9a00] tracking-tight">
                {item.value}
              </div>

              {/* Title */}
              <div className="text-[11px] sm:text-xs md:text-sm text-gray-300 font-medium mt-1.5 sm:mt-2 leading-snug">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
