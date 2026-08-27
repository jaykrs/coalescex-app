import bcrypt from "bcryptjs";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/utils/jwt";
import { Role } from "@prisma/client";
import type { RegisterInput, LoginInput } from "./auth.schema";

const REFRESH_TOKEN_TTL_DAYS = 7;

function sanitizeUser<T extends { passwordHash: string }>(user: T) {
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function registerStudent(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      role: Role.STUDENT,
    },
  });

  return issueSession(user.id, user.email, user.role);
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !user.isActive) throw ApiError.unauthorized("Invalid email or password");

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw ApiError.unauthorized("Invalid email or password");

  return issueSession(user.id, user.email, user.role);
}

export async function refreshSession(refreshToken: string) {
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token not recognized or expired");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || !user.isActive) throw ApiError.unauthorized();

  // Rotate refresh token
  await prisma.refreshToken.delete({ where: { id: stored.id } });
  return issueSession(user.id, user.email, user.role);
}

export async function logout(refreshToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}

async function issueSession(userId: string, email: string, role: Role) {
  const accessToken = signAccessToken({ sub: userId, email, role });
  const refreshToken = signRefreshToken(userId);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL_DAYS);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId, expiresAt },
  });

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  return { accessToken, refreshToken, user: sanitizeUser(user) };
}
