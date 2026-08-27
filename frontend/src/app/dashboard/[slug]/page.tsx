"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import type { Course } from "@/types";

export default function CourseLearnPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${slug}`)).data.course,
  });

  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => (await api.get("/progress/dashboard")).data.dashboard,
  });

  if (isLoading) return <p className="text-muted">Loading…</p>;
  if (!course) return <p className="text-muted">Course not found.</p>;
  if (!course.isEnrolled) {
    return <p className="text-muted">You're not enrolled in this course yet.</p>;
  }

  const entry = dashboard?.find((d: any) => d.course.id === course.id);
  const completedLessonIds: Set<string> = new Set(entry?.completedLessonIds ?? []);

  async function toggleComplete(lessonId: string, completed: boolean) {
    await api.post("/progress", { lessonId, completed: !completed });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">{course.title}</h1>
      <div className="divide-y divide-line rounded-lg border border-line">
        {course.sections?.map((section) => (
          <div key={section.id} className="p-4">
            <h2 className="mb-2 font-medium">{section.title}</h2>
            <ul className="space-y-2">
              {section.lessons.map((lesson) => {
                const done = completedLessonIds.has(lesson.id);
                return (
                  <li
                    key={lesson.id}
                    className="flex items-center justify-between rounded border border-line/60 px-3 py-2"
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => {
                        if (lesson.contentType === "ASSESSMENT") {
                          router.push(`/assessments/${lesson.id}`);
                        } else if (lesson.contentUrl) {
                          window.open(lesson.contentUrl, "_blank");
                        }
                      }}
                    >
                      {lesson.contentType === "ASSESSMENT" ? "📝" : "▶"} {lesson.title}
                    </button>
                    {lesson.contentType !== "ASSESSMENT" && (
                      <button
                        onClick={() => toggleComplete(lesson.id, done)}
                        className={`ml-3 rounded px-2 py-1 text-xs ${
                          done ? "bg-brand-50 text-brand-700" : "border border-line text-muted"
                        }`}
                      >
                        {done ? "Completed" : "Mark complete"}
                      </button>
                    )}
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
