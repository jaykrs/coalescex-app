import { Router } from "express";
import { z } from "zod";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";

const router = Router();
router.use(requireAuth, requireRole(Role.STUDENT));

// ---- Student dashboard: enrolled courses with computed progress % ----
router.get("/dashboard", async (req, res) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: req.user!.sub, course: { isDeleted: false } },
    include: {
      course: {
        include: {
          sections: { include: { lessons: true } },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });

  const lessonIds = enrollments.flatMap((e) =>
    e.course.sections.flatMap((s) => s.lessons.map((l) => l.id))
  );

  const progressRows = await prisma.lessonProgress.findMany({
    where: { userId: req.user!.sub, lessonId: { in: lessonIds }, completed: true },
  });
  const completedSet = new Set(progressRows.map((p) => p.lessonId));

  const dashboard = enrollments.map((e) => {
    const allLessons = e.course.sections.flatMap((s) => s.lessons);
    const completedLessonIds = allLessons.filter((l) => completedSet.has(l.id)).map((l) => l.id);
    const progressPercent = allLessons.length
      ? Math.round((completedLessonIds.length / allLessons.length) * 100)
      : 0;
    return {
      course: { id: e.course.id, title: e.course.title, slug: e.course.slug, thumbnailUrl: e.course.thumbnailUrl },
      enrolledAt: e.enrolledAt,
      totalLessons: allLessons.length,
      completedLessons: completedLessonIds.length,
      completedLessonIds,
      progressPercent,
    };
  });

  res.json({ dashboard });
});

const markCompleteSchema = z.object({
  lessonId: z.string().uuid(),
  completed: z.boolean().default(true),
  lastPositionSec: z.number().int().nonnegative().optional(),
});

router.post("/", async (req, res) => {
  const input = markCompleteSchema.parse(req.body);

  const lesson = await prisma.lesson.findUnique({
    where: { id: input.lessonId },
    include: { section: { include: { course: true } } },
  });
  if (!lesson) throw ApiError.notFound("Lesson not found");

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: req.user!.sub, courseId: lesson.section.course.id } },
  });
  if (!enrollment) throw ApiError.forbidden("You are not enrolled in this course");

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: req.user!.sub, lessonId: input.lessonId } },
    create: {
      userId: req.user!.sub,
      lessonId: input.lessonId,
      completed: input.completed,
      completedAt: input.completed ? new Date() : null,
      lastPositionSec: input.lastPositionSec,
    },
    update: {
      completed: input.completed,
      completedAt: input.completed ? new Date() : null,
      lastPositionSec: input.lastPositionSec,
    },
  });

  res.json({ progress });
});

export default router;
