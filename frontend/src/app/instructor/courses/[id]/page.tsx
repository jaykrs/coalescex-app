"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Course } from "@/types";
import { AddSectionForm, AddLessonForm } from "@/components/instructor/CurriculumForms";
import { AssessmentBuilder } from "@/components/instructor/AssessmentBuilder";

export default function ManageCoursePage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [buildingAssessmentFor, setBuildingAssessmentFor] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course-manage", id],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${id}`)).data.course,
  });

  function refetch() {
    queryClient.invalidateQueries({ queryKey: ["course-manage", id] });
  }

  async function submitForReview() {
    setSubmitMessage(null);
    try {
      await api.post(`/courses/${id}/submit`);
      setSubmitMessage("Submitted for admin review.");
      refetch();
    } catch (e: any) {
      setSubmitMessage(e?.response?.data?.error?.message ?? "Could not submit for review.");
    }
  }

  if (isLoading || !course) return <p className="text-muted">Loading…</p>;

  const nextSectionOrder = course.sections?.length ?? 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl">{course.title}</h1>
          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs ${
              course.status === "PUBLISHED"
                ? "bg-brand-50 text-brand-700"
                : course.status === "PENDING_APPROVAL"
                ? "bg-accent/10 text-accent"
                : "bg-line text-muted"
            }`}
          >
            {course.status}
          </span>
        </div>
        {course.status === "DRAFT" && (
          <button
            onClick={submitForReview}
            className="rounded bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
          >
            Submit for review
          </button>
        )}
      </div>

      {submitMessage && <p className="mb-4 text-sm text-muted">{submitMessage}</p>}

      <div className="space-y-6">
        {course.sections?.map((section) => (
          <div key={section.id} className="rounded-lg border border-line">
            <div className="border-b border-line bg-paper px-4 py-3 font-medium">{section.title}</div>
            <div className="space-y-3 p-4">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="rounded border border-line/70 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {lesson.contentType === "ASSESSMENT" ? "📝" : "▶"} {lesson.title}
                      {lesson.isPreview && <span className="ml-2 text-xs text-brand-600">Preview</span>}
                    </span>
                    <span className="text-xs text-muted">{lesson.contentType}</span>
                  </div>

                  {lesson.contentType === "ASSESSMENT" && (
                    <div className="mt-3">
                      {lesson.assessment ? (
                        <p className="text-xs text-brand-700">✓ Assessment configured</p>
                      ) : buildingAssessmentFor === lesson.id ? (
                        <AssessmentBuilder
                          lessonId={lesson.id}
                          onCreated={() => {
                            setBuildingAssessmentFor(null);
                            refetch();
                          }}
                        />
                      ) : (
                        <button
                          onClick={() => setBuildingAssessmentFor(lesson.id)}
                          className="text-xs text-brand-600 hover:underline"
                        >
                          + Build assessment questions
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <AddLessonForm sectionId={section.id} nextOrder={section.lessons.length} onAdded={refetch} />
            </div>
          </div>
        ))}

        <AddSectionForm courseId={course.id} nextOrder={nextSectionOrder} onAdded={refetch} />
      </div>
    </div>
  );
}
