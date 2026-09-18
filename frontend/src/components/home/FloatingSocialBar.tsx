"use client";

import React from "react";

export function FloatingSocialBar() {
  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col shadow-xl rounded-l-xl overflow-hidden bg-white/95 backdrop-blur-md border-l border-t border-b border-gray-200/80"
      aria-label="Quick contact and social links"
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/?text=Hello%20Coalescex"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] hover:bg-[#20ba59] text-white transition-all duration-200 hover:scale-105"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/coalescex"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit LinkedIn"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#0A66C2] hover:bg-[#084e96] text-white transition-all duration-200 hover:scale-105"
      >
        <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      </a>

      {/* Share / Globe */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: "CoalesceX",
              url: window.location.href,
            }).catch(() => {});
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }
        }}
        aria-label="Share page"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#1e2025] hover:bg-[#2e323b] text-white transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>
    </div>
  );
}
