"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import type { Blog, BlogListResponse } from "@/types";

export default function BlogListingPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Fetch published blogs
  const { data, isLoading, isError, error, refetch } = useQuery<BlogListResponse>({
    queryKey: ["public-blogs", page, limit, search, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search.trim()) params.set("search", search.trim());
      if (selectedCategory !== "ALL") params.set("category", selectedCategory);

      const res = await api.get(`/blogs/public?${params.toString()}`);
      return res.data;
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery<{ categories: string[] }>({
    queryKey: ["public-blog-categories"],
    queryFn: async () => {
      const res = await api.get("/blogs/public/categories");
      return res.data;
    },
  });

  const categories = categoriesData?.categories || [];
  const blogs = data?.blogs || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  // The first blog on page 1 with no search filter acts as the featured post
  const isDefaultView = page === 1 && !search && selectedCategory === "ALL";
  const featuredBlog = isDefaultView && blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = featuredBlog ? blogs.slice(1) : blogs;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setSelectedCategory("ALL");
    setPage(1);
  };

  const estimateReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      {/* HERO SECTION */}
      <section className="border-b border-line bg-surface/70 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-700">
            <span>✨</span>
            <span>Coalescex Publications &amp; Engineering Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight font-display">
            Insights, Architecture &amp; Tech Guides
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            Curated articles on modern web development, artificial intelligence, scalable cloud systems,
            and software engineering career roadmaps from industry practitioners.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs">
              <input
                type="text"
                placeholder="Search articles, keywords, topics..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full border border-line bg-surface py-3 pl-5 pr-28 text-sm text-ink placeholder:text-muted focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 focus:outline-none transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-24 text-xs text-muted hover:text-ink"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition shadow-xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                selectedCategory === "ALL"
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-surface text-muted hover:text-ink hover:bg-paper border border-line"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-surface text-muted hover:text-ink hover:bg-paper border border-line"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Active Filter Indicator */}
        {(search || selectedCategory !== "ALL") && (
          <div className="flex items-center justify-between bg-surface border border-line rounded-xl px-4 py-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-ink">
              <span>Filtering by:</span>
              {search && (
                <span className="font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
                  Search: "{search}"
                </span>
              )}
              {selectedCategory !== "ALL" && (
                <span className="font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
                  Category: {selectedCategory}
                </span>
              )}
              <span className="text-muted">({total} articles found)</span>
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && (
          <div className="space-y-8">
            <div className="h-80 rounded-2xl bg-surface border border-line animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-2xl bg-surface border border-line animate-pulse"
                />
              ))}
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center space-y-3">
            <p className="text-3xl">⚠️</p>
            <h3 className="text-lg font-bold text-red-900">Failed to load articles</h3>
            <p className="text-xs sm:text-sm text-red-700">
              {(error as any)?.response?.data?.error?.message ||
                "There was an error communicating with the publications API."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="rounded-2xl border border-line bg-surface p-12 text-center space-y-4 max-w-lg mx-auto">
            <p className="text-4xl">✍️</p>
            <h3 className="text-xl font-bold text-ink">No articles available</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {search || selectedCategory !== "ALL"
                ? "No articles matched your active search query or category filter. Try clearing filters or exploring other topics."
                : "We are currently preparing fresh tutorials and deep dives. Check back soon or subscribe to our newsletter for instant updates."}
            </p>
            {(search || selectedCategory !== "ALL") && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        )}

        {/* FEATURED BLOG HERO CARD */}
        {!isLoading && !isError && featuredBlog && (
          <div className="rounded-3xl border border-line bg-surface overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Left */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-paper">
                {featuredBlog.featuredImage ? (
                  <img
                    src={featuredBlog.featuredImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <span className="text-5xl">📰</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-surface/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200 shadow-xs">
                    ⭐ Featured Article
                  </span>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-md bg-paper px-2.5 py-0.5 font-semibold text-ink border border-line">
                      {featuredBlog.category}
                    </span>
                    <span className="text-muted">•</span>
                    <span className="text-muted">
                      {estimateReadingTime(featuredBlog.htmlContent)} min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink font-display leading-tight group-hover:text-brand-600 transition">
                    <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                  </h2>

                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {featuredBlog.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs">
                      {featuredBlog.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink">{featuredBlog.author}</p>
                      <p className="text-[11px] text-muted">
                        {new Date(featuredBlog.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700 transition shadow-xs"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        {!isLoading && !isError && gridBlogs.length > 0 && (
          <div className="space-y-6">
            {featuredBlog && (
              <div className="flex items-center justify-between border-b border-line pb-2">
                <h3 className="text-xl font-bold text-ink font-display">Latest Publications</h3>
                <span className="text-xs text-muted">{gridBlogs.length} more articles</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridBlogs.map((b) => (
                <article
                  key={b.id}
                  className="rounded-2xl border border-line bg-surface overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col group"
                >
                  {/* Card Thumbnail */}
                  <Link
                    href={`/blog/${b.slug}`}
                    className="relative block h-48 overflow-hidden bg-paper"
                  >
                    {b.featuredImage ? (
                      <img
                        src={b.featuredImage}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-paper to-line/50 text-muted">
                        <span className="text-3xl">📄</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md bg-surface/90 backdrop-blur-xs px-2.5 py-0.5 text-xs font-semibold text-ink border border-line shadow-xs">
                        {b.category}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-muted">
                        <span>
                          {new Date(b.publishDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{estimateReadingTime(b.htmlContent)} min read</span>
                      </div>

                      <h3 className="text-lg font-bold text-ink font-display leading-snug group-hover:text-brand-600 transition line-clamp-2">
                        <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {b.shortDescription}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-800 border border-brand-200 flex items-center justify-center font-bold text-[10px]">
                          {b.author.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-ink truncate max-w-[120px]">
                          {b.author}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${b.slug}`}
                        className="font-semibold text-brand-600 hover:text-brand-700 transition flex items-center gap-0.5"
                      >
                        <span>Read</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-lg border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-paper transition disabled:opacity-40"
            >
              ← Previous
            </button>

            <span className="px-3 text-xs sm:text-sm text-muted font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-lg border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-paper transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* NEWSLETTER SECTION AT BOTTOM */}
        <section className="pt-8">
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-block p-3 rounded-2xl bg-brand-50 text-brand-700 text-2xl">
              📬
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-display">
                Stay Ahead in Tech &amp; Engineering
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                Join our newsletter subscribers. Receive weekly tutorials, system design breakdowns, and
                career resources right in your inbox.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <SubscriptionForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
