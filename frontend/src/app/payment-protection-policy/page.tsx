import React from "react";
import type { Metadata } from "next";
import { PolicyPageView } from "@/components/legal/PolicyPageView";

export const metadata: Metadata = {
  title: "Payment Protection Policy | Coalescex",
  description:
    "Learn about payment security, encryption, transaction confirmations, handling failed debits, duplicate charges, and billing assistance at Coalescex.",
  alternates: {
    canonical: "https://coalescex.com/payment-protection-policy",
  },
};

export default function PaymentProtectionPolicyPage() {
  return <PolicyPageView slug="payment-protection-policy" />;
}
