"use client";

import type { AssessmentQuestion } from "@/types";

interface QuestionRendererProps {
  question: AssessmentQuestion;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
}

export function QuestionRenderer({ question, value, onChange, disabled }: QuestionRendererProps) {
  switch (question.type) {
    case "SINGLE_SELECT":
    case "TRUE_FALSE":
      return (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 ${
                value === opt.id ? "border-brand-600 bg-brand-50" : "border-line"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                checked={value === opt.id}
                onChange={() => onChange(opt.id)}
                disabled={disabled}
              />
              {opt.text}
            </label>
          ))}
        </div>
      );

    case "MULTI_SELECT": {
      const selected = new Set(Array.isArray(value) ? value : []);
      return (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded border px-3 py-2 ${
                selected.has(opt.id) ? "border-brand-600 bg-brand-50" : "border-line"
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(opt.id)}
                disabled={disabled}
                onChange={(e) => {
                  const next = new Set(selected);
                  if (e.target.checked) next.add(opt.id);
                  else next.delete(opt.id);
                  onChange([...next]);
                }}
              />
              {opt.text}
            </label>
          ))}
        </div>
      );
    }

    case "FILL_BLANK":
      return (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Type your answer…"
          className="w-full rounded border border-line px-3 py-2"
        />
      );

    default:
      return null;
  }
}
