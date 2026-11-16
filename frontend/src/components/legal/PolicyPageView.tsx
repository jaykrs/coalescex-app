"use client";

import React from "react";
import Link from "next/link";
import { getLegalPage } from "@/data/legal";
import { PrivacyPreferenceTrigger } from "@/app/privacy/PrivacyPreferenceTrigger";

interface PolicyPageViewProps {
  slug: string;
}

export function PolicyPageView({ slug }: PolicyPageViewProps) {
  const page = getLegalPage(slug);

  if (!page) {
    return (
      <div className="bg-[#fcfbf9] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
          <p className="text-3xl">📄</p>
          <h1 className="text-2xl font-bold text-ink">Page Not Found</h1>
          <p className="text-sm text-muted">
            The requested legal policy page could not be located.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isPrivacy = page.slug === "privacy" || page.slug === "privacy-policy";

  const policyTabs = [
    { slug: "privacy", label: "Privacy Policy", href: "/privacy" },
    {
      slug: "payment-protection-policy",
      label: "Payment Protection Policy",
      href: "/payment-protection-policy",
    },
    { slug: "refund-policy", label: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface border border-line rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* TOP TAB NAVIGATION FOR QUICK SWITCHING */}
        <div className="border-b border-line pb-4 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {policyTabs.map((tab) => {
              const isActive =
                page.slug === tab.slug ||
                (page.slug === "privacy-policy" && tab.slug === "privacy") ||
                (page.slug === "payment-policy" && tab.slug === "payment-protection-policy") ||
                (page.slug === "refund" && tab.slug === "refund-policy");

              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-600 text-white shadow-xs font-semibold"
                      : "bg-paper text-muted hover:text-ink hover:bg-line/60 border border-line"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="text-xs font-medium text-muted hover:text-brand-600 underline"
          >
            ← Home
          </Link>
        </div>

        {/* HEADER SECTION */}
        <header className="space-y-3 border-b border-line pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <span>Coalescex Legal Center</span>
            <span>•</span>
            <span>{page.badge || "Verified Platform Policy"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
            {page.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Last Updated: {page.lastUpdated} · Governed by Coalescex (Teqto Education Pvt Ltd)
          </p>
          {page.intro && (
            <p className="pt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
              {page.intro}
            </p>
          )}

          {isPrivacy && (
            <div className="pt-2">
              <PrivacyPreferenceTrigger label="Open Cookie Preference Center" />
            </div>
          )}
        </header>

        {/* POLICY SECTIONS */}
        <div className="space-y-8">
          {page.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-ink font-display">
                {sec.heading}
              </h2>

              {sec.paragraphs &&
                sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm sm:text-base text-gray-700 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="space-y-2 pt-1 pl-4 list-disc text-sm sm:text-base text-gray-700 marker:text-brand-600">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FOOTER CALLOUT / SUPPORT */}
        <div className="border-t border-line pt-8 mt-10 space-y-4 text-xs sm:text-sm text-muted">
          <div className="bg-paper/50 rounded-xl p-4 border border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">Have questions regarding this policy?</p>
              <p className="text-xs text-muted mt-0.5">
                Our student support and compliance officers are here to help.
              </p>
            </div>
            <a
              href="mailto:support@coalescex.com"
              className="rounded-lg bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition shadow-xs text-center whitespace-nowrap"
            >
              Contact Support
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
            <p>© {new Date().getFullYear()} Coalescex. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-brand-600 underline">
                Privacy
              </Link>
              <Link href="/payment-protection-policy" className="hover:text-brand-600 underline">
                Payment Protection
              </Link>
              <Link href="/refund-policy" className="hover:text-brand-600 underline">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyPageView;
