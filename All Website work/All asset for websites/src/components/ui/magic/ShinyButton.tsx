"use client";

import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className, onClick, ...props }: ShinyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border border-teal-400/40 bg-gradient-to-r from-teal-600 via-teal-500 to-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 backdrop-blur-md hover:shadow-teal-500/40 cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Shiny edge light bar */}
      <span className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_3s_infinite]" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
