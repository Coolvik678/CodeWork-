"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className, onClick, ...props }: ShinyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#997A15]/90 via-amber-950/90 to-[#997A15]/90 px-6 py-3 font-bold text-white shadow-xl backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-[#F5D77F] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] active:scale-[0.98] cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5D77F]/30 to-transparent animate-[gold-shine_3s_infinite]" />
      <span className="relative z-10 flex items-center gap-2 text-white">{children}</span>
    </button>
  );
}
