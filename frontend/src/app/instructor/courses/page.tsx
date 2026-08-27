"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { Course } from "@/types";

export default function InstructorCoursesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["instructor-courses"],
    queryFn: async () => (await api.get<{ courses: Course[] }>("/courses/mine/list")).data.courses,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl">My Courses</h1>
        <Link href="/instructor/courses/new" className="rounded bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700">
          + New course
        </Link>
      </div>

      {isLoading && <p className="text-muted">Loading…</p>}

      <div className="divide-y divide-line rounded-lg border border-line">
        {data?.map((course) => (
          <Link
            key={course.id}
            href={`/instructor/courses/${course.id}`}
            className="flex items-center justify-between p-4 hover:bg-paper"
          >
            <div>
              <p className="font-medium">{course.title}</p>
              <p className="text-sm text-muted">{course.category?.name}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs ${
                course.status === "PUBLISHED"
                  ? "bg-brand-50 text-brand-700"
                  : course.status === "PENDING_APPROVAL"
                  ? "bg-accent/10 text-accent"
                  : "bg-line text-muted"
              }`}
            >
              {course.status}
            </span>
          </Link>
        ))}
      </div>

      {data?.length === 0 && <p className="mt-6 text-muted">No courses yet — create your first one above.</p>}
    </div>
  );
}
