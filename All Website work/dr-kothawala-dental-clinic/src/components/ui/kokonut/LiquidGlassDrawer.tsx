"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { ShinyButton } from "@/components/ui/magic/ShinyButton";

interface LiquidGlassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiquidGlassDrawer({ isOpen, onClose }: LiquidGlassDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Liquid Glass Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/20 bg-slate-900/90 p-8 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  VIRTUAL CONSULTATION DRAWER
                </span>
                <h3 className="text-xl font-bold text-white">Book Priority Slot</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="rounded-xl border border-teal-500/30 bg-teal-950/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                  <Clock className="h-4 w-4 text-teal-400" /> Next Available Slot: Today, 5:30 PM
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Direct consultation with Dr. Abrar Kothawala & Specialist Panel.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Select Specialty</label>
                <select className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-sm text-white focus:border-teal-500 focus:outline-none">
                  <option>Dental Implants & Full Mouth Restoration</option>
                  <option>Invisible Braces & Aligners</option>
                  <option>Single Visit Root Canal (RCT)</option>
                  <option>Laser Periodontal Care</option>
                  <option>General Family Dentistry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Mobile Number (WhatsApp Enabled)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant WhatsApp Confirmation
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Confidential & Secure
                </div>
              </div>

              <ShinyButton
                onClick={() => {
                  alert("Consultation Slot Reserved Successfully!");
                  onClose();
                }}
                className="w-full h-12 mt-4"
              >
                <Calendar className="h-4 w-4" /> Confirm Priority Reservation
              </ShinyButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
