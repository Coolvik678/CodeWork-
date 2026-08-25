"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
  glowColor?: string;
}

export function LiquidGlassCard({
  children,
  className,
  badgeText,
  glowColor = "rgba(13, 148, 136, 0.15)",
}: LiquidGlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/30 bg-white/70 p-6 backdrop-blur-xl shadow-xl transition-all dark:border-white/10 dark:bg-slate-900/70",
        className
      )}
      style={{
        boxShadow: `0 20px 40px -15px ${glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.6)`,
      }}
    >
      {/* Liquid glass light reflection bar */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" />
      
      {badgeText && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-800 backdrop-blur-md dark:bg-teal-950/50 dark:text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-ping" />
          {badgeText}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
