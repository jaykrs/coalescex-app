"use client";

import Link from "next/link";

export default function CheckoutFailurePage() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-3xl">Payment didn't go through</h1>
      <p className="mt-3 text-muted">
        Nothing was charged. Your cart is still saved — you can try again whenever you're ready.
      </p>
      <Link href="/cart" className="mt-6 inline-block rounded bg-brand-600 px-5 py-2.5 text-white">
        Back to cart
      </Link>
    </div>
  );
}
