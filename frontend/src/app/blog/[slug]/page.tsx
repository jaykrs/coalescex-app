import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api-client";
import { BlogShareActions } from "./BlogShareActions";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import type { Blog } from "@/types";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPublicBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/public/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.blog || null;
  } catch (err) {
    console.error("Failed to fetch blog by slug:", err);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getPublicBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Coalescex",
      description: "The requested blog article could not be found.",
    };
  }

  const pageTitle = blog.metaTitle || blog.title;
  const pageDescription = blog.metaDescription || blog.shortDescription || "";
  const canonicalUrl = blog.canonicalUrl || `https://coalescex.com/blog/${blog.slug}`;
  const ogImg = blog.ogImage || blog.featuredImage;

  return {
    title: `${pageTitle} | Coalescex Blog`,
    description: pageDescription,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: blog.robots || "index, follow",
    openGraph: {
      title: blog.ogTitle || pageTitle,
      description: blog.ogDescription || pageDescription,
      url: canonicalUrl,
      siteName: "Coalescex",
      type: "article",
      publishedTime: blog.publishDate,
      authors: [blog.author],
      images: ogImg ? [{ url: ogImg, alt: blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.ogTitle || pageTitle,
      description: blog.ogDescription || pageDescription,
      images: ogImg ? [ogImg] : [],
    },
  };
}

function estimateReadingTime(html: string) {
  const text = html.replace(/<[^>]*>?/gm, "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await getPublicBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const readTime = estimateReadingTime(blog.htmlContent);
  const formattedDate = new Date(blog.publishDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-10 sm:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-brand-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-600 transition">
            Blog
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-[200px] sm:max-w-md">
            {blog.title}
          </span>
        </nav>

        {/* HEADER SECTION */}
        <header className="space-y-5 border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href={`/blog?category=${encodeURIComponent(blog.category)}`}
              className="rounded-full bg-brand-50 px-3.5 py-1 font-bold text-brand-700 border border-brand-200 hover:bg-brand-100 transition"
            >
              {blog.category}
            </Link>
            <span className="text-muted">•</span>
            <span className="text-muted font-medium">{readTime} min read</span>
            <span className="text-muted">•</span>
            <span className="text-muted">{formattedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-display tracking-tight leading-tight">
            {blog.title}
          </h1>

          {blog.shortDescription && (
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {blog.shortDescription}
            </p>
          )}

          {/* Author Card & Share Actions */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-line">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {blog.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{blog.author}</p>
                <p className="text-xs text-muted">Published on {formattedDate}</p>
              </div>
            </div>

            <BlogShareActions title={blog.title} slug={blog.slug} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden border border-line bg-paper shadow-xs max-h-[460px]">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* HTML CONTENT BODY */}
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10 shadow-xs">
          <div
            className="prose prose-slate max-w-none text-ink text-base sm:text-lg leading-relaxed 
              [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-extrabold [&>h1]:font-display [&>h1]:mt-8 [&>h1]:mb-4
              [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:font-display [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:border-b [&>h2]:border-line [&>h2]:pb-2
              [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2
              [&>p]:my-4 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:space-y-1.5
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:space-y-1.5
              [&>blockquote]:border-l-4 [&>blockquote]:border-brand-600 [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-gray-700
              [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6
              [&>code]:bg-paper [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-brand-700 [&>code]:font-mono [&>code]:text-sm
              [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
              [&>table_th]:border [&>table_th]:border-line [&>table_th]:p-2.5 [&>table_th]:bg-paper
              [&>table_td]:border [&>table_td]:border-line [&>table_td]:p-2.5
              [&>img]:rounded-xl [&>img]:my-6 [&>img]:border [&>img]:border-line
              [&>hr]:border-line [&>hr]:my-8"
            dangerouslySetInnerHTML={{ __html: blog.htmlContent }}
          />
        </div>

        {/* AUTHOR BIO & BACK LINK */}
        <div className="rounded-2xl border border-line bg-paper/50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-base shrink-0">
              {blog.author.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Written by {blog.author}</p>
              <p className="text-xs text-muted">
                Instructor &amp; curriculum creator at Coalescex. Focused on real-world engineering skills.
              </p>
            </div>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-paper transition shrink-0"
          >
            <span>←</span>
            <span>All Articles</span>
          </Link>
        </div>

        {/* BOTTOM NEWSLETTER CALLOUT */}
        <section className="pt-6">
          <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10 shadow-sm text-center space-y-5">
            <span className="text-3xl">📬</span>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink font-display">
                Enjoyed this article?
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                Get more high-yield programming and system design deep-dives delivered straight to your
                inbox every week.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <SubscriptionForm />
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
