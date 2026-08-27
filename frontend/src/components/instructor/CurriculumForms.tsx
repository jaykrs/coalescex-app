"use client";

import { useState } from "react";
import { api } from "@/lib/api-client";

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

const CONTENT_TYPES = ["VIDEO", "ARTICLE", "PDF", "ASSESSMENT"] as const;

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
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await api.post(`/courses/sections/${sectionId}/lessons`, {
        title,
        order: nextOrder,
        contentType,
        contentUrl: contentType !== "ASSESSMENT" && contentUrl ? contentUrl : undefined,
        isPreview,
      });
      setTitle("");
      setContentUrl("");
      setOpen(false);
      onAdded();
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
    <form onSubmit={handleSubmit} className="space-y-2 rounded border border-line p-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title"
        className="w-full rounded border border-line px-2 py-1.5 text-sm"
      />
      <div className="flex gap-2">
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value as (typeof CONTENT_TYPES)[number])}
          className="rounded border border-line px-2 py-1.5 text-sm"
        >
          {CONTENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {contentType !== "ASSESSMENT" && (
          <input
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            placeholder="Content URL"
            className="flex-1 rounded border border-line px-2 py-1.5 text-sm"
          />
        )}
        <label className="flex items-center gap-1 text-xs text-muted">
          <input type="checkbox" checked={isPreview} onChange={(e) => setIsPreview(e.target.checked)} />
          Free preview
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add lesson"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-muted">
          Cancel
        </button>
      </div>
      {contentType === "ASSESSMENT" && (
        <p className="text-xs text-muted">
          You'll build the questions for this assessment after adding the lesson.
        </p>
      )}
    </form>
  );
}
