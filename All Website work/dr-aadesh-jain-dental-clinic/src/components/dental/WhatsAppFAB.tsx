"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href="https://api.whatsapp.com/send?phone=917507807444&text=Hello%20Dr.%20Aadesh%20Jain%E2%80%99s%20Dental%20and%20Root%20Canal%20Speciality%20Centre,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[24px] right-[24px] z-[9990] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
      
      <MessageSquare className="w-7 h-7 fill-current" />
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden sm:block">
        Chat on WhatsApp 💬
      </span>
    </motion.a>
  );
}
