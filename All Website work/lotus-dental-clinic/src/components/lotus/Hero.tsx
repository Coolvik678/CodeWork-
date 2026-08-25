"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Star, Calendar } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-36 overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/10 to-white">
      {/* Dynamic light glows */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#064E3B]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#B8975F]/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Copywriting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-emerald-100 shadow-sm mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
                5.0 ★ Rated Clinic in Indore
              </span>
              <span className="text-xs text-[#B8975F] font-bold">• 12+ Verified Reviews</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.12] tracking-tight mb-6">
              Advanced Dental Implants & <span className="bg-gradient-to-r from-[#064E3B] to-[#B8975F] bg-clip-text text-transparent">Multi-Speciality Care</span> in Indore.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              Lotus Dental Clinic and Implant Center delivers premium, pain-free dentistry led by senior specialist <strong>Dr. Deepika Soni</strong>. Experience advanced digital diagnostic suites, strict clinical sterilization, and customized cosmetic smile makeovers in a sterile, welcoming environment.
            </p>

            {/* Call-to-actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-white font-extrabold text-base shadow-lg shadow-[#064E3B]/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2.5 tracking-wide border-b-2 border-[#B8975F] cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-5 h-5 text-[#B8975F]" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5 text-[#B8975F]" />
                <span>View Location</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 w-full">
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-[#064E3B]">100%</h4>
                <p className="text-xs text-slate-500 font-medium">Sterilization standards</p>
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-[#B8975F]">12+</h4>
                <p className="text-xs text-slate-500 font-medium">Verified 5★ Ratings</p>
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-[#064E3B]">Painless</h4>
                <p className="text-xs text-slate-500 font-medium">Precision dentistry</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Stylized Image Grid representing real profile photos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#064E3B]/10 via-[#B8975F]/10 to-transparent blur-2xl -z-10" />

            <div className="grid grid-cols-12 gap-4">
              
              {/* Primary Image: Dentist Performing Treatment */}
              <div className="col-span-8 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-white/80 group">
                <Image
                  src="/lotus/treatment.jpg"
                  alt="Lotus Dental Treatment Room"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8975F] block mb-0.5">
                    Modern Operatory Suite
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base leading-tight">
                    State-of-the-art Clinical Setup
                  </h3>
                </div>
              </div>

              {/* Stacked Images on Right */}
              <div className="col-span-4 flex flex-col gap-4">
                
                {/* Secondary Image: Consultation Setup */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-white group">
                  <Image
                    src="/lotus/consultation.jpg"
                    alt="Lotus Dental Consultation"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Third Image: Logo Wall */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-white group">
                  <Image
                    src="/lotus/logo-wall.jpg"
                    alt="Lotus Dental Logo Wall"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Fourth Image: Sign Board */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-white group">
                  <Image
                    src="/lotus/sign-board.jpg"
                    alt="Lotus Dental Sign Board"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
