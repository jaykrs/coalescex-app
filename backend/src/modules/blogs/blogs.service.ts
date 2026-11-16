import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import type { CreateBlogInput, UpdateBlogInput, BlogQueryParams } from "./blogs.schema";
import { BlogStatus, Prisma } from "@prisma/client";

/**
 * Standard URL-friendly slug generator.
 */
export function slugify(text: string): string {
  const cleaned = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "untitled-blog";
}

/**
 * Ensures slug is unique in the database by appending an incrementing suffix if necessary.
 */
async function generateUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  const initial = slugify(baseSlug);
  let candidate = initial;
  let counter = 1;

  while (true) {
    const existing = await prisma.blog.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      return candidate;
    }

    candidate = `${initial}-${counter}`;
    counter++;
  }
}

/**
 * Helper to strip HTML tags for default SEO description.
 */
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Create a new blog post.
 */
export async function createBlog(input: CreateBlogInput) {
  const baseSlug = input.slug?.trim() ? input.slug : input.title;
  const uniqueSlug = await generateUniqueSlug(baseSlug);

  const parsedPublishDate = input.publishDate
    ? new Date(input.publishDate)
    : new Date();

  const plainExcerpt = input.shortDescription?.trim()
    ? input.shortDescription.trim()
    : stripHtmlTags(input.htmlContent).slice(0, 160);

  const defaultMetaTitle = input.metaTitle?.trim() || input.title;
  const defaultMetaDescription = input.metaDescription?.trim() || plainExcerpt;
  const defaultCanonical = input.canonicalUrl?.trim() || `https://coalescex.com/blog/${uniqueSlug}`;

  const blog = await prisma.blog.create({
    data: {
      title: input.title.trim(),
      slug: uniqueSlug,
      featuredImage: input.featuredImage?.trim() || null,
      shortDescription: plainExcerpt,
      category: input.category.trim() || "General",
      author: input.author?.trim() || "Coalescex Team",
      publishDate: parsedPublishDate,
      status: (input.status as BlogStatus) || BlogStatus.DRAFT,
      htmlContent: input.htmlContent,

      // SEO
      metaTitle: defaultMetaTitle,
      metaDescription: defaultMetaDescription,
      metaKeywords: input.metaKeywords?.trim() || null,
      canonicalUrl: defaultCanonical,
      ogTitle: input.ogTitle?.trim() || defaultMetaTitle,
      ogDescription: input.ogDescription?.trim() || defaultMetaDescription,
      ogImage: input.ogImage?.trim() || input.featuredImage?.trim() || null,
      robots: input.robots?.trim() || "index, follow",
    },
  });

  return blog;
}

/**
 * Get single blog by its ID (Admin view).
 */
export async function getBlogById(id: string) {
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    throw ApiError.notFound("Blog not found");
  }

  return blog;
}

/**
 * Get single blog by its unique slug (Public view or Admin preview).
 */
export async function getBlogBySlug(slug: string, publicOnly = true) {
  const blog = await prisma.blog.findUnique({
    where: { slug: slug.trim().toLowerCase() },
  });

  if (!blog) {
    throw ApiError.notFound("Blog post not found");
  }

  if (publicOnly && blog.status !== BlogStatus.PUBLISHED) {
    throw ApiError.notFound("Blog post not found or not published");
  }

  return blog;
}

/**
 * List blogs with pagination, search, category filter, and status filter.
 */
export async function listBlogs(query: BlogQueryParams, publicOnly = false) {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {};

  if (publicOnly) {
    where.status = BlogStatus.PUBLISHED;
  } else if (query.status) {
    where.status = query.status as BlogStatus;
  }

  if (query.category && query.category.toLowerCase() !== "all") {
    where.category = {
      equals: query.category.trim(),
      mode: "insensitive",
    };
  }

  if (query.search && query.search.trim()) {
    const s = query.search.trim();
    where.OR = [
      { title: { contains: s, mode: "insensitive" } },
      { shortDescription: { contains: s, mode: "insensitive" } },
      { author: { contains: s, mode: "insensitive" } },
      { category: { contains: s, mode: "insensitive" } },
    ];
  }

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishDate: "desc" },
    }),
    prisma.blog.count({ where }),
  ]);

  return {
    blogs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

/**
 * Update an existing blog by ID.
 */
export async function updateBlog(id: string, input: UpdateBlogInput) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) {
    throw ApiError.notFound("Blog not found");
  }

  let finalSlug = existing.slug;
  if (input.slug && input.slug.trim() && input.slug.trim() !== existing.slug) {
    finalSlug = await generateUniqueSlug(input.slug, id);
  } else if (input.title && !input.slug && !existing.slug) {
    finalSlug = await generateUniqueSlug(input.title, id);
  }

  const dataToUpdate: Prisma.BlogUpdateInput = {
    ...(input.title !== undefined && { title: input.title.trim() }),
    slug: finalSlug,
    ...(input.featuredImage !== undefined && {
      featuredImage: input.featuredImage?.trim() || null,
    }),
    ...(input.shortDescription !== undefined && {
      shortDescription: input.shortDescription?.trim() || null,
    }),
    ...(input.category !== undefined && { category: input.category.trim() }),
    ...(input.author !== undefined && { author: input.author.trim() }),
    ...(input.publishDate !== undefined && {
      publishDate: input.publishDate ? new Date(input.publishDate) : existing.publishDate,
    }),
    ...(input.status !== undefined && { status: input.status as BlogStatus }),
    ...(input.htmlContent !== undefined && { htmlContent: input.htmlContent }),

    // SEO updates
    ...(input.metaTitle !== undefined && { metaTitle: input.metaTitle?.trim() || null }),
    ...(input.metaDescription !== undefined && {
      metaDescription: input.metaDescription?.trim() || null,
    }),
    ...(input.metaKeywords !== undefined && {
      metaKeywords: input.metaKeywords?.trim() || null,
    }),
    ...(input.canonicalUrl !== undefined && {
      canonicalUrl: input.canonicalUrl?.trim() || null,
    }),
    ...(input.ogTitle !== undefined && { ogTitle: input.ogTitle?.trim() || null }),
    ...(input.ogDescription !== undefined && {
      ogDescription: input.ogDescription?.trim() || null,
    }),
    ...(input.ogImage !== undefined && { ogImage: input.ogImage?.trim() || null }),
    ...(input.robots !== undefined && { robots: input.robots?.trim() || "index, follow" }),
  };

  const updated = await prisma.blog.update({
    where: { id },
    data: dataToUpdate,
  });

  return updated;
}

/**
 * Delete a blog post.
 */
export async function deleteBlog(id: string) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) {
    throw ApiError.notFound("Blog not found");
  }

  await prisma.blog.delete({ where: { id } });
  return { success: true, message: "Blog deleted successfully" };
}

/**
 * Get distinct categories and stats for filters.
 */
export async function getBlogCategories(publicOnly = true) {
  const where: Prisma.BlogWhereInput = publicOnly ? { status: BlogStatus.PUBLISHED } : {};
  const categories = await prisma.blog.findMany({
    where,
    select: { category: true },
    distinct: ["category"],
  });

  return categories.map((c) => c.category).filter(Boolean);
}

/**
 * Get blog summary statistics for the admin dashboard.
 */
export async function getBlogStats() {
  const [total, published, draft, categories] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: BlogStatus.PUBLISHED } }),
    prisma.blog.count({ where: { status: BlogStatus.DRAFT } }),
    prisma.blog.findMany({
      select: { category: true },
      distinct: ["category"],
    }),
  ]);

  return {
    total,
    published,
    draft,
    totalCategories: categories.length,
  };
}
