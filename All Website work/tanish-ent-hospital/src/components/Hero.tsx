"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Phone, Award, ShieldAlert, Check } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-tr from-medical-blue/30 via-white to-slate-50 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-medical-blue/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[5%] right-[-10%] w-[25rem] h-[25rem] rounded-full bg-medical-teal/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and Credibility */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Gold Medalist Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-medical-navy text-white text-xs font-bold uppercase tracking-wider border border-medical-gold/40 shadow-sm mx-auto lg:mx-0">
              <Award className="w-4 h-4 text-medical-gold animate-pulse fill-current" />
              <span>Gold Medalist Surgeon</span>
            </div>

            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-medical-navy tracking-tight leading-[1.1] sm:leading-tight">
              Surat's Finest <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-medical-navy via-medical-teal to-slate-800 bg-clip-text text-transparent">ENT Hospital</span>
            </h1>

            <p className="font-sans font-extrabold text-medical-teal text-base sm:text-lg tracking-wide max-w-2xl mx-auto lg:mx-0 uppercase">
              State-of-the-Art Diagnostic & Surgical Excellence
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Get trusted care for Ear, Nose, Throat, and Vertigo under **Dr. Akshay Suratwala** (MBBS, MS - ENT). Experience precise diagnostics, straightforward surgical advice, and highly gentle care.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-medical-navy hover:bg-slate-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 border-b-2 border-medical-gold cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-medical-gold" />
                <span>Book Appointment</span>
              </button>

              <a
                href="tel:09510650570"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm uppercase tracking-wider border border-slate-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-medical-teal" />
                <span>Call: 095106 50570</span>
              </a>
            </div>

            {/* Operating hours disclaimer */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-medical-mint animate-ping" />
              <span>OPD Timings: Monday – Saturday (9:00 AM – 8:30 PM)</span>
            </div>

            {/* Quick credentials trust tags */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Check className="w-4 h-4 text-medical-mint" /> Safe Cashless Insurance
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Check className="w-4 h-4 text-medical-mint" /> Main Road Access
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Check className="w-4 h-4 text-medical-mint" /> Sterile Facilities
              </div>
            </div>

          </motion.div>

          {/* Right Column: Staggered Clinical Photos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0"
          >
            {/* Glowing ring backdrop */}
            <div className="absolute -inset-4 rounded-full border border-medical-blue/30 bg-medical-blue/10 blur-xl pointer-events-none -z-10" />

            {/* Staggered double image frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] sm:aspect-square">
              
              {/* Primary Image: Dr. Akshay S Suratwala at desk */}
              <div className="absolute top-0 left-0 w-[80%] aspect-[4/5] rounded-clinical-lg overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/clinic/dr-akshay-desk.jpg"
                  alt="Dr. Akshay Suratwala consultation desk"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/40 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-medical-gold block mb-0.5">Lead ENT Surgeon</span>
                  <h4 className="font-serif font-bold text-sm text-slate-100 leading-none">Dr. Akshay Suratwala</h4>
                </div>
              </div>

              {/* Overlapping Image: Clinic Signboard */}
              <div className="absolute bottom-0 right-0 w-[55%] aspect-[4/3] rounded-clinical-md overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/clinic/signboard.png"
                  alt="Tanish ENT Hospital signboard"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 text-white z-10">
                  <h4 className="font-serif font-bold text-xs text-slate-100 leading-none">Tanish Hospital Entrance</h4>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute bottom-[20%] -left-6 bg-white border border-slate-150 shadow-2xl rounded-2xl p-3 flex items-center gap-2 animate-bounce z-20">
                <span className="flex items-center text-medical-gold text-xs font-black gap-0.5">
                  ★ <span className="text-slate-800 font-bold">4.9 Rating</span>
                </span>
                <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest border-l border-slate-200 pl-2">
                  310+ Reviews
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
