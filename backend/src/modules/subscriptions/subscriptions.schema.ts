import { z } from "zod";
import { SubscriptionStatus } from "@prisma/client";

export const createSubscriptionSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email cannot be empty")
    .email("Please provide a valid email address")
    .max(255, "Email address is too long")
    .transform((val) => val.toLowerCase()),
  captchaToken: z
    .string({ required_error: "CAPTCHA verification is required" })
    .trim()
    .min(1, "CAPTCHA token cannot be empty"),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;

export const updateSubscriptionStatusSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "SUBSCRIBED",
      "UNSUBSCRIBED",
      "pending",
      "subscribed",
      "unsubscribed",
    ])
    .transform((val) => val.toUpperCase() as SubscriptionStatus),
});

export type UpdateSubscriptionStatusInput = z.infer<typeof updateSubscriptionStatusSchema>;

export const subscriptionQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  status: z
    .enum([
      "ALL",
      "PENDING",
      "SUBSCRIBED",
      "UNSUBSCRIBED",
      "all",
      "pending",
      "subscribed",
      "unsubscribed",
    ])
    .optional()
    .transform((val) => (val ? (val.toUpperCase() as "ALL" | SubscriptionStatus) : undefined)),
});

export type SubscriptionQueryInput = z.infer<typeof subscriptionQuerySchema>;
