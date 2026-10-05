"use client";

import React from "react";
import Link from "next/link";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
    >
      <div className="max-w-6xl mx-auto bg-surface/95 backdrop-blur-md border border-line shadow-2xl rounded-xl p-5 sm:p-6 text-ink">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          {/* Left Text / Info Area */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand">
              {/* Cookie SVG Icon */}
              <svg
                className="w-6 h-6 fill-none stroke-current stroke-2"
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
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-ink">
                  We respect your privacy & cookie choices
                </h3>
                <span className="text-[11px] font-medium bg-brand-50 text-brand px-2 py-0.5 rounded-full border border-brand-100">
                  GDPR & Marketing Compliant
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
                We use essential cookies to ensure our learning platform operates securely. With
                your consent, we also use{" "}
                <span className="font-semibold text-ink">marketing & analytics cookies</span> to
                personalize course recommendations, measure our advertising campaigns (such as
                Google Ads & Meta Pixel), and enhance your learning experience. Read our{" "}
                <Link
                  href="/privacy"
                  className="text-brand hover:underline font-medium focus-visible:outline-none"
                >
                  Privacy Policy
                </Link>{" "}
                to learn more.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-line">
            <button
              type="button"
              onClick={openPreferences}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-ink bg-paper hover:bg-neutral-200 border border-line rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <svg
                className="w-4 h-4 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span>Preferences</span>
            </button>

            <button
              type="button"
              onClick={rejectNonEssential}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-ink hover:text-danger bg-surface hover:bg-neutral-50 border border-line rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-danger"
            >
              Reject Non-Essential
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-lg shadow-sm transition-all transform active:scale-95 focus-visible:ring-2 focus-visible:ring-brand"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
