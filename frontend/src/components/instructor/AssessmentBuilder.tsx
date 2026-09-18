"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";

type QType = "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "FILL_BLANK";

interface DraftOption {
  text: string;
  isCorrect: boolean;
}

interface DraftQuestion {
  type: QType;
  prompt: string;
  points: number;
  options: DraftOption[]; // used for SINGLE_SELECT / MULTI_SELECT
  correctAnswer?: boolean; // TRUE_FALSE
  acceptedAnswers?: string; // FILL_BLANK, comma-separated
}

function emptyQuestion(type: QType): DraftQuestion {
  if (type === "TRUE_FALSE") return { type, prompt: "", points: 1, options: [], correctAnswer: true };
  if (type === "FILL_BLANK") return { type, prompt: "", points: 1, options: [], acceptedAnswers: "" };
  return {
    type,
    prompt: "",
    points: 1,
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  };
}

export function AssessmentBuilder({
  lessonId,
  initialAssessmentId,
  onCreated,
  onCancel,
}: {
  lessonId: string;
  initialAssessmentId?: string | null;
  onCreated: () => void;
  onCancel?: () => void;
}) {
  const [assessmentId, setAssessmentId] = useState<string | null>(initialAssessmentId ?? null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [title, setTitle] = useState("Knowledge Check");
  const [passPercent, setPassPercent] = useState(70);
  const [questions, setQuestions] = useState<DraftQuestion[]>([emptyQuestion("SINGLE_SELECT")]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchExisting() {
      setLoadingInitial(true);
      try {
        const { data } = await api.get<{ assessment: any }>(`/assessments/by-lesson/${lessonId}/manage`);
        if (!isMounted) return;
        if (data?.assessment) {
          setAssessmentId(data.assessment.id);
          setTitle(data.assessment.title || "Knowledge Check");
          setPassPercent(data.assessment.passPercent ?? 70);
          if (Array.isArray(data.assessment.questions) && data.assessment.questions.length > 0) {
            const mapped: DraftQuestion[] = data.assessment.questions.map((q: any) => {
              if (q.type === "TRUE_FALSE") {
                const trueOpt = q.options?.find((o: any) => o.text === "True");
                return {
                  type: "TRUE_FALSE",
                  prompt: q.prompt || "",
                  points: q.points ?? 1,
                  options: [],
                  correctAnswer: trueOpt ? !!trueOpt.isCorrect : true,
                };
              }
              if (q.type === "FILL_BLANK") {
                const answers = Array.isArray(q.acceptedAnswers)
                  ? q.acceptedAnswers.join(", ")
                  : typeof q.acceptedAnswers === "string"
                  ? q.acceptedAnswers
                  : "";
                return {
                  type: "FILL_BLANK",
                  prompt: q.prompt || "",
                  points: q.points ?? 1,
                  options: [],
                  acceptedAnswers: answers,
                };
              }
              return {
                type: q.type,
                prompt: q.prompt || "",
                points: q.points ?? 1,
                options:
                  Array.isArray(q.options) && q.options.length > 0
                    ? q.options.map((o: any) => ({ text: o.text || "", isCorrect: !!o.isCorrect }))
                    : [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                      ],
              };
            });
            setQuestions(mapped);
          }
        }
      } catch {
        // No existing assessment or error fetching, keep defaults
      } finally {
        if (isMounted) setLoadingInitial(false);
      }
    }

    fetchExisting();
    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  function updateQuestion(index: number, patch: Partial<DraftQuestion>) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  function addQuestion(type: QType) {
    setQuestions((prev) => [...prev, emptyQuestion(type)]);
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function updateOption(qIndex: number, oIndex: number, patch: Partial<DraftOption>) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.map((o, j) => (j === oIndex ? { ...o, ...patch } : o)) } : q
      )
    );
  }

  function toggleSingleCorrect(qIndex: number, oIndex: number) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.map((o, j) => ({ ...o, isCorrect: j === oIndex })) } : q
      )
    );
  }

  function addOption(qIndex: number) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, options: [...q.options, { text: "", isCorrect: false }] } : q))
    );
  }

  function removeOption(qIndex: number, oIndex: number) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.filter((_, j) => j !== oIndex) } : q
      )
    );
  }

  function validateForm(): string | null {
    if (!title.trim()) {
      return "Please enter an assessment title.";
    }
    if (passPercent < 0 || passPercent > 100) {
      return "Pass percent must be between 0 and 100.";
    }
    if (questions.length === 0) {
      return "Please add at least one question.";
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qNum = i + 1;

      if (!q.prompt.trim()) {
        return `Question #${qNum}: Question prompt cannot be empty.`;
      }

      if (q.type === "SINGLE_SELECT") {
        if (q.options.length < 2) {
          return `Question #${qNum}: Please provide at least 2 options.`;
        }
        for (let j = 0; j < q.options.length; j++) {
          if (!q.options[j].text.trim()) {
            return `Question #${qNum}: Option #${j + 1} text cannot be empty.`;
          }
        }
        const correctCount = q.options.filter((o) => o.isCorrect).length;
        if (correctCount === 0) {
          return `Question #${qNum}: Please select which option is the correct answer (click the radio button).`;
        }
        if (correctCount > 1) {
          return `Question #${qNum}: Single select questions must have only 1 correct answer.`;
        }
      }

      if (q.type === "MULTI_SELECT") {
        if (q.options.length < 2) {
          return `Question #${qNum}: Please provide at least 2 options.`;
        }
        for (let j = 0; j < q.options.length; j++) {
          if (!q.options[j].text.trim()) {
            return `Question #${qNum}: Option #${j + 1} text cannot be empty.`;
          }
        }
        const hasCorrect = q.options.some((o) => o.isCorrect);
        if (!hasCorrect) {
          return `Question #${qNum}: Please select at least one correct option checkbox.`;
        }
      }

      if (q.type === "FILL_BLANK") {
        if (!q.acceptedAnswers?.trim()) {
          return `Question #${qNum}: Please provide at least one accepted answer.`;
        }
      }
    }

    return null;
  }

  async function handleSubmit() {
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try {
      const payloadQuestions = questions.map((q, order) => {
        if (q.type === "TRUE_FALSE") {
          return { type: q.type, prompt: q.prompt, order, points: q.points, correctAnswer: !!q.correctAnswer };
        }
        if (q.type === "FILL_BLANK") {
          return {
            type: q.type,
            prompt: q.prompt,
            order,
            points: q.points,
            acceptedAnswers: (q.acceptedAnswers ?? "")
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean),
          };
        }
        return {
          type: q.type,
          prompt: q.prompt,
          order,
          points: q.points,
          options: q.options.map((o, oi) => ({ text: o.text, isCorrect: o.isCorrect, order: oi })),
        };
      });

      if (assessmentId) {
        await api.put(`/assessments/${assessmentId}`, {
          title,
          passPercent,
          questions: payloadQuestions,
        });
      } else {
        await api.post("/assessments", {
          lessonId,
          title,
          passPercent,
          questions: payloadQuestions,
        });
      }

      onCreated();
    } catch (e: any) {
      const errorObj = e?.response?.data?.error;
      let msg = errorObj?.message ?? "Could not save assessment.";
      const fieldErrors = errorObj?.details?.fieldErrors;
      if (fieldErrors && typeof fieldErrors === "object" && Object.keys(fieldErrors).length > 0) {
        const details = Object.entries(fieldErrors)
          .map(([_, msgs]: [string, any]) => `${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" • ");
        msg = `${msg}: ${details}`;
      }
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  if (loadingInitial) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6 text-center text-sm text-muted">
        <span className="animate-spin inline-block mr-2">⏳</span>
        Loading existing assessment questions...
      </div>
    );
  }

  const totalPoints = questions.reduce((sum, q) => sum + (Number(q.points) || 1), 0);

  return (
    <div className="space-y-6 rounded-lg border border-brand-200 bg-surface p-5 shadow-xs">
      {/* Header with Edit / Create Indicator */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <div>
            <h3 className="text-sm font-semibold text-ink">
              {assessmentId ? "Edit Assessment & Questions" : "Build Assessment Questions"}
            </h3>
            <p className="text-xs text-muted">
              {assessmentId
                ? "Update questions, points, correct answers, or add new questions below."
                : "Create quiz questions and define passing criteria for this lesson."}
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-line px-2.5 py-1 text-xs text-muted hover:bg-paper transition cursor-pointer"
          >
            ✕ Close
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Assessment Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Module 1 Knowledge Check"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink">Pass Percentage (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={passPercent}
            onChange={(e) => setPassPercent(Number(e.target.value))}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="rounded-lg border border-line/80 bg-paper/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {qIndex + 1}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  {q.type.replace("_", " ")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="text-xs text-danger hover:underline cursor-pointer"
              >
                ✕ Remove Question
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Question Prompt</label>
              <textarea
                rows={2}
                value={q.prompt}
                onChange={(e) => updateQuestion(qIndex, { prompt: e.target.value })}
                placeholder="Type your question prompt here..."
                className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
              />
            </div>

            {(q.type === "SINGLE_SELECT" || q.type === "MULTI_SELECT") && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted">
                  Options:{" "}
                  <span className="font-normal">
                    {q.type === "SINGLE_SELECT"
                      ? "Select the single radio button next to the correct answer."
                      : "Check all checkboxes that are correct answers."}
                  </span>
                </div>
                {q.options.map((opt, oIndex) => (
                  <div
                    key={oIndex}
                    className={`flex items-center gap-2 rounded-md border p-2.5 transition-all ${
                      opt.isCorrect
                        ? "border-emerald-400 bg-emerald-50/50 ring-1 ring-emerald-300"
                        : "border-line bg-surface"
                    }`}
                  >
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type={q.type === "SINGLE_SELECT" ? "radio" : "checkbox"}
                        name={`correct-${qIndex}`}
                        checked={opt.isCorrect}
                        onChange={(e) =>
                          q.type === "SINGLE_SELECT"
                            ? toggleSingleCorrect(qIndex, oIndex)
                            : updateOption(qIndex, oIndex, { isCorrect: e.target.checked })
                        }
                        className="accent-brand-600 h-4 w-4"
                      />
                      <span className="text-xs text-muted font-mono">{String.fromCharCode(65 + oIndex)}.</span>
                    </label>
                    <input
                      value={opt.text}
                      onChange={(e) => updateOption(qIndex, oIndex, { text: e.target.value })}
                      placeholder={`Option ${String.fromCharCode(65 + oIndex)} text...`}
                      className="flex-1 bg-transparent text-sm text-ink focus:outline-none"
                    />
                    {q.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="text-xs text-muted hover:text-danger px-1 cursor-pointer"
                        title="Remove option"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="mt-1 text-xs font-medium text-brand-600 hover:underline cursor-pointer"
                >
                  + Add Another Option
                </button>
              </div>
            )}

            {q.type === "TRUE_FALSE" && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted">Correct Answer:</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${qIndex}`}
                      checked={q.correctAnswer === true}
                      onChange={() => updateQuestion(qIndex, { correctAnswer: true })}
                      className="accent-brand-600 h-4 w-4"
                    />
                    True
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${qIndex}`}
                      checked={q.correctAnswer === false}
                      onChange={() => updateQuestion(qIndex, { correctAnswer: false })}
                      className="accent-brand-600 h-4 w-4"
                    />
                    False
                  </label>
                </div>
              </div>
            )}

            {q.type === "FILL_BLANK" && (
              <div>
                <label className="block text-xs font-medium text-muted mb-1">
                  Accepted Answers (comma-separated):
                </label>
                <input
                  value={q.acceptedAnswers}
                  onChange={(e) => updateQuestion(qIndex, { acceptedAnswers: e.target.value })}
                  placeholder="e.g. React, reactjs, React.js"
                  className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
                />
                <p className="mt-1 text-xs text-muted">Matching is case-insensitive and trims whitespace.</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1 text-xs text-muted border-t border-line/40">
              <label>Points awarded:</label>
              <input
                type="number"
                min={1}
                value={q.points}
                onChange={(e) => updateQuestion(qIndex, { points: Number(e.target.value) || 1 })}
                className="w-16 rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand-600 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-line bg-paper/20 p-3 space-y-2">
        <span className="text-xs font-semibold text-ink block">+ Add Question to Assessment:</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => addQuestion("SINGLE_SELECT")}
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper transition cursor-pointer"
          >
            + Single Select (Radio)
          </button>
          <button
            type="button"
            onClick={() => addQuestion("MULTI_SELECT")}
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper transition cursor-pointer"
          >
            + Multi Select (Checkboxes)
          </button>
          <button
            type="button"
            onClick={() => addQuestion("TRUE_FALSE")}
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper transition cursor-pointer"
          >
            + True / False
          </button>
          <button
            type="button"
            onClick={() => addQuestion("FILL_BLANK")}
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper transition cursor-pointer"
          >
            + Fill in the Blank
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-danger/30 bg-danger/10 p-3 text-xs text-danger">
          {error}
        </div>
      )}

      {/* Footer stats & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-line">
        <span className="text-xs text-muted">
          Total Questions: <strong className="text-ink">{questions.length}</strong> · Total Points:{" "}
          <strong className="text-ink">{totalPoints}</strong> · Passing Score:{" "}
          <strong className="text-brand-600">{passPercent}%</strong>
        </span>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-line px-4 py-2 text-xs font-medium text-muted hover:bg-paper transition cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || questions.length === 0}
            className="rounded-md bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-700 disabled:opacity-50 transition cursor-pointer"
          >
            {saving
              ? "Saving changes…"
              : assessmentId
              ? "✓ Save Assessment Changes"
              : "✓ Create Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}
