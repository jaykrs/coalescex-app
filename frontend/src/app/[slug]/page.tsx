
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPageContent from "@/components/legal/LegalPageContent";

const legalSlugs = [
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
  return legalSlugs.includes(slug as LegalSlug);
}

function getPageTitle(slug: string) {
  const titles: Record<LegalSlug, string> = {
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

  return titles[slug as LegalSlug];
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

  return <LegalPageContent slug={params.slug} />;
}
