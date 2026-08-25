import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowDown, MessageCircle } from 'lucide-react';

interface HeroOverlayProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ onOpenWhatsApp }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 text-white">
      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 w-fit"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white">
            CLINICAL DENTAL 3D AGENCY • WEBCLOUD
          </span>
        </div>
      </motion.div>

      {/* Main Headline */}
      <div className="my-auto py-12 space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono backdrop-blur-md">
            <Stethoscope className="w-4 h-4" />
            <span>Interactive Dental Examination</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight">
            We Look Deep Into Your <br />
            <span className="font-sans font-bold text-emerald-400 underline decoration-teal-500/50 decoration-wavy">
              Dental Practice.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-sans font-light leading-relaxed max-w-2xl">
            Scroll down to zoom inside the practice and explore how Webcloud engineers high-converting websites for dentists.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="pt-4 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => onOpenWhatsApp('Hi Webcloud! I want to consult for a website for my dental clinic/business.')}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950/20" />
            <span>Book Doctor Consultation</span>
          </button>

          <a
            href="#diagnosis"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <span>Scroll for 3D Experience</span>
            <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Target Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pb-4 flex items-center justify-between z-10 text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3D SCROLL CANVAS ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span>SCROLL TO SCRUB FRAMES</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
