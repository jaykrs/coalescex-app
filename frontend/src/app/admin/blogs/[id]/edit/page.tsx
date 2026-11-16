"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { BlogForm } from "@/components/admin/BlogForm";
import type { Blog } from "@/types";

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error, refetch } = useQuery<{ blog: Blog }>({
    queryKey: ["admin-blog", id],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
        <p className="text-sm text-muted">Loading article details...</p>
      </div>
    );
  }

  if (isError || !data?.blog) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-3xl">⚠️</p>
        <h2 className="text-lg font-bold text-ink">Blog Not Found</h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
          {(error as any)?.response?.data?.error?.message ||
            "The requested blog article could not be loaded."}
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/admin/blogs"
            className="rounded-lg border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-muted hover:text-ink transition"
          >
            ← Back to Blog Management
          </Link>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-brand-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <BlogForm mode="edit" initialBlog={data.blog} />;
}
