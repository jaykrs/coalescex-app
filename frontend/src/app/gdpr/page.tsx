
import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "GDPR & Data Protection | Coalescex",
  description:
    "Learn about data protection, privacy rights, personal data handling, and how to contact Coalescex about your data.",
  alternates: {
    canonical: "https://coalescex.com/gdpr",
  },
};

export default function GDPRPage() {
  return (
    <LegalPageContent
      slug="gdpr"
      variant="gdpr"
      intro="This page explains how Coalescex approaches personal data protection and describes privacy rights that may apply under relevant data protection laws."
    />
  );
}
