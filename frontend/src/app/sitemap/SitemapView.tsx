"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import footerData from "@/data/footer-data.json";

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  level?: string | null;
  type?: string | null;
  category?: { name: string; slug: string };
  instructor?: { firstName: string; lastName: string };
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  _count?: { courses: number };
}

interface SitemapViewProps {
  courses: CourseItem[];
  categories: CategoryItem[];
}

export default function SitemapView({ courses, categories }: SitemapViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const mainPortalLinks = [
    { label: "Home Page", href: "/", desc: "Coalescex homepage and featured learning programs" },
    { label: "Explore Course Catalog", href: "/courses", desc: "All public courses with filters and search" },
    { label: "Shopping Cart", href: "/cart", desc: "Review your selected courses and enrollments" },
    { label: "Learner Login", href: "/login", desc: "Sign in to access your dashboard and enrolled courses" },
    { label: "Create Account", href: "/register", desc: "Sign up for free to begin learning" },
    { label: "Student Dashboard", href: "/dashboard", desc: "Track progress, resume courses, and view certificates" },
    { label: "Instructor Portal", href: "/instructor/courses", desc: "Course creation, section management, and analytics" },
    { label: "Create New Course", href: "/instructor/courses/new", desc: "Build course curriculum, outcomes, and accessories" },
    { label: "Course SEO Manager", href: "/instructor/seo", desc: "Configure metadata, OpenGraph, and structured data" },
  ];

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    const q = searchTerm.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
        (c.category?.name && c.category.name.toLowerCase().includes(q))
    );
  }, [courses, searchTerm]);

  const filteredPortals = useMemo(() => {
    if (!searchTerm.trim()) return mainPortalLinks;
    const q = searchTerm.toLowerCase();
    return mainPortalLinks.filter(
      (p) => p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredTopSections = useMemo(() => {
    if (!searchTerm.trim()) return footerData.topSections;
    const q = searchTerm.toLowerCase();
    return footerData.topSections
      .map((sec) => ({
        ...sec,
        links: sec.links.filter((l) => l.label.toLowerCase().includes(q)),
      }))
      .filter((sec) => sec.links.length > 0);
  }, [searchTerm]);

  const filteredBottomSections = useMemo(() => {
    if (!searchTerm.trim()) return footerData.bottomSections;
    const q = searchTerm.toLowerCase();
    return footerData.bottomSections
      .map((sec) => ({
        ...sec,
        links: sec.links.filter((l) => l.label.toLowerCase().includes(q)),
      }))
      .filter((sec) => sec.links.length > 0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-600 font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Navigation &amp; SEO Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Coalescex Sitemap
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                Explore the complete structure of Coalescex. Find courses, degree programs, skill pathways, learner dashboards, and regulatory resources in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition shadow-xs"
                title="View Search Engine XML Sitemap"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>sitemap.xml</span>
                <span className="text-[10px] uppercase font-bold bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded">XML</span>
              </a>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-xs"
              >
                <span>Browse All Courses</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sitemap for courses, topics, portals, or pages..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <svg
                className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full px-2 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* SECTION 1: Core Navigation & Portals */}
        {filteredPortals.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Main Pages &amp; Platform Portals</h2>
                  <p className="text-xs text-slate-500">Key user journeys, learning dashboards, and administrative workflows</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredPortals.length} links
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortals.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group block p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition text-sm">
                      {item.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="mt-2 inline-block text-[11px] font-mono text-slate-400 group-hover:text-blue-600">
                    {item.href}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: Dynamic Course Pages */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Individual Course Programs</h2>
                <p className="text-xs text-slate-500">Live published courses with curriculum, accessories, and metadata</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              {filteredCourses.length} Courses
            </span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-sm text-slate-500">No courses match your search criteria.</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                >
                  Reset search filter
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group block p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50/40 hover:border-emerald-200 transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {course.category?.name && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        {course.category.name}
                      </span>
                    )}
                    {course.level && (
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded font-medium">
                        {course.level}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition text-sm line-clamp-2">
                    {course.title}
                  </h3>
                  {course.subtitle && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {course.subtitle}
                    </p>
                  )}
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {course.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : "Coalescex"}
                    </span>
                    <span className="font-mono text-emerald-600 group-hover:underline">
                      /courses/{course.slug}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: Learning Disciplines & Top Sections */}
        {filteredTopSections.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Skill Tracks, Certificates &amp; Specializations</h2>
                  <p className="text-xs text-slate-500">Curated skill pathways, accredited certificates, and industry competencies</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredTopSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          className="text-xs text-slate-600 hover:text-indigo-600 hover:underline block py-0.5 transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: Corporate, Community & Policies */}
        {filteredBottomSections.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Institutional, Community &amp; Legal</h2>
                  <p className="text-xs text-slate-500">Corporate background, learner support, policies, and transparency</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBottomSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          className="text-xs text-slate-600 hover:text-purple-600 hover:underline block py-0.5 transition"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: XML Crawler Sitemap & Machine Discovery */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <span>Search Engine Optimization &amp; Webmasters</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Dynamic XML Sitemap for Search Crawlers
            </h3>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              In addition to this visual HTML sitemap, Coalescex publishes an automated, continuously updated standard XML sitemap for Googlebot, Bingbot, and other web crawlers to quickly discover indexable courses and pages.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition shadow-sm text-sm"
            >
              <span>Open sitemap.xml</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-800/80 border border-blue-700 text-white font-medium px-4 py-3 rounded-xl hover:bg-blue-800 transition text-sm"
            >
              <span>robots.txt</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
