"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import type { Course } from "@/types";
import { useState, useEffect, useMemo } from "react";
import { CourseCurriculum } from "@/components/course/CourseCurriculum";
import { CourseFaq } from "@/components/course/CourseFaq";
import { CourseHero } from "@/components/course/CourseHero";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { addToCart, items } = useCart();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("about");

  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => (await api.get<{ course: Course }>(`/courses/${slug}`)).data.course,
  });

  const isInCart = useMemo(
    () => items.some((item) => item.course?.id === data?.id),
    [items, data?.id]
  );

  const discountPercent = useMemo(() => {
    if (!data?.discountPrice || !data?.price) return null;
    const p = Number(data.price);
    const dp = Number(data.discountPrice);
    if (p <= dp || p <= 0) return null;
    return Math.round(((p - dp) / p) * 100);
  }, [data?.price, data?.discountPrice]);

  // Tabs configured with conditions based on data availability
  const visibleTabs = useMemo(() => {
    if (!data) return [];
    const lessonTotal = data.sections?.reduce((sum, s) => sum + s.lessons.length, 0) ?? 0;
    const faqTotal = data.faqs?.length ?? 0;

    const tabList = [
      {
        id: "about",
        label: "About",
        icon: "📖",
        badge: null as string | null,
        show: Boolean(data.description && data.description.trim().length > 0),
      },
      {
        id: "outcomes",
        label: "Outcomes",
        icon: "🎯",
        badge: null as string | null,
        show: Boolean(data.outcomesHtml && data.outcomesHtml.trim().length > 0),
      },
      {
        id: "accessories",
        label: "Accessories",
        icon: "🎒",
        badge: null as string | null,
        show: Boolean(data.accessoriesHtml && data.accessoriesHtml.trim().length > 0),
      },
      {
        id: "curriculum",
        label: "Curriculum",
        icon: "📚",
        badge: lessonTotal > 0 ? `${lessonTotal}` : null,
        show: Boolean(data.sections && data.sections.length > 0),
      },
      {
        id: "faq",
        label: "FAQ",
        icon: "💡",
        badge: faqTotal > 0 ? `${faqTotal}` : null,
        show: Boolean(data.faqs && data.faqs.length > 0),
      },
    ];
    return tabList.filter((t) => t.show);
  }, [data]);

  // Set initial active tab
  useEffect(() => {
    if (visibleTabs.length > 0 && !visibleTabs.some((t) => t.id === activeTab)) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [visibleTabs, activeTab]);

  // Scroll-spy: update active tab when user scrolls
  useEffect(() => {
    if (visibleTabs.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130;
      const tabIds = visibleTabs.map((t) => t.id);

      for (let i = tabIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(tabIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(tabIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleTabs]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  async function handleAddToCart() {
    if (!user) return router.push("/login");
    if (user.role !== "STUDENT") {
      setMessage("Only student accounts can purchase courses.");
      return;
    }
    if (!data) return;
    if (isInCart) {
      router.push("/cart");
      return;
    }
    setAdding(true);
    try {
      await addToCart(data.id);
      setMessage("Added to cart! Proceed to checkout.");
    } catch (e: any) {
      setMessage(e?.response?.data?.error?.message ?? "Could not add to cart.");
    } finally {
      setAdding(false);
    }
  }

  if (isLoading) return <p className="text-muted py-12 text-center">Loading course details…</p>;
  if (!data || data.isDeleted) return <p className="text-muted py-12 text-center">Course not found.</p>;

  const course = data;
  const lessonCount = course.sections?.reduce((sum, s) => sum + s.lessons.length, 0) ?? 0;

  return (
    <div className="w-full pb-20">
      <CourseHero
        course={course}
        lessonCount={lessonCount}
        adding={adding}
        message={message}
        onAddToCart={handleAddToCart}
      />

      {visibleTabs.length > 0 && (
        <div className="sticky top-0 z-40 w-full border-b border-line/80 bg-surface/95 backdrop-blur-md shadow-xs transition-all">
          <div className="mx-auto  px-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 sm:gap-6 py-2 sm:py-2.5">
              {/* Navigation Tabs */}
              <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                {visibleTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => scrollToSection(tab.id)}
                      className={`group relative flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-brand-50 text-brand-700 shadow-xs ring-1 ring-brand-200/80"
                          : "text-ink/75 hover:bg-paper hover:text-ink"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-none">{tab.icon}</span>
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-mono font-bold transition-colors ${
                            isActive
                              ? "bg-brand-600 text-white"
                              : "bg-paper border border-line text-muted group-hover:border-brand-300 group-hover:text-brand-700"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-brand-600" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right Side: Pricing & Enhanced Enroll CTA */}
              <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                {/* Price Display */}
                <div className="hidden sm:flex flex-col items-end leading-tight">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-base sm:text-lg font-extrabold tracking-tight text-ink">
                      ₹{course.discountPrice ?? course.price}
                    </span>
                    {course.discountPrice && (
                      <span className="font-mono text-xs text-muted line-through">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                  {discountPercent !== null && (
                    <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wide">
                      Save {discountPercent}% today
                    </span>
                  )}
                </div>

                {/* Enroll / Cart / Course Action Button */}
                {course.isEnrolled ? (
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>🎓</span>
                    <span>Go to Course</span>
                    <span className="text-xs">&rarr;</span>
                  </button>
                ) : isInCart ? (
                  <button
                    type="button"
                    onClick={() => router.push("/cart")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>🛒</span>
                    <span>View in Cart</span>
                    <span className="text-xs">&rarr;</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {adding ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Adding…</span>
                      </>
                    ) : (
                      <>
                        <span>⚡</span>
                        <span>Enroll Now</span>
                        <span className="hidden md:inline text-xs font-normal opacity-90">
                          (₹{course.discountPrice ?? course.price})
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Notification message */}
            {message && (
              <div className="pb-2 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-semibold text-blue-700">
                  <span>ℹ️</span> {message}
                  {isInCart && (
                    <button
                      type="button"
                      onClick={() => router.push("/cart")}
                      className="ml-1.5 underline font-bold hover:text-blue-900 cursor-pointer"
                    >
                      Go to Cart &rarr;
                    </button>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. MAIN CONTENT BODY (Spacious & Sequential Sections)         */}
      {/* ============================================================ */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Column: All content sections are visible sequentially */}
          <div className="lg:col-span-8 space-y-14">
            {/* SECTION: ABOUT (Section 4 Data) */}
            {course.description && (
              <section id="about" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-ink border-b border-line pb-2">
                  About this course
                </h2>
                <div
                  className="prose-content max-w-none text-ink/90 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:my-3 [&_pre]:rounded-md [&_pre]:bg-line/40 [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-sm [&_a]:text-brand-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              </section>
            )}

            {/* SECTION: OUTCOMES (Section 6 Data) */}
            {course.outcomesHtml && (
              <section id="outcomes" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-ink border-b border-line pb-2">
                  Course Outcomes
                </h2>
                <div
                  className="overflow-hidden rounded-xl"
                  dangerouslySetInnerHTML={{ __html: course.outcomesHtml }}
                />
              </section>
            )}

            {/* SECTION: ACCESSORIES (Section 7 Data) */}
            {course.accessoriesHtml && (
              <section id="accessories" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-ink border-b border-line pb-2">
                  Course Accessories &amp; Inclusions
                </h2>
                <div
                  className="overflow-hidden rounded-xl"
                  dangerouslySetInnerHTML={{ __html: course.accessoriesHtml }}
                />
              </section>
            )}

            {/* SECTION: CURRICULUM */}
            {course.sections && course.sections.length > 0 && (
              <CourseCurriculum
                sections={course.sections}
                courseTitle={course.title}
                isEnrolled={course.isEnrolled}
              />
            )}

            {/* SECTION: FAQ (Interactive JSON Accordion) */}
            {course.faqs && course.faqs.length > 0 && (
              <CourseFaq faqs={course.faqs} courseTitle={course.title} />
            )}
          </div>

          {/* Right Column: Instructor Summary & Course Specs Card */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-ink border-b border-line pb-2">
                Instructor
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-base font-bold uppercase">
                  {course.instructor.firstName[0]}
                  {course.instructor.lastName[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-ink text-sm">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </h4>
                  <p className="text-xs text-muted">Course Author &amp; Mentor</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface p-6 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-ink border-b border-line pb-2">
                Course Details
              </h3>
              <div className="space-y-2 text-xs text-muted">
                <div className="flex justify-between py-1 border-b border-line/50">
                  <span className="font-medium text-ink">Format</span>
                  <span>{course.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/50">
                  <span className="font-medium text-ink">Level</span>
                  <span>{course.level ?? "All Levels"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/50">
                  <span className="font-medium text-ink">Language</span>
                  <span>{course.language?.toUpperCase() ?? "English"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/50">
                  <span className="font-medium text-ink">Lessons</span>
                  <span>{lessonCount} Total</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-ink">Enrolled</span>
                  <span>{course._count?.enrollments ?? 0} Students</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
