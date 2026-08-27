import { Router } from "express";
import { prisma } from "@/config/prisma";
import { requireAuth, requireRole } from "@/middleware/auth";
import { Role, OrderStatus } from "@prisma/client";
import { ApiError } from "@/utils/ApiError";
import { env } from "@/config/env";
import { buildPayuRequest, verifyPayuResponseHash, generateTxnId, type PayuResponsePayload } from "./payu.util";

const router = Router();

// ---- Initiate checkout: build order from current cart, return PayU form params ----
router.post("/checkout", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.user!.sub },
    include: { course: true },
  });
  if (cartItems.length === 0) throw ApiError.badRequest("Cart is empty");

  const amount = cartItems.reduce(
    (sum, item) => sum + Number(item.course.discountPrice ?? item.course.price),
    0
  );

  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user!.sub } });
  const txnid = generateTxnId();

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      txnId: txnid,
      amount,
      status: OrderStatus.PENDING,
      items: {
        create: cartItems.map((item) => ({
          courseId: item.courseId,
          price: item.course.discountPrice ?? item.course.price,
        })),
      },
    },
  });

  const payuParams = buildPayuRequest({
    txnid,
    amount: amount.toFixed(2),
    productinfo: `Course order (${cartItems.length} item(s))`,
    firstname: user.firstName,
    email: user.email,
    phone: "9999999999", // collect a real phone number at checkout in production
    surl: `${env.payu.successUrl}?orderId=${order.id}`,
    furl: `${env.payu.failureUrl}?orderId=${order.id}`,
  });

  res.json({ orderId: order.id, payuParams });
});

// ---- PayU posts back here (server-to-server or via browser redirect handler) ----
router.post("/payu/callback", async (req, res) => {
  const payload = req.body as PayuResponsePayload;

  if (!payload.txnid || !payload.hash) {
    throw ApiError.badRequest("Malformed PayU callback payload");
  }

  const order = await prisma.order.findUnique({ where: { txnId: payload.txnid } });
  if (!order) throw ApiError.notFound("Order not found for this transaction");

  const hashValid = verifyPayuResponseHash(payload);
  if (!hashValid) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.FAILED, payuRawPayload: payload as unknown as object },
    });
    throw ApiError.badRequest("Hash verification failed — possible tampering");
  }

  const success = payload.status === "success";

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: {
        status: success ? OrderStatus.SUCCESS : OrderStatus.FAILED,
        payuMihpayid: payload.mihpayid,
        payuStatus: payload.status,
        payuHash: payload.hash,
        payuRawPayload: payload as unknown as object,
      },
    });

    if (success) {
      const items = await tx.orderItem.findMany({ where: { orderId: order.id } });
      for (const item of items) {
        await tx.enrollment.upsert({
          where: { userId_courseId: { userId: order.userId, courseId: item.courseId } },
          create: { userId: order.userId, courseId: item.courseId },
          update: {},
        });
      }
      await tx.cartItem.deleteMany({ where: { userId: order.userId } });
    }
  });

  res.redirect(success ? `${env.payu.successUrl}?orderId=${order.id}` : `${env.payu.failureUrl}?orderId=${order.id}`);
});

router.get("/:id", requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { course: true } } },
  });
  if (!order) throw ApiError.notFound("Order not found");
  if (order.userId !== req.user!.sub && req.user!.role !== Role.ADMIN) {
    throw ApiError.forbidden();
  }
  res.json({ order });
});

router.get("/", requireAuth, requireRole(Role.STUDENT), async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.sub },
    include: { items: { include: { course: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ orders });
});

export default router;
