"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export function LiquidGlassCard({ children, badgeText, className }: LiquidGlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0A0D14]/95 via-[#05070A]/95 to-amber-950/40 p-6 shadow-2xl backdrop-blur-2xl transition-all hover:border-[#F5D77F]/70 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]",
        className
      )}
    >
      {/* Metallic Gold Light Reflections */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[#D4AF37]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-[#F5D77F]/10 blur-3xl" />

      {badgeText && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-amber-950/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#F5D77F] shadow-md backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
          {badgeText}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
