"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { api } from "@/lib/api-client";
import Link from "next/link";

export default function CartPage() {
  const { items, total, refresh, removeFromCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [payuParams, setPayuParams] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    // Auto-submit the PayU form once params are set — PayU requires a real POST redirect.
    if (payuParams && formRef.current) formRef.current.submit();
  }, [payuParams]);

  async function handleCheckout() {
    setError(null);
    setCheckingOut(true);
    try {
      const { data } = await api.post("/orders/checkout");
      setPayuParams(data.payuParams);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? "Checkout failed.");
      setCheckingOut(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted">Your cart is empty.</p>
        <Link href="/courses" className="mt-3 inline-block text-brand-600 underline">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl">Your cart</h1>
      <div className="divide-y divide-line rounded-lg border border-line">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{item.course.title}</p>
              <p className="text-sm text-muted">{item.course.category.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono">${item.course.discountPrice ?? item.course.price}</span>
              <button
                onClick={() => removeFromCart(item.course.id)}
                className="text-sm text-muted hover:text-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg">Total</span>
        <span className="font-mono text-lg">${total.toFixed(2)}</span>
      </div>

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={checkingOut}
        className="mt-6 w-full rounded bg-brand-600 py-3 text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {checkingOut ? "Redirecting to PayU…" : "Checkout with PayU"}
      </button>

      {/* Hidden auto-submitting form — PayU requires a browser POST to its hosted checkout */}
      {payuParams && (
        <form ref={formRef} action={payuParams.action} method="POST" className="hidden">
          {Object.entries(payuParams)
            .filter(([key]) => key !== "action")
            .map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
        </form>
      )}
    </div>
  );
}
