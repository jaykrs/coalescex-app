"use client";

import { Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { Course } from "@/types";

function InstructorCoursesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const seoUpdated = searchParams.get("seoUpdated");

  const { data, isLoading } = useQuery({
    queryKey: ["instructor-courses"],
    queryFn: async () => (await api.get<{ courses: Course[] }>("/courses/mine/list")).data.courses,
  });

  const deleteMutation = useMutation({
    mutationFn: async (courseId: string) => {
      await api.delete(`/courses/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
    },
  });

  const handleDelete = (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(courseId);
    }
  };

  const courses = data?.filter((course) => !course.isDeleted);

  return (
    <div>
      {/* SEO Save Success Notification */}
      {seoUpdated && (
        <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-950 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-emerald-900">SEO Settings Saved Successfully!</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Search engine and social metadata for <strong>&ldquo;{seoUpdated}&rdquo;</strong> has been updated and mapped to the live dynamic page.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.replace("/instructor/courses")}
            className="rounded px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
          >
            Dismiss ✕
          </button>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">My Courses</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/instructor/seo"
            className="rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:bg-paper transition flex items-center gap-1.5 shadow-xs"
          >
            <span>🔍 Manage SEO</span>
          </Link>
          <Link
            href="/instructor/courses/new"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 font-medium shadow-xs"
          >
            + New course
          </Link>
        </div>
      </div>

      {isLoading && <p className="text-muted">Loading…</p>}

      <div className="divide-y divide-line rounded-xl border border-line bg-surface overflow-hidden shadow-xs">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-paper transition gap-4"
          >
            <Link
              href={`/instructor/courses/${course.id}`}
              className="flex-1 min-w-0"
            >
              <p className="font-semibold text-ink text-base hover:text-brand-600 transition">{course.title}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted mt-1">
                <span>{course.category?.name}</span>
                <span>•</span>
                <span className="font-mono text-brand-600">/{course.slug}</span>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Course Status */}
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  course.status === "PUBLISHED"
                    ? "bg-brand-50 text-brand-700"
                    : course.status === "PENDING_APPROVAL"
                    ? "bg-accent/10 text-accent"
                    : "bg-line text-muted"
                }`}
              >
                {course.status}
              </span>

              {/* SEO Status & Edit SEO Option */}
              <Link
                href={`/instructor/seo?slug=${course.slug}`}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition flex items-center gap-1.5 shadow-xs ${
                  course.seo
                    ? "text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                    : "text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200"
                }`}
                title={course.seo ? "Edit SEO for this page" : "Add SEO for this page"}
              >
                {course.seo ? (
                  <>
                    <span>✏️</span>
                    <span>Edit SEO</span>
                  </>
                ) : (
                  <>
                    <span>➕</span>
                    <span>Add SEO</span>
                  </>
                )}
              </Link>

              <Link
                href={`/instructor/courses/${course.id}/edit`}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper border border-line transition shadow-xs"
              >
                Edit Details
              </Link>

              <button
                type="button"
                onClick={(e) => handleDelete(e, course.id)}
                disabled={deleteMutation.isPending && deleteMutation.variables === course.id}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200 transition disabled:opacity-50 cursor-pointer"
              >
                {deleteMutation.isPending && deleteMutation.variables === course.id
                  ? "Deleting…"
                  : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses?.length === 0 && !isLoading && (
        <p className="mt-6 text-muted">No courses yet — create your first one above.</p>
      )}
    </div>
  );
}

export default function InstructorCoursesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted">Loading courses…</div>}>
      <InstructorCoursesList />
    </Suspense>
  );
}

