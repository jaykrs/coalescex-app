"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import type { Course, Lesson } from "@/types";
import { VideoTranscriptPlayer } from "@/components/learning/VideoTranscriptPlayer";

export default function CourseLearnPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"player" | "list">("player");

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${slug}`)).data.course,
  });

  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => (await api.get("/progress/dashboard")).data.dashboard,
  });

  // Flattened list of all lessons
  const allLessons = useMemo(() => {
    if (!course?.sections) return [];
    return course.sections.flatMap((s) => s.lessons);
  }, [course?.sections]);

  const entry = dashboard?.find((d: any) => d.course.id === course?.id);
  const completedLessonIds: Set<string> = useMemo(() => {
    return new Set(entry?.completedLessonIds ?? []);
  }, [entry?.completedLessonIds]);

  // Set initial active lesson (from search param, first incomplete, or first lesson)
  useEffect(() => {
    if (allLessons.length === 0) return;

    const paramLessonId = searchParams.get("lessonId");
    if (paramLessonId && allLessons.some((l) => l.id === paramLessonId)) {
      setActiveLessonId(paramLessonId);
      return;
    }

    if (!activeLessonId) {
      const firstIncomplete = allLessons.find((l) => !completedLessonIds.has(l.id));
      setActiveLessonId(firstIncomplete ? firstIncomplete.id : allLessons[0].id);
    }
  }, [allLessons, searchParams, completedLessonIds, activeLessonId]);

  const activeLesson = useMemo(() => {
    return allLessons.find((l) => l.id === activeLessonId) || allLessons[0] || null;
  }, [allLessons, activeLessonId]);

  async function toggleComplete(lessonId: string, completed: boolean) {
    await api.post("/progress", { lessonId, completed: !completed });
    await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  }

  function handleSelectLesson(lesson: Lesson) {
    if (lesson.contentType === "ASSESSMENT") {
      router.push(`/assessments/${lesson.id}`);
      return;
    }
    setActiveLessonId(lesson.id);
    setViewMode("player");
  }

  if (isLoading) return <p className="text-muted">Loading your course…</p>;
  if (!course) return <p className="text-muted">Course not found.</p>;
  if (!course.isEnrolled) {
    return (
      <div className="rounded-xl border border-line bg-surface p-8 text-center">
        <h2 className="text-lg font-bold text-ink">Not Enrolled Yet</h2>
        <p className="mt-2 text-sm text-muted">
          You are not enrolled in this course yet. Please enroll to access the lectures and materials.
        </p>
        <button
          onClick={() => router.push(`/courses/${course.slug}`)}
          className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-500 transition cursor-pointer"
        >
          View Course Details
        </button>
      </div>
    );
  }

  // If in player mode and we have an active lesson, render DataCamp-style full-screen player
  if (viewMode === "player" && activeLesson) {
    return (
      <VideoTranscriptPlayer
        course={course}
        activeLesson={activeLesson}
        onSelectLesson={handleSelectLesson}
        completedLessonIds={completedLessonIds}
        onToggleComplete={toggleComplete}
        onExit={() => setViewMode("list")}
      />
    );
  }

  // Fallback / Alternative Curriculum List View
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Enrolled Course
          </span>
          <h1 className="text-2xl font-bold text-ink">{course.title}</h1>
        </div>

        {activeLesson && (
          <button
            type="button"
            onClick={() => setViewMode("player")}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-500 transition cursor-pointer"
          >
            <span>▶</span>
            <span>Resume Learning: {activeLesson.title}</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-line rounded-xl border border-line bg-surface overflow-hidden shadow-xs">
        {course.sections?.map((section) => (
          <div key={section.id} className="p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
              {section.title}
            </h2>
            <ul className="space-y-2.5">
              {section.lessons.map((lesson) => {
                const done = completedLessonIds.has(lesson.id);
                const isSelected = lesson.id === activeLessonId;

                return (
                  <li
                    key={lesson.id}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                      isSelected
                        ? "border-brand-500 bg-brand-50/70"
                        : "border-line/70 bg-surface hover:border-brand-200 hover:bg-paper/30"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex flex-1 items-center gap-3 text-left cursor-pointer"
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
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
                      <div>
                        <p className="font-semibold text-sm text-ink group-hover:text-brand-700">
                          {lesson.title}
                        </p>
                        <span className={`text-[11px] uppercase font-semibold ${lesson.contentType === "PRACTICE" ? "text-purple-600" : "text-muted"}`}>
                          {lesson.contentType === "PRACTICE" ? "💻 PRACTICE (COMPILER)" : lesson.contentType}
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center gap-3">
                      {lesson.contentType !== "ASSESSMENT" && (
                        <button
                          type="button"
                          onClick={() => toggleComplete(lesson.id, done)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                            done
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "border border-line text-muted hover:text-ink hover:bg-slate-50"
                          }`}
                        >
                          {done ? "✓ Completed" : "Mark complete"}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
