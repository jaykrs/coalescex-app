"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

function SuccessContent() {
  const orderId = useSearchParams().get("orderId");

  const { data } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => (await api.get(`/orders/${orderId}`)).data.order,
    enabled: !!orderId,
  });

  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-3xl">Payment successful</h1>
      <p className="mt-3 text-muted">
        You're enrolled{data?.items?.length > 1 ? " in your new courses" : " in your new course"}. Head to your
        dashboard to start learning.
      </p>
      <Link href="/dashboard" className="mt-6 inline-block rounded bg-brand-600 px-5 py-2.5 text-white">
        Go to My Learning
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <SuccessContent />
    </Suspense>
  );
}
