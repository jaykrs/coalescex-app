import { Prisma, SubscriptionStatus } from "@prisma/client";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/utils/ApiError";
import { verifyRecaptcha } from "@/utils/recaptcha";
import type {
  CreateSubscriptionInput,
  SubscriptionQueryInput,
  UpdateSubscriptionStatusInput,
} from "./subscriptions.schema";

export async function createSubscription(
  input: CreateSubscriptionInput,
  remoteIp?: string
) {
  // 1. Verify CAPTCHA token
  await verifyRecaptcha(input.captchaToken, remoteIp);

  const email = input.email;

  // 2. Check whether email already exists
  const existing = await prisma.subscription.findUnique({
    where: { email },
  });

  if (existing) {
    return {
      success: true,
      alreadySubscribed: true,
      message: "This email address is already subscribed.",
      subscription: existing,
    };
  }

  // 3. Create new subscription with status PENDING
  try {
    const subscription = await prisma.subscription.create({
      data: {
        email,
        status: SubscriptionStatus.PENDING,
      },
    });

    return {
      success: true,
      alreadySubscribed: false,
      message: "Subscription successful! Your subscription is currently pending confirmation.",
      subscription,
    };
  } catch (err: unknown) {
    // Handle concurrent duplicate insertion safely
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const existingAfterRace = await prisma.subscription.findUnique({
        where: { email },
      });
      return {
        success: true,
        alreadySubscribed: true,
        message: "This email address is already subscribed.",
        subscription: existingAfterRace,
      };
    }
    throw err;
  }
}

export async function listSubscriptions(query: SubscriptionQueryInput) {
  const where: Prisma.SubscriptionWhereInput = {};

  if (query.search) {
    where.email = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  if (query.status && query.status !== "ALL") {
    where.status = query.status;
  }

  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  const [subscriptions, total, pendingCount, subscribedCount, unsubscribedCount] =
    await Promise.all([
      prisma.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.subscription.count({ where }),
      prisma.subscription.count({ where: { status: SubscriptionStatus.PENDING } }),
      prisma.subscription.count({ where: { status: SubscriptionStatus.SUBSCRIBED } }),
      prisma.subscription.count({ where: { status: SubscriptionStatus.UNSUBSCRIBED } }),
    ]);

  const totalPages = Math.ceil(total / limit) || 1;

  const stats = {
    totalSubscribers: pendingCount + subscribedCount + unsubscribedCount,
    pendingSubscribers: pendingCount,
    confirmedSubscribers: subscribedCount,
    unsubscribedUsers: unsubscribedCount,
  };

  return {
    subscriptions,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
    stats,
  };
}

export async function getSubscriptionStats() {
  const [total, pending, subscribed, unsubscribed] = await Promise.all([
    prisma.subscription.count(),
    prisma.subscription.count({ where: { status: SubscriptionStatus.PENDING } }),
    prisma.subscription.count({ where: { status: SubscriptionStatus.SUBSCRIBED } }),
    prisma.subscription.count({ where: { status: SubscriptionStatus.UNSUBSCRIBED } }),
  ]);

  return {
    totalSubscribers: total,
    pendingSubscribers: pending,
    confirmedSubscribers: subscribed,
    unsubscribedUsers: unsubscribed,
  };
}

export async function updateSubscriptionStatus(
  id: string,
  input: UpdateSubscriptionStatusInput
) {
  const existing = await prisma.subscription.findUnique({
    where: { id },
  });

  if (!existing) {
    throw ApiError.notFound("Subscription record not found");
  }

  const dataToUpdate: Prisma.SubscriptionUpdateInput = {
    status: input.status,
  };

  // If status is transitioning to SUBSCRIBED, set subscribedAt if not already set
  if (input.status === SubscriptionStatus.SUBSCRIBED && !existing.subscribedAt) {
    dataToUpdate.subscribedAt = new Date();
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data: dataToUpdate,
  });

  return {
    success: true,
    message: `Subscription status updated to ${input.status.toLowerCase()}`,
    subscription: updated,
  };
}

export async function deleteSubscription(id: string) {
  const existing = await prisma.subscription.findUnique({
    where: { id },
  });

  if (!existing) {
    throw ApiError.notFound("Subscription record not found");
  }

  await prisma.subscription.delete({
    where: { id },
  });

  return {
    success: true,
    message: "Subscription record deleted successfully",
  };
}
