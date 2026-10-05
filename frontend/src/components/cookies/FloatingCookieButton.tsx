"use client";

import React, { useState } from "react";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export function FloatingCookieButton() {
  const { hasDecided, showBanner, openPreferences, preferences } = useCookieConsent();
  const [isHovered, setIsHovered] = useState(false);

  // Only display the floating trigger once the user has made their initial decision and banner is hidden
  if (!hasDecided || showBanner) return null;

  const isMarketingAllowed = preferences?.marketing;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        type="button"
        onClick={openPreferences}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2 bg-surface text-ink hover:text-brand border border-line shadow-lg hover:shadow-xl rounded-full p-2.5 sm:px-3 sm:py-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand"
        aria-label="Manage cookie and marketing preferences"
        title="Cookie & Marketing Preferences"
      >
        {/* Cookie SVG Icon */}
        <div className="relative">
          <svg
            className="w-5 h-5 fill-none stroke-current stroke-2 text-brand transition-transform group-hover:rotate-12"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M7.5 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M16 16v.01" />
          </svg>
          {isMarketingAllowed && (
            <span
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-surface"
              title="Marketing cookies enabled"
            />
          )}
        </div>

        {/* Text visible on desktop or hover */}
        <span className="hidden sm:inline-block text-xs font-medium text-ink group-hover:text-brand transition-colors">
          Cookies
        </span>

        {/* Mobile floating tooltip */}
        {isHovered && (
          <span className="sm:hidden absolute left-full ml-2 px-2.5 py-1 bg-ink text-surface text-[11px] rounded whitespace-nowrap shadow-md">
            Cookie Settings
          </span>
        )}
      </button>
    </div>
  );
}
