import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { PolicyPageView } from "@/components/legal/PolicyPageView";
import { getLegalPage } from "@/data/legal";

const legalSlugs = [
  "privacy",
  "privacy-policy",
  "payment-protection-policy",
  "payment-policy",
  "refund-policy",
  "refund",
  "terms",
  "press",
  "investors",
  "help",
  "accessibility",
  "contact",
  "articles",
  "directory",
  "affiliates",
  "modern-slavery",
] as const;

type LegalSlug = (typeof legalSlugs)[number];

type PageProps = {
  params: {
    slug: string;
  };
};

function isLegalSlug(slug: string): slug is LegalSlug {
  return legalSlugs.includes(slug as LegalSlug) || !!getLegalPage(slug);
}

function getPageTitle(slug: string): string {
  const localPage = getLegalPage(slug);
  if (localPage) return localPage.title;

  const titles: Record<string, string> = {
    terms: "Terms and Conditions",
    press: "Press",
    investors: "Investors",
    help: "Help",
    accessibility: "Accessibility",
    contact: "Contact",
    articles: "Articles",
    directory: "Directory",
    affiliates: "Affiliates",
    "modern-slavery": "Modern Slavery Statement",
  };

  return titles[slug] || "Legal Policy";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!isLegalSlug(params.slug)) {
    return { title: "Page Not Found | Coalescex" };
  }

  const title = getPageTitle(params.slug);

  return {
    title: `${title} | Coalescex`,
    alternates: {
      canonical: `https://coalescex.com/${params.slug}`,
    },
  };
}

export default function DynamicLegalPage({ params }: PageProps) {
  if (!isLegalSlug(params.slug)) {
    notFound();
  }

  // If this slug belongs to our unified local policies, render PolicyPageView
  const localPolicy = getLegalPage(params.slug);
  if (localPolicy) {
    return <PolicyPageView slug={params.slug} />;
  }

  return <LegalPageContent slug={params.slug as any} />;
}
