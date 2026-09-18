"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { Category, Course } from "@/types";

export default function CoursesPage() {
  const [categorySlug, setCategorySlug] = useState<string | undefined>();
  const [search, setSearch] = useState("");

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<{ categories: Category[] }>("/categories")).data,
  });

  const categories: Category[] = Array.isArray(categoriesData?.categories)
    ? categoriesData.categories
    : Array.isArray(categoriesData)
    ? (categoriesData as any)
    : [];

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["courses", categorySlug, search],
    queryFn: async () =>
      (
        await api.get<{ courses: Course[]; total: number }>("/courses", {
          params: { category: categorySlug, search: search || undefined },
        })
      ).data,
  });

  return (
    <div className="mx-auto  px-6 py-10">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl leading-tight">Learn something that sticks.</h1>
        <p className="mt-3 text-muted">
          Courses built by working practitioners — with real assessments, not just checkboxes.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses…"
          className="rounded border border-line bg-surface px-3 py-2 text-sm"
        />
        <button
          onClick={() => setCategorySlug(undefined)}
          className={`rounded-full px-3 py-1 text-sm ${!categorySlug ? "bg-brand-600 text-white" : "border border-line"}`}
        >
          All
        </button>
        {categories.map((c: any) => (
          <button
            key={c.id}
            onClick={() => setCategorySlug(c.slug)}
            className={`rounded-full px-3 py-1 text-sm ${categorySlug === c.slug ? "bg-brand-600 text-white" : "border border-line"}`}
          >
            {c.name} {c._count ? `(${c._count.courses})` : ""}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-muted">Loading courses…</p>}

      {(() => {
        const visibleCourses = coursesData?.courses.filter((course) => !course.isDeleted) ?? [];
        return (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-lg border border-line bg-surface p-5 transition hover:border-brand-400"
                >
                  <span className="text-xs uppercase tracking-wide text-muted">{course.category.name}</span>
                  <h3 className="mt-1 font-display text-lg leading-snug group-hover:text-brand-700">
                    {course.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{course.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </span>
                    <span className="font-mono">
                      {course.discountPrice ? (
                        <>
                          <span className="text-muted line-through">₹{course.price}</span>{" "}
                          <span className="text-accent">₹{course.discountPrice}</span>
                        </>
                      ) : (
                        `₹${course.price}`
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {coursesData && visibleCourses.length === 0 && (
              <p className="mt-10 text-center text-muted">No courses match yet. Try a different search or category.</p>
            )}
          </>
        );
      })()}
    </div>
  );
}
