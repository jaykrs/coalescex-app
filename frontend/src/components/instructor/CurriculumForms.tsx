"use client";

import { useState } from "react";
import { api } from "@/lib/api-client";
import { HtmlEditor } from "@/components/HtmlEditor";
import { parsePracticeContent } from "@/components/learning/CodePracticeCompiler";

export function AddSectionForm({ courseId, nextOrder, onAdded }: { courseId: string; nextOrder: number; onAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await api.post(`/courses/${courseId}/sections`, { title, order: nextOrder });
      setTitle("");
      onAdded();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 rounded-lg border border-dashed border-line p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New section title (e.g. Module 2: Routing)"
        className="flex-1 rounded border border-line px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
      >
        Add section
      </button>
    </form>
  );
}

const CONTENT_TYPES = ["VIDEO", "ARTICLE", "PDF", "ASSESSMENT", "PRACTICE"] as const;

export function AddLessonForm({
  sectionId,
  nextOrder,
  onAdded,
}: {
  sectionId: string;
  nextOrder: number;
  onAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState<(typeof CONTENT_TYPES)[number]>("VIDEO");
  const [contentUrl, setContentUrl] = useState("");
  const [practiceQuestion, setPracticeQuestion] = useState("");
  const [practiceStarterCode, setPracticeStarterCode] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setErrorMessage(null);
    try {
      let resolvedContentUrl: string | undefined = undefined;
      if (contentType === "PRACTICE") {
        resolvedContentUrl = JSON.stringify({
          question: practiceQuestion.trim(),
          starterCode: practiceStarterCode.trim(),
        });
      } else if (contentType !== "ASSESSMENT" && contentUrl.trim()) {
        resolvedContentUrl = contentUrl.trim();
      }

      await api.post(`/courses/sections/${sectionId}/lessons`, {
        title: title.trim(),
        order: nextOrder,
        contentType,
        contentUrl: resolvedContentUrl,
        isPreview,
      });
      setTitle("");
      setContentUrl("");
      setPracticeQuestion("");
      setPracticeStarterCode("");
      setOpen(false);
      onAdded();
    } catch (err: any) {
      console.error("Add lesson error:", err);
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add lesson. Please check server logs.";
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-brand-600 hover:underline">
        + Add lesson
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-line bg-surface p-3.5 shadow-xs">
      {errorMessage && (
        <div className="rounded-md bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 font-medium">
          ✕ {errorMessage}
        </div>
      )}
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title (e.g. Setting Up Project Environment)"
        className="w-full rounded border border-line px-2.5 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
      />

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={contentType}
          onChange={(e) => {
            const nextType = e.target.value as (typeof CONTENT_TYPES)[number];
            setContentType(nextType);
            setContentUrl("");
          }}
          className="rounded border border-line bg-surface px-2.5 py-1.5 text-sm font-medium focus:border-brand-600 focus:outline-none cursor-pointer"
        >
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t === "PRACTICE" ? "PRACTICE (Compiler)" : t}
            </option>
          ))}
        </select>

        {(contentType === "VIDEO" || contentType === "PDF") && (
          <input
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            placeholder={contentType === "VIDEO" ? "Video URL (e.g. YouTube, Vimeo, S3)" : "PDF Document URL"}
            className="flex-1 min-w-[200px] rounded border border-line px-2.5 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
          />
        )}

        <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer ml-auto">
          <input type="checkbox" checked={isPreview} onChange={(e) => setIsPreview(e.target.checked)} className="rounded" />
          Free preview
        </label>
      </div>

      {contentType === "ARTICLE" && (
        <div className="space-y-1 pt-1">
          <label className="block text-xs font-medium text-ink">
            Article Content (Rich Text / HTML Editor)
          </label>
          <HtmlEditor
            value={contentUrl}
            onChange={(val) => setContentUrl(val)}
            placeholder="Write full article / lesson notes with headings, formatting, and code snippets..."
            minHeight="250px"
          />
        </div>
      )}

      {contentType === "ASSESSMENT" && (
        <p className="rounded bg-paper p-2 text-xs text-muted">
          📝 You'll build the questions for this assessment after adding the lesson.
        </p>
      )}

      {contentType === "PRACTICE" && (
        <div className="space-y-3 pt-1 rounded-lg border border-purple-200 bg-purple-50/20 p-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-ink">
                📝 Problem Statement / Question (Always visible to student)
              </label>
              <span className="text-[11px] text-purple-700 font-medium">
                Live IDE Practice
              </span>
            </div>
            <textarea
              rows={4}
              value={practiceQuestion}
              onChange={(e) => setPracticeQuestion(e.target.value)}
              placeholder="e.g. Write a program to demo dynamic array.&#10;Requirements:&#10;1. Initialize a dynamic array&#10;2. Add elements dynamically&#10;3. Print elements and length"
              className="w-full text-xs rounded border border-line bg-surface p-2.5 text-ink focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-ink">
                💻 Starter Code / Boilerplate (Optional)
              </label>
              <span className="text-[11px] text-muted">
                Leave empty for default language template
              </span>
            </div>
            <textarea
              rows={4}
              value={practiceStarterCode}
              onChange={(e) => setPracticeStarterCode(e.target.value)}
              placeholder="// Optional: provide initial starter code or boilerplate for students&#10;console.log('Start coding here...');"
              className="w-full font-mono text-xs rounded border border-line bg-surface p-2.5 text-ink focus:border-brand-600 focus:outline-none"
            />
          </div>

          <p className="text-[11px] text-muted">
            ⚡ Students will see the Question permanently on the right, and can test their solution in JavaScript, Python, or Java in real-time.
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-brand-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 transition"
        >
          {saving ? "Saving…" : "Add lesson"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setTitle("");
            setContentUrl("");
          }}
          className="rounded border border-line px-3 py-1.5 text-sm text-muted hover:bg-paper"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function EditLessonForm({
  lesson,
  onUpdated,
  onCancel,
}: {
  lesson: {
    id: string;
    title: string;
    contentType: (typeof CONTENT_TYPES)[number];
    contentUrl?: string | null;
    isPreview: boolean;
  };
  onUpdated: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(lesson.title);
  const [contentType, setContentType] = useState<(typeof CONTENT_TYPES)[number]>(lesson.contentType);
  const [contentUrl, setContentUrl] = useState(lesson.contentUrl || "");
  const initialPractice = parsePracticeContent(lesson.contentUrl, lesson.title);
  const [practiceQuestion, setPracticeQuestion] = useState(
    initialPractice.question &&
      initialPractice.question !== "Solve the practice problem below according to the lesson objective."
      ? initialPractice.question
      : ""
  );
  const [practiceStarterCode, setPracticeStarterCode] = useState(initialPractice.starterCode || "");
  const [isPreview, setIsPreview] = useState(lesson.isPreview);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setErrorMessage(null);
    try {
      let resolvedContentUrl: string | undefined = undefined;
      if (contentType === "PRACTICE") {
        resolvedContentUrl = JSON.stringify({
          question: practiceQuestion.trim(),
          starterCode: practiceStarterCode.trim(),
        });
      } else if (contentType !== "ASSESSMENT" && contentUrl.trim()) {
        resolvedContentUrl = contentUrl.trim();
      }

      await api.patch(`/courses/lessons/${lesson.id}`, {
        title: title.trim(),
        contentType,
        contentUrl: resolvedContentUrl,
        isPreview,
      });
      onUpdated();
    } catch (err: any) {
      console.error("Update lesson error:", err);
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update lesson. Please check server logs.";
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-brand-300 bg-brand-50/20 p-3.5 shadow-xs my-2">
      <div className="flex items-center justify-between border-b border-line pb-1.5">
        <span className="text-xs font-semibold text-brand-700">Edit Lesson</span>
        <button type="button" onClick={onCancel} className="text-xs text-muted hover:text-ink">
          ✕ Close
        </button>
      </div>

      {errorMessage && (
        <div className="rounded-md bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 font-medium">
          ✕ {errorMessage}
        </div>
      )}

      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title"
        className="w-full rounded border border-line bg-surface px-2.5 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
      />

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={contentType}
          onChange={(e) => {
            const nextType = e.target.value as (typeof CONTENT_TYPES)[number];
            setContentType(nextType);
          }}
          className="rounded border border-line bg-surface px-2.5 py-1.5 text-sm font-medium focus:border-brand-600 focus:outline-none cursor-pointer"
        >
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t === "PRACTICE" ? "PRACTICE (Compiler)" : t}
            </option>
          ))}
        </select>

        {(contentType === "VIDEO" || contentType === "PDF") && (
          <input
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            placeholder={contentType === "VIDEO" ? "Video URL (e.g. YouTube, Vimeo, S3)" : "PDF Document URL"}
            className="flex-1 min-w-[200px] rounded border border-line bg-surface px-2.5 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
          />
        )}

        <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer ml-auto">
          <input
            type="checkbox"
            checked={isPreview}
            onChange={(e) => setIsPreview(e.target.checked)}
            className="rounded"
          />
          Free preview
        </label>
      </div>

      {contentType === "ARTICLE" && (
        <div className="space-y-1 pt-1">
          <label className="block text-xs font-medium text-ink">
            Article Content (Rich Text / HTML Editor)
          </label>
          <HtmlEditor
            value={contentUrl}
            onChange={(val) => setContentUrl(val)}
            placeholder="Write full article / lesson notes..."
            minHeight="220px"
          />
        </div>
      )}

      {contentType === "PRACTICE" && (
        <div className="space-y-3 pt-1 rounded-lg border border-purple-200 bg-purple-50/20 p-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-ink">
                📝 Problem Statement / Question (Always visible to student)
              </label>
              <span className="text-[11px] text-purple-700 font-medium">
                Live IDE Practice
              </span>
            </div>
            <textarea
              rows={4}
              value={practiceQuestion}
              onChange={(e) => setPracticeQuestion(e.target.value)}
              placeholder="e.g. Write a program to demo dynamic array.&#10;Requirements:&#10;1. Initialize a dynamic array&#10;2. Add elements dynamically&#10;3. Print elements and length"
              className="w-full text-xs rounded border border-line bg-surface p-2.5 text-ink focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-ink">
                💻 Starter Code / Boilerplate (Optional)
              </label>
              <span className="text-[11px] text-muted">
                Leave empty for default language template
              </span>
            </div>
            <textarea
              rows={4}
              value={practiceStarterCode}
              onChange={(e) => setPracticeStarterCode(e.target.value)}
              placeholder="// Optional: provide initial starter code or boilerplate for students&#10;console.log('Start coding here...');"
              className="w-full font-mono text-xs rounded border border-line bg-surface p-2.5 text-ink focus:border-brand-600 focus:outline-none"
            />
          </div>

          <p className="text-[11px] text-muted">
            ⚡ Students will see the Question permanently on the right, and can test their solution in JavaScript, Python, or Java in real-time.
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-brand-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 transition"
        >
          {saving ? "Saving changes…" : "Save Lesson"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-line px-3 py-1.5 text-sm text-muted hover:bg-paper"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
