"use client";

import { useState, useMemo } from "react";
import type { CourseSection, Lesson, LessonContentType } from "@/types";

interface CourseCurriculumProps {
  sections: CourseSection[];
  courseTitle?: string;
  isEnrolled?: boolean;
}

export function CourseCurriculum({ sections, courseTitle, isEnrolled }: CourseCurriculumProps) {
  // State for collapsible modules (default: all open)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach((s, idx) => {
      // First 3 sections open by default, rest collapsed if many
      initial[s.id] = idx < 3;
    });
    return initial;
  });

  // Filter lessons by type: ALL, VIDEO, ARTICLE, PDF, ASSESSMENT
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | LessonContentType>("ALL");

  // Free preview modal state
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  // Aggregate statistics
  const totalLessons = useMemo(
    () => sections.reduce((sum, s) => sum + s.lessons.length, 0),
    [sections]
  );

  const countsByType = useMemo(() => {
    let video = 0;
    let article = 0;
    let pdf = 0;
    let assessment = 0;
    let practice = 0;
    let totalSec = 0;

    sections.forEach((s) => {
      s.lessons.forEach((l) => {
        if (l.contentType === "VIDEO") video++;
        else if (l.contentType === "ARTICLE") article++;
        else if (l.contentType === "PDF") pdf++;
        else if (l.contentType === "ASSESSMENT") assessment++;
        else if (l.contentType === "PRACTICE") practice++;

        if (l.durationSec) totalSec += l.durationSec;
      });
    });

    return { video, article, pdf, assessment, practice, totalSec };
  }, [sections]);

  const formattedTotalTime = useMemo(() => {
    const totalMinutes = Math.round(countsByType.totalSec / 60);
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
  }, [countsByType.totalSec]);

  const allExpanded = useMemo(() => {
    return sections.length > 0 && sections.every((s) => expandedSections[s.id]);
  }, [sections, expandedSections]);

  function toggleAll() {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    sections.forEach((s) => {
      updated[s.id] = nextState;
    });
    setExpandedSections(updated);
  }

  function toggleSection(sectionId: string) {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }

  function formatDuration(sec?: number | null) {
    if (!sec || sec <= 0) return null;
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const m = mins % 60;
      return `${hrs}h ${m}m`;
    }
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  }

  return (
    <section id="curriculum" className="scroll-mt-24 space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              📚 Syllabus &amp; Modules
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Course Curriculum
          </h2>
          <p className="mt-1 text-sm text-muted">
            Structured step-by-step learning path from fundamentals to production mastery.
          </p>
        </div>

        {/* Expand / Collapse All Button */}
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-ink shadow-xs hover:bg-paper transition sm:self-auto cursor-pointer"
        >
          <span>{allExpanded ? "− Collapse All" : "+ Expand All"}</span>
          <span className="text-muted text-[11px]">({sections.length} modules)</span>
        </button>
      </div>

      {/* Curriculum Summary Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-line/80 bg-paper/50 p-3.5 text-center transition hover:border-brand-300 hover:bg-paper">
          <div className="text-xl sm:text-2xl font-black text-ink">{sections.length}</div>
          <div className="text-xs font-medium text-muted mt-0.5">Course Modules</div>
        </div>
        <div className="rounded-xl border border-line/80 bg-paper/50 p-3.5 text-center transition hover:border-brand-300 hover:bg-paper">
          <div className="text-xl sm:text-2xl font-black text-ink">{totalLessons}</div>
          <div className="text-xs font-medium text-muted mt-0.5">Total Lessons</div>
        </div>
        <div className="rounded-xl border border-line/80 bg-paper/50 p-3.5 text-center transition hover:border-brand-300 hover:bg-paper">
          <div className="text-xl sm:text-2xl font-black text-brand-600">
            {countsByType.video} Videos
          </div>
          <div className="text-xs font-medium text-muted mt-0.5">
            {countsByType.totalSec > 0 ? formattedTotalTime : "Self-paced"}
          </div>
        </div>
        <div className="rounded-xl border border-line/80 bg-paper/50 p-3.5 text-center transition hover:border-brand-300 hover:bg-paper">
          <div className="text-xl sm:text-2xl font-black text-accent">
            {countsByType.article + countsByType.pdf + countsByType.assessment}
          </div>
          <div className="text-xs font-medium text-muted mt-0.5">Articles &amp; Quizzes</div>
        </div>
      </div>

      {/* Content Type Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider mr-1">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => setSelectedFilter("ALL")}
          className={`rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
            selectedFilter === "ALL"
              ? "bg-brand-600 text-white shadow-xs"
              : "border border-line bg-surface text-ink hover:bg-paper"
          }`}
        >
          All ({totalLessons})
        </button>

        {countsByType.video > 0 && (
          <button
            type="button"
            onClick={() => setSelectedFilter("VIDEO")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
              selectedFilter === "VIDEO"
                ? "bg-brand-600 text-white shadow-xs"
                : "border border-line bg-surface text-ink hover:bg-paper"
            }`}
          >
            <span>▶</span> Videos ({countsByType.video})
          </button>
        )}

        {countsByType.article > 0 && (
          <button
            type="button"
            onClick={() => setSelectedFilter("ARTICLE")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
              selectedFilter === "ARTICLE"
                ? "bg-teal-700 text-white shadow-xs"
                : "border border-line bg-surface text-ink hover:bg-paper"
            }`}
          >
            <span>📖</span> Articles ({countsByType.article})
          </button>
        )}

        {countsByType.pdf > 0 && (
          <button
            type="button"
            onClick={() => setSelectedFilter("PDF")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
              selectedFilter === "PDF"
                ? "bg-red-700 text-white shadow-xs"
                : "border border-line bg-surface text-ink hover:bg-paper"
            }`}
          >
            <span>📑</span> PDFs ({countsByType.pdf})
          </button>
        )}

        {countsByType.assessment > 0 && (
          <button
            type="button"
            onClick={() => setSelectedFilter("ASSESSMENT")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
              selectedFilter === "ASSESSMENT"
                ? "bg-amber-600 text-white shadow-xs"
                : "border border-line bg-surface text-ink hover:bg-paper"
            }`}
          >
            <span>🎯</span> Assessments ({countsByType.assessment})
          </button>
        )}

        {countsByType.practice > 0 && (
          <button
            type="button"
            onClick={() => setSelectedFilter("PRACTICE")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
              selectedFilter === "PRACTICE"
                ? "bg-purple-700 text-white shadow-xs"
                : "border border-line bg-surface text-ink hover:bg-paper"
            }`}
          >
            <span>💻</span> Practice ({countsByType.practice})
          </button>
        )}
      </div>

      {/* Module Accordions List */}
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const isOpen = Boolean(expandedSections[section.id]);
          const filteredLessons = section.lessons.filter((l) =>
            selectedFilter === "ALL" ? true : l.contentType === selectedFilter
          );

          // Calculate section metrics
          const sectionSec = section.lessons.reduce((acc, l) => acc + (l.durationSec || 0), 0);
          const sectionDuration = formatDuration(sectionSec);

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl border border-line bg-surface shadow-xs transition hover:border-line/90"
            >
              {/* Module Header Bar */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between gap-4 bg-paper/60 p-4 text-left transition hover:bg-paper cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-extrabold text-brand-700">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-ink truncate sm:text-lg">
                      {section.title}
                    </h3>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span>
                        {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                      {sectionDuration && (
                        <>
                          <span>•</span>
                          <span>{sectionDuration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-muted hidden sm:inline">
                    {isOpen ? "Collapse" : "Expand"}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-line text-ink transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
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
                </div>
              </button>

              {/* Module Lessons Container */}
              {isOpen && (
                <div className="divide-y divide-line/70 p-3 sm:p-4 bg-surface">
                  {filteredLessons.length === 0 ? (
                    <div className="py-6 text-center text-xs text-muted italic">
                      No {selectedFilter.toLowerCase()} lessons in this module.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredLessons.map((lesson, lIdx) => (
                        <LessonItemCard
                          key={lesson.id}
                          lesson={lesson}
                          index={lIdx + 1}
                          isEnrolled={isEnrolled}
                          onPreviewClick={() => setPreviewLesson(lesson)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Free Preview Interactive Modal */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
                  🔓 Free Lesson Preview
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  {previewLesson.contentType}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewLesson(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Preview Area */}
            <div className="p-5 sm:p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">{previewLesson.title}</h3>

              {/* Video Player Mockup / Display */}
              {previewLesson.contentType === "VIDEO" && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg mb-3">
                    <svg className="h-8 w-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">Video Preview Player</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {previewLesson.contentUrl
                      ? "Streaming sample lecture content..."
                      : "Full high-definition video lecture with interactive transcript and code sandbox."}
                  </p>
                  {previewLesson.durationSec && (
                    <span className="mt-3 inline-block rounded bg-black/70 px-2 py-1 text-xs font-mono text-brand-300">
                      Duration: {Math.floor(previewLesson.durationSec / 60)} minutes
                    </span>
                  )}
                </div>
              )}

              {/* Article Preview */}
              {previewLesson.contentType === "ARTICLE" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase">
                    <span>📖 Reading Overview</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    This article contains in-depth documentation, architectural walkthroughs, and code examples. Enroll in the full course to unlock downloadable cheatsheets and step-by-step code repositories.
                  </p>
                </div>
              )}

              {/* PDF Preview */}
              {previewLesson.contentType === "PDF" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-center space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400 text-xl font-bold">
                    PDF
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">Downloadable Slide Deck &amp; Notes</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Full printable lecture slides, architectural cheat sheets, and references are included for enrolled students.
                  </p>
                </div>
              )}

              {/* Assessment Preview */}
              {previewLesson.contentType === "ASSESSMENT" && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-center space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 text-xl font-bold">
                    🎯
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">Interactive Knowledge Assessment</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Hands-on multiple choice questions, code puzzles, and passing criteria to verify your understanding.
                  </p>
                </div>
              )}

              {/* Practice Preview */}
              {previewLesson.contentType === "PRACTICE" && (
                <div className="rounded-xl border border-purple-800/60 bg-purple-950/30 p-6 text-center space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 text-xl font-bold">
                    💻
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200">Interactive In-Browser Code Compiler</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Live hands-on coding sandbox (JavaScript, Python, Java) with real-time compilation, terminal logs, and syntax formatting.
                  </p>
                </div>
              )}

              {/* CTA Banner inside Modal */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-brand-500/30 bg-brand-500/10 p-4">
                <div>
                  <p className="text-xs font-bold text-white">Want unlimited access to all modules?</p>
                  <p className="text-[11px] text-slate-300">
                    Get full lifetime access to videos, assignments, and verified certificates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewLesson(null);
                    const el = document.getElementById("hero-cta");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-500 transition whitespace-nowrap cursor-pointer"
                >
                  Enroll in Full Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ========================================================================== */
/* Individual Lesson Card with Custom Visuals per ContentType                 */
/* ========================================================================== */
interface LessonItemCardProps {
  lesson: Lesson;
  index: number;
  isEnrolled?: boolean;
  onPreviewClick: () => void;
}

function LessonItemCard({ lesson, index, isEnrolled, onPreviewClick }: LessonItemCardProps) {
  function formatSec(sec?: number | null) {
    if (!sec) return null;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  const durationText = formatSec(lesson.durationSec);

  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line/70 bg-surface p-3 sm:p-3.5 transition-all hover:border-brand-300 hover:shadow-xs hover:bg-paper/30">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* ============================================================ */}
        {/* 1. THUMBNAIL VISUAL DESIGN PER CONTENT TYPE                  */}
        {/* ============================================================ */}

        {/* --- VIDEO THUMBNAIL --- */}
        {lesson.contentType === "VIDEO" && (
          <div className="relative h-16 w-24 sm:h-18 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 shadow-xs flex items-center justify-center group-hover:border-brand-500/80 transition">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:8px_8px]" />

            {/* Play Button Overlay */}
            <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-md transition-transform group-hover:scale-110">
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Duration Tag overlay */}
            {durationText && (
              <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-slate-100 tracking-tight">
                {durationText}
              </span>
            )}
          </div>
        )}

        {/* --- ARTICLE THUMBNAIL --- */}
        {lesson.contentType === "ARTICLE" && (
          <div className="relative h-16 w-24 sm:h-18 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 border border-teal-700/80 shadow-xs flex flex-col items-center justify-center group-hover:border-teal-400 transition">
            {/* Simulated text lines graphic */}
            <div className="w-12 space-y-1 opacity-70">
              <div className="h-1 w-full rounded-full bg-teal-300/80" />
              <div className="h-1 w-3/4 rounded-full bg-teal-400/60" />
              <div className="h-1 w-4/5 rounded-full bg-teal-400/60" />
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal-300">
              <span>📖</span> Guide
            </span>
          </div>
        )}

        {/* --- PDF THUMBNAIL --- */}
        {lesson.contentType === "PDF" && (
          <div className="relative h-16 w-24 sm:h-18 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-rose-950 via-red-900 to-red-950 border border-red-700/80 shadow-xs flex flex-col items-center justify-center group-hover:border-red-400 transition">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-[10px] font-black tracking-tighter text-white shadow-xs">
              PDF
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-200">
              <span>📑</span> Slides
            </span>
          </div>
        )}

        {/* --- ASSESSMENT THUMBNAIL --- */}
        {lesson.contentType === "ASSESSMENT" && (
          <div className="relative h-16 w-24 sm:h-18 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-950 via-amber-900 to-orange-950 border border-amber-600/80 shadow-xs flex flex-col items-center justify-center group-hover:border-amber-400 transition">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
              <span>🎯</span> Quiz
            </span>
          </div>
        )}

        {/* --- PRACTICE THUMBNAIL --- */}
        {lesson.contentType === "PRACTICE" && (
          <div className="relative h-16 w-24 sm:h-18 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 border border-purple-700/80 shadow-xs flex flex-col items-center justify-center group-hover:border-purple-400 transition">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/50 text-purple-300 font-mono text-xs font-black shadow-xs border border-purple-500/50">
              &lt;/&gt;
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-300">
              <span>💻</span> Practice
            </span>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. LESSON TITLE & METADATA                                  */}
        {/* ============================================================ */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted font-mono">
              #{index < 10 ? `0${index}` : index}
            </span>
            <h4 className="font-semibold text-ink text-sm sm:text-base group-hover:text-brand-600 transition truncate">
              {lesson.title}
            </h4>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            {lesson.contentType === "VIDEO" && (
              <span className="inline-flex items-center gap-1 text-muted font-medium">
                <span className="text-brand-600">🎥</span> Video Lecture
                {durationText && ` (${durationText})`}
              </span>
            )}
            {lesson.contentType === "ARTICLE" && (
              <span className="inline-flex items-center gap-1 text-muted font-medium">
                <span className="text-teal-600">📖</span> Reading Guide
              </span>
            )}
            {lesson.contentType === "PDF" && (
              <span className="inline-flex items-center gap-1 text-muted font-medium">
                <span className="text-red-600">📑</span> Printable Resource / Slides
              </span>
            )}
            {lesson.contentType === "ASSESSMENT" && (
              <span className="inline-flex items-center gap-1 text-muted font-medium">
                <span className="text-amber-600">🎯</span> Graded Quiz &amp; Knowledge Check
              </span>
            )}
            {lesson.contentType === "PRACTICE" && (
              <span className="inline-flex items-center gap-1 text-muted font-medium">
                <span className="text-purple-600">💻</span> Hands-on Code Practice &amp; Compiler
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. ACTION / STATUS BADGE                                      */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2.5 sm:self-center flex-shrink-0">
        {lesson.isPreview ? (
          <button
            type="button"
            onClick={onPreviewClick}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-600 hover:text-white transition shadow-xs cursor-pointer"
          >
            <span>🔓</span>
            <span>Free Preview</span>
          </button>
        ) : isEnrolled ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-700">
            <span>✓</span> Enrolled Access
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-line/60 px-2.5 py-1 text-xs font-medium text-muted">
            <svg className="h-3 w-3 text-muted" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Locked</span>
          </span>
        )}
      </div>
    </div>
  );
}
