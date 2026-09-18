"use client";

import { useState, useMemo } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface CourseFaqProps {
  faqs: FaqItem[];
  courseTitle?: string;
}

export function CourseFaq({ faqs, courseTitle }: CourseFaqProps) {
  // Store open state as a Set of indexes so multiple can be open at once
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0])); // First question open by default
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  const allExpanded = filteredFaqs.length > 0 && filteredFaqs.every((_, idx) => openSet.has(idx));

  function toggleQuestion(idx: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  function toggleAll() {
    if (allExpanded) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(filteredFaqs.map((_, idx) => idx)));
    }
  }

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 space-y-6">
      {/* Header & Meta */}
      <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              💡 Clear Answers
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-muted">
            Everything you need to know about enrollment, course materials, certificate, and lifetime access.
          </p>
        </div>

        {/* Expand / Collapse All Toggle */}
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-ink shadow-xs hover:bg-paper transition sm:self-auto cursor-pointer"
        >
          <span>{allExpanded ? "− Collapse All" : "+ Expand All"}</span>
          <span className="text-muted text-[11px]">({filteredFaqs.length})</span>
        </button>
      </div>

      {/* Search Filter Bar (shows if >= 3 faqs) */}
      {faqs.length >= 3 && (
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search questions (e.g. certificate, refund, prerequisites, access)..."
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 pl-10 text-sm text-ink placeholder:text-muted/60 shadow-xs focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 transition"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-muted hover:text-ink cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line bg-paper/30 p-8 text-center">
            <p className="text-sm font-medium text-ink">No questions found matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="mt-1 text-xs text-muted">Try searching with different keywords or clear the filter.</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs font-semibold text-brand-600 hover:underline cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openSet.has(idx);
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-brand-300 bg-brand-50/10 shadow-xs ring-1 ring-brand-200/50"
                    : "border-line/80 bg-surface hover:border-line hover:bg-paper/30"
                }`}
              >
                {/* Question Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-colors ${
                        isOpen
                          ? "bg-brand-600 text-white"
                          : "bg-paper text-brand-700 border border-line"
                      }`}
                    >
                      {idx + 1 < 10 ? `Q0${idx + 1}` : `Q${idx + 1}`}
                    </span>
                    <h3
                      className={`text-base font-bold transition-colors sm:text-lg ${
                        isOpen ? "text-brand-900 font-extrabold" : "text-ink"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? "rotate-180 border-brand-300 bg-brand-50 text-brand-700"
                        : "rotate-0 border-line bg-paper text-muted"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Answer Body */}
                {isOpen && (
                  <div className="border-t border-line/60 px-4 sm:px-5 pb-5 pt-3 animate-in fade-in duration-150">
                    <div className="text-sm leading-relaxed text-ink/85 sm:text-base space-y-2 pl-0 sm:pl-10">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Support / Contact Helper Card */}
      <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-r from-brand-50/50 via-surface to-brand-50/30 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 text-xl shadow-xs">
              💬
            </div>
            <div>
              <h4 className="text-base font-bold text-ink">Still have questions?</h4>
              <p className="text-xs text-muted mt-0.5 max-w-lg">
                Can&rsquo;t find what you&rsquo;re looking for? Reach out to our course counselors or explore the student discussion forums.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:self-center">
            <a
              href="#about"
              className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-paper transition whitespace-nowrap shadow-xs"
            >
              Review Syllabus
            </a>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("hero-cta");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition whitespace-nowrap shadow-xs cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
