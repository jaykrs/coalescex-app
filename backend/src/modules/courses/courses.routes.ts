import { Router } from "express";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole, optionalAuth } from "@/middleware/auth";
import { Role, CourseStatus } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";
import {
  createCourseSchema,
  updateCourseSchema,
  createSectionSchema,
  updateSectionSchema,
  createLessonSchema,
  updateLessonSchema,
  listCoursesQuerySchema,
  upsertCourseSeoSchema,
} from "./courses.schema";
import * as coursesService from "./courses.service";

const router = Router();

// ---- Public catalog ----

router.get("/", async (req, res) => {
  const query = listCoursesQuerySchema.parse(req.query);
  const result = await coursesService.listPublishedCourses(query);
  res.json(result);
});

// ---- SEO & Slugs management ----

router.get("/manage/slugs", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  const where =
    req.user!.role === Role.ADMIN
      ? { isDeleted: false }
      : { instructorId: req.user!.sub, isDeleted: false };

  const courses = await prisma.course.findMany({
    where,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnailUrl: true,
      status: true,
      seo: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({ courses });
});

router.get("/seo/:slug", async (req, res) => {
  const course = await prisma.course.findFirst({
    where: { slug: req.params.slug, isDeleted: false },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      description: true,
      thumbnailUrl: true,
      instructorId: true,
      seo: true,
    },
  });

  if (!course) throw ApiError.notFound("Course not found");
  res.json({
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      subtitle: course.subtitle,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
    },
    seo: course.seo,
  });
});

router.put("/seo/:slug", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  const course = await prisma.course.findFirst({
    where: { slug: req.params.slug, isDeleted: false },
  });

  if (!course) throw ApiError.notFound("Course not found");

  if (req.user!.role === Role.INSTRUCTOR && course.instructorId !== req.user!.sub) {
    throw ApiError.forbidden("You do not own this course");
  }

  const input = upsertCourseSeoSchema.parse(req.body);

  const seo = await prisma.courseSeo.upsert({
    where: { courseId: course.id },
    create: {
      courseId: course.id,
      ...input,
    },
    update: {
      ...input,
    },
  });

  res.json({ seo });
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

function hasCourseChanged(existing: any, input: any): boolean {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    const existingVal = existing[key];

    // Numbers & Decimal comparison (price, discountPrice)
    if (key === "price" || key === "discountPrice") {
      const numInput = value !== null && value !== undefined && value !== "" ? Number(value) : null;
      const numExist = existingVal !== null && existingVal !== undefined && existingVal !== "" ? Number(existingVal) : null;
      if (numInput !== numExist) return true;
      continue;
    }

    // FAQs array comparison
    if (key === "faqs") {
      const arrInput = Array.isArray(value) ? value : [];
      const arrExist = Array.isArray(existingVal) ? existingVal : [];
      if (JSON.stringify(arrInput) !== JSON.stringify(arrExist)) return true;
      continue;
    }

    // Strings comparison (normalize null vs empty string)
    if (typeof value === "string" || typeof existingVal === "string") {
      const strInput = String(value ?? "").trim();
      const strExist = String(existingVal ?? "").trim();
      if (strInput !== strExist) return true;
      continue;
    }

    // Direct comparison
    if (value !== existingVal) {
      return true;
    }
  }
  return false;
}

router.patch("/:id", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  let existingCourse: any = null;
  if (req.user!.role === Role.INSTRUCTOR) {
    existingCourse = await coursesService.assertOwnsCourse(req.params.id, req.user!.sub);
  } else {
    existingCourse = await prisma.course.findUnique({ where: { id: req.params.id } });
  }
  if (!existingCourse) throw ApiError.notFound("Course not found");

  const input = updateCourseSchema.parse(req.body);
  const hasChanges = hasCourseChanged(existingCourse, input);

  // Status only reverts to PENDING_APPROVAL if there were actual changes and user is INSTRUCTOR
  const statusUpdate =
    req.user!.role === Role.INSTRUCTOR && hasChanges
      ? { status: CourseStatus.PENDING_APPROVAL }
      : {};

  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: { ...input, ...statusUpdate },
  });
  res.json({ course, hasChanges });
});

router.delete("/:id", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  if (req.user!.role === Role.INSTRUCTOR) {
    await coursesService.assertOwnsCourse(req.params.id, req.user!.sub);
  }
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: { isDeleted: true },
  });
  res.json({ message: "Course deleted successfully", course });
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
    if (req.user!.role === Role.INSTRUCTOR) {
      await prisma.course.update({
        where: { id: req.params.id },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.status(201).json({ section });
  }
);

router.patch(
  "/sections/:sectionId",
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
    const input = updateSectionSchema.parse(req.body);
    const hasChanged =
      (input.title !== undefined && input.title.trim() !== section.title.trim()) ||
      (input.order !== undefined && input.order !== section.order);

    const updated = await prisma.courseSection.update({
      where: { id: req.params.sectionId },
      data: input,
    });
    if (req.user!.role === Role.INSTRUCTOR && hasChanged) {
      await prisma.course.update({
        where: { id: section.courseId },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.json({ section: updated, hasChanged });
  }
);

router.delete(
  "/sections/:sectionId",
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
    await prisma.courseSection.delete({
      where: { id: req.params.sectionId },
    });
    if (req.user!.role === Role.INSTRUCTOR) {
      await prisma.course.update({
        where: { id: section.courseId },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.json({ message: "Section deleted successfully" });
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
      data: { ...input, sectionId: req.params.sectionId } as any,
    });
    if (req.user!.role === Role.INSTRUCTOR) {
      await prisma.course.update({
        where: { id: section.courseId },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.status(201).json({ lesson });
  }
);

router.patch(
  "/lessons/:lessonId",
  requireAuth,
  requireRole(Role.INSTRUCTOR, Role.ADMIN),
  async (req, res) => {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.lessonId },
      include: { section: { include: { course: true } } },
    });
    if (!lesson) throw ApiError.notFound("Lesson not found");
    if (req.user!.role === Role.INSTRUCTOR && lesson.section.course.instructorId !== req.user!.sub) {
      throw ApiError.forbidden("You do not own this course");
    }
    const input = updateLessonSchema.parse(req.body);
    const hasChanged =
      (input.title !== undefined && input.title.trim() !== lesson.title.trim()) ||
      (input.contentType !== undefined && (input.contentType as any) !== lesson.contentType) ||
      (input.contentUrl !== undefined && (input.contentUrl ?? "").trim() !== (lesson.contentUrl ?? "").trim()) ||
      (input.isPreview !== undefined && input.isPreview !== lesson.isPreview) ||
      (input.durationSec !== undefined && input.durationSec !== lesson.durationSec);

    const updated = await prisma.lesson.update({
      where: { id: req.params.lessonId },
      data: input as any,
    });
    if (req.user!.role === Role.INSTRUCTOR && hasChanged) {
      await prisma.course.update({
        where: { id: lesson.section.courseId },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.json({ lesson: updated, hasChanged });
  }
);

router.delete(
  "/lessons/:lessonId",
  requireAuth,
  requireRole(Role.INSTRUCTOR, Role.ADMIN),
  async (req, res) => {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.lessonId },
      include: { section: { include: { course: true } } },
    });
    if (!lesson) throw ApiError.notFound("Lesson not found");
    if (req.user!.role === Role.INSTRUCTOR && lesson.section.course.instructorId !== req.user!.sub) {
      throw ApiError.forbidden("You do not own this course");
    }
    await prisma.lesson.delete({
      where: { id: req.params.lessonId },
    });
    if (req.user!.role === Role.INSTRUCTOR) {
      await prisma.course.update({
        where: { id: lesson.section.courseId },
        data: { status: CourseStatus.PENDING_APPROVAL },
      });
    }
    res.json({ message: "Lesson deleted successfully" });
  }
);

router.get(
  "/mine/list",
  requireAuth,
  requireRole(Role.INSTRUCTOR),
  async (req, res) => {
    const courses = await prisma.course.findMany({
      where: { instructorId: req.user!.sub, isDeleted: false },
      orderBy: { createdAt: "desc" },
      include: { category: true, seo: true, _count: { select: { enrollments: true } } },
    });
    res.json({ courses });
  }
);

// ---- Admin: approval workflow ----

router.get("/admin/pending", requireAuth, requireRole(Role.ADMIN), async (_req, res) => {
  const courses = await prisma.course.findMany({
    where: { status: CourseStatus.PENDING_APPROVAL, isDeleted: false },
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
