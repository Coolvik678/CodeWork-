"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

export function SterilizationChamber() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-[#D4AF37]/40 bg-[#0A0D14]/95 p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5D77F]">
            CLASS B UV-C STERILIZER ACTIVE
          </span>
        </div>
        <Zap className="h-4 w-4 text-[#D4AF37]" />
      </div>

      <div className="mt-4 rounded-2xl border border-[#D4AF37]/25 bg-[#05070A] p-4 text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-950/80 text-[#F5D77F] border border-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
        >
          <ShieldCheck className="h-8 w-8" />
        </motion.div>

        <h4 className="mt-3 text-sm font-bold text-white">100% Hospital Grade Protocol</h4>
        <p className="mt-1 text-xs text-slate-300">
          Autoclaved pouches opened exclusively in front of the patient.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#F5D77F]">
          <div className="flex items-center justify-center gap-1 rounded-lg bg-amber-950/40 p-1.5 border border-[#D4AF37]/30">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" /> 134°C Autoclave
          </div>
          <div className="flex items-center justify-center gap-1 rounded-lg bg-amber-950/40 p-1.5 border border-[#D4AF37]/30">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" /> HEPA Air Scrub
          </div>
        </div>
      </div>
    </div>
  );
}
