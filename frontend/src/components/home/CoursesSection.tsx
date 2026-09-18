import React from "react";
import Link from "next/link";
import { COURSE_CARDS } from "@/data/home-data";

export function CoursesSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mx-auto mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 mb-3.5 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#b58342]">
            Curated Programs
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Courses Tailored to your Learning Goals
        </h2>
        <div className="w-16 h-1 bg-[#cc9955] mx-auto mt-4 rounded-full" />
      </div>

      {/* 8 Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 max-w-md sm:max-w-none mx-auto">
        {COURSE_CARDS.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className="group relative bg-white rounded-2xl p-5 sm:p-7 border border-gray-150/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-300/80 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Top accent bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#cc9955] to-[#eb9a00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* SVG Icon Container */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-amber-50/70 border border-amber-100/80 flex items-center justify-center shrink-0 mb-5 p-3.5 text-gray-800 group-hover:scale-105 group-hover:text-[#cc9955] group-hover:bg-amber-100/50 transition-all duration-300">
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: course.svg }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b58342] transition-colors mb-2.5 tracking-tight">
              {course.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed grow font-normal">
              {course.desc}
            </p>

            {/* Subtle interactive affordance */}
            <div className="mt-5 pt-4 border-t border-gray-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-[#b58342] group-hover:text-[#976a2e] transition-colors">
              <span>View Course</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
