import { Router } from "express";
import { z } from "zod";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";

const router = Router();

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  description: z.string().optional(),
  iconUrl: z.string().url().optional(),
});

// Public: list categories
router.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          courses: {
            where: { isDeleted: false, status: "PUBLISHED" },
          },
        },
      },
    },
  });
  res.json({ categories });
});

// Admin only: create category
router.post("/", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = categorySchema.parse(req.body);
  const existing = await prisma.category.findUnique({ where: { slug: input.slug } });
  if (existing) throw ApiError.conflict("A category with this slug already exists");
  const category = await prisma.category.create({ data: input });
  res.status(201).json({ category });
});

router.patch("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = categorySchema.partial().parse(req.body);
  const category = await prisma.category.update({ where: { id: req.params.id }, data: input });
  res.json({ category });
});

router.delete("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
