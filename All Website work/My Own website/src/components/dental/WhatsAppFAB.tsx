"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/918975889746?text=Hello%20Dr.%20Chavhan's%20Multispeciality%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20treatment%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[24px] right-[24px] z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden sm:block">
        Chat on WhatsApp (8975889746) 💬
      </span>
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
    </motion.a>
  );
}
