"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Course } from "@/types";
import { AddSectionForm, AddLessonForm, EditLessonForm } from "@/components/instructor/CurriculumForms";
import { AssessmentBuilder } from "@/components/instructor/AssessmentBuilder";

export default function ManageCoursePage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [buildingAssessmentFor, setBuildingAssessmentFor] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course-manage", id],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${id}`)).data.course,
  });

  function refetch() {
    queryClient.invalidateQueries({ queryKey: ["course-manage", id] });
  }

  async function submitForReview() {
    setSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);
    try {
      await api.post(`/courses/${id}/submit`);
      setSubmitSuccess("Course has been successfully submitted for admin review!");
      refetch();
    } catch (e: any) {
      setSubmitError(e?.response?.data?.error?.message ?? "Could not submit for review.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteAssessment(assessmentId: string) {
    if (!window.confirm("Are you sure you want to delete this assessment? All configured questions will be removed.")) return;
    try {
      await api.delete(`/assessments/${assessmentId}`);
      refetch();
    } catch (e: any) {
      alert(e?.response?.data?.error?.message ?? "Could not delete assessment.");
    }
  }

  async function handleUpdateSection(sectionId: string) {
    if (!editingSectionTitle.trim()) return;
    try {
      await api.patch(`/courses/sections/${sectionId}`, { title: editingSectionTitle });
      setEditingSectionId(null);
      refetch();
    } catch (e: any) {
      alert(e?.response?.data?.error?.message ?? "Could not update section.");
    }
  }

  async function handleDeleteSection(sectionId: string) {
    if (!window.confirm("Are you sure you want to delete this section and all its lessons?")) return;
    try {
      await api.delete(`/courses/sections/${sectionId}`);
      refetch();
    } catch (e: any) {
      alert(e?.response?.data?.error?.message ?? "Could not delete section.");
    }
  }

  async function handleDeleteLesson(lessonId: string) {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await api.delete(`/courses/lessons/${lessonId}`);
      refetch();
    } catch (e: any) {
      alert(e?.response?.data?.error?.message ?? "Could not delete lesson.");
    }
  }

  if (isLoading || !course) return <p className="text-muted">Loading…</p>;

  const nextSectionOrder = course.sections?.length ?? 0;
  const totalLessons = course.sections?.reduce((acc, s) => acc + (s.lessons?.length || 0), 0) ?? 0;

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/instructor/courses"
          className="text-xs font-medium text-muted hover:text-brand-600 transition"
        >
          ← Back to all courses
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{course.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs ${
                course.status === "PUBLISHED"
                  ? "bg-brand-50 text-brand-700"
                  : course.status === "PENDING_APPROVAL"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-line text-muted"
              }`}
            >
              {course.status === "PENDING_APPROVAL" ? "PENDING REVIEW" : course.status}
            </span>
            <span className="text-xs text-muted">· {course.type}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/instructor/seo?slug=${course.slug}`}
            className="rounded border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition flex items-center gap-1.5 shadow-xs"
          >
            <span>✏️ Edit SEO</span>
          </Link>

          <Link
            href={`/instructor/courses/${id}/edit`}
            className="rounded border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-paper transition shadow-xs"
          >
            ✏️ Edit Course Details
          </Link>

          <button
            onClick={submitForReview}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : course.status === "PENDING_APPROVAL" ? (
              "🔄 Re-Submit for Review"
            ) : (
              "🚀 Submit for review"
            )}
          </button>
        </div>
      </div>

      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="font-semibold">✓ {submitSuccess}</p>
            <p className="text-xs text-green-700 mt-0.5">
              Course status has been set to PENDING_APPROVAL. An administrator will review your changes.
            </p>
          </div>
          <button
            onClick={() => setSubmitSuccess(null)}
            className="text-green-800 hover:text-green-950 font-bold text-sm ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 flex items-center justify-between shadow-xs">
          <p className="font-semibold">❌ {submitError}</p>
          <button
            onClick={() => setSubmitError(null)}
            className="text-red-800 hover:text-red-950 font-bold text-sm ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {course.status === "PENDING_APPROVAL" && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 shadow-xs">
          <p className="font-semibold">⏳ Course Pending Admin Approval</p>
          <p className="text-xs text-amber-800 mt-0.5">
            This course is currently under review by an administrator. It will remain hidden from the public catalog until an Admin approves it.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {course.sections?.map((section) => (
          <div key={section.id} className="rounded-lg border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-3 font-medium">
              {editingSectionId === section.id ? (
                <div className="flex items-center gap-2 flex-1 mr-4">
                  <input
                    value={editingSectionTitle}
                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                    className="rounded border border-line bg-surface px-2.5 py-1 text-sm flex-1 font-normal focus:border-brand-600 focus:outline-none"
                  />
                  <button
                    onClick={() => handleUpdateSection(section.id)}
                    className="rounded bg-brand-600 px-2.5 py-1 text-xs text-white hover:bg-brand-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSectionId(null)}
                    className="rounded border border-line px-2 py-1 text-xs text-muted hover:bg-paper"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <span>{section.title}</span>
              )}

              <div className="flex items-center gap-3">
                {editingSectionId !== section.id && (
                  <button
                    onClick={() => {
                      setEditingSectionId(section.id);
                      setEditingSectionTitle(section.title);
                    }}
                    className="text-xs text-muted hover:text-ink font-normal"
                  >
                    Rename
                  </button>
                )}
                <button
                  onClick={() => handleDeleteSection(section.id)}
                  className="text-xs text-red-600 hover:text-red-800 font-normal"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-3 p-4">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="rounded border border-line/70 p-3">
                  {editingLessonId === lesson.id ? (
                    <EditLessonForm
                      lesson={lesson as any}
                      onUpdated={() => {
                        setEditingLessonId(null);
                        refetch();
                      }}
                      onCancel={() => setEditingLessonId(null)}
                    />
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {lesson.contentType === "ASSESSMENT" ? "📝" : "▶"} {lesson.title}
                          {lesson.isPreview && <span className="ml-2 text-xs text-brand-600 font-normal">Preview</span>}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted">{lesson.contentType}</span>
                          <button
                            onClick={() => setEditingLessonId(lesson.id)}
                            className="text-xs text-brand-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {lesson.contentType === "ASSESSMENT" && (
                        <div className="mt-3 border-t border-line/50 pt-3">
                          {buildingAssessmentFor === lesson.id ? (
                            <AssessmentBuilder
                              lessonId={lesson.id}
                              initialAssessmentId={lesson.assessment?.id}
                              onCreated={() => {
                                setBuildingAssessmentFor(null);
                                setSubmitSuccess("Assessment updated successfully! Course is set to PENDING_APPROVAL.");
                                refetch();
                              }}
                              onCancel={() => setBuildingAssessmentFor(null)}
                            />
                          ) : lesson.assessment ? (
                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-brand-50/60 border border-brand-200/70 p-3">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                                  ✓
                                </span>
                                <span className="text-xs font-semibold text-brand-900">
                                  Assessment Configured
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setBuildingAssessmentFor(lesson.id)}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-white border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition shadow-xs cursor-pointer"
                                >
                                  ✏️ Edit Questions & Settings
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAssessment(lesson.assessment!.id)}
                                  className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 hover:border-red-300 transition cursor-pointer"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setBuildingAssessmentFor(lesson.id)}
                              className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition cursor-pointer"
                            >
                              + Build assessment questions
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              <AddLessonForm sectionId={section.id} nextOrder={section.lessons.length} onAdded={refetch} />
            </div>
          </div>
        ))}

        <AddSectionForm courseId={course.id} nextOrder={nextSectionOrder} onAdded={refetch} />

        {/* SECTION 2 BOTTOM ACTION & FINAL SUBMISSION CARD */}
        <div className="mt-8 rounded-xl border-2 border-line bg-surface p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="text-lg font-semibold text-ink">Course Status & Final Submission</h3>
              <p className="text-xs text-muted mt-0.5">
                Curriculum & Lessons (Form 2) is ready. Submit the full course for admin review to publish.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted font-medium">
                {course.sections?.length || 0} Section{(course.sections?.length || 0) !== 1 ? "s" : ""} · {totalLessons} Lesson{totalLessons !== 1 ? "s" : ""}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  course.status === "PUBLISHED"
                    ? "bg-green-100 text-green-800"
                    : course.status === "PENDING_APPROVAL"
                    ? "bg-amber-100 text-amber-800"
                    : course.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {course.status === "PENDING_APPROVAL" ? "⏳ PENDING REVIEW" : course.status}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/instructor/courses"
                className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-medium text-muted hover:text-ink hover:bg-line/40 transition"
              >
                ← Back to My Courses
              </Link>
              <Link
                href={`/instructor/courses/${id}/edit`}
                className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-line/40 transition"
              >
                ✏️ Edit Course Details (Form 1)
              </Link>
            </div>

            <div>
              <button
                type="button"
                onClick={submitForReview}
                disabled={submitting}
                className={`inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer ${
                  submitting
                    ? "bg-brand-400 cursor-not-allowed"
                    : course.status === "PENDING_APPROVAL"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-brand-600 hover:bg-brand-700"
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Submitting for Admin Review...</span>
                  </>
                ) : course.status === "PENDING_APPROVAL" ? (
                  <>
                    <span>✓ Submitted for Review</span>
                    <span className="text-xs font-normal opacity-90">(Click to Re-Submit)</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Submit Entire Course for Admin Review</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
