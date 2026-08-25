"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Award, Users, PhoneCall, Stethoscope } from "lucide-react";

import { AmbientShaderBackground } from "@/components/ui/react-bits/AmbientShaderBackground";
import { LiquidGlassCard } from "@/components/ui/kokonut/LiquidGlassCard";
import { ShinyButton } from "@/components/ui/magic/ShinyButton";
import { ToothModelViewer3D } from "@/components/ui/3d/ToothModelViewer3D";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-[#05070A] text-slate-100">
      {/* 21. REACT BITS: GPU WebGL Canvas Background Shader */}
      <AmbientShaderBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* 1. KOKONUTUI Liquid Glass Live Availability Badge */}
            <LiquidGlassCard className="mb-6 py-2 px-4" badgeText="NAGPUR DUAL CLINIC LOCATIONS">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Stethoscope className="h-4 w-4 text-[#D4AF37] animate-pulse" />
                <span>Teen Nal Chowk (Itwari) & New Mankapur • Open Today</span>
              </div>
            </LiquidGlassCard>

            {/* 4. Cinematic Hero Typography & Metallic Gold Shimmer */}
            <h1 className="font-serif-display font-normal text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6">
              Your Great Smile Begins With A{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#FFDF73] bg-clip-text text-transparent animate-[gold-shine_4s_infinite] italic font-normal">
                Great Dentist
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Led by <strong className="text-white">Dr. Abrar Kothawala</strong> & <strong className="text-white">Dr. Khadeja Kothawala</strong> along with a dedicated team of <strong className="text-white">7 expert dental consultants</strong>. Prioritizing 100% Class B autoclaved sterilization, painless digital care, and 3D implant restoration.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <ShinyButton onClick={onOpenBooking} className="h-14 px-8 text-base">
                <span>Book Appointment Now</span>
                <ArrowRight className="w-5 h-5 ml-2 inline-block text-[#F5D77F]" />
              </ShinyButton>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="tel:9326888667"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0A0D14]/90 hover:bg-slate-900 text-white font-bold text-base border border-[#D4AF37]/40 shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-[#F5D77F]" />
                <span>+91 9326888667</span>
              </motion.a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-[#D4AF37]/50 text-[#F5D77F] flex items-center justify-center flex-shrink-0 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Class B Autoclave</h4>
                  <p className="text-[11px] text-slate-400">100% Sterile Protocol</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-[#D4AF37]/50 text-[#F5D77F] flex items-center justify-center flex-shrink-0 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">7 Consultants</h4>
                  <p className="text-[11px] text-slate-400">Specialist Panel</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-[#D4AF37]/50 text-[#F5D77F] flex items-center justify-center flex-shrink-0 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">5.0 ★ Rated</h4>
                  <p className="text-[11px] text-slate-400">Nagpur Verified</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. ROTATABLE 3D HERO CANVAS CENTERPIECE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/25 via-amber-500/15 to-transparent blur-2xl -z-10" />
            <ToothModelViewer3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
