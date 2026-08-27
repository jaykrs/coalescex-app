"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import type { Category } from "@/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    discountPrice: "",
    level: "Beginner",
    categoryId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<{ categories: Category[] }>("/categories")).data.categories,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { data } = await api.post("/courses", {
        title: form.title,
        slug: slugify(form.title),
        subtitle: form.subtitle || undefined,
        description: form.description,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        level: form.level,
        categoryId: form.categoryId,
      });
      router.push(`/instructor/courses/${data.course.id}`);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? "Could not create course.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl">Create a new course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded border border-line px-3 py-2"
          />
          {form.title && <p className="mt-1 text-xs text-muted">Slug: {slugify(form.title)}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm">Subtitle</label>
          <input
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full rounded border border-line px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            required
            minLength={10}
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded border border-line px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm">Price ($)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded border border-line px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Discount price ($, optional)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.discountPrice}
              onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
              className="w-full rounded border border-line px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm">Level</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full rounded border border-line px-3 py-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Category</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full rounded border border-line px-3 py-2"
            >
              <option value="">Select…</option>
              {Array.isArray(categories) && categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-brand-600 py-2.5 text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Creating…" : "Create course (draft)"}
        </button>
      </form>
    </div>
  );
}
