import React from "react";
import {
  FloatingSocialBar,
  HeroSection,
  StatsSection,
  CoursesSection,
  TestimonialsSection,
  AdvantageSection,
  PillarsSection,
  MasterclassSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="bg-[#fcfbf9] text-gray-900 font-body relative overflow-x-hidden selection:bg-[#cc9955] selection:text-white">
      {/* Floating quick social contact bar */}
      <FloatingSocialBar />

      {/* SECTION 1: Hero Section */}
      <HeroSection />

      {/* SECTION 2: Global Leader Stats Banner */}
      <StatsSection />

      {/* SECTION 3: Courses Tailored to your Learning Goals */}
      <CoursesSection />

      {/* SECTION 4: Testimonials */}
      <TestimonialsSection />

      {/* SECTION 5: Coalescex Advantage */}
      <AdvantageSection />

      {/* SECTION 6: Our Pillars of Excellence */}
      <PillarsSection />

      {/* SECTION 7: Explore Free Master Classes */}
      <MasterclassSection />
    </div>
  );
}
