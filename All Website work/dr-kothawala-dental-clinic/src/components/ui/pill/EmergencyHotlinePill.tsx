"use client";

import React from "react";
import { MessageCircle, Activity } from "lucide-react";

export function EmergencyHotlinePill() {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 rounded-full border border-[#D4AF37]/50 bg-[#0A0D14]/90 p-2 pr-4 shadow-2xl backdrop-blur-xl">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-slate-950 font-bold animate-pulse shadow-md shadow-amber-500/30">
        <Activity className="h-5 w-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold text-[#F5D77F] uppercase tracking-wider block">
          24/7 DENTAL URGENT CARE
        </span>
        <a href="tel:9326888667" className="text-xs font-bold text-white hover:text-[#F5D77F]">
          +91 9326888667
        </a>
      </div>
      <a
        href="https://wa.me/919326888667"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-950 border border-[#D4AF37]/50 text-[#F5D77F] hover:bg-[#D4AF37] hover:text-slate-950 transition-all cursor-pointer"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
    </div>
  );
}
