import React from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 bg-linear-to-b from-white via-[#fcfbf9] to-[#f4ede4]">
      {/* Decorative ambient background blur elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#cc9955]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Heading, description, CTA button */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6">
            {/* Subtle Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#cc9955] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-[#b58342] uppercase">
                Empowering Next-Gen Careers
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-gray-950 tracking-tight leading-[1.18] sm:leading-[1.14]">
              Illuminating Your <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-[#1a1c22] via-[#2c303b] to-[#cc9955] bg-clip-text text-transparent">
                Path to Success
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl font-normal">
              Unlock a brighter tomorrow, today! Discover the tools, strategies, and
              insights to empower your growth, ignite your passions, and illuminate
              your path to success. Take the first step towards a radiant future,
              where your dreams and aspirations shine brighter than ever before.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#cc9955] hover:bg-[#b58342] text-white px-8 py-3 text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-amber-900/10 active:scale-98 w-full sm:w-auto"
              >
                <span>Learn More</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: 3-Image Collage with glass styling */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4.5 max-w-lg mx-auto lg:max-w-none">
              {/* Left tall image */}
              <div className="relative h-68 sm:h-84 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-white/80 ring-1 ring-black/5 group">
                <Image
                  src="/images/home/hero-student-1.jpg"
                  alt="Student studying and enrolling in career institute"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-60" />
              </div>

              {/* Right column: 2 stacked images */}
              <div className="flex flex-col gap-3.5 sm:gap-4.5 h-64 sm:h-84 md:h-96">
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl border border-white/80 ring-1 ring-black/5 group">
                  <Image
                    src="/images/home/hero-student-2.jpg"
                    alt="Students collaborating on programming projects"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-60" />
                </div>
                <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xl border border-white/80 ring-1 ring-black/5 group">
                  <Image
                    src="/images/home/hero-student-3.jpg"
                    alt="Student coding in software lab"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
