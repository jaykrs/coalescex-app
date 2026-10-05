import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { COOKIE_CATEGORIES } from "@/lib/cookie-consent-config";
import { PrivacyPreferenceTrigger } from "./PrivacyPreferenceTrigger";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Consent | Coalescex",
  description:
    "Learn how Coalescex collects, uses, and safeguards your data, including our policy on strictly necessary, functional, analytics, and marketing cookies.",
  alternates: {
    canonical: "https://coalescex.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fcfbf9] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface border border-line rounded-2xl p-6 sm:p-10 shadow-sm space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-line pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
            <span>Legal & Privacy Compliance</span>
            <span>•</span>
            <span>GDPR & ePrivacy Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
            Privacy & Cookie Policy
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Last Updated: September 2026. This policy explains how Coalescex ("we", "us", or "our")
            uses cookies, tracking tags, and personal data to provide our educational services and
            marketing communications.
          </p>
          <div className="pt-2">
            <PrivacyPreferenceTrigger />
          </div>
        </div>

        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink font-display">1. What Are Cookies?</h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Cookies are small text files placed on your computer or mobile device when you visit our
            website. They are widely used to make websites work efficiently, enhance user navigation,
            remember preferences, and provide reporting information for analytics and targeted
            marketing.
          </p>
        </section>

        {/* Section 2: Marketing & Advertising Cookies */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold text-sm">
              !
            </div>
            <h2 className="text-xl font-bold text-ink font-display">
              2. Marketing & Advertising Cookies (Consent-Based)
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We use marketing and advertising cookies from third-party partners (such as{" "}
            <strong>Google Ads</strong>, <strong>Meta / Facebook Pixel</strong>, and{" "}
            <strong>LinkedIn</strong>) to measure ad campaigns, prevent ad repetition, and present
            you with personalized course offerings aligned with your professional interests.
          </p>
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-sm text-amber-900 space-y-2">
            <p className="font-semibold">Explicit Marketing Consent:</p>
            <p>
              In compliance with data privacy regulations (GDPR, CCPA/CPRA, and ePrivacy), marketing
              and advertising cookies are <strong>only activated after you grant explicit consent</strong>{" "}
              via our Cookie Consent Banner or Preference Center. You can withdraw or adjust your
              marketing consent at any time.
            </p>
          </div>
        </section>

        {/* Section 3: Categories of Cookies We Use */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink font-display">
            3. Cookie Categories Detailed
          </h2>

          <div className="space-y-4">
            {COOKIE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="border border-line rounded-xl p-5 bg-paper/40 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base font-bold text-ink">{cat.title}</h3>
                  {cat.required ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                      Strictly Required
                    </span>
                  ) : cat.id === "marketing" ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Optional (Requires Consent)
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{cat.fullDesc}</p>

                {cat.sampleCookies.length > 0 && (
                  <div className="pt-2 overflow-x-auto">
                    <table className="w-full text-left text-xs text-muted border-collapse">
                      <thead>
                        <tr className="border-b border-line text-ink">
                          <th className="py-1.5 pr-2">Identifier</th>
                          <th className="py-1.5 px-2">Provider</th>
                          <th className="py-1.5 px-2">Purpose</th>
                          <th className="py-1.5 pl-2">Retention</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/40">
                        {cat.sampleCookies.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-1.5 pr-2 font-mono font-medium text-ink">
                              {item.name}
                            </td>
                            <td className="py-1.5 px-2">{item.provider}</td>
                            <td className="py-1.5 px-2">{item.purpose}</td>
                            <td className="py-1.5 pl-2">{item.expiry}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: How to Manage Your Consent */}
        <section className="space-y-4 border-t border-line pt-8">
          <h2 className="text-xl font-bold text-ink font-display">
            4. How to Change Your Cookie Settings
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            You can change your consent preferences at any time by clicking the{" "}
            <strong>"Cookies Preference Center"</strong> in the website footer or using the floating
            cookie icon in the lower-left corner of the screen. Alternatively, you can configure your
            web browser to block or alert you about cookies.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <PrivacyPreferenceTrigger label="Open Cookie Preference Center" />
            <Link
              href="/courses"
              className="text-sm text-muted hover:text-brand underline font-medium"
            >
              Return to Catalog
            </Link>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-2 border-t border-line pt-8 text-xs sm:text-sm text-muted">
          <p>
            If you have questions regarding this Cookie & Privacy Policy, please contact our Data
            Protection Officer at:{" "}
            <a href="mailto:privacy@coalescex.com" className="text-brand underline">
              privacy@coalescex.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
