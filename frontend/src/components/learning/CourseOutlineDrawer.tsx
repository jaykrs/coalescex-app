"use client";

import { useEffect } from "react";
import type { CourseSection, Lesson } from "@/types";

interface CourseOutlineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: CourseSection[];
  activeLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: Set<string>;
  courseTitle: string;
  nextLesson?: Lesson | null;
  onNextLesson?: () => void;
}

export function CourseOutlineDrawer({
  isOpen,
  onClose,
  sections,
  activeLessonId,
  onSelectLesson,
  completedLessonIds,
  courseTitle,
  nextLesson,
  onNextLesson,
}: CourseOutlineDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalLessons = sections.reduce((sum, s) => sum + s.lessons.length, 0);
  const completedCount = completedLessonIds.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Content */}
      <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-surface shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-paper/60 p-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Course Outline
            </span>
            <h2 className="text-base font-bold text-ink truncate max-w-xs sm:max-w-sm">
              {courseTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-muted hover:bg-slate-200 hover:text-ink transition"
          >
            ✕
          </button>
        </div>

        {/* Progress Banner */}
        <div className="border-b border-line bg-surface p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">Course Progress</span>
            <span className="font-mono font-bold text-brand-700">
              {completedCount}/{totalLessons} lessons ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-brand-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Up Next Quick Action */}
        {nextLesson && (
          <div className="border-b border-line bg-brand-50/50 px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                Up Next
              </span>
              <p className="text-xs font-semibold text-ink truncate max-w-[240px]">
                {nextLesson.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNextLesson) {
                  onNextLesson();
                } else {
                  onSelectLesson(nextLesson);
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition flex-shrink-0 cursor-pointer"
            >
              <span>Next →</span>
            </button>
          </div>
        )}

        {/* Sections & Lessons List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sections.map((section, sIdx) => (
            <div key={section.id} className="rounded-xl border border-line bg-paper/30 overflow-hidden">
              <div className="border-b border-line/60 bg-paper/60 px-3.5 py-2.5">
                <span className="text-[11px] font-semibold text-muted uppercase">
                  Section {sIdx + 1}
                </span>
                <h3 className="text-sm font-bold text-ink">{section.title}</h3>
              </div>

              <div className="divide-y divide-line/60">
                {section.lessons.map((lesson) => {
                  const isCurrent = lesson.id === activeLessonId;
                  const isCompleted = completedLessonIds.has(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => {
                        onSelectLesson(lesson);
                        onClose();
                      }}
                      className={`flex w-full items-center justify-between gap-3 p-3 text-left transition ${
                        isCurrent
                          ? "bg-brand-50/80 border-l-4 border-brand-600 pl-2"
                          : "hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-sm">
                          {lesson.contentType === "ASSESSMENT"
                            ? "📝"
                            : lesson.contentType === "PRACTICE"
                            ? "💻"
                            : lesson.contentType === "ARTICLE"
                            ? "📖"
                            : lesson.contentType === "PDF"
                            ? "📑"
                            : "▶"}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-semibold truncate ${
                              isCurrent
                                ? "text-brand-700 font-bold"
                                : "text-ink"
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <span className={`text-[10px] uppercase font-semibold ${lesson.contentType === "PRACTICE" ? "text-purple-600" : "text-muted"}`}>
                            {lesson.contentType}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] text-emerald-700 font-bold">
                            ✓
                          </span>
                        ) : isCurrent ? (
                          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            Current
                          </span>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
