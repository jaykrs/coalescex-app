import { PrismaClient, Role, CourseStatus, LessonContentType, QuestionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@elearning.dev" },
    update: {},
    create: {
      email: "admin@elearning.dev", passwordHash, firstName: "Ada", lastName: "Admin", role: Role.ADMIN,
    },
  });

  const instructor = await prisma.user.upsert({
    where: { email: "instructor@elearning.dev" },
    update: {},
    create: {
      email: "instructor@elearning.dev", passwordHash, firstName: "Ian", lastName: "Instructor", role: Role.INSTRUCTOR,
    },
  });

  await prisma.user.upsert({
    where: { email: "student@elearning.dev" },
    update: {},
    create: {
      email: "student@elearning.dev", passwordHash, firstName: "Sam", lastName: "Student", role: Role.STUDENT,
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "web-development" },
    update: {},
    create: { name: "Web Development", slug: "web-development", description: "Frontend & backend web courses" },
  });

  const course = await prisma.course.upsert({
    where: { slug: "nextjs-fullstack-bootcamp" },
    update: {},
    create: {
      title: "Next.js Full-Stack Bootcamp",
      slug: "nextjs-fullstack-bootcamp",
      subtitle: "Build production-ready apps with Next.js and Node.js",
      description: "A complete guide to building full-stack applications with Next.js, React, and a Node.js REST API.",
      price: 49.99,
      discountPrice: 29.99,
      level: "Intermediate",
      categoryId: category.id,
      instructorId: instructor.id,
      status: CourseStatus.PUBLISHED,
      sections: {
        create: [
          {
            title: "Getting Started",
            order: 0,
            lessons: {
              create: [
                {
                  title: "Course Introduction",
                  order: 0,
                  contentType: LessonContentType.VIDEO,
                  contentUrl: "https://example.com/videos/intro.mp4",
                  durationSec: 300,
                  isPreview: true,
                },
                {
                  title: "Setting Up Your Environment",
                  order: 1,
                  contentType: LessonContentType.ARTICLE,
                  contentUrl: "https://example.com/articles/setup",
                  durationSec: 600,
                },
              ],
            },
          },
          {
            title: "Module Quiz",
            order: 1,
            lessons: {
              create: [
                {
                  title: "Knowledge Check",
                  order: 0,
                  contentType: LessonContentType.ASSESSMENT,
                },
              ],
            },
          },
        ],
      },
    },
    include: { sections: { include: { lessons: true } } },
  });

  const quizLesson = course.sections.find((s) => s.title === "Module Quiz")?.lessons[0];
  if (quizLesson) {
    const existingAssessment = await prisma.assessment.findUnique({ where: { lessonId: quizLesson.id } });
    if (!existingAssessment) {
      await prisma.assessment.create({
        data: {
          lessonId: quizLesson.id,
          title: "Module 1 Knowledge Check",
          passPercent: 70,
          questions: {
            create: [
              {
                type: QuestionType.SINGLE_SELECT,
                prompt: "Which company created Next.js?",
                order: 0,
                points: 1,
                options: {
                  create: [
                    { text: "Vercel", isCorrect: true, order: 0 },
                    { text: "Facebook", isCorrect: false, order: 1 },
                    { text: "Google", isCorrect: false, order: 2 },
                  ],
                },
              },
              {
                type: QuestionType.MULTI_SELECT,
                prompt: "Which of these are valid Next.js rendering strategies?",
                order: 1,
                points: 2,
                options: {
                  create: [
                    { text: "Static Site Generation", isCorrect: true, order: 0 },
                    { text: "Server-Side Rendering", isCorrect: true, order: 1 },
                    { text: "Client-Only Compilation", isCorrect: false, order: 2 },
                  ],
                },
              },
              {
                type: QuestionType.TRUE_FALSE,
                prompt: "Next.js API routes can be used to build a REST backend.",
                order: 2,
                points: 1,
                options: {
                  create: [
                    { text: "True", isCorrect: true, order: 0 },
                    { text: "False", isCorrect: false, order: 1 },
                  ],
                },
              },
              {
                type: QuestionType.FILL_BLANK,
                prompt: "The Next.js CLI command to start a production server is `next ____`.",
                order: 3,
                points: 1,
                acceptedAnswers: ["start"],
              },
            ],
          },
        },
      });
    }
  }

  console.log("Seed complete. Login with any of:");
  console.log("  admin@elearning.dev / Password123!");
  console.log("  instructor@elearning.dev / Password123!");
  console.log("  student@elearning.dev / Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
