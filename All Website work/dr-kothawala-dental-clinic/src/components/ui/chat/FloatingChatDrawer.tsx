"use client";

import React, { useState } from "react";
import { MessageCircle, X, ChevronRight, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    "I have an urgent toothache",
    "Book an aligner consultation",
    "Inquire about 0% EMI plans",
    "Clinic timings at Teen Nal Chowk",
  ];

  const handleSendQuickMsg = (msg: string) => {
    const url = `https://wa.me/919326888667?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-slate-950 shadow-2xl shadow-amber-500/40 hover:bg-[#F5D77F] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#F5D77F]/60"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {/* Floating Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl border border-[#D4AF37]/40 bg-[#0A0D14]/95 p-5 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-950 border border-[#D4AF37]/50 text-[#F5D77F] font-bold">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dr. Kothawala Desk</h4>
                  <span className="flex items-center gap-1 text-[10px] text-[#F5D77F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-ping" /> Online Now • Instant WhatsApp
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-900 p-1.5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-300">
                Hello! Welcome to Dr. Kothawala Dental Clinic. Select a quick message or call our emergency desk directly:
              </p>

              <div className="space-y-2 pt-2">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuickMsg(msg)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#05070A] p-3 text-left text-xs font-semibold text-slate-200 hover:border-[#D4AF37] hover:bg-amber-950/40 cursor-pointer transition-all"
                  >
                    <span>{msg}</span>
                    <ChevronRight className="h-4 w-4 text-[#F5D77F]" />
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href="tel:9326888667"
                  className="flex items-center gap-1.5 text-xs font-bold text-[#F5D77F] hover:underline"
                >
                  <PhoneCall className="h-3.5 w-3.5" /> Call +91 9326888667
                </a>
                <span className="text-[10px] text-slate-400">100% Confidential</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
