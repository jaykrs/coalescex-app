"use client";

import Link from "next/link";
import { SubscriptionForm } from "@/components/SubscriptionForm";

export default function SubscribePage() {
  return (
    <div className="bg-[#fcfbf9] min-h-[calc(100vh-160px)] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 uppercase tracking-wider mb-4 transition"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-display">
            Subscribe to our Newsletter
          </h1>
          <p className="mt-3 text-base text-muted max-w-lg mx-auto">
            Get the latest educational insights, free course updates, masterclass notifications, and career advancement tips delivered to your inbox.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10 shadow-xs">
          <div className="mb-6 space-y-2">
            <h2 className="text-lg font-bold text-ink">Join our Learning Community</h2>
            <p className="text-xs text-muted">
              We respect your privacy. Unsubscribe at any time with a single click.
            </p>
          </div>

          <SubscriptionForm />

          <div className="mt-8 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-brand-600 font-bold">✓</span>
              <span>Weekly Curated Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-600 font-bold">✓</span>
              <span>Free Masterclasses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-600 font-bold">✓</span>
              <span>No Spam Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
