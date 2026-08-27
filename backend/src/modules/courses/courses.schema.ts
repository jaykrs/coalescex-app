import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  subtitle: z.string().optional(),
  description: z.string().min(10),
  thumbnailUrl: z.string().url().optional(),
  price: z.number().nonnegative(),
  discountPrice: z.number().nonnegative().optional(),
  level: z.string().optional(),
  language: z.string().optional(),
  categoryId: z.string().uuid(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createSectionSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const createLessonSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
  contentType: z.enum(["VIDEO", "ARTICLE", "PDF", "ASSESSMENT"]),
  contentUrl: z.string().url().optional(),
  durationSec: z.number().int().nonnegative().optional(),
  isPreview: z.boolean().optional(),
});

export const listCoursesQuerySchema = z.object({
  category: z.string().optional(), // category slug
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});
