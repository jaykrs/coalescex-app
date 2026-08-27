import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { CourseStatus } from "@prisma/client";
import type { z } from "zod";
import type { listCoursesQuerySchema } from "./courses.schema";

type ListQuery = z.infer<typeof listCoursesQuerySchema>;

export async function listPublishedCourses(query: ListQuery) {
  const where = {
    status: CourseStatus.PUBLISHED,
    ...(query.category ? { category: { slug: query.category } } : {}),
    ...(query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: "insensitive" as const } },
            { description: { contains: query.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
        instructor: { select: { firstName: true, lastName: true } },
        _count: { select: { enrollments: true } },
      },
    }),
    prisma.course.count({ where }),
  ]);

  return { courses, total, page: query.page, pageSize: query.pageSize };
}

export async function getCourseDetail(idOrSlug: string, viewerId?: string) {
  const course = await prisma.course.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: {
      category: true,
      instructor: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
      sections: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, include: { assessment: { select: { id: true } } } } },
      },
      _count: { select: { enrollments: true } },
    },
  });
  if (!course) throw ApiError.notFound("Course not found");

  let isEnrolled = false;
  let hasFullAccess = false;
  if (viewerId) {
    const [viewer, enrollment] = await Promise.all([
      prisma.user.findUnique({ where: { id: viewerId }, select: { role: true } }),
      prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: viewerId, courseId: course.id } },
      }),
    ]);
    isEnrolled = !!enrollment;
    // Owning instructor and admins get full content access for management purposes.
    hasFullAccess =
      isEnrolled ||
      viewer?.role === "ADMIN" ||
      (viewer?.role === "INSTRUCTOR" && course.instructorId === viewerId);
  }

  // Hide non-preview lesson content URLs from viewers without full access.
  const sections = course.sections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => ({
      ...lesson,
      contentUrl: hasFullAccess || lesson.isPreview ? lesson.contentUrl : null,
    })),
  }));

  return { ...course, sections, isEnrolled };
}

export async function assertOwnsCourse(courseId: string, instructorId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw ApiError.notFound("Course not found");
  if (course.instructorId !== instructorId) throw ApiError.forbidden("You do not own this course");
  return course;
}
