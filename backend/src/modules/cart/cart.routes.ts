import { Router } from "express";
import { z } from "zod";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";

const router = Router();
router.use(requireAuth, requireRole(Role.STUDENT));

router.get("/", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.sub, course: { isDeleted: false } },
    include: { course: { include: { category: true } } },
    orderBy: { addedAt: "desc" },
  });
  const total = items.reduce(
    (sum, item) => sum + Number(item.course.discountPrice ?? item.course.price),
    0
  );
  res.json({ items, total });
});

const addItemSchema = z.object({ courseId: z.string().uuid() });

router.post("/", async (req, res) => {
  const { courseId } = addItemSchema.parse(req.body);

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || course.status !== "PUBLISHED" || course.isDeleted) throw ApiError.notFound("Course not available");

  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: req.user!.sub, courseId } },
  });
  if (alreadyEnrolled) throw ApiError.conflict("You are already enrolled in this course");

  const item = await prisma.cartItem.upsert({
    where: { userId_courseId: { userId: req.user!.sub, courseId } },
    create: { userId: req.user!.sub, courseId },
    update: {},
  });
  res.status(201).json({ item });
});

router.delete("/:courseId", async (req, res) => {
  await prisma.cartItem.deleteMany({
    where: { userId: req.user!.sub, courseId: req.params.courseId },
  });
  res.status(204).send();
});

router.delete("/", async (req, res) => {
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.sub } });
  res.status(204).send();
});

export default router;
