import { Router } from "express";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role } from "@prisma/client";
import { createAssessmentSchema, submitAssessmentSchema } from "./assessments.schema";
import * as assessmentsService from "./assessments.service";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";

const router = Router();

// Instructor/admin: create assessment for a lesson
router.post("/", requireAuth, requireRole(Role.INSTRUCTOR, Role.ADMIN), async (req, res) => {
  const input = createAssessmentSchema.parse(req.body);
  const assessment = await assessmentsService.createAssessment(
    input,
    req.user!.sub,
    req.user!.role === Role.ADMIN
  );
  res.status(201).json({ assessment });
});

// Student: resolve a lesson's assessment id (course view only has lesson IDs)
router.get("/by-lesson/:lessonId", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const assessment = await prisma.assessment.findUnique({
    where: { lessonId: req.params.lessonId },
    select: { id: true },
  });
  if (!assessment) throw ApiError.notFound("No assessment for this lesson");
  res.json({ assessmentId: assessment.id });
});

// Student: fetch assessment to take (no answers/correctness revealed)
router.get("/:id", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const assessment = await assessmentsService.getAssessmentForTaking(req.params.id);
  res.json({ assessment });
});

// Student: submit answers, get graded result
router.post("/:id/submit", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const input = submitAssessmentSchema.parse(req.body);
  const result = await assessmentsService.submitAssessment(req.params.id, req.user!.sub, input);
  res.status(201).json(result);
});

// Student: view own submission history for an assessment
router.get("/:id/submissions", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const submissions = await prisma.assessmentSubmission.findMany({
    where: { assessmentId: req.params.id, userId: req.user!.sub },
    orderBy: { submittedAt: "desc" },
  });
  res.json({ submissions });
});

// Instructor: view all submissions for an assessment they own
router.get(
  "/:id/all-submissions",
  requireAuth,
  requireRole(Role.INSTRUCTOR, Role.ADMIN),
  async (req, res) => {
    const assessment = await prisma.assessment.findUnique({
      where: { id: req.params.id },
      include: { lesson: { include: { section: { include: { course: true } } } } },
    });
    if (!assessment) throw ApiError.notFound("Assessment not found");
    if (
      req.user!.role === Role.INSTRUCTOR &&
      assessment.lesson.section.course.instructorId !== req.user!.sub
    ) {
      throw ApiError.forbidden();
    }
    const submissions = await prisma.assessmentSubmission.findMany({
      where: { assessmentId: req.params.id },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
      orderBy: { submittedAt: "desc" },
    });
    res.json({ submissions });
  }
);

export default router;
