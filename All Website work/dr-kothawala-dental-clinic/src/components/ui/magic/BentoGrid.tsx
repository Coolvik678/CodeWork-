"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  badge?: string;
}

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ title, description, header, icon, className, badge }: BentoItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-500/20 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl transition-all hover:border-teal-400/50 hover:shadow-teal-500/10",
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-teal-500/30 via-emerald-500/30 to-transparent" />

      {badge && (
        <span className="mb-3 self-start rounded-full border border-emerald-400/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          {badge}
        </span>
      )}

      {header && <div className="mb-4">{header}</div>}

      <div className="relative z-10">
        {icon && <div className="mb-2 text-teal-400">{icon}</div>}
        <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-xs text-slate-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
