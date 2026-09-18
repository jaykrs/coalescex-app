import React from "react";
import Link from "next/link";
import Image from "next/image";

export function MasterclassSection() {
  return (
    <section className="py-16 sm:py-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl bg-linear-to-r from-[#041c52] via-[#083896] to-[#1150c2] text-white"
        style={{
          backgroundImage: "url('/images/home/masterclass-bg.jpg')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Rich dark-blue overlay with subtle gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#051c50]/95 via-[#0a368f]/85 to-[#051c50]/95 backdrop-brightness-90" />

        {/* Ambient glow dots */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
          {/* Left Column: Text & CTA */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 backdrop-blur-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#eb9a00]">
                Explore Free
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master Classes
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-blue-100/90 max-w-xl leading-relaxed font-normal">
              Start your learning journey at Coalescex Learning, for free with our
              Free Master Classes across professional training courses.
            </p>

            <div className="pt-2 sm:pt-3">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#eb9a00] hover:bg-[#f5a716] text-gray-950 font-bold px-8 py-3.5 text-sm sm:text-base transition-all duration-200 shadow-xl hover:shadow-amber-500/25 active:scale-98 w-full sm:w-auto"
              >
                <span>Join Us</span>
                <svg
                  className="w-4 h-4 fill-current transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Dog with glasses photo */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-76 lg:h-76 max-w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 ring-4 ring-white/10 group">
              <Image
                src="/images/home/masterclass-dog.jpg"
                alt="Coalescex Master Classes with Mascot"
                fill
                sizes="(max-width: 768px) 80vw, 30vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
