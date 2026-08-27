import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";

const router = Router();
router.use(requireAuth, requireRole(Role.ADMIN));

// List all users (paginated, filterable by role)
router.get("/", async (req, res) => {
  const role = req.query.role as Role | undefined;
  const users = await prisma.user.findMany({
    where: role ? { role } : undefined,
    select: {
      id: true, email: true, firstName: true, lastName: true,
      role: true, isActive: true, createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ users });
});

// Admin provisions an instructor or admin account
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.nativeEnum(Role),
});

router.post("/", async (req, res) => {
  const input = createUserSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
    },
    select: { id: true, email: true, firstName: true, lastName: true, role: true },
  });
  res.status(201).json({ user });
});

const updateUserSchema = z.object({
  isActive: z.boolean().optional(),
  role: z.nativeEnum(Role).optional(),
});

router.patch("/:id", async (req, res) => {
  const input = updateUserSchema.parse(req.body);
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: input,
    select: { id: true, email: true, role: true, isActive: true },
  });
  res.json({ user });
});

// ---- Admin dashboard summary stats ----
router.get("/stats/summary", async (_req, res) => {
  const [totalStudents, totalInstructors, totalCourses, publishedCourses, totalOrders, revenueAgg] =
    await Promise.all([
      prisma.user.count({ where: { role: Role.STUDENT } }),
      prisma.user.count({ where: { role: Role.INSTRUCTOR } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: "PUBLISHED" } }),
      prisma.order.count({ where: { status: "SUCCESS" } }),
      prisma.order.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
    ]);

  res.json({
    totalStudents,
    totalInstructors,
    totalCourses,
    publishedCourses,
    totalOrders,
    totalRevenue: revenueAgg._sum.amount ?? 0,
  });
});

export default router;
