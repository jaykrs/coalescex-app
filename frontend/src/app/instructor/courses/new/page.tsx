"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { Category, CourseType } from "@/types";
import { HtmlEditor } from "@/components/HtmlEditor";
import {
  HERO_TEMPLATES,
  OUTCOME_TEMPLATES,
  ACCESSORY_TEMPLATES,
  buildDynamicHeroHtml,
  buildDynamicOutcomeHtml,
  buildDynamicAccessoryHtml,
  detectHeroPosition,
  detectOutcomePosition,
  detectAccessoryPosition,
  type TemplatePosition,
} from "@/lib/course-templates";

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
    thumbnailUrl: "",
    outcomeImageUrl: "",
    accessoryImageUrl: "",
    description: "",
    heroHtml: "",
    outcomesHtml: "",
    accessoriesHtml: "",
    type: "ONLINE" as CourseType,
    price: "",
    discountPrice: "",
    level: "Beginner",
    categoryId: "",
  });
  const [selectedHeroPos, setSelectedHeroPos] = useState<TemplatePosition | "">("");
  const [selectedOutcomePos, setSelectedOutcomePos] = useState<TemplatePosition | "">("");
  const [selectedAccessoryPos, setSelectedAccessoryPos] = useState<TemplatePosition | "">("");

  // SECTION 8: FAQ State (Interactive Form & Raw JSON)
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
  const [faqJsonMode, setFaqJsonMode] = useState(false);
  const [faqJsonText, setFaqJsonText] = useState("");
  const [faqJsonError, setFaqJsonError] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleHeroPositionChange(pos: TemplatePosition) {
    setSelectedHeroPos(pos);
    if (!pos) return;
    const categoryObj = categoryList.find((c) => c.id === form.categoryId);
    const dynamicHero = buildDynamicHeroHtml({
      title: form.title || undefined,
      subtitle: form.subtitle || undefined,
      categoryName: categoryObj?.name || undefined,
      level: form.level || undefined,
      price: form.price || undefined,
      discountPrice: form.discountPrice || undefined,
      imageUrl: form.thumbnailUrl || undefined,
      position: pos,
    });
    setForm((prev) => ({ ...prev, heroHtml: dynamicHero }));
  }

  function handleRefreshHero() {
    let pos = selectedHeroPos;
    if (!pos) {
      pos = detectHeroPosition(form.heroHtml) || (form.thumbnailUrl?.trim() ? "right" : "none");
      setSelectedHeroPos(pos);
    }
    handleHeroPositionChange(pos as TemplatePosition);
  }

  function handleOutcomePositionChange(pos: TemplatePosition) {
    setSelectedOutcomePos(pos);
    if (!pos) return;
    const dynamicOutcome = buildDynamicOutcomeHtml({
      imageUrl: form.outcomeImageUrl || undefined,
      position: pos,
    });
    setForm((prev) => ({ ...prev, outcomesHtml: dynamicOutcome }));
  }

  function handleRefreshOutcome() {
    let pos = selectedOutcomePos;
    if (!pos) {
      pos = detectOutcomePosition(form.outcomesHtml) || (form.outcomeImageUrl?.trim() ? "center" : "none");
      setSelectedOutcomePos(pos);
    }
    handleOutcomePositionChange(pos as TemplatePosition);
  }

  function handleAccessoryPositionChange(pos: TemplatePosition) {
    setSelectedAccessoryPos(pos);
    if (!pos) return;
    const dynamicAccessory = buildDynamicAccessoryHtml({
      imageUrl: form.accessoryImageUrl || undefined,
      position: pos,
    });
    setForm((prev) => ({ ...prev, accessoriesHtml: dynamicAccessory }));
  }

  function handleRefreshAccessory() {
    let pos = selectedAccessoryPos;
    if (!pos) {
      pos = detectAccessoryPosition(form.accessoriesHtml) || (form.accessoryImageUrl?.trim() ? "center" : "none");
      setSelectedAccessoryPos(pos);
    }
    handleAccessoryPositionChange(pos as TemplatePosition);
  }

  function addFaqItem() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }

  function updateFaqItem(index: number, field: "question" | "answer", val: string) {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  }

  function removeFaqItem(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  function loadSampleFaqs() {
    const samples = [
      {
        question: "Is this course really 100% online? Do I need to attend in person?",
        answer:
          "Yes! This course is completely online. You can access all video lessons, code labs, readings, and assessments on your own schedule from any device.",
      },
      {
        question: "What are the prerequisites for this course?",
        answer:
          "A basic understanding of modern computer usage and programming fundamentals is recommended. Everything else is taught step-by-step from the ground up.",
      },
      {
        question: "Will I receive a verified certificate upon completion?",
        answer:
          "Yes! When you complete all lessons, assignments, and passing quizzes, you will receive an official verifiable digital certificate to share on LinkedIn and your resume.",
      },
      {
        question: "How long do I have access to the course content?",
        answer:
          "You receive full lifetime access to all course materials, code repositories, and future syllabus updates at no extra cost.",
      },
    ];
    setFaqs(samples);
    setFaqJsonText(JSON.stringify(samples, null, 2));
  }

  function toggleFaqJsonMode() {
    if (!faqJsonMode) {
      setFaqJsonText(JSON.stringify(faqs, null, 2));
      setFaqJsonError(null);
      setFaqJsonMode(true);
    } else {
      try {
        const parsed = JSON.parse(faqJsonText || "[]");
        if (Array.isArray(parsed)) {
          const validated = parsed.map((item: any) => ({
            question: String(item.question || ""),
            answer: String(item.answer || ""),
          }));
          setFaqs(validated);
          setFaqJsonError(null);
          setFaqJsonMode(false);
        } else {
          setFaqJsonError("JSON must be an array of { question, answer } objects.");
        }
      } catch (err: any) {
        setFaqJsonError(`Invalid JSON format: ${err.message}`);
      }
    }
  }

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<{ categories: Category[] }>("/categories")).data.categories,
  });

  const categoryList: Category[] = Array.isArray(categories)
    ? categories
    : Array.isArray((categories as any)?.categories)
    ? (categories as any).categories
    : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate HTML description
    const strippedDescription = form.description.replace(/<[^>]*>/g, "").trim();
    if (strippedDescription.length < 10) {
      setError("Please provide a descriptive course overview (at least 10 characters).");
      return;
    }

    if (!form.categoryId) {
      setError("Please select a category for this course.");
      return;
    }

    setSaving(true);
    try {
      let cleanFaqs = faqs;
      if (faqJsonMode) {
        try {
          cleanFaqs = JSON.parse(faqJsonText || "[]");
        } catch {
          // fallback
        }
      }
      const validFaqs = cleanFaqs.filter((f) => f.question?.trim() && f.answer?.trim());

      const { data } = await api.post("/courses", {
        title: form.title,
        slug: slugify(form.title),
        subtitle: form.subtitle || undefined,
        thumbnailUrl: form.thumbnailUrl?.trim() ? form.thumbnailUrl.trim() : undefined,
        outcomeImageUrl: form.outcomeImageUrl?.trim() ? form.outcomeImageUrl.trim() : undefined,
        accessoryImageUrl: form.accessoryImageUrl?.trim() ? form.accessoryImageUrl.trim() : undefined,
        description: form.description,
        heroHtml: form.heroHtml ? form.heroHtml : undefined,
        outcomesHtml: form.outcomesHtml ? form.outcomesHtml : undefined,
        accessoriesHtml: form.accessoriesHtml ? form.accessoriesHtml : undefined,
        faqs: validFaqs.length > 0 ? validFaqs : undefined,
        type: form.type,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        level: form.level,
        categoryId: form.categoryId,
      });
      router.push(`/instructor/courses/${data.course.id}`);
    } catch (err: any) {
      const errorObj = err?.response?.data?.error;
      let msg = errorObj?.message ?? "Could not create course.";
      const fieldErrors = errorObj?.details?.fieldErrors;
      if (fieldErrors && typeof fieldErrors === "object" && Object.keys(fieldErrors).length > 0) {
        const details = Object.entries(fieldErrors)
          .map(([f, msgs]: [string, any]) => `${f}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join("; ");
        msg = `${msg} → ${details}`;
      }
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  const calculatedDiscountPercent =
    form.price && form.discountPrice && Number(form.price) > Number(form.discountPrice)
      ? Math.round(((Number(form.price) - Number(form.discountPrice)) / Number(form.price)) * 100)
      : null;

  return (
    <div className="mx-auto px-6 pb-16">
      {/* Top Breadcrumb / Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/instructor/courses"
            className="mb-2 inline-flex items-center text-xs font-medium text-muted hover:text-brand-600 transition"
          >
            ← Back to all courses
          </Link>
          <h1 className="text-3xl font-normal leading-tight text-ink">Create New Course</h1>
          <p className="mt-1 text-sm text-muted">
            Configure delivery format, classification, pricing, and rich formatted curriculum details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: Basic Information */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <h2 className="mb-4 text-lg font-semibold text-ink border-b border-line pb-2">
            1. Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="mb-1 block text-sm font-medium text-ink">
                  Course Title <span className="text-danger">*</span>
                </label>
                {form.title && (
                  <span className="text-xs text-muted">
                    Slug: <code className="rounded bg-paper px-1.5 py-0.5 text-ink">{slugify(form.title)}</code>
                  </span>
                )}
              </div>
              <input
                required
                type="text"
                placeholder="e.g. Full-Stack Web Development Mastery"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                Subtitle / Short Summary <span className="text-xs font-normal text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Master modern JavaScript, React, Node.js, and cloud deployment with hands-on labs."
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Course Format & Classification */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <h2 className="mb-4 text-lg font-semibold text-ink border-b border-line pb-2">
            2. Course Format &amp; Classification
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Course Type Dropdown */}
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                Course Type <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as CourseType })}
                  className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-ink transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
                >
                  <option value="ONLINE">Online (Self-Paced / Remote)</option>
                  <option value="OFFLINE">Offline (In-Person Classroom)</option>
                  <option value="BOOTCAMP">Bootcamp (Intensive / Cohort)</option>
                </select>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                {form.type === "ONLINE" && "🌐 Students learn asynchronously or via remote lessons."}
                {form.type === "OFFLINE" && "🏛️ Physical in-person classroom or campus workshop."}
                {form.type === "BOOTCAMP" && "🚀 Immersive, career-focused intensive live training."}
              </p>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                Category <span className="text-danger">*</span>
              </label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
              >
                <option value="">{loadingCategories ? "Loading categories…" : "Select category…"}</option>
                {categoryList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted">Primary domain this course belongs to.</p>
            </div>

            {/* Difficulty Level Dropdown */}
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                Difficulty Level <span className="text-danger">*</span>
              </label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
              <p className="mt-1.5 text-xs text-muted">Recommended audience proficiency.</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Pricing */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <h2 className="mb-4 text-lg font-semibold text-ink border-b border-line pb-2">
            3. Pricing (INR ₹)
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                Regular Price (₹) <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-muted">
                  ₹
                </span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="2999"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-md border border-line bg-surface py-2.5 pl-8 pr-3.5 text-sm text-ink transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-muted">The list price shown to learners.</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="mb-1 block text-sm font-medium text-ink">
                  Discount Price (₹) <span className="text-xs font-normal text-muted">(Optional)</span>
                </label>
                {calculatedDiscountPercent !== null && calculatedDiscountPercent > 0 && (
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    {calculatedDiscountPercent}% OFF
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-muted">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1499"
                  value={form.discountPrice}
                  onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                  className="w-full rounded-md border border-line bg-surface py-2.5 pl-8 pr-3.5 text-sm text-ink transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-muted">Promotional price displayed with strike-through.</p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Course Description & Curriculum (Large Rich HTML Editor) */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3 gap-2">
            <div>
              <h2 className="text-lg font-semibold text-ink">
                4. Course Description &amp; Syllabus
              </h2>
              <p className="text-xs text-muted">
                Use the rich text editor below to format your curriculum, bullet points, headers, and code samples.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Rich HTML Editor
            </span>
          </div>

          <div className="space-y-3">
            <HtmlEditor
              value={form.description}
              onChange={(val) => setForm((prev) => ({ ...prev, description: val }))}
              placeholder="<h2>Course Overview</h2><p>Provide detailed information about what students will learn, course prerequisites, syllabus modules, and hands-on projects...</p>"
              minHeight="380px"
            />

            <div className="rounded-lg border border-line/60 bg-paper/60 p-3.5 text-xs text-muted">
              <span className="font-semibold text-ink">Instructor Tips:</span> You can switch between{" "}
              <strong className="text-ink">Visual Editor</strong> and{" "}
              <strong className="text-ink">&lt;HTML Code&gt;</strong> anytime. Include clear headings (H2/H3), bulleted lists of key takeaways, prerequisites, and what projects learners will build.
            </div>
          </div>
        </div>

        {/* SECTION 5: Course Hero */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink">
                  5. Course Hero
                </h2>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                  Top Banner
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                Customize your course's prominent hero banner and select a layout template based on image position.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Rich HTML Editor
            </span>
          </div>

          {/* 5.1 Hero Image Position & Template Selector */}
          <div className="mb-5 rounded-lg border border-brand-200/80 bg-brand-50/40 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-semibold text-ink">
                  5.1 Hero Image Position &amp; Dynamic Template Selector
                </label>
                <p className="text-xs text-muted">
                  Choose an image layout position {`{ None, Right, Left, Center, BG }`} to load dark Coursera-style HTML populated with your course's dynamic values.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedHeroPos}
                  onChange={(e) => handleHeroPositionChange(e.target.value as TemplatePosition)}
                  className="rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-xs transition hover:border-brand-500 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
                >
                  <option value="">⚡ Select Hero Layout...</option>
                  <option value="none">No Image (Pure Dark Coursera Gradient)</option>
                  <option value="right">Image Position: Right (Featured Image Above Tuition Card)</option>
                  <option value="left">Image Position: Left (Course Image on Left, Tuition on Right)</option>
                  <option value="center">Image Position: Center (Prominent Center Showcase)</option>
                  <option value="bg">Image Position: Background (Full Cover with Dark Overlay)</option>
                </select>
              </div>
            </div>

            {/* Course Image URL Input */}
            <div className="pt-2 border-t border-line/60 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-ink mb-1">
                  Course Image / Thumbnail URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1516321318423-f06f85e504b3..."
                  className="w-full rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>
              <button
                type="button"
                onClick={handleRefreshHero}
                className="self-end sm:self-auto rounded-md bg-brand-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-700 transition cursor-pointer flex items-center gap-1.5"
                title="Update the editor with current title, price, and image URL"
              >
                <span>⚡</span>
                <span>Refresh Template</span>
              </button>
            </div>

            {selectedHeroPos && (
              <p className="text-xs font-medium text-brand-700">
                ✓ Loaded: {HERO_TEMPLATES[selectedHeroPos]?.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <HtmlEditor
              value={form.heroHtml}
              onChange={(val) => setForm((prev) => ({ ...prev, heroHtml: val }))}
              placeholder="<div style='padding: 40px;'><h2>Course Hero</h2><p>Select an image position template above or write custom HTML...</p></div>"
              minHeight="340px"
            />
            <div className="rounded-lg border border-line/60 bg-paper/60 p-3.5 text-xs text-muted">
              <span className="font-semibold text-ink">Hero Tip:</span> Pick a template from <strong className="text-ink">5.1</strong> to start with pre-tested layouts. You can edit visual content, links, headings, or switch to <strong className="text-ink">&lt;HTML Code&gt;</strong> to customize styles.
            </div>
          </div>
        </div>

        {/* SECTION 6: Course Outcome */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink">
                  6. Course Outcome
                </h2>
                <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  Learning Objectives
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                Highlight what skills, tangible projects, and knowledge learners will acquire upon completion.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Rich HTML Editor
            </span>
          </div>

          {/* 6.1 Outcome Image Position & Dynamic Template Selector */}
          <div className="mb-5 rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-semibold text-ink">
                  6.1 Outcome Image Position &amp; Dynamic Template Selector
                </label>
                <p className="text-xs text-muted">
                  Choose an outcome layout position {`{ None, Center, Left, Right, BG }`} to load formatted learning milestones populated with your course outcome image.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedOutcomePos}
                  onChange={(e) => handleOutcomePositionChange(e.target.value as TemplatePosition)}
                  className="rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-xs transition hover:border-brand-500 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
                >
                  <option value="">⚡ Select Outcome Template...</option>
                  <option value="none">No Image (Centered Text Checklist)</option>
                  <option value="center">Image Position: Center (Centered Outcomes)</option>
                  <option value="left">Image Position: Left (Outcomes Checklist)</option>
                  <option value="right">Image Position: Right (Outcomes Checklist)</option>
                  <option value="bg">Image Position: Background (Outcomes Banner)</option>
                </select>
              </div>
            </div>

            {/* Course Outcome Image URL Input */}
            <div className="pt-2 border-t border-line/60 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-ink mb-1">
                  Course Outcome / Thumbnail URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.outcomeImageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, outcomeImageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1522071820081-009f0129c71c..."
                  className="w-full rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>
              <button
                type="button"
                onClick={handleRefreshOutcome}
                className="self-end sm:self-auto rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-90 transition cursor-pointer flex items-center gap-1.5"
                title="Update the editor with current outcome image URL"
              >
                <span>⚡</span>
                <span>Refresh Template</span>
              </button>
            </div>

            {selectedOutcomePos && (
              <p className="text-xs font-medium text-accent">
                ✓ Loaded: {OUTCOME_TEMPLATES[selectedOutcomePos]?.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <HtmlEditor
              value={form.outcomesHtml}
              onChange={(val) => setForm((prev) => ({ ...prev, outcomesHtml: val }))}
              placeholder="<div style='padding: 30px;'><h2>Learning Outcomes</h2><p>What students will achieve after completing this course...</p></div>"
              minHeight="340px"
            />
            <div className="rounded-lg border border-line/60 bg-paper/60 p-3.5 text-xs text-muted">
              <span className="font-semibold text-ink">Outcome Tip:</span> Clearly describe the practical outcomes learners will achieve. Use <strong className="text-ink">6.1</strong> to populate structured checklists and diagrams.
            </div>
          </div>
        </div>

        {/* SECTION 7: Course Accessories */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink">
                  7. Course Accessories
                </h2>
                <span className="rounded bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-700 border border-pink-200">
                  Kit &amp; Inclusions
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                Detail the physical kits, equipment, software tools, textbooks, or perks included with course enrollment.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              Rich HTML Editor
            </span>
          </div>

          {/* 7.1 Accessory Image Position & Dynamic Template Selector */}
          <div className="mb-5 rounded-lg border border-pink-200 bg-pink-50/40 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-semibold text-ink">
                  7.1 Accessory Image Position &amp; Dynamic Template Selector
                </label>
                <p className="text-xs text-muted">
                  Choose an accessory layout position {`{ None, Center, Left, Right, BG }`} to load formatted inclusion cards populated with your course accessory image.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedAccessoryPos}
                  onChange={(e) => handleAccessoryPositionChange(e.target.value as TemplatePosition)}
                  className="rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-xs transition hover:border-brand-500 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none cursor-pointer"
                >
                  <option value="">⚡ Select Accessory Template...</option>
                  <option value="none">No Image (Centered Text Inclusions)</option>
                  <option value="center">Image Position: Center (Included Kit &amp; Gear)</option>
                  <option value="left">Image Position: Left (Accessories Inclusions)</option>
                  <option value="right">Image Position: Right (Accessories Inclusions)</option>
                  <option value="bg">Image Position: Background (Accessories Banner)</option>
                </select>
              </div>
            </div>

            {/* Course Accessory Image URL Input */}
            <div className="pt-2 border-t border-line/60 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-ink mb-1">
                  Course Accessory / Kit Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.accessoryImageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, accessoryImageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1581291518655-9523c932edcf..."
                  className="w-full rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                />
              </div>
              <button
                type="button"
                onClick={handleRefreshAccessory}
                className="self-end sm:self-auto rounded-md bg-pink-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-pink-700 transition cursor-pointer flex items-center gap-1.5"
                title="Update the editor with current accessory image URL"
              >
                <span>⚡</span>
                <span>Refresh Template</span>
              </button>
            </div>

            {selectedAccessoryPos && (
              <p className="text-xs font-medium text-pink-700">
                ✓ Loaded: {ACCESSORY_TEMPLATES[selectedAccessoryPos]?.description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <HtmlEditor
              value={form.accessoriesHtml}
              onChange={(val) => setForm((prev) => ({ ...prev, accessoriesHtml: val }))}
              placeholder="<div style='padding: 30px;'><h2>Course Accessories</h2><p>List all materials, kits, and tools provided with this course...</p></div>"
              minHeight="340px"
            />
            <div className="rounded-lg border border-line/60 bg-paper/60 p-3.5 text-xs text-muted">
              <span className="font-semibold text-ink">Accessory Tip:</span> Highlight equipment, toolkits, books, or certifications included with the course. Use <strong className="text-ink">7.1</strong> to load structured responsive card designs.
            </div>
          </div>
        </div>

        {/* SECTION 8: Course FAQs (JSON & Form) */}
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-line pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-ink">
                  8. Frequently Asked Questions (FAQ)
                </h2>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                  JSON / Structured
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                Add common learner questions and answers. These will be stored as JSON and rendered in the public course FAQ tab.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadSampleFaqs}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink hover:bg-line/40 transition cursor-pointer"
                title="Populate common starter FAQs"
              >
                ⚡ Load Sample FAQs
              </button>
              <button
                type="button"
                onClick={toggleFaqJsonMode}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  faqJsonMode
                    ? "bg-brand-600 text-white shadow-xs hover:bg-brand-700"
                    : "border border-line bg-surface text-ink hover:bg-paper"
                }`}
              >
                {faqJsonMode ? "📋 Visual Form Mode" : "{ } Edit Raw JSON"}
              </button>
            </div>
          </div>

          {/* Raw JSON Editor Mode */}
          {faqJsonMode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted">
                  Format: [ {`{ "question": "...", "answer": "..." }`} ]
                </span>
                <span className="text-xs text-brand-600 font-medium">
                  Direct JSON Database Mode
                </span>
              </div>
              <textarea
                value={faqJsonText}
                onChange={(e) => {
                  setFaqJsonText(e.target.value);
                  setFaqJsonError(null);
                }}
                rows={12}
                className="w-full rounded-lg border border-line bg-gray-950 p-4 font-mono text-xs text-emerald-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 leading-relaxed shadow-inner"
                placeholder={`[\n  {\n    "question": "What are the prerequisites?",\n    "answer": "Basic computer skills."\n  }\n]`}
              />
              {faqJsonError && (
                <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-xs text-danger flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{faqJsonError}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted">
                  Click below to validate your JSON and sync with the visual form.
                </p>
                <button
                  type="button"
                  onClick={toggleFaqJsonMode}
                  className="rounded-md bg-brand-600 px-4 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-brand-700 transition cursor-pointer"
                >
                  ✓ Apply JSON &amp; Return to Visual Form
                </button>
              </div>
            </div>
          ) : (
            /* Visual Interactive FAQ Form Mode */
            <div className="space-y-4">
              {faqs.length === 0 ? (
                <div className="rounded-lg border border-dashed border-line bg-paper/40 p-8 text-center">
                  <div className="text-2xl mb-2">❓</div>
                  <h3 className="text-sm font-semibold text-ink">No FAQs Added Yet</h3>
                  <p className="text-xs text-muted mt-1 max-w-md mx-auto">
                    Help prospective learners make an informed decision by answering common questions about prerequisites, certificates, and access.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={addFaqItem}
                      className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-brand-700 transition cursor-pointer"
                    >
                      + Add First Question
                    </button>
                    <button
                      type="button"
                      onClick={loadSampleFaqs}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-paper transition cursor-pointer"
                    >
                      ⚡ Load Sample FAQs
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-line/80 bg-paper/30 p-4 transition-all hover:border-line hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-line/50">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-medium text-ink">
                            Question #{idx + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFaqItem(idx)}
                          className="text-xs text-muted hover:text-danger transition cursor-pointer flex items-center gap-1"
                          title="Remove this question"
                        >
                          ✕ Remove
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-xs font-medium text-muted mb-1">
                            Question
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                            placeholder="e.g., Will I receive a verified certificate upon completion?"
                            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted mb-1">
                            Answer
                          </label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                            rows={3}
                            placeholder="e.g., Yes! When you complete all lessons, assignments, and passing quizzes, you will receive an official verifiable digital certificate."
                            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={addFaqItem}
                      className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-brand-300 bg-brand-50/50 px-4 py-2 text-xs font-medium text-brand-700 hover:bg-brand-50 hover:border-brand-400 transition cursor-pointer"
                    >
                      + Add Another Question
                    </button>
                    <span className="text-xs text-muted">
                      {faqs.length} question{faqs.length === 1 ? "" : "s"} configured
                    </span>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-line/60 bg-paper/60 p-3.5 text-xs text-muted">
                <span className="font-semibold text-ink">FAQ Tip:</span> FAQs are stored as structured JSON in the database. On the course landing page, they appear under the <strong className="text-ink">FAQ</strong> sticky tab accordion.
              </div>
            </div>
          )}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="rounded-lg border border-danger/20 bg-danger/10 p-4 text-sm text-danger">
            {error}
          </div>
        )}

        {/* Form Submission Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/instructor/courses"
            className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-muted hover:bg-paper transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand-600 px-7 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 disabled:opacity-50 transition"
          >
            {saving ? "Creating Course…" : "Create Course (Save Draft)"}
          </button>
        </div>
      </form>
    </div>
  );
}
