"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Course } from "@/types";
import type { TemplatePosition } from "@/lib/course-templates";

interface CourseHeroProps {
  course: Course;
  lessonCount: number;
  adding: boolean;
  message: string | null;
  onAddToCart: () => void;
  imagePosition?: TemplatePosition;
  imageUrl?: string | null;
}

export function CourseHero({
  course,
  lessonCount,
  adding,
  message,
  onAddToCart,
  imagePosition: propPosition,
  imageUrl: propImageUrl,
}: CourseHeroProps) {
  const router = useRouter();

  // Detect image position from heroHtml if present, else fallback to prop or "none"
  const position: TemplatePosition = useMemo(() => {
    if (propPosition) return propPosition;
    if (course.heroHtml) {
      if (course.heroHtml.includes('data-hero-position="left"')) return "left";
      if (course.heroHtml.includes('data-hero-position="right"')) return "right";
      if (course.heroHtml.includes('data-hero-position="center"')) return "center";
      if (course.heroHtml.includes('data-hero-position="bg"')) return "bg";
      if (course.heroHtml.includes('data-hero-position="none"')) return "none";
    }
    // If course has thumbnailUrl, default to "right"
    if (course.thumbnailUrl) return "right";
    return "none";
  }, [propPosition, course.heroHtml, course.thumbnailUrl]);

  // Determine active image URL
  const activeImageUrl = useMemo(() => {
    if (propImageUrl) return propImageUrl;
    if (course.thumbnailUrl) return course.thumbnailUrl;
    // Extract from heroHtml if contains <img>
    if (course.heroHtml) {
      const match = course.heroHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) return match[1];
    }
    return null;
  }, [propImageUrl, course.thumbnailUrl, course.heroHtml]);

  // Discount calculations
  const discountPercent = useMemo(() => {
    if (!course.discountPrice || !course.price) return null;
    const p = Number(course.price);
    const dp = Number(course.discountPrice);
    if (p <= dp || p <= 0) return null;
    return Math.round(((p - dp) / p) * 100);
  }, [course.price, course.discountPrice]);

  // Instructor initials
  const instructorInitials = useMemo(() => {
    const fn = course.instructor?.firstName?.[0] || "";
    const ln = course.instructor?.lastName?.[0] || "";
    return `${fn}${ln}`.toUpperCase() || "IN";
  }, [course.instructor]);

  // Reusable Badges Block
  const BadgesRow = (
    <div className="flex flex-wrap items-center gap-2.5 mb-3">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
        🏷️ {course.category.name}
      </span>
      {course.level && (
        <span className="inline-flex items-center rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
          📶 {course.level}
        </span>
      )}
      <span className="inline-flex items-center rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
        🌐 {course.language?.toUpperCase() ?? "EN"}
      </span>
    </div>
  );

  // Reusable Metadata Row
  const MetadataRow = (
    <div className="pt-3 flex flex-wrap items-center gap-y-3 gap-x-5 text-sm text-slate-300 border-t border-slate-800/80">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold uppercase shadow-xs">
          {instructorInitials}
        </div>
        <span className="font-semibold text-white">
          Taught by {course.instructor.firstName} {course.instructor.lastName}
        </span>
      </div>
      <span className="text-slate-600">•</span>
      <span>
        📚 <strong className="text-white">{lessonCount}</strong> Lessons
      </span>
      <span className="text-slate-600">•</span>
      <span>
        👥 <strong className="text-white">{course._count?.enrollments ?? 0}</strong> Learners Enrolled
      </span>
      <span className="text-slate-600">•</span>
      <span>📜 Shareable Certificate</span>
    </div>
  );

  // Reusable Tuition Card
  const TuitionCard = (
    <div
      id="hero-cta"
      className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-5 text-white"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Course Tuition
        </span>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          {course.discountPrice ? (
            <>
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                ₹{course.discountPrice}
              </span>
              <span className="text-lg text-slate-400 line-through font-mono">
                ₹{course.price}
              </span>
              {discountPercent !== null && (
                <span className="rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold">
                  {discountPercent}% OFF
                </span>
              )}
            </>
          ) : (
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              ₹{course.price}
            </span>
          )}
        </div>
      </div>

      {course.isEnrolled ? (
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition cursor-pointer"
        >
          Go to learning portal &rarr;
        </button>
      ) : (
        <button
          type="button"
          onClick={onAddToCart}
          disabled={adding}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/30 disabled:opacity-50 transition cursor-pointer"
        >
          {adding ? "Adding to cart…" : "Enroll / Add to cart"}
        </button>
      )}

      {message && (
        <p className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center text-xs font-medium text-blue-300">
          {message}
        </p>
      )}

      {/* Course Perks Checklist */}
      <div className="border-t border-slate-800 pt-4 space-y-2.5 text-xs sm:text-sm text-slate-300">
        <div className="flex items-center gap-2.5">
          <span className="text-base">♾️</span>
          <span>Full lifetime access to curriculum</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-base">📱</span>
          <span>Access on mobile, tablet, and desktop</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-base">📜</span>
          <span>Verified Certificate of Completion</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-base">🛡️</span>
          <span>Direct instructor mentorship &amp; community</span>
        </div>
      </div>
    </div>
  );

  // Background Style
  const isBgPosition = position === "bg" && activeImageUrl;
  const bgStyle = isBgPosition
    ? {
        backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.90), rgba(15, 23, 42, 0.95)), url('${activeImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <div
      style={bgStyle}
      className={`w-full text-white border-b border-slate-800 shadow-md transition-all duration-300 ${
        !isBgPosition
          ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]"
          : ""
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {position === "left" && activeImageUrl ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Image */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center">
              <div className="w-full max-w-[320px] aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl">
                <img
                  src={activeImageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Middle Column: Course Info */}
            <div className="md:col-span-8 lg:col-span-5 space-y-4">
              {BadgesRow}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                  {course.subtitle}
                </p>
              )}
              {MetadataRow}
            </div>

            {/* Right Column: Tuition Card */}
            <div className="md:col-span-12 lg:col-span-4 max-w-md mx-auto lg:max-w-none w-full">
              {TuitionCard}
            </div>
          </div>
        ) : position === "center" && activeImageUrl ? (
          /* ============================================================ */
          /* LAYOUT B: Image Position CENTER                              */
          /* ============================================================ */
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex justify-center">{BadgesRow}</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                  {course.subtitle}
                </p>
              )}
            </div>

            <div className="max-w-3xl mx-auto aspect-video sm:aspect-[21/9] overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl">
              <img
                src={activeImageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
              <div className="lg:col-span-7">{MetadataRow}</div>
              <div className="lg:col-span-5">{TuitionCard}</div>
            </div>
          </div>
        ) : position === "right" && activeImageUrl ? (
          /* ============================================================ */
          /* LAYOUT C: Image Position RIGHT (Above Tuition Card)          */
          /* ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              {BadgesRow}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                  {course.subtitle}
                </p>
              )}
              {MetadataRow}
            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="w-full aspect-video overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl">
                <img
                  src={activeImageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {TuitionCard}
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* LAYOUT D: None / Gradient Only / BG (Exact Screenshot Match) */
          /* ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              {BadgesRow}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                  {course.subtitle}
                </p>
              )}
              {MetadataRow}
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              {TuitionCard}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
