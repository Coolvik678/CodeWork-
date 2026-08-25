"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin, Award, ArrowRight, Phone, MessageCircle, HeartHandshake, Sparkle, Clock } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-36 overflow-hidden gradient-subtle-bg">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#0A7E8C]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#10B981]/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Location Badge */}
            <a 
              href="https://maps.app.goo.gl/WG3H85yBkr4neGrb9?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm mb-6 hover:border-[#0A7E8C] transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase group-hover:text-[#0A7E8C]">
                📍 Sindh Society, Aundh, Pune
              </span>
              <span className="text-xs text-slate-400 font-medium">• Open Mon - Sun</span>
            </a>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.12] tracking-tight mb-4">
              Dr. Chavhan’s Multispeciality <span className="bg-gradient-to-r from-[#0A7E8C] to-[#10B981] bg-clip-text text-transparent">Dental Clinic</span>
            </h1>

            {/* Tagline & Subheadline */}
            <p className="text-xl sm:text-2xl font-heading font-bold text-[#0A7E8C] mb-3">
              Your Smile, Our Commitment
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              Providing advanced, painless, and affordable dental care for the entire family in Aundh, Pune.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0A7E8C] hover:bg-[#075963] text-white font-bold text-base shadow-lg shadow-[#0A7E8C]/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 tracking-wide"
              >
                <span>Book Your Appointment Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="tel:8983821993"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#0A7E8C]" />
                <span>Call: 8983821993</span>
              </a>

              <a
                href="https://wa.me/918975889746"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold text-sm border border-[#25D366]/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: 8975889746</span>
              </a>
            </div>

            {/* Key Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 w-full">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#0A7E8C] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Painless Procedures</span>
              </div>
              <a href="https://maps.app.goo.gl/WG3H85yBkr4neGrb9?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#0A7E8C] transition-colors">
                <MapPin className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Sindh Society, Aundh</span>
              </a>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Ethical Care</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Real Doctor Portrait Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#0A7E8C]/15 via-[#10B981]/15 to-transparent blur-2xl -z-10" />

            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/90 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                <div className="sm:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#10B981] text-[11px] font-bold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" /> Open 10 AM - 9 PM
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-extrabold text-lg text-slate-900 leading-tight">
                      Dr. Chavhan
                    </h4>
                    <p className="text-xs text-[#0A7E8C] font-semibold">BDS, MDS (Endodontist)</p>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-slate-700">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <Sparkle className="w-4 h-4 text-[#0A7E8C] flex-shrink-0" />
                      <span>Advanced Endodontic Specialist</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span>Painless Family Dentistry</span>
                    </div>
                  </div>
                </div>

                {/* Real Doctor Portrait Image */}
                <div className="sm:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-auto sm:h-60 bg-slate-900 shadow-xl border border-white/20 group">
                  <Image
                    src="/clinic/dr-chavhan.jpg"
                    alt="Dr. Chavhan - BDS, MDS"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-2 right-2 text-[10px] font-bold text-white bg-slate-900/80 p-2 rounded-xl backdrop-blur-md border border-white/10 text-center">
                    Dr. Gurudeo S. Chavhan
                  </div>
                </div>

              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#0A7E8C]" /> Mon - Sun (10 AM - 9 PM)
                </span>
                <span className="font-bold text-[#0A7E8C]">Aundh, Pune</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
