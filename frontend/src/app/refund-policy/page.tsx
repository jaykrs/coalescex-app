import React from "react";
import type { Metadata } from "next";
import { PolicyPageView } from "@/components/legal/PolicyPageView";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Coalescex",
  description:
    "Learn about Coalescex's 7-day money-back guarantee, refund eligibility, bootcamp cancellation schedules, and simple reimbursement procedures.",
  alternates: {
    canonical: "https://coalescex.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return <PolicyPageView slug="refund-policy" />;
}
