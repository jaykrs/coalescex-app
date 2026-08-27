"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QuestionRenderer } from "@/components/QuestionRenderer";
import type { Assessment } from "@/types";

interface SubmitResult {
  submission: { score: number; maxScore: number; passed: boolean };
  percent: number;
}

export default function AssessmentPage() {
  // Route param is the lessonId (see course view page)
  const { id: lessonId } = useParams<{ id: string }>();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: assessmentId } = useQuery({
    queryKey: ["assessment-id", lessonId],
    queryFn: async () =>
      (await api.get<{ assessmentId: string }>(`/assessments/by-lesson/${lessonId}`)).data.assessmentId,
  });

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: async () => (await api.get<{ assessment: Assessment }>(`/assessments/${assessmentId}`)).data.assessment,
    enabled: !!assessmentId,
  });

  async function handleSubmit() {
    if (!assessmentId) return;
    setError(null);
    setSubmitting(true);
    try {
      const { data } = await api.post<SubmitResult>(`/assessments/${assessmentId}/submit`, { answers });
      setResult(data);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? "Could not submit assessment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading || !assessment) return <p className="text-muted">Loading assessment…</p>;

  if (result) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl">{result.submission.passed ? "You passed 🎉" : "Not quite there yet"}</h1>
        <p className="mt-3 text-muted">
          Score: {result.submission.score} / {result.submission.maxScore} ({result.percent}%) — pass mark{" "}
          {assessment.passPercent}%
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 rounded bg-brand-600 px-5 py-2.5 text-white hover:bg-brand-700"
        >
          Back to course
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl">{assessment.title}</h1>
      <p className="mb-6 text-sm text-muted">Pass mark: {assessment.passPercent}%</p>

      <div className="space-y-8">
        {assessment.questions.map((q, i) => (
          <div key={q.id}>
            <p className="mb-3 font-medium">
              {i + 1}. {q.prompt}
            </p>
            <QuestionRenderer
              question={q}
              value={answers[q.id]}
              onChange={(value) => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
            />
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-8 w-full rounded bg-brand-600 py-3 text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit assessment"}
      </button>
    </div>
  );
}
