
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageData = {
  slug: string;
  title: string;
  lastUpdated: string;
  content: LegalSection[];
};

type Props = {
  slug: "terms" | "privacy" | "gdpr" | "payment-protection-policy";
  intro?: string;
  variant?: "gdpr" | "payment";
};

export default function LegalPageContent({
  slug,
  intro = "",
}: Props) {
  const [page, setPage] = useState<LegalPageData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setPage(null);
    setError("");

    api
      .get<{ page: LegalPageData }>(`/legal-pages/${slug}`)
      .then(({ data }) => {
        if (active) setPage(data.page);
      })
      .catch(() => {
        if (active) {
          setError(
            "Legal page content could not be loaded. Please try again later."
          );
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const links = [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
    {
      href: "/payment-protection-policy",
      label: "Payment Protection Policy",
    },
    { href: "/gdpr", label: "GDPR & Data Protection" },
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf9] px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-10">
        {!page ? (
          <div aria-live="polite">
            {error ? (
              <>
                <p className="text-sm text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm font-medium text-brand underline"
                >
                  Try again
                </button>
              </>
            ) : (
              <p className="text-sm text-muted">
                Loading legal page...
              </p>
            )}
          </div>
        ) : (
          <>
            <header className="space-y-4 border-b border-line pb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Legal &amp; Compliance
              </p>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {page.title}
              </h1>

              {intro && (
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {intro}
                </p>
              )}

              <p className="text-sm text-muted">
                Last updated: {page.lastUpdated}
              </p>
            </header>

            {page.content.map((section, index) => (
              <section
                key={`${section.heading}-${index}`}
                className="space-y-3"
              >
                <h2 className="font-display text-xl font-bold text-ink">
                  {section.heading}
                </h2>

                {(section.paragraphs ?? []).map((paragraph, i) => {
                  if (
                    slug === "gdpr" &&
                    paragraph.startsWith("Read Privacy & Cookie Policy:")
                  ) {
                    return (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-gray-700 sm:text-base"
                      >
                        Read{" "}
                        <Link
                          href="/privacy"
                          className="text-brand underline"
                        >
                          Privacy &amp; Cookie Policy
                        </Link>
                      </p>
                    );
                  }

                  if (
                    slug === "gdpr" &&
                    paragraph.includes("privacy@coalescex.com")
                  ) {
                    const clean = paragraph
                      .replace("privacy@coalescex.com", "")
                      .trim();

                    return (
                      <div key={i}>
                        {clean && (
                          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                            {clean}
                          </p>
                        )}
                        <a
                          href="mailto:privacy@coalescex.com"
                          className="text-sm text-brand underline sm:text-base"
                        >
                          privacy@coalescex.com
                        </a>
                      </div>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-gray-700 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  );
                })}

                {(section.bullets ?? []).length > 0 && (
                  <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {(section.bullets ?? []).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {slug === "gdpr" && index === 6 && (
                  <p className="text-sm leading-relaxed text-muted">
                    Please avoid including passwords, payment card details,
                    or other sensitive information in your initial email.
                  </p>
                )}
              </section>
            ))}

            <footer className="flex flex-wrap gap-4 border-t border-line pt-6">
              {links
                .filter((link) => link.href !== `/${slug}`)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-brand underline underline-offset-4 hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                ))}

              <Link
                href="/courses"
                className="text-sm font-medium text-muted underline hover:text-brand"
              >
                Return to Catalog
              </Link>
            </footer>
          </>
        )}
      </article>
    </main>
  );
}
