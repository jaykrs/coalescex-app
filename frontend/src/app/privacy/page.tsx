import React from "react";
import type { Metadata } from "next";
import { PolicyPageView } from "@/components/legal/PolicyPageView";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | Coalescex",
  description:
    "Learn how Coalescex collects, uses, and safeguards your personal data, and manage your cookie preferences in compliance with GDPR and privacy standards.",
  alternates: {
    canonical: "https://coalescex.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return <PolicyPageView slug="privacy" />;
}
