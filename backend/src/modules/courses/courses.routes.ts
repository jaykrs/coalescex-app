import { Router } from "express";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole, optionalAuth } from "@/middleware/auth";
import { Role, CourseStatus } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";
import {
  createCourseSchema,
  updateCourseSchema,
  createSectionSchema,
  createLessonSchema,
  listCoursesQuerySchema,
} from "./courses.schema";
import * as coursesService from "./courses.service";

const router = Router();

// ---- Public catalog ----

router.get("/", async (req, res) => {
  const query = listCoursesQuerySchema.parse(req.query);
  const result = await coursesService.listPublishedCourses(query);
  res.json(result);
});

router.get("/:idOrSlug", optionalAuth, async (req, res) => {
  const course = await coursesService.getCourseDetail(req.params.idOrSlug, req.user?.sub);
  res.json({ course });
});

// ---- Instructor: course management ----

router.post("/", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  const input = createCourseSchema.parse(req.body);
  const course = await prisma.course.create({
    data: { ...input, instructorId: req.user!.sub, status: CourseStatus.DRAFT },
  });
  res.status(201).json({ course });
});

router.patch("/:id", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  if (req.user!.role === Role.INSTRUCTOR) {
    await coursesService.assertOwnsCourse(req.params.id, req.user!.sub);
  }
  const input = updateCourseSchema.parse(req.body);
  const course = await prisma.course.update({ where: { id: req.params.id }, data: input });
  res.json({ course });
});

// Instructor submits course for admin review
router.post("/:id/submit", requireAuth, requireRole(Role.INSTRUCTOR), async (req, res) => {
  await coursesService.assertOwnsCourse(req.params.id, req.user!.sub);
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: { status: CourseStatus.PENDING_APPROVAL },
  });
  res.json({ course });
});

router.post(
  "/:id/sections",
  requireAuth,
  requireRole(Role.INSTRUCTOR, Role.ADMIN),
  async (req, res) => {
    if (req.user!.role === Role.INSTRUCTOR) {
      await coursesService.assertOwnsCourse(req.params.id, req.user!.sub);
    }
    const input = createSectionSchema.parse(req.body);
    const section = await prisma.courseSection.create({
      data: { ...input, courseId: req.params.id },
    });
    res.status(201).json({ section });
  }
);

router.post(
  "/sections/:sectionId/lessons",
  requireAuth,
  requireRole(Role.INSTRUCTOR, Role.ADMIN),
  async (req, res) => {
    const section = await prisma.courseSection.findUnique({
      where: { id: req.params.sectionId },
      include: { course: true },
    });
    if (!section) throw ApiError.notFound("Section not found");
    if (req.user!.role === Role.INSTRUCTOR && section.course.instructorId !== req.user!.sub) {
      throw ApiError.forbidden("You do not own this course");
    }
    const input = createLessonSchema.parse(req.body);
    const lesson = await prisma.lesson.create({
      data: { ...input, sectionId: req.params.sectionId },
    });
    res.status(201).json({ lesson });
  }
);

router.get(
  "/mine/list",
  requireAuth,
  requireRole(Role.INSTRUCTOR),
  async (req, res) => {
    const courses = await prisma.course.findMany({
      where: { instructorId: req.user!.sub },
      orderBy: { createdAt: "desc" },
      include: { category: true, _count: { select: { enrollments: true } } },
    });
    res.json({ courses });
  }
);

// ---- Admin: approval workflow ----

router.get("/admin/pending", requireAuth, requireRole(Role.ADMIN), async (_req, res) => {
  const courses = await prisma.course.findMany({
    where: { status: CourseStatus.PENDING_APPROVAL },
    include: { instructor: { select: { firstName: true, lastName: true, email: true } } },
  });
  res.json({ courses });
});

router.post("/:id/approve", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: { status: CourseStatus.PUBLISHED },
  });
  res.json({ course });
});

router.post("/:id/reject", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: { status: CourseStatus.REJECTED },
  });
  res.json({ course });
});

export default router;
