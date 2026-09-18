"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { CourseSeo } from "@/types";

interface ManageCourseOption {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string | null;
  status: string;
  seo?: CourseSeo | null;
}

function SeoManagerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const querySlug = searchParams.get("slug") || "";

  const [selectedSlug, setSelectedSlug] = useState<string>(querySlug);
  const [activeTab, setActiveTab] = useState<"meta" | "social" | "schema" | "preview">("meta");
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<CourseSeo>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: "",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImageUrl: "",
    structuredData: null,
  });

  const [structuredDataText, setStructuredDataText] = useState<string>("");
  const [schemaError, setSchemaError] = useState<string | null>(null);

  // 1. Fetch available course slugs for the dropdown
  const { data: coursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ["manage-slugs"],
    queryFn: async () => {
      const res = await api.get<{ courses: ManageCourseOption[] }>("/courses/manage/slugs");
      return res.data.courses;
    },
  });

  const courses = coursesData || [];
  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.slug === selectedSlug);
  }, [courses, selectedSlug]);

  // Sync selectedSlug with URL
  useEffect(() => {
    if (querySlug && querySlug !== selectedSlug) {
      setSelectedSlug(querySlug);
    }
  }, [querySlug]);

  // Auto-select first course if none selected and courses are available
  useEffect(() => {
    if (!selectedSlug && courses.length > 0) {
      const initial = querySlug || courses[0].slug;
      setSelectedSlug(initial);
      router.replace(`/instructor/seo?slug=${initial}`);
    }
  }, [courses, selectedSlug, querySlug, router]);

  // 2. Fetch SEO details for the selected slug
  const { data: seoDetails, isLoading: loadingSeo } = useQuery({
    queryKey: ["course-seo", selectedSlug],
    queryFn: async () => {
      if (!selectedSlug) return null;
      const res = await api.get<{ course: any; seo: CourseSeo | null }>(`/courses/seo/${selectedSlug}`);
      return res.data;
    },
    enabled: Boolean(selectedSlug),
  });

  // Populate form whenever fetched SEO details change
  useEffect(() => {
    if (seoDetails) {
      const existingSeo = seoDetails.seo;
      const course = seoDetails.course;

      const defaultCanonical = `https://coalescex.com/courses/${selectedSlug}`;
      const cleanDesc = (course?.description || "").replace(/<[^>]*>?/gm, "").trim().slice(0, 155);

      setFormData({
        metaTitle: existingSeo?.metaTitle || `${course?.title || ""} | Coalescex`,
        metaDescription: existingSeo?.metaDescription || course?.subtitle || cleanDesc || "",
        metaKeywords: existingSeo?.metaKeywords || "",
        canonicalUrl: existingSeo?.canonicalUrl || defaultCanonical,
        ogTitle: existingSeo?.ogTitle || existingSeo?.metaTitle || course?.title || "",
        ogDescription: existingSeo?.ogDescription || existingSeo?.metaDescription || cleanDesc || "",
        ogImageUrl: existingSeo?.ogImageUrl || course?.thumbnailUrl || "",
        ogType: existingSeo?.ogType || "website",
        twitterCard: existingSeo?.twitterCard || "summary_large_image",
        twitterTitle: existingSeo?.twitterTitle || existingSeo?.ogTitle || course?.title || "",
        twitterDescription: existingSeo?.twitterDescription || existingSeo?.ogDescription || cleanDesc || "",
        twitterImageUrl: existingSeo?.twitterImageUrl || existingSeo?.ogImageUrl || course?.thumbnailUrl || "",
        structuredData: existingSeo?.structuredData || null,
      });

      if (existingSeo?.structuredData) {
        setStructuredDataText(
          typeof existingSeo.structuredData === "string"
            ? existingSeo.structuredData
            : JSON.stringify(existingSeo.structuredData, null, 2)
        );
      } else {
        setStructuredDataText("");
      }
      setSchemaError(null);
    }
  }, [seoDetails, selectedSlug]);

  const handleSlugChange = (slug: string) => {
    setSelectedSlug(slug);
    setNotification(null);
    router.push(`/instructor/seo?slug=${slug}`);
  };

  // Auto-generate defaults from Course Information
  const handleAutoPopulate = () => {
    if (!selectedCourse) return;
    const cleanDesc = (selectedCourse.description || "").replace(/<[^>]*>?/gm, "").trim().slice(0, 155);
    const defaultCanonical = `https://coalescex.com/courses/${selectedCourse.slug}`;

    setFormData((prev) => ({
      ...prev,
      metaTitle: `${selectedCourse.title} | Coalescex`,
      metaDescription: cleanDesc,
      canonicalUrl: defaultCanonical,
      ogTitle: selectedCourse.title,
      ogDescription: cleanDesc,
      ogImageUrl: selectedCourse.thumbnailUrl || prev.ogImageUrl || "",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: selectedCourse.title,
      twitterDescription: cleanDesc,
      twitterImageUrl: selectedCourse.thumbnailUrl || prev.twitterImageUrl || "",
    }));

    setNotification({
      type: "success",
      text: "Form fields auto-populated from course details. Don't forget to save changes!",
    });
  };

  // Generate standard Schema.org Course JSON-LD
  const handleGenerateCourseSchema = () => {
    if (!selectedCourse) return;
    const cleanDesc = (selectedCourse.description || "").replace(/<[^>]*>?/gm, "").trim().slice(0, 250);
    const schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: selectedCourse.title,
      description: cleanDesc,
      provider: {
        "@type": "Organization",
        name: "Coalescex",
        sameAs: "https://coalescex.com",
      },
      image: selectedCourse.thumbnailUrl || undefined,
      offers: {
        "@type": "Offer",
        category: "Paid",
        priceCurrency: "INR",
      },
    };

    const formatted = JSON.stringify(schema, null, 2);
    setStructuredDataText(formatted);
    setSchemaError(null);
  };

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      let parsedSchema = null;
      if (structuredDataText.trim()) {
        try {
          parsedSchema = JSON.parse(structuredDataText);
        } catch (e: any) {
          throw new Error("Invalid Schema.org JSON: " + e.message);
        }
      }

      const payload = {
        ...formData,
        structuredData: parsedSchema,
      };

      const res = await api.put<{ seo: CourseSeo }>(`/courses/seo/${selectedSlug}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-seo", selectedSlug] });
      queryClient.invalidateQueries({ queryKey: ["manage-slugs"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-courses"] });
      const courseName = selectedCourse?.title || selectedSlug;
      router.push(`/instructor/courses?seoUpdated=${encodeURIComponent(courseName)}`);
    },
    onError: (err: any) => {
      setNotification({
        type: "error",
        text: err?.message || err?.response?.data?.error?.message || "Failed to save SEO metadata.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    saveMutation.mutate();
  };

  const titleLength = (formData.metaTitle || "").length;
  const descLength = (formData.metaDescription || "").length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted mb-1">
            <Link href="/instructor/courses" className="hover:text-brand-600 transition">
              &larr; Courses
            </Link>
            <span>/</span>
            <span>SEO Manager</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink flex flex-wrap items-center gap-2">
            <span>{selectedCourse?.seo ? "Edit SEO:" : "Configure SEO:"}</span>
            <span className="text-brand-700">{selectedCourse?.title || selectedSlug}</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Customize search engine metadata, OpenGraph social cards, and Schema.org structured data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/instructor/courses"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-xs hover:bg-paper transition"
          >
            <span>← Back to Courses</span>
          </Link>
          {selectedSlug && (
            <a
              href={`/courses/${selectedSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-xs hover:bg-paper transition"
            >
              <span>Preview Live Page</span>
              <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm font-medium flex items-center justify-between shadow-xs ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{notification.type === "success" ? "✓" : "⚠"}</span>
            <span>{notification.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-xs underline cursor-pointer hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Section 1: Course Slug Selector Card */}
      <div className="mb-6 rounded-xl border border-line bg-surface p-5 shadow-xs">
        <label htmlFor="slug-select" className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
          Select Page by Slug
        </label>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <select
              id="slug-select"
              value={selectedSlug}
              onChange={(e) => handleSlugChange(e.target.value)}
              disabled={loadingCourses}
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-medium text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition cursor-pointer"
            >
              {loadingCourses ? (
                <option value="">Loading course pages…</option>
              ) : courses.length === 0 ? (
                <option value="">No courses created yet</option>
              ) : (
                courses.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.title} &nbsp;—&nbsp; /{c.slug} {c.seo ? "✓ (SEO configured)" : "(SEO pending)"}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={handleAutoPopulate}
            disabled={!selectedCourse || loadingSeo}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2.5 text-xs font-bold text-brand-700 hover:bg-brand-100 transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            <span>⚡ Auto-fill from Course</span>
          </button>
        </div>

        {selectedCourse && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="font-mono bg-paper px-2 py-0.5 rounded border border-line">
              Target URL: https://coalescex.com/courses/{selectedCourse.slug}
            </span>
            <span className="capitalize px-2 py-0.5 rounded bg-line font-medium text-ink">
              Status: {selectedCourse.status}
            </span>
          </div>
        )}
      </div>

      {/* Main SEO Form */}
      {selectedSlug ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-line gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            {[
              { id: "meta", label: "Meta Tags", icon: "🌐" },
              { id: "social", label: "Social Cards (OG & Twitter)", icon: "📱" },
              { id: "schema", label: "Schema.org / JSON-LD", icon: "⚙️" },
              { id: "preview", label: "Live SERP & Social Preview", icon: "👁️" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 pt-1 text-sm font-bold transition border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Meta Tags */}
          {activeTab === "meta" && (
            <div className="rounded-xl border border-line bg-surface p-6 space-y-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="metaTitle" className="text-sm font-bold text-ink">
                    Meta Title
                  </label>
                  <span
                    className={`text-xs font-mono font-medium ${
                      titleLength >= 50 && titleLength <= 60
                        ? "text-emerald-600"
                        : titleLength > 60
                        ? "text-rose-500"
                        : "text-muted"
                    }`}
                  >
                    {titleLength}/60 characters {titleLength >= 50 && titleLength <= 60 && "(Optimal)"}
                  </span>
                </div>
                <input
                  id="metaTitle"
                  type="text"
                  value={formData.metaTitle || ""}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g. Master Python Programming from Scratch | Coalescex"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <p className="mt-1 text-xs text-muted">
                  Displays as the headline in Google search results and browser tab. Recommended: 50–60 characters.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="metaDescription" className="text-sm font-bold text-ink">
                    Meta Description
                  </label>
                  <span
                    className={`text-xs font-mono font-medium ${
                      descLength >= 140 && descLength <= 160
                        ? "text-emerald-600"
                        : descLength > 160
                        ? "text-rose-500"
                        : "text-muted"
                    }`}
                  >
                    {descLength}/160 characters {descLength >= 140 && descLength <= 160 && "(Optimal)"}
                  </span>
                </div>
                <textarea
                  id="metaDescription"
                  rows={3}
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Provide a concise summary that encourages users to click from search results…"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <p className="mt-1 text-xs text-muted">
                  The snippet displayed underneath your page title on search engines. Recommended: 140–160 characters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-bold text-ink mb-1.5">
                    Meta Keywords
                  </label>
                  <input
                    id="metaKeywords"
                    type="text"
                    value={formData.metaKeywords || ""}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    placeholder="python, web development, coding, certification"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <p className="mt-1 text-xs text-muted">Separate keywords with commas.</p>
                </div>

                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-bold text-ink mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    id="canonicalUrl"
                    type="url"
                    value={formData.canonicalUrl || ""}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://coalescex.com/courses/your-slug"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <p className="mt-1 text-xs text-muted">
                    Prevents duplicate content penalties by pointing search engines to the canonical URL.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Social Sharing (Open Graph & Twitter) */}
          {activeTab === "social" && (
            <div className="rounded-xl border border-line bg-surface p-6 space-y-6 shadow-xs">
              <div className="border-b border-line pb-4">
                <h3 className="text-base font-bold text-ink">Facebook & LinkedIn (Open Graph)</h3>
                <p className="text-xs text-muted">Controls how links look when shared on WhatsApp, Facebook, LinkedIn, etc.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ogTitle" className="block text-sm font-bold text-ink mb-1.5">
                    Open Graph Title
                  </label>
                  <input
                    id="ogTitle"
                    type="text"
                    value={formData.ogTitle || ""}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    placeholder="Leave empty to use Meta Title"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label htmlFor="ogType" className="block text-sm font-bold text-ink mb-1.5">
                    OG Type
                  </label>
                  <select
                    id="ogType"
                    value={formData.ogType || "website"}
                    onChange={(e) => setFormData({ ...formData, ogType: e.target.value })}
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="website">website</option>
                    <option value="article">article</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ogDescription" className="block text-sm font-bold text-ink mb-1.5">
                  Open Graph Description
                </label>
                <textarea
                  id="ogDescription"
                  rows={2}
                  value={formData.ogDescription || ""}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  placeholder="Leave empty to use Meta Description"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="ogImageUrl" className="block text-sm font-bold text-ink mb-1.5">
                  Open Graph Image URL
                </label>
                <input
                  id="ogImageUrl"
                  type="url"
                  value={formData.ogImageUrl || ""}
                  onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
                  placeholder="https://coalescex.com/images/cover.jpg (Recommended: 1200x630)"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                {formData.ogImageUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={formData.ogImageUrl}
                      alt="OG Preview"
                      className="h-16 w-28 object-cover rounded border border-line shadow-xs"
                      onError={(e) => {
                        (e.target as any).style.display = "none";
                      }}
                    />
                    <span className="text-xs text-muted">Preview image loaded</span>
                  </div>
                )}
              </div>

              <div className="border-t border-line pt-6">
                <div className="border-b border-line pb-4 mb-4">
                  <h3 className="text-base font-bold text-ink">Twitter Card</h3>
                  <p className="text-xs text-muted">Specific tags for Twitter / X share cards.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="twitterCard" className="block text-sm font-bold text-ink mb-1.5">
                      Card Type
                    </label>
                    <select
                      id="twitterCard"
                      value={formData.twitterCard || "summary_large_image"}
                      onChange={(e) => setFormData({ ...formData, twitterCard: e.target.value })}
                      className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="summary_large_image">summary_large_image (Large banner)</option>
                      <option value="summary">summary (Small thumbnail)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="twitterTitle" className="block text-sm font-bold text-ink mb-1.5">
                      Twitter Title
                    </label>
                    <input
                      id="twitterTitle"
                      type="text"
                      value={formData.twitterTitle || ""}
                      onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
                      placeholder="Leave empty to use OG / Meta Title"
                      className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="twitterDescription" className="block text-sm font-bold text-ink mb-1.5">
                    Twitter Description
                  </label>
                  <textarea
                    id="twitterDescription"
                    rows={2}
                    value={formData.twitterDescription || ""}
                    onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
                    placeholder="Leave empty to use OG / Meta Description"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Schema.org / Structured Data */}
          {activeTab === "schema" && (
            <div className="rounded-xl border border-line bg-surface p-6 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
                <div>
                  <h3 className="text-base font-bold text-ink">Schema.org JSON-LD Structured Data</h3>
                  <p className="text-xs text-muted">
                    Enables Google rich snippets (Course carousels, pricing, reviews, provider details).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateCourseSchema}
                  className="rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-bold text-ink hover:bg-line transition cursor-pointer"
                >
                  ⚡ Generate Course Schema
                </button>
              </div>

              <div>
                <textarea
                  id="structuredData"
                  rows={12}
                  value={structuredDataText}
                  onChange={(e) => {
                    setStructuredDataText(e.target.value);
                    try {
                      if (e.target.value.trim()) JSON.parse(e.target.value);
                      setSchemaError(null);
                    } catch (err: any) {
                      setSchemaError("JSON syntax error: " + err.message);
                    }
                  }}
                  placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Course",\n  "name": "..." \n}'
                  className="w-full font-mono text-xs rounded-lg border border-line bg-paper p-3.5 text-ink focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                {schemaError && <p className="mt-1 text-xs text-rose-600 font-mono">{schemaError}</p>}
                <p className="mt-2 text-xs text-muted">
                  Leave empty if you wish to use the automatic default Course JSON-LD schema generated by the system.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Live SERP & Social Preview */}
          {activeTab === "preview" && (
            <div className="rounded-xl border border-line bg-surface p-6 space-y-8 shadow-xs">
              {/* Google Search Preview */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
                  Google Search Result Preview
                </h3>
                <div className="max-w-2xl rounded-xl border border-line bg-paper p-4 font-sans shadow-xs">
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                    <div className="w-4 h-4 rounded-full bg-brand-600 flex items-center justify-center text-[9px] text-white font-bold">
                      C
                    </div>
                    <span className="font-medium text-slate-800">Coalescex</span>
                    <span>›</span>
                    <span className="text-slate-500 truncate">
                      {formData.canonicalUrl || `https://coalescex.com/courses/${selectedSlug}`}
                    </span>
                  </div>
                  <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
                    {formData.metaTitle || "Course Title | Coalescex"}
                  </h4>
                  <p className="text-xs text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
                    {formData.metaDescription ||
                      "Explore top industry-certified courses and learn in-demand tech, business, and creative skills at Coalescex."}
                  </p>
                </div>
              </div>

              {/* Social Share Card Preview */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
                  Social Share Card Preview (WhatsApp / Facebook / LinkedIn)
                </h3>
                <div className="max-w-md rounded-xl border border-line bg-paper overflow-hidden shadow-xs">
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center text-muted">
                    {formData.ogImageUrl ? (
                      <img
                        src={formData.ogImageUrl}
                        alt="Social Card"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            "https://coalescex.com/wp-content/uploads/elementor/thumbs/a_student_enrolling_for_a_career_institute-qtdjrw1xr0xhzwjggjhajkbu5ecknwxvrttpl9q8q4.jpeg";
                        }}
                      />
                    ) : (
                      <span className="text-xs">No preview image provided</span>
                    )}
                  </div>
                  <div className="p-3.5 bg-surface border-t border-line">
                    <span className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">
                      coalescex.com
                    </span>
                    <h4 className="text-sm font-bold text-ink line-clamp-1 leading-snug">
                      {formData.ogTitle || formData.metaTitle || "Course Title"}
                    </h4>
                    <p className="text-xs text-muted line-clamp-2 mt-1">
                      {formData.ogDescription || formData.metaDescription || "Course summary and highlights."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-line">
            <Link
              href="/instructor/courses"
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper transition"
            >
              ← Cancel &amp; Back to Courses
            </Link>

            <button
              type="submit"
              disabled={saveMutation.isPending || !!schemaError}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {saveMutation.isPending ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Saving SEO Data &amp; Redirecting…</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Save SEO &amp; Return to List</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-line bg-surface p-12 text-center">
          <p className="text-muted">Please select a course page from the dropdown above to manage its SEO.</p>
        </div>
      )}
    </div>
  );
}

export default function SeoManagerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">Loading SEO Manager…</div>}>
      <SeoManagerContent />
    </Suspense>
  );
}
