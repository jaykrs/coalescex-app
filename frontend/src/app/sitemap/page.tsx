import type { Metadata } from "next";
import SitemapView from "./SitemapView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sitemap - Directory of Courses & Pages",
  description:
    "Browse the comprehensive site map and index of courses, career paths, skill certifications, student dashboards, and platform pages on Coalescex.",
  alternates: {
    canonical: "https://coalescex.com/sitemap",
  },
  openGraph: {
    title: "Sitemap | Coalescex",
    description:
      "Browse the comprehensive site map and index of courses, career paths, and platform pages on Coalescex.",
    url: "https://coalescex.com/sitemap",
    type: "website",
  },
};

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api";

async function getPublishedCourses() {
  try {
    const res = await fetch(`${API_BASE_URL}/courses?pageSize=50`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.courses) ? data.courses : [];
  } catch (err) {
    console.warn("Failed to fetch courses for sitemap page:", err);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 300 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data?.categories)) return data.categories;
    if (Array.isArray(data)) return data;
    return [];
  } catch (err) {
    console.warn("Failed to fetch categories for sitemap page:", err);
    return [];
  }
}

export default async function SitemapPage() {
  const [courses, categories] = await Promise.all([
    getPublishedCourses(),
    getCategories(),
  ]);

  return <SitemapView courses={courses} categories={categories} />;
}
