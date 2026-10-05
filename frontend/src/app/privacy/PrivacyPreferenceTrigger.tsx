"use client";

import React from "react";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export function PrivacyPreferenceTrigger({
  label = "Manage Cookie Preferences",
}: {
  label?: string;
}) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand text-white font-medium text-sm rounded-lg hover:bg-brand-700 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-brand"
    >
      <svg
        className="w-4 h-4 fill-none stroke-current stroke-2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M7.5 15.5v.01" />
        <path d="M12 12v.01" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
