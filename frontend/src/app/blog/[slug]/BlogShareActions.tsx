"use client";

import { useState } from "react";

interface BlogShareActionsProps {
  title: string;
  slug: string;
}

export function BlogShareActions({ title, slug }: BlogShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined"
    ? `${window.location.origin}/blog/${slug}`
    : `https://coalescex.com/blog/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted font-medium mr-1">Share:</span>

      <button
        type="button"
        onClick={handleCopyLink}
        className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-muted hover:text-ink hover:bg-paper transition"
        title="Copy article link"
      >
        {copied ? "✓ Copied!" : "🔗 Copy Link"}
      </button>

      <a
        href={twitterShare}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-muted hover:text-ink hover:bg-paper transition"
      >
        𝕏 Post
      </a>

      <a
        href={linkedinShare}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-muted hover:text-ink hover:bg-paper transition"
      >
        LinkedIn
      </a>
    </div>
  );
}
