import { z } from "zod";

export const blogStatusEnum = z.enum(["DRAFT", "PUBLISHED"]);

export const createBlogSchema = z.object({
  title: z.string().min(1, "Blog title is required").max(255),
  slug: z.string().optional().nullable().or(z.literal("")),
  featuredImage: z.string().optional().nullable().or(z.literal("")),
  shortDescription: z.string().optional().nullable().or(z.literal("")),
  category: z.string().min(1, "Category is required").default("General"),
  author: z.string().min(1).default("Coalescex Team"),
  publishDate: z.string().or(z.date()).optional().nullable(),
  status: blogStatusEnum.default("DRAFT"),
  htmlContent: z.string().min(1, "Blog content is required"),

  // SEO Fields
  metaTitle: z.string().optional().nullable().or(z.literal("")),
  metaDescription: z.string().optional().nullable().or(z.literal("")),
  metaKeywords: z.string().optional().nullable().or(z.literal("")),
  canonicalUrl: z.string().optional().nullable().or(z.literal("")),
  ogTitle: z.string().optional().nullable().or(z.literal("")),
  ogDescription: z.string().optional().nullable().or(z.literal("")),
  ogImage: z.string().optional().nullable().or(z.literal("")),
  robots: z.string().optional().nullable().or(z.literal("")),
});

export const updateBlogSchema = createBlogSchema.partial();

export const blogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  status: blogStatusEnum.optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type BlogQueryParams = z.infer<typeof blogQuerySchema>;
