
import { Router } from "express";
import { z } from "zod";
import { Prisma, Role } from "@prisma/client";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { ApiError } from "@/utils/ApiError";

const router = Router();

const sectionSchema = z.object({
  heading: z.string().min(1).max(200),
  paragraphs: z.array(z.string().max(10000)).default([]),
  bullets: z.array(z.string().max(2000)).optional(),
});

const updateSchema = z.object({
  title: z.string().min(1).max(200),
  lastUpdated: z.string().min(1).max(100),
  sections: z.array(sectionSchema).min(1).max(100),
});

const allowedSlugs = [
  "terms",
  "privacy",
  "gdpr",
  "payment-protection-policy",
  "press",
  "investors",
  "help",
  "accessibility",
  "contact",
  "articles",
  "directory",
  "affiliates",
  "modern-slavery",
] as const;

function validateSlug(slug: string) {
  if (!allowedSlugs.includes(slug as (typeof allowedSlugs)[number])) {
    throw ApiError.notFound("Legal page not found");
  }
}

// Public API: retrieve a legal page by slug
router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  validateSlug(slug);

  const page = await prisma.legalPage.findUnique({
    where: { slug },
  });

  if (!page) {
    throw ApiError.notFound(
      "Legal page content has not been configured in the database"
    );
  }

  res.json({ page });
});

// Admin-only API: create or update a legal page
router.put(
  "/:slug",
  requireAuth,
  requireRole(Role.ADMIN),
  async (req, res) => {
    const slug = req.params.slug;
    validateSlug(slug);

    const input = updateSchema.parse(req.body);
    const content = input.sections as Prisma.InputJsonValue;

    const page = await prisma.legalPage.upsert({
      where: { slug },
      create: {
        slug,
        title: input.title,
        lastUpdated: input.lastUpdated,
        content,
      },
      update: {
        title: input.title,
        lastUpdated: input.lastUpdated,
        content,
      },
    });

    res.json({ page });
  }
);

export default router;
