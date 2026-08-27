"use client";

import { useState } from "react";
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

export function AssessmentBuilder({ lessonId, onCreated }: { lessonId: string; onCreated: () => void }) {
  const [title, setTitle] = useState("Knowledge Check");
  const [passPercent, setPassPercent] = useState(70);
  const [questions, setQuestions] = useState<DraftQuestion[]>([emptyQuestion("SINGLE_SELECT")]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit() {
    setError(null);
    setSaving(true);
    try {
      const payload = {
        lessonId,
        title,
        passPercent,
        questions: questions.map((q, order) => {
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
        }),
      };
      await api.post("/assessments", payload);
      onCreated();
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? "Could not save assessment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 rounded-lg border border-line bg-surface p-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm">Assessment title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-line px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">Pass percent</label>
          <input
            type="number"
            min={0}
            max={100}
            value={passPercent}
            onChange={(e) => setPassPercent(Number(e.target.value))}
            className="w-full rounded border border-line px-3 py-2 text-sm"
          />
        </div>
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="rounded border border-line p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted">{q.type.replace("_", " ")}</span>
            <button onClick={() => removeQuestion(qIndex)} className="text-xs text-danger hover:underline">
              Remove
            </button>
          </div>

          <input
            value={q.prompt}
            onChange={(e) => updateQuestion(qIndex, { prompt: e.target.value })}
            placeholder="Question prompt"
            className="mb-3 w-full rounded border border-line px-3 py-2 text-sm"
          />

          {(q.type === "SINGLE_SELECT" || q.type === "MULTI_SELECT") && (
            <div className="space-y-2">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type={q.type === "SINGLE_SELECT" ? "radio" : "checkbox"}
                    name={`correct-${qIndex}`}
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      q.type === "SINGLE_SELECT"
                        ? toggleSingleCorrect(qIndex, oIndex)
                        : updateOption(qIndex, oIndex, { isCorrect: e.target.checked })
                    }
                  />
                  <input
                    value={opt.text}
                    onChange={(e) => updateOption(qIndex, oIndex, { text: e.target.value })}
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-1 rounded border border-line px-2 py-1.5 text-sm"
                  />
                </div>
              ))}
              <button onClick={() => addOption(qIndex)} className="text-xs text-brand-600 hover:underline">
                + Add option
              </button>
            </div>
          )}

          {q.type === "TRUE_FALSE" && (
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name={`tf-${qIndex}`}
                  checked={q.correctAnswer === true}
                  onChange={() => updateQuestion(qIndex, { correctAnswer: true })}
                />
                True
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name={`tf-${qIndex}`}
                  checked={q.correctAnswer === false}
                  onChange={() => updateQuestion(qIndex, { correctAnswer: false })}
                />
                False
              </label>
            </div>
          )}

          {q.type === "FILL_BLANK" && (
            <div>
              <input
                value={q.acceptedAnswers}
                onChange={(e) => updateQuestion(qIndex, { acceptedAnswers: e.target.value })}
                placeholder="Accepted answers, comma-separated (e.g. start, next start)"
                className="w-full rounded border border-line px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-muted">Matching is case-insensitive and trims whitespace.</p>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 text-sm">
            <label className="text-muted">Points</label>
            <input
              type="number"
              min={1}
              value={q.points}
              onChange={(e) => updateQuestion(qIndex, { points: Number(e.target.value) })}
              className="w-16 rounded border border-line px-2 py-1"
            />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {(["SINGLE_SELECT", "MULTI_SELECT", "TRUE_FALSE", "FILL_BLANK"] as QType[]).map((t) => (
          <button
            key={t}
            onClick={() => addQuestion(t)}
            className="rounded border border-line px-3 py-1.5 text-xs hover:bg-paper"
          >
            + {t.replace("_", " ")}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={saving || questions.length === 0}
        className="w-full rounded bg-brand-600 py-2.5 text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {saving ? "Saving assessment…" : "Save assessment"}
      </button>
    </div>
  );
}
