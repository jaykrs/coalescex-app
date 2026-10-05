"use client";

import React, { useState, useEffect } from "react";
import { useCookieConsent } from "@/lib/cookie-consent-context";
import { COOKIE_CATEGORIES } from "@/lib/cookie-consent-config";
import { CookieCategoryKey } from "@/types/cookie-consent";

export function CookiePreferencesModal() {
  const {
    isPreferencesOpen,
    preferences,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();

  // Local state for toggles while in modal
  const [formData, setFormData] = useState({
    functional: true,
    analytics: true,
    marketing: true,
  });

  const [expandedCategory, setExpandedCategory] = useState<string | null>("marketing");

  // Sync state when modal opens
  useEffect(() => {
    if (isPreferencesOpen) {
      setFormData({
        functional: preferences ? preferences.functional : true,
        analytics: preferences ? preferences.analytics : true,
        marketing: preferences ? preferences.marketing : true,
      });
    }
  }, [isPreferencesOpen, preferences]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreferencesOpen) {
        closePreferences();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreferencesOpen, closePreferences]);

  if (!isPreferencesOpen) return null;

  const handleToggle = (key: CookieCategoryKey) => {
    if (key === "necessary") return; // strictly necessary cannot be toggled
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    savePreferences(formData);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div
        className="relative bg-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-line flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-line bg-paper/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand shrink-0">
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-2"
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
            <div>
              <h2 id="cookie-modal-title" className="text-lg font-bold text-ink">
                Cookie & Marketing Preferences
              </h2>
              <p className="text-xs text-muted">
                Control which cookies and data tracking tags you wish to allow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closePreferences}
            className="p-2 text-muted hover:text-ink rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-4 space-y-4 text-sm divide-y divide-line/60">
          <div className="bg-brand-50/60 border border-brand-100/80 rounded-xl p-3.5 text-xs text-brand-700 leading-relaxed">
            <strong className="font-semibold text-brand">Your Privacy Rights:</strong> Under data
            protection and marketing privacy laws (such as GDPR & ePrivacy), you have full control
            over whether marketing pixels, advertising identifiers, and analytical cookies are placed
            on your device. You can update these settings at any time.
          </div>

          {COOKIE_CATEGORIES.map((cat) => {
            const isNecessary = cat.id === "necessary";
            const isMarketing = cat.id === "marketing";
            const isEnabled = isNecessary ? true : formData[cat.id as keyof typeof formData];
            const isExpanded = expandedCategory === cat.id;

            return (
              <div key={cat.id} className="pt-4 first:pt-0 space-y-2.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 pr-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink text-sm sm:text-base">
                        {cat.title}
                      </span>
                      {isNecessary ? (
                        <span className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full border border-neutral-200">
                          Always Active
                        </span>
                      ) : isMarketing ? (
                        <span className="text-[11px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                          Personalized Ads & Offers
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{cat.shortDesc}</p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="shrink-0 pt-1">
                    {isNecessary ? (
                      <span className="text-xs font-semibold text-brand px-2 py-1 bg-brand-50 rounded">
                        Required
                      </span>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEnabled}
                        onClick={() => handleToggle(cat.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
                          isEnabled ? "bg-brand" : "bg-neutral-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Collapsible Details */}
                <div className="text-xs">
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="text-brand hover:underline font-medium inline-flex items-center gap-1 py-1"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Details & Cookies"}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3 bg-paper rounded-lg border border-line space-y-3">
                      <p className="text-muted leading-relaxed">{cat.fullDesc}</p>

                      {cat.marketingNote && (
                        <div className="flex items-center gap-2 text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200">
                          <svg
                            className="w-4 h-4 text-amber-600 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{cat.marketingNote}</span>
                        </div>
                      )}

                      {cat.sampleCookies.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-semibold text-ink uppercase tracking-wider block">
                            Examples of cookies used:
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-[11px] text-muted border-collapse">
                              <thead>
                                <tr className="border-b border-line text-ink">
                                  <th className="py-1 pr-2">Cookie</th>
                                  <th className="py-1 px-2">Provider</th>
                                  <th className="py-1 px-2">Purpose</th>
                                  <th className="py-1 pl-2">Expiry</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-line/40">
                                {cat.sampleCookies.map((c, i) => (
                                  <tr key={i} className="hover:bg-surface/50">
                                    <td className="py-1.5 pr-2 font-mono text-ink font-medium">
                                      {c.name}
                                    </td>
                                    <td className="py-1.5 px-2">{c.provider}</td>
                                    <td className="py-1.5 px-2">{c.purpose}</td>
                                    <td className="py-1.5 pl-2 whitespace-nowrap">{c.expiry}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 border-t border-line bg-paper/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-ink hover:text-danger hover:bg-neutral-100 rounded-lg transition-colors border border-line"
          >
            Reject Non-Essential
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-brand bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-lg shadow-sm transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
