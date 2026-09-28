import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  subtitle: z.string().optional(),
  description: z.string().min(10),
  type: z.enum(["ONLINE", "OFFLINE", "BOOTCAMP"]).default("ONLINE"),
  thumbnailUrl: z.string().url().optional().nullable().or(z.literal("")),
  outcomeImageUrl: z.string().url().optional().nullable().or(z.literal("")),
  accessoryImageUrl: z.string().url().optional().nullable().or(z.literal("")),
  price: z.number().nonnegative(),
  discountPrice: z.number().nonnegative().optional(),
  level: z.string().optional(),
  language: z.string().optional(),
  heroHtml: z.string().optional(),
  outcomesHtml: z.string().optional(),
  accessoriesHtml: z.string().optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    )
    .optional(),
  categoryId: z.string().uuid(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createSectionSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const updateSectionSchema = createSectionSchema.partial();

export const createLessonSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().nonnegative().optional().default(0),
  contentType: z.enum(["VIDEO", "ARTICLE", "PDF", "ASSESSMENT", "PRACTICE"]),
  contentUrl: z.string().optional().nullable(),
  durationSec: z.number().int().nonnegative().optional().nullable(),
  isPreview: z.boolean().optional().default(false),
});

export const updateLessonSchema = createLessonSchema.partial();

export const listCoursesQuerySchema = z.object({
  category: z.string().optional(), // category slug
  type: z.enum(["ONLINE", "OFFLINE", "BOOTCAMP"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

export const upsertCourseSeoSchema = z.object({
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImageUrl: z.string().optional().nullable(),
  ogType: z.string().optional().nullable(),
  twitterCard: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  twitterImageUrl: z.string().optional().nullable(),
  structuredData: z.any().optional().nullable(),
});

