"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api-client";
import type { Blog, BlogListResponse } from "@/types";

interface BlogStats {
  total: number;
  published: number;
  draft: number;
  totalCategories: number;
}

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Deletion modal state
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  // Notification feedback
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Fetch blogs list
  const { data, isLoading, isError, error, refetch } = useQuery<BlogListResponse>({
    queryKey: ["admin-blogs", page, limit, search, statusFilter, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (categoryFilter !== "ALL") params.set("category", categoryFilter);

      const res = await api.get(`/blogs?${params.toString()}`);
      return res.data;
    },
  });

  // Fetch stats
  const { data: statsData } = useQuery<{ stats: BlogStats }>({
    queryKey: ["admin-blog-stats"],
    queryFn: async () => {
      const res = await api.get("/blogs/stats");
      return res.data;
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery<{ categories: string[] }>({
    queryKey: ["admin-blog-categories"],
    queryFn: async () => {
      const res = await api.get("/blogs/categories");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blog-stats"] });
      setDeletingBlog(null);
      setFeedback({ type: "success", message: "Blog post deleted successfully." });
      setTimeout(() => setFeedback(null), 4000);
    },
    onError: (err: any) => {
      setDeletingBlog(null);
      setFeedback({
        type: "error",
        message: err.response?.data?.error?.message || "Failed to delete blog post.",
      });
      setTimeout(() => setFeedback(null), 5000);
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleResetSearch = () => {
    setSearchInput("");
    setSearch("");
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
    setPage(1);
  };

  const stats = statsData?.stats;
  const categories = categoriesData?.categories || [];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">Blog Management</h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Create, edit, organize categories, and publish blog articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="rounded-lg border border-line bg-surface px-3.5 py-2 text-xs sm:text-sm font-semibold text-muted hover:text-ink hover:bg-paper transition"
          >
            ↗ View Public Blog
          </Link>
          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-brand-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-700 transition shadow-xs flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Write New Blog</span>
          </Link>
        </div>
      </div>

      {/* Metrics / Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
          <p className="text-xs uppercase tracking-wide text-muted font-medium">Total Articles</p>
          <p className="mt-1 font-mono text-2xl font-bold text-ink">{stats ? stats.total : "—"}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
          <p className="text-xs uppercase tracking-wide text-emerald-700 font-medium">Published</p>
          <p className="mt-1 font-mono text-2xl font-bold text-emerald-600">
            {stats ? stats.published : "—"}
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
          <p className="text-xs uppercase tracking-wide text-amber-700 font-medium">Drafts</p>
          <p className="mt-1 font-mono text-2xl font-bold text-amber-600">
            {stats ? stats.draft : "—"}
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
          <p className="text-xs uppercase tracking-wide text-blue-700 font-medium">Categories</p>
          <p className="mt-1 font-mono text-2xl font-bold text-blue-600">
            {stats ? stats.totalCategories : "—"}
          </p>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`rounded-lg p-3 text-xs sm:text-sm font-medium border flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-bold underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-line bg-surface p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by title, excerpt, or author..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2 text-xs sm:text-sm text-ink placeholder:text-muted focus:border-brand-600 focus:bg-surface focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-700 transition"
            >
              Search
            </button>
          </form>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-line bg-paper px-3 py-2 text-xs sm:text-sm text-ink focus:border-brand-600 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-line bg-paper px-3 py-2 text-xs sm:text-sm text-ink focus:border-brand-600 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>

            {(search || statusFilter !== "ALL" || categoryFilter !== "ALL") && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="rounded-lg border border-line bg-paper px-2.5 py-2 text-xs text-muted hover:text-ink"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="rounded-xl border border-line bg-surface shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
            <p className="mt-2 text-xs sm:text-sm text-muted">Loading blog posts...</p>
          </div>
        ) : isError ? (
          <div className="py-12 px-4 text-center">
            <p className="text-sm text-red-600 font-medium">Failed to load blogs.</p>
            <p className="text-xs text-muted mt-1">
              {(error as any)?.response?.data?.error?.message || "Internal server error"}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 transition"
            >
              Retry
            </button>
          </div>
        ) : !data?.blogs || data.blogs.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <p className="text-3xl">✍️</p>
            <p className="text-base font-semibold text-ink">No blog articles found</p>
            <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
              {search || statusFilter !== "ALL" || categoryFilter !== "ALL"
                ? "No articles matched your active filters. Try searching for something else or clearing filters."
                : "No blog articles have been written yet. Start by writing your first article!"}
            </p>
            <div className="pt-2">
              <Link
                href="/admin/blogs/new"
                className="inline-block rounded-lg bg-brand-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                Write New Blog
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-line bg-paper/60 text-muted font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-paper/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-md overflow-hidden bg-paper shrink-0 border border-line">
                          {b.featuredImage ? (
                            <img
                              src={b.featuredImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                              📄
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <Link
                            href={`/admin/blogs/${b.id}/edit`}
                            className="font-semibold text-ink hover:text-brand-600 transition truncate block"
                          >
                            {b.title}
                          </Link>
                          <span className="text-[11px] text-muted block truncate">
                            /blog/{b.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-medium text-ink border border-line">
                        {b.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-ink font-medium text-xs whitespace-nowrap">
                      {b.author}
                    </td>

                    <td className="py-3 px-4 text-muted text-xs whitespace-nowrap">
                      {new Date(b.publishDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          b.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            b.status === "PUBLISHED" ? "bg-emerald-600" : "bg-amber-600"
                          }`}
                        />
                        {b.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-muted hover:text-ink hover:bg-paper transition"
                          title="Preview public article"
                        >
                          Preview
                        </Link>

                        <Link
                          href={`/admin/blogs/${b.id}/edit`}
                          className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeletingBlog(b)}
                          className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-4 py-3 text-xs sm:text-sm text-muted">
            <div>
              Showing <span className="font-semibold text-ink">{(page - 1) * limit + 1}</span> to{" "}
              <span className="font-semibold text-ink">
                {Math.min(page * limit, data.total)}
              </span>{" "}
              of <span className="font-semibold text-ink">{data.total}</span> articles
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink disabled:opacity-40 hover:bg-paper transition"
              >
                Previous
              </button>
              <span className="px-2 font-mono text-xs">
                {page} / {data.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                className="rounded-md border border-line bg-surface px-3 py-1 font-semibold text-ink disabled:opacity-40 hover:bg-paper transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-surface border border-line p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">Delete Blog Post</h3>
                <p className="text-xs text-muted">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-ink leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-red-600 font-semibold">{deletingBlog.title}</strong>? The
              article will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
              <button
                type="button"
                disabled={deleteMutation.isPending}
                onClick={() => setDeletingBlog(null)}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-muted hover:text-ink hover:bg-paper transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(deletingBlog.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition shadow-xs disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
