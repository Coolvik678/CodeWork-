"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AnimatedBeamProps {
  steps: BeamStep[];
  className?: string;
}

export function AnimatedBeam({ steps, className }: AnimatedBeamProps) {
  return (
    <div className={cn("relative my-8 w-full overflow-hidden p-4", className)}>
      <div className="absolute left-1/2 top-10 hidden h-1 w-[80%] -translate-x-1/2 bg-slate-800 md:block">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-4">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center rounded-xl border border-teal-500/30 bg-slate-900/90 p-5 text-center shadow-lg backdrop-blur-md"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-teal-400/40 bg-teal-950/80 text-teal-300 shadow-[0_0_15px_rgba(13,148,136,0.3)]">
              {step.icon}
            </div>
            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
              Phase 0{idx + 1}
            </span>
            <h4 className="text-base font-bold text-white">{step.title}</h4>
            <p className="mt-1 text-xs text-slate-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
