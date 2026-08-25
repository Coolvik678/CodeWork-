"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Award, Star, Activity } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-36 overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/10 to-white">
      {/* Ambient lighting glows */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#0F766E]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#B8975F]/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
                Expert Endodontist Care
              </span>
              <span className="text-xs text-[#0F766E] font-extrabold">• 5.0 ★ Rated Nashik Clinic</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.12] tracking-tight mb-6">
              Experience the Next Generation of <span className="bg-gradient-to-r from-[#0F766E] to-[#B8975F] bg-clip-text text-transparent">Painless Dental Care</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              Led by expert Endodontist <strong>Dr. Aadesh Jain</strong>. Delivering premium, comfortable, and highly-rated dental treatments in Nashik. We specialize in entirely painless single-visit root canals, advanced diagnostics, and family dental safety.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F766E] hover:bg-[#0D5C55] text-white font-extrabold text-base shadow-lg shadow-[#0F766E]/20 hover:scale-102 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2.5 tracking-wide border-b-2 border-[#B8975F] cursor-pointer"
              >
                <span>Schedule an Appointment</span>
                <ArrowRight className="w-5 h-5 text-[#B8975F]" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border border-slate-200 shadow-sm hover:shadow hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
              </a>
            </div>

            {/* highlights widget */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <Star className="w-4.5 h-4.5 fill-current text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">5.0 Rating</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Google Maps Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <Award className="w-4.5 h-4.5 text-[#B8975F]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Specialist Care</h4>
                  <p className="text-[10px] text-slate-500 font-medium">MDS Root Canal Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#0F766E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Sterile</h4>
                  <p className="text-[10px] text-slate-500 font-medium">B-Class Hygiene focus</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stylized illustrative grid with loading spinners for layout stability */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#0F766E]/10 via-[#B8975F]/10 to-transparent blur-2xl -z-10" />
            
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B8975F]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8975F]">WebCloud Clinical Standard</span>
                  <h3 className="font-heading font-extrabold text-lg text-[#0F766E] mt-0.5">Clinical Excellence Hub</h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Grid or List of clinical cards */}
              <div className="space-y-4">
                
                {/* Card 1: Painless RCT */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#0F766E]/30 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0 font-bold border border-emerald-100">
                    01
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">Rotary Endodontics</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      Advanced single-sitting root canals using micro-motors for precise, quiet, and painless outcomes.
                    </p>
                  </div>
                </div>

                {/* Card 2: Low-Radiation Digital X-Ray */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#0F766E]/30 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0 font-bold border border-emerald-100">
                    02
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">Digital Diagnostics</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      Low-radiation intraoral sensors for instant high-resolution diagnostic mapping.
                    </p>
                  </div>
                </div>

                {/* Card 3: Class-B Sterilization */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#0F766E]/30 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0 font-bold border border-emerald-100">
                    03
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">Class-B Sterilization</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      Highest autoclave standards with biological indicators for 100% sterile instruments.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Quick-Action widget */}
              <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  Active safety protocols
                </span>
                <span className="text-[#0F766E] font-extrabold uppercase tracking-wide">100% Verified</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
