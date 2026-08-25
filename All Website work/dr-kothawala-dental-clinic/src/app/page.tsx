"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/kothawala/Navbar";
import Hero from "@/components/kothawala/Hero";
import AboutSection from "@/components/kothawala/AboutSection";
import ServicesGrid from "@/components/kothawala/ServicesGrid";
import ClinicGallery from "@/components/kothawala/ClinicGallery";
import TestimonialsSection from "@/components/kothawala/TestimonialsSection";
import FAQSection from "@/components/kothawala/FAQSection";
import BookingFooter from "@/components/kothawala/BookingFooter";
import BookingModal from "@/components/kothawala/BookingModal";

import { AnimatedBeam } from "@/components/ui/magic/AnimatedBeam";
import { InteractiveGlobe } from "@/components/ui/magic/InteractiveGlobe";
import { ClinicalRecoveryChart } from "@/components/ui/charts/ClinicalRecoveryChart";
import { LiquidGlassDrawer } from "@/components/ui/kokonut/LiquidGlassDrawer";
import { TreatmentCostCalculator } from "@/components/ui/calculator/TreatmentCostCalculator";
import { BeforeAfterSlider } from "@/components/ui/slider/BeforeAfterSlider";
import { SterilizationChamber } from "@/components/ui/sterilization/SterilizationChamber";
import { HygieneQuiz } from "@/components/ui/quiz/HygieneQuiz";
import { ScrollProgressBar } from "@/components/ui/navigation/ScrollProgressBar";
import { EmergencyHotlinePill } from "@/components/ui/pill/EmergencyHotlinePill";
import { BranchLocationSwitcher } from "@/components/ui/location/BranchLocationSwitcher";
import { InfiniteReviewMarquee } from "@/components/ui/marquee/InfiniteReviewMarquee";
import { FloatingChatDrawer } from "@/components/ui/chat/FloatingChatDrawer";
import { CustomMedicalCursor } from "@/components/ui/cursor/CustomMedicalCursor";

import { NoiseTextureOverlay } from "@/components/ui/effects/NoiseTextureOverlay";
import { GSAPScrollTrigger } from "@/components/ui/motion/GSAPScrollTrigger";

import { useAnimePathDraw, useAnimeStagger } from "@/hooks/use-anime";
import { Scan, Cpu, Stethoscope, CheckCircle2, HeartPulse } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/kokonut/LiquidGlassCard";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useAnimeStagger("#kothawala-main", ".kothawala-card");
  useAnimePathDraw(".kothawala-svg-path");

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#070A0F] text-slate-100 selection:bg-[#E5C158] selection:text-slate-950 antialiased">
      {/* TACTILE NOISE OVERLAY */}
      <NoiseTextureOverlay />

      {/* 25. CUSTOM MEDICAL CURSOR */}
      <CustomMedicalCursor />

      {/* 22. DYNAMIC SCROLL COMPRESSED NAVBAR & TOP PROGRESS BAR */}
      <ScrollProgressBar />
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* MAIN CONTENT WORKFLOW */}
      <main id="kothawala-main" className="flex-grow">
        {/* 1-5. HERO & 3D ROTATABLE MODEL SHOWCASE */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3 & 24. DUAL BRANCH LOCATION ROUTER SECTION */}
        <GSAPScrollTrigger className="py-16 px-6 max-w-7xl mx-auto w-full">
          <BranchLocationSwitcher />
        </GSAPScrollTrigger>

        {/* 13. PAIN-FREE CARE GUARANTEE (KOKONUTUI) & STERILIZATION CHAMBER */}
        <GSAPScrollTrigger className="py-16 px-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <LiquidGlassCard badgeText="PAIN-FREE CARE GUARANTEE">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-6 w-6 text-[#E5C158]" />
                  <h3 className="text-xl font-bold text-white">Comfort-First & Zero-Anxiety Dentistry</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every procedure at Dr. Kothawala Dental Clinic prioritizes gentle, painless micro-techniques and patient relaxation.
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-cyan-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Computerized Local Anesthesia Delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> No-Noise Rotary Endodontics
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Post-Treatment Digital Care Hotline
                  </div>
                </div>
              </div>
            </LiquidGlassCard>

            <SterilizationChamber />
          </div>
        </GSAPScrollTrigger>

        {/* ABOUT DOCTOR & CONSULTANT PANEL */}
        <AboutSection />

        {/* 9. INTERACTIVE COST & 0% EMI ESTIMATOR */}
        <GSAPScrollTrigger className="py-16 px-6 max-w-7xl mx-auto w-full">
          <TreatmentCostCalculator onOpenBooking={handleOpenBooking} />
        </GSAPScrollTrigger>

        {/* 11. PATIENT JOURNEY ANIMATED BEAM (MAGIC UI) */}
        <section id="workflow" className="py-16 px-4 max-w-7xl mx-auto w-full">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">
              MAGIC UI ANIMATED BEAM CONNECTOR
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">4-Step Pain-Free Patient Pathway</h3>
          </div>

          <AnimatedBeam
            steps={[
              {
                title: "1. 3D Digital Scan",
                description: "Ultra-high resolution intraoral mapping.",
                icon: <Scan className="h-6 w-6" />,
              },
              {
                title: "2. 7-Consultant Case Review",
                description: "Multi-specialty expert panel evaluation.",
                icon: <Cpu className="h-6 w-6" />,
              },
              {
                title: "3. Pain-Free Treatment",
                description: "100% Class B autoclaved sterilized procedure.",
                icon: <Stethoscope className="h-6 w-6" />,
              },
              {
                title: "4. Lifetime Smile Warranty",
                description: "Continuous digital post-care tracking.",
                icon: <CheckCircle2 className="h-6 w-6" />,
              },
            ]}
          />
        </section>

        {/* 6. BENTO GRID SERVICES MATRIX */}
        <ServicesGrid onOpenBooking={handleOpenBooking} />

        {/* 7. INTERACTIVE SMILE SLIDER & 14. HYGIENE QUIZ */}
        <GSAPScrollTrigger className="py-16 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <BeforeAfterSlider />
          </div>
          <div>
            <HygieneQuiz onOpenBooking={handleOpenBooking} />
          </div>
        </GSAPScrollTrigger>

        {/* 15. BKLIT RECOVERY CHARTS & 10. MAGIC UI 3D GLOBE */}
        <section className="py-20 px-6 border-t border-white/10 bg-[#070A0F]/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <ClinicalRecoveryChart />
            </div>
            <div className="flex flex-col items-center">
              <InteractiveGlobe />
              <p className="text-xs text-slate-400 mt-4 text-center">
                Connected with international multi-specialty dental technology networks.
              </p>
            </div>
          </div>
        </section>

        {/* 16. INFINITE SMOOTH GOOGLE PATIENT REVIEW MARQUEE */}
        <section id="reviews" className="py-16 border-t border-white/10 bg-[#070A0F]">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">
              MAGIC UI MARQUEE CONNECTOR
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">Verified Google 5.0 ★ Nagpur Patient Reviews</h3>
          </div>
          <InfiniteReviewMarquee />
        </section>

        <ClinicGallery />
        <TestimonialsSection />
        <FAQSection />
      </main>

      {/* FOOTER & BOOKING */}
      <BookingFooter onOpenBooking={handleOpenBooking} />

      {/* 14. EMERGENCY HOTLINE PILL */}
      <EmergencyHotlinePill />

      {/* 18. FLOATING WHATSAPP INSTANT CHAT DRAWER */}
      <FloatingChatDrawer />

      {/* 5. VIRTUAL CONSULTATION DRAWER */}
      <LiquidGlassDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* BOOKING MODAL */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
