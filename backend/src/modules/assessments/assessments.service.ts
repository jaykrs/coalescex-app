import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { QuestionType } from "@prisma/client";
import type { z } from "zod";
import type { createAssessmentSchema, updateAssessmentSchema, submitAssessmentSchema } from "./assessments.schema";

type CreateInput = z.infer<typeof createAssessmentSchema>;
type UpdateInput = z.infer<typeof updateAssessmentSchema>;
type SubmitInput = z.infer<typeof submitAssessmentSchema>;

export async function createAssessment(input: CreateInput, instructorId: string, isAdmin: boolean) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: input.lessonId },
    include: { section: { include: { course: true } } },
  });
  if (!lesson) throw ApiError.notFound("Lesson not found");
  if (!isAdmin && lesson.section.course.instructorId !== instructorId) {
    throw ApiError.forbidden("You do not own this course");
  }

  const existing = await prisma.assessment.findUnique({ where: { lessonId: input.lessonId } });
  if (existing) throw ApiError.conflict("This lesson already has an assessment");

  if (!isAdmin) {
    await prisma.course.update({
      where: { id: lesson.section.course.id },
      data: { status: "PENDING_APPROVAL" },
    });
  }

  return prisma.assessment.create({
    data: {
      lessonId: input.lessonId,
      title: input.title,
      passPercent: input.passPercent,
      questions: {
        create: input.questions.map((q) => {
          if (q.type === "TRUE_FALSE") {
            return {
              type: QuestionType.TRUE_FALSE,
              prompt: q.prompt,
              order: q.order,
              points: q.points,
              options: {
                create: [
                  { text: "True", isCorrect: q.correctAnswer === true, order: 0 },
                  { text: "False", isCorrect: q.correctAnswer === false, order: 1 },
                ],
              },
            };
          }
          if (q.type === "FILL_BLANK") {
            return {
              type: QuestionType.FILL_BLANK,
              prompt: q.prompt,
              order: q.order,
              points: q.points,
              acceptedAnswers: q.acceptedAnswers,
            };
          }
          // SINGLE_SELECT / MULTI_SELECT
          return {
            type: q.type === "SINGLE_SELECT" ? QuestionType.SINGLE_SELECT : QuestionType.MULTI_SELECT,
            prompt: q.prompt,
            order: q.order,
            points: q.points,
            options: {
              create: q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, order: o.order })),
            },
          };
        }),
      },
    },
    include: { questions: { include: { options: true } } },
  });
}

export async function getAssessmentForTaking(assessmentId: string) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { options: { orderBy: { order: "asc" } } },
      },
    },
  });
  if (!assessment) throw ApiError.notFound("Assessment not found");

  // Strip isCorrect / acceptedAnswers before sending to the student.
  return {
    ...assessment,
    questions: assessment.questions.map((q) => ({
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      order: q.order,
      points: q.points,
      options: q.options.map((o) => ({ id: o.id, text: o.text, order: o.order })),
    })),
  };
}

function normalizeText(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function submitAssessment(assessmentId: string, userId: string, input: SubmitInput) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { questions: { include: { options: true } } },
  });
  if (!assessment) throw ApiError.notFound("Assessment not found");

  let score = 0;
  let maxScore = 0;

  for (const question of assessment.questions) {
    maxScore += question.points;
    const answer = input.answers[question.id];
    if (answer === undefined) continue;

    switch (question.type) {
      case QuestionType.SINGLE_SELECT:
      case QuestionType.TRUE_FALSE: {
        const correctOption = question.options.find((o) => o.isCorrect);
        if (correctOption && answer === correctOption.id) score += question.points;
        break;
      }
      case QuestionType.MULTI_SELECT: {
        const correctIds = new Set(question.options.filter((o) => o.isCorrect).map((o) => o.id));
        const givenIds = new Set(Array.isArray(answer) ? answer : [answer]);
        const isExactMatch =
          correctIds.size === givenIds.size &&
          [...correctIds].every((id) => givenIds.has(id));
        if (isExactMatch) score += question.points;
        break;
      }
      case QuestionType.FILL_BLANK: {
        const accepted = (question.acceptedAnswers as string[] | null) ?? [];
        const given = Array.isArray(answer) ? answer[0] : answer;
        if (given && accepted.some((a) => normalizeText(a) === normalizeText(given))) {
          score += question.points;
        }
        break;
      }
    }
  }

  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const passed = percent >= assessment.passPercent;

  const submission = await prisma.assessmentSubmission.create({
    data: {
      assessmentId,
      userId,
      answers: input.answers,
      score,
      maxScore,
      passed,
    },
  });

  return { submission, percent };
}

export async function getAssessmentForInstructor(lessonId: string, instructorId: string, isAdmin: boolean) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { section: { include: { course: true } } },
  });
  if (!lesson) throw ApiError.notFound("Lesson not found");
  if (!isAdmin && lesson.section.course.instructorId !== instructorId) {
    throw ApiError.forbidden("You do not own this course");
  }

  const assessment = await prisma.assessment.findUnique({
    where: { lessonId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { options: { orderBy: { order: "asc" } } },
      },
    },
  });
  if (!assessment) throw ApiError.notFound("Assessment not found");
  return assessment;
}

export async function updateAssessment(
  assessmentId: string,
  input: UpdateInput,
  instructorId: string,
  isAdmin: boolean
) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { lesson: { include: { section: { include: { course: true } } } } },
  });
  if (!assessment) throw ApiError.notFound("Assessment not found");
  if (!isAdmin && assessment.lesson.section.course.instructorId !== instructorId) {
    throw ApiError.forbidden("You do not own this course");
  }

  const updated = await prisma.$transaction(async (tx) => {
    await tx.question.deleteMany({ where: { assessmentId } });

    return tx.assessment.update({
      where: { id: assessmentId },
      data: {
        title: input.title,
        passPercent: input.passPercent,
        questions: {
          create: input.questions.map((q) => {
            if (q.type === "TRUE_FALSE") {
              return {
                type: QuestionType.TRUE_FALSE,
                prompt: q.prompt,
                order: q.order,
                points: q.points,
                options: {
                  create: [
                    { text: "True", isCorrect: q.correctAnswer === true, order: 0 },
                    { text: "False", isCorrect: q.correctAnswer === false, order: 1 },
                  ],
                },
              };
            }
            if (q.type === "FILL_BLANK") {
              return {
                type: QuestionType.FILL_BLANK,
                prompt: q.prompt,
                order: q.order,
                points: q.points,
                acceptedAnswers: q.acceptedAnswers,
              };
            }
            // SINGLE_SELECT / MULTI_SELECT
            return {
              type: q.type === "SINGLE_SELECT" ? QuestionType.SINGLE_SELECT : QuestionType.MULTI_SELECT,
              prompt: q.prompt,
              order: q.order,
              points: q.points,
              options: {
                create: q.options.map((o) => ({ text: o.text, isCorrect: o.isCorrect, order: o.order })),
              },
            };
          }),
        },
      },
      include: { questions: { include: { options: true } } },
    });
  });

  if (!isAdmin) {
    await prisma.course.update({
      where: { id: assessment.lesson.section.course.id },
      data: { status: "PENDING_APPROVAL" },
    });
  }

  return updated;
}

export async function deleteAssessment(assessmentId: string, instructorId: string, isAdmin: boolean) {
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { lesson: { include: { section: { include: { course: true } } } } },
  });
  if (!assessment) throw ApiError.notFound("Assessment not found");
  if (!isAdmin && assessment.lesson.section.course.instructorId !== instructorId) {
    throw ApiError.forbidden("You do not own this course");
  }

  await prisma.assessment.delete({ where: { id: assessmentId } });

  if (!isAdmin) {
    await prisma.course.update({
      where: { id: assessment.lesson.section.course.id },
      data: { status: "PENDING_APPROVAL" },
    });
  }

  return { success: true };
}
