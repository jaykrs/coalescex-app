"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import type { Course } from "@/types";
import { useState } from "react";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${slug}`)).data.course,
  });

  if (isLoading) return <p className="text-muted">Loading course…</p>;
  if (!data) return <p className="text-muted">Course not found.</p>;

  const course = data;
  const lessonCount = course.sections?.reduce((sum, s) => sum + s.lessons.length, 0) ?? 0;

  async function handleAddToCart() {
    if (!user) return router.push("/login");
    if (user.role !== "STUDENT") {
      setMessage("Only student accounts can purchase courses.");
      return;
    }
    setAdding(true);
    try {
      await addToCart(course.id);
      setMessage("Added to cart.");
    } catch (e: any) {
      setMessage(e?.response?.data?.error?.message ?? "Could not add to cart.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <span className="text-xs uppercase tracking-wide text-muted">{course.category.name}</span>
        <h1 className="mt-1 text-3xl leading-tight">{course.title}</h1>
        <p className="mt-2 text-muted">{course.subtitle}</p>
        <p className="mt-4 text-sm text-muted">
          By {course.instructor.firstName} {course.instructor.lastName} · {lessonCount} lessons ·{" "}
          {course._count?.enrollments ?? 0} enrolled
        </p>

        <div className="mt-8">
          <h2 className="mb-3 text-xl">About this course</h2>
          <p className="whitespace-pre-line text-ink/90">{course.description}</p>
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-xl">Curriculum</h2>
          <div className="divide-y divide-line rounded-lg border border-line">
            {course.sections?.map((section) => (
              <div key={section.id} className="p-4">
                <h3 className="font-medium">{section.title}</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center justify-between">
                      <span>
                        {lesson.contentType === "ASSESSMENT" ? "📝" : "▶"} {lesson.title}
                      </span>
                      {lesson.isPreview && <span className="text-xs text-brand-600">Preview</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside>
        <div className="sticky top-6 rounded-lg border border-line bg-surface p-6">
          <div className="mb-4 font-mono text-2xl">
            {course.discountPrice ? (
              <>
                <span className="mr-2 text-base text-muted line-through">${course.price}</span>
                <span className="text-accent">${course.discountPrice}</span>
              </>
            ) : (
              `$${course.price}`
            )}
          </div>

          {course.isEnrolled ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded bg-brand-600 py-2.5 text-white hover:bg-brand-700"
            >
              Go to course
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full rounded bg-brand-600 py-2.5 text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {adding ? "Adding…" : "Add to cart"}
            </button>
          )}
          {message && <p className="mt-3 text-sm text-muted">{message}</p>}
        </div>
      </aside>
    </div>
  );
}
