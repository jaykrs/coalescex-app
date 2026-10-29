
import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Payment Protection Policy | Coalescex",
  description:
    "Learn about payment security, payment confirmations, failed transactions, refunds, and steps to take if you notice an unfamiliar payment on Coalescex.",
  alternates: {
    canonical: "https://coalescex.com/payment-protection-policy",
  },
};

export default function PaymentProtectionPolicyPage() {
  return (
    <LegalPageContent
      slug="payment-protection-policy"
      variant="payment"
      intro="This policy explains important information about making payments through Coalescex, handling payment issues, and reporting transactions you do not recognise."
    />
  );
}
