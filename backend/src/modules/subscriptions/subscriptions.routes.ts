import { Router } from "express";
import { Role } from "@prisma/client";
import { requireAuth, requireRole } from "@/middleware/auth";
import {
  createSubscriptionSchema,
  subscriptionQuerySchema,
  updateSubscriptionStatusSchema,
} from "./subscriptions.schema";
import * as subscriptionService from "./subscriptions.service";

const router = Router();

/**
 * POST /api/subscriptions
 * Public endpoint to subscribe an email address with reCAPTCHA verification.
 */
router.post("/", async (req, res) => {
  const input = createSubscriptionSchema.parse(req.body);
  const clientIp = req.ip || req.socket.remoteAddress;
  const result = await subscriptionService.createSubscription(input, clientIp);

  const statusCode = result.alreadySubscribed ? 200 : 201;
  res.status(statusCode).json(result);
});

/**
 * GET /api/subscriptions
 * Admin endpoint: Fetch paginated, filterable subscriptions with summary statistics.
 */
router.get("/", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const query = subscriptionQuerySchema.parse(req.query);
  const result = await subscriptionService.listSubscriptions(query);
  res.json(result);
});

/**
 * GET /api/subscriptions/stats
 * Admin endpoint: Fetch subscription count aggregates.
 */
router.get("/stats", requireAuth, requireRole(Role.ADMIN), async (_req, res) => {
  const stats = await subscriptionService.getSubscriptionStats();
  res.json({ stats });
});

/**
 * PATCH /api/subscriptions/:id/status
 * Admin endpoint: Update a subscription status (e.g. PENDING -> SUBSCRIBED or UNSUBSCRIBED).
 */
router.patch("/:id/status", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = updateSubscriptionStatusSchema.parse(req.body);
  const result = await subscriptionService.updateSubscriptionStatus(req.params.id, input);
  res.json(result);
});

/**
 * Support PATCH /api/subscriptions/:id directly as well.
 */
router.patch("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = updateSubscriptionStatusSchema.parse(req.body);
  const result = await subscriptionService.updateSubscriptionStatus(req.params.id, input);
  res.json(result);
});

/**
 * DELETE /api/subscriptions/:id
 * Admin endpoint: Delete a subscription record.
 */
router.delete("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const result = await subscriptionService.deleteSubscription(req.params.id);
  res.json(result);
});

export default router;
