import { Router, type Request, type Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import * as authService from "./auth.service";
import { requireAuth } from "@/middleware/auth";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";

const router = Router();

const REFRESH_COOKIE = "refreshToken";
const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/api/auth",
};

/**
 * Web clients (browser) get the refresh token as an httpOnly cookie — JS on the page
 * can never read it, which is the whole point.
 *
 * Mobile clients (Flutter) have no equivalent cookie jar / httpOnly trust boundary, and
 * dio/http on mobile doesn't automatically persist+replay cookies the way a browser does.
 * So for requests carrying `X-Client-Type: mobile`, we skip the cookie entirely and return
 * the refresh token in the JSON body instead — the Flutter app is expected to put it
 * straight into OS-backed secure storage (Keychain/Keystore via flutter_secure_storage),
 * which is at least as strong a trust boundary on-device as an httpOnly cookie is in a browser.
 */
function isMobileClient(req: Request): boolean {
  return req.headers["x-client-type"] === "mobile";
}

function sendSession(
  req: Request,
  res: Response,
  session: { accessToken: string; refreshToken: string; user: unknown },
  status = 200
) {
  const mobile = isMobileClient(req);
  if (!mobile) {
    res.cookie(REFRESH_COOKIE, session.refreshToken, cookieOpts);
  }
  res.status(status).json({
    accessToken: session.accessToken,
    user: session.user,
    ...(mobile ? { refreshToken: session.refreshToken } : {}),
  });
}

router.post("/register", async (req, res) => {
  const input = registerSchema.parse(req.body);
  const session = await authService.registerStudent(input);
  sendSession(req, res, session, 201);
});

router.post("/login", async (req, res) => {
  const input = loginSchema.parse(req.body);
  const session = await authService.login(input);
  sendSession(req, res, session);
});

router.post("/refresh", async (req, res) => {
  // Web: refresh token comes from the httpOnly cookie.
  // Mobile: the app sends it explicitly in the body (it can't set the cookie itself).
  const token = isMobileClient(req) ? req.body?.refreshToken : req.cookies?.[REFRESH_COOKIE];
  if (!token) throw ApiError.unauthorized("No refresh token provided");
  const session = await authService.refreshSession(token);
  sendSession(req, res, session);
});

router.post("/logout", async (req, res) => {
  const token = isMobileClient(req) ? req.body?.refreshToken : req.cookies?.[REFRESH_COOKIE];
  if (token) await authService.logout(token);
  if (!isMobileClient(req)) res.clearCookie(REFRESH_COOKIE, { path: "/api/auth" });
  res.status(204).send();
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: req.user!.sub },
    select: {
      id: true, email: true, firstName: true, lastName: true,
      role: true, avatarUrl: true, createdAt: true,
    },
  });
  res.json({ user });
});

export default router;
