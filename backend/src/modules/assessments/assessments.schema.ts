import { z } from "zod";

const optionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
  order: z.number().int().nonnegative(),
});

const baseQuestion = z.object({
  prompt: z.string().min(1),
  order: z.number().int().nonnegative(),
  points: z.number().int().positive().default(1),
});

const singleSelectQuestion = baseQuestion.extend({
  type: z.literal("SINGLE_SELECT"),
  options: z.array(optionSchema).min(2),
});

const multiSelectQuestion = baseQuestion.extend({
  type: z.literal("MULTI_SELECT"),
  options: z.array(optionSchema).min(2),
});

const trueFalseQuestion = baseQuestion.extend({
  type: z.literal("TRUE_FALSE"),
  correctAnswer: z.boolean(),
});

const fillBlankQuestion = baseQuestion.extend({
  type: z.literal("FILL_BLANK"),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});

export const questionSchema = z.discriminatedUnion("type", [
  singleSelectQuestion,
  multiSelectQuestion,
  trueFalseQuestion,
  fillBlankQuestion,
]);

export const createAssessmentSchema = z
  .object({
    lessonId: z.string().uuid(),
    title: z.string().min(1),
    passPercent: z.number().int().min(0).max(100).default(70),
    questions: z.array(questionSchema).min(1),
  })
  .superRefine((data, ctx) => {
    data.questions.forEach((q, index) => {
      if (q.type === "SINGLE_SELECT") {
        const correctCount = q.options.filter((o) => o.isCorrect).length;
        if (correctCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "SINGLE_SELECT questions must have exactly one correct option",
            path: ["questions", index, "options"],
          });
        }
      }
      if (q.type === "MULTI_SELECT") {
        const hasCorrect = q.options.some((o) => o.isCorrect);
        if (!hasCorrect) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MULTI_SELECT questions must have at least one correct option",
            path: ["questions", index, "options"],
          });
        }
      }
    });
  });

// answers: { [questionId]: string (single_select/true_false/fill_blank) | string[] (multi_select) }
export const submitAssessmentSchema = z.object({
  answers: z.record(z.union([z.string(), z.array(z.string())])),
});
