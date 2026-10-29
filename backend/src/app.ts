import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "@/config/env";
import { errorHandler, notFoundHandler } from "@/middleware/errorHandler";

import authRoutes from "@/modules/auth/auth.routes";
import categoryRoutes from "@/modules/categories/categories.routes";
import courseRoutes from "@/modules/courses/courses.routes";
import cartRoutes from "@/modules/cart/cart.routes";
import orderRoutes from "@/modules/orders/orders.routes";
import progressRoutes from "@/modules/progress/progress.routes";
import assessmentRoutes from "@/modules/assessments/assessments.routes";
import userRoutes from "@/modules/users/users.routes";
import legalPageRoutes from "@/modules/legal-pages/legal-pages.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // PayU posts form-encoded callbacks
  app.use(cookieParser());
  if (env.nodeEnv !== "test") app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/assessments", assessmentRoutes);
  app.use("/api/admin/users", userRoutes);

  app.use("/api/legal-pages", legalPageRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
