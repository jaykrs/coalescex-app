"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { HtmlEditor } from "@/components/HtmlEditor";
import type { Blog, BlogStatus } from "@/types";

interface BlogFormProps {
  initialBlog?: Blog;
  mode: "create" | "edit";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogForm({ initialBlog, mode }: BlogFormProps) {
  const router = useRouter();

  // Basic Information State
  const [title, setTitle] = useState(initialBlog?.title || "");
  const [slug, setSlug] = useState(initialBlog?.slug || "");
  const [autoSlug, setAutoSlug] = useState(mode === "create");
  const [featuredImage, setFeaturedImage] = useState(initialBlog?.featuredImage || "");
  const [shortDescription, setShortDescription] = useState(initialBlog?.shortDescription || "");
  const [category, setCategory] = useState(initialBlog?.category || "Technology");
  const [author, setAuthor] = useState(initialBlog?.author || "Coalescex Team");
  const [publishDate, setPublishDate] = useState(
    initialBlog?.publishDate
      ? new Date(initialBlog.publishDate).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [status, setStatus] = useState<BlogStatus>(initialBlog?.status || "DRAFT");

  // Content State
  const [htmlContent, setHtmlContent] = useState(initialBlog?.htmlContent || "");
  const [contentTab, setContentTab] = useState<"editor" | "preview">("editor");

  // SEO State
  const [metaTitle, setMetaTitle] = useState(initialBlog?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialBlog?.metaDescription || "");
  const [metaKeywords, setMetaKeywords] = useState(initialBlog?.metaKeywords || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialBlog?.canonicalUrl || "");
  const [ogTitle, setOgTitle] = useState(initialBlog?.ogTitle || "");
  const [ogDescription, setOgDescription] = useState(initialBlog?.ogDescription || "");
  const [ogImage, setOgImage] = useState(initialBlog?.ogImage || "");
  const [robots, setRobots] = useState(initialBlog?.robots || "index, follow");

  // UI State
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"content" | "seo">("content");

  // Auto-generate slug when title changes if autoSlug is enabled
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(slugify(title));
    }
  }, [title, autoSlug]);

  const quickCategories = [
    "Technology",
    "AI & Data Science",
    "Web Development",
    "Tutorials",
    "Career Advice",
    "Industry News",
  ];

  async function handleSubmit(overrideStatus?: BlogStatus) {
    setError(null);

    const submitStatus = overrideStatus || status;

    if (!title.trim()) {
      setError("Blog Title is required.");
      return;
    }

    if (!htmlContent.trim()) {
      setError("Blog HTML content cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() ? slugify(slug) : slugify(title),
        featuredImage: featuredImage.trim() || null,
        shortDescription: shortDescription.trim() || null,
        category: category.trim() || "General",
        author: author.trim() || "Coalescex Team",
        publishDate: publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
        status: submitStatus,
        htmlContent,

        // SEO
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || shortDescription.trim() || null,
        metaKeywords: metaKeywords.trim() || null,
        canonicalUrl: canonicalUrl.trim() || `https://coalescex.com/blog/${slugify(slug || title)}`,
        ogTitle: ogTitle.trim() || metaTitle.trim() || title.trim(),
        ogDescription: ogDescription.trim() || metaDescription.trim() || shortDescription.trim() || null,
        ogImage: ogImage.trim() || featuredImage.trim() || null,
        robots: robots.trim() || "index, follow",
      };

      if (mode === "create") {
        await api.post("/blogs", payload);
      } else if (initialBlog?.id) {
        await api.put(`/blogs/${initialBlog.id}`, payload);
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      console.error("Failed to save blog:", err);
      const msg = err.response?.data?.error?.message || "Failed to save blog. Please check your inputs.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Bar with Mode and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Link href="/admin/blogs" className="hover:text-brand-600 transition">
              ← Blog Management
            </Link>
            <span>/</span>
            <span className="text-ink font-medium">
              {mode === "create" ? "Create New Blog" : `Edit: ${initialBlog?.title}`}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-ink">
            {mode === "create" ? "Write & Publish Blog" : "Edit Blog Post"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/blogs"
            className="rounded-lg border border-line bg-surface px-3.5 py-2 text-xs sm:text-sm font-semibold text-muted hover:text-ink hover:bg-paper transition"
          >
            Cancel
          </Link>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("DRAFT")}
            className="rounded-lg border border-line bg-paper px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-line/40 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("PUBLISHED")}
            className="rounded-lg bg-brand-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-700 transition shadow-xs disabled:opacity-50"
          >
            {saving ? "Saving..." : status === "PUBLISHED" ? "Update Published" : "Publish Now"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Unable to save blog:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Main Grid: Form Left (70%) + Meta/Settings Right (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Basic Info & HTML Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Blog Basic Info */}
          <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-5">
            <h2 className="text-base font-semibold text-ink border-b border-line pb-2">
              1. Blog Information
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 10 Essential Full-Stack Trends to Master in 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-base font-medium text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Blog Slug (URL identifier) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-xs text-brand-600 hover:underline"
                >
                  {autoSlug ? "✓ Auto-generating from title (Click to customize)" : "Custom Slug active (Click for auto)"}
                </button>
              </div>
              <div className="flex items-center rounded-lg border border-line bg-paper px-3 py-2 text-sm text-muted">
                <span className="text-xs sm:text-sm select-none pr-1">/blog/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  placeholder="how-to-learn-nextjs"
                  className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none"
                />
              </div>
            </div>

            {/* Short Description / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Short Description / Excerpt
                </label>
                <span className="text-xs text-muted">{shortDescription.length}/250 chars</span>
              </div>
              <textarea
                rows={3}
                placeholder="A compelling brief introduction that appears on blog cards and search listings..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value.slice(0, 300))}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Featured Image URL & Preview */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Featured Image URL / Thumbnail
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/... or /images/blog/..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
              {featuredImage && (
                <div className="mt-3 relative w-full h-44 rounded-lg overflow-hidden border border-line bg-paper">
                  <img
                    src={featuredImage}
                    alt="Featured Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Card 2: HTML Content Editor copied & integrated from Courses */}
          <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h2 className="text-base font-semibold text-ink">
                  2. Blog HTML Content <span className="text-red-500">*</span>
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Write and format article content with headings, lists, quotes, code, and links.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-paper rounded-lg p-1 border border-line text-xs">
                <button
                  type="button"
                  onClick={() => setContentTab("editor")}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    contentTab === "editor"
                      ? "bg-surface text-brand-600 font-semibold shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setContentTab("preview")}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    contentTab === "preview"
                      ? "bg-surface text-brand-600 font-semibold shadow-xs"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            {contentTab === "editor" ? (
              <HtmlEditor
                value={htmlContent}
                onChange={setHtmlContent}
                placeholder="Write rich, informative article content here..."
                minHeight="480px"
              />
            ) : (
              <div className="min-h-[480px] p-6 rounded-lg border border-line bg-paper/30 overflow-auto">
                <div
                  className="prose prose-slate max-w-none text-ink leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: htmlContent || "<p class='text-muted italic'>No content written yet.</p>" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Publishing & SEO Settings */}
        <div className="space-y-6">
          {/* Card 3: Status & Metadata */}
          <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-5">
            <h2 className="text-base font-semibold text-ink border-b border-line pb-2">
              Publishing Options
            </h2>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogStatus)}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm font-semibold text-ink focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              >
                <option value="DRAFT">Draft (Hidden from public)</option>
                <option value="PUBLISHED">Published (Visible on /blog)</option>
              </select>
              <p className="mt-1 text-xs text-muted">
                {status === "PUBLISHED"
                  ? "🟢 This blog will be visible on the public website."
                  : "🟡 Drafts are only visible to logged-in admins."}
              </p>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Publish Date & Time
              </label>
              <input
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Coalescex Engineering"
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2 text-sm text-ink focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Technology"
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2 text-sm text-ink focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quickCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition ${
                      category === c
                        ? "bg-brand-600 text-white"
                        : "bg-paper text-muted hover:text-ink border border-line"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: SEO / Meta Management */}
          <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <h2 className="text-base font-semibold text-ink">
                SEO &amp; Social Meta
              </h2>
              <span className="text-xs text-brand-600 font-medium">Search Optimized</span>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Meta Title
                </label>
                <span className="text-[11px] text-muted">{metaTitle.length || title.length}/60</span>
              </div>
              <input
                type="text"
                placeholder={title || "SEO Title"}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Meta Description
                </label>
                <span className="text-[11px] text-muted">{metaDescription.length || shortDescription.length}/160</span>
              </div>
              <textarea
                rows={3}
                placeholder={shortDescription || "SEO Description for Google search snippet..."}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Meta Keywords
              </label>
              <input
                type="text"
                placeholder="nextjs, react, web development, coding"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                placeholder={`https://coalescex.com/blog/${slug || "my-blog"}`}
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              />
            </div>

            {/* Robots Meta */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Robots Meta
              </label>
              <select
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs sm:text-sm text-ink focus:border-brand-600 focus:ring-1 focus:ring-brand-600 focus:outline-none"
              >
                <option value="index, follow">index, follow (Recommended)</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
              </select>
            </div>

            {/* Social / Open Graph Details */}
            <div className="pt-2 border-t border-line space-y-3">
              <p className="text-xs font-semibold text-ink">Social Sharing (Open Graph)</p>
              <div>
                <label className="block text-[11px] text-muted mb-1">OG Title</label>
                <input
                  type="text"
                  placeholder={metaTitle || title || "Open Graph Title"}
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-muted mb-1">OG Description</label>
                <input
                  type="text"
                  placeholder={metaDescription || shortDescription || "Open Graph Description"}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-muted mb-1">OG Image URL</label>
                <input
                  type="text"
                  placeholder={featuredImage || "https://..."}
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:outline-none"
                />
              </div>
            </div>

            {/* SERP Search Preview */}
            <div className="mt-4 rounded-lg bg-paper p-3 border border-line text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted">Google Search Preview</span>
              <p className="text-blue-700 font-medium truncate text-sm">
                {metaTitle || title || "Blog Title Example"}
              </p>
              <p className="text-emerald-700 text-[11px] truncate">
                https://coalescex.com/blog/{slug || "example-slug"}
              </p>
              <p className="text-muted line-clamp-2 text-xs">
                {metaDescription || shortDescription || "This is how your blog description will appear in search results."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogForm;
