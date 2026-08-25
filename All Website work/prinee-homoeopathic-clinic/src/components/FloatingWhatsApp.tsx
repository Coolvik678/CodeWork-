"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/917982444157?text=Hello%20Dr.%20Priya,%20I%20would%20like%20to%20book%20a%20consultation.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 border-2 border-white relative group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10" />
        
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Tooltip */}
        <span className="absolute right-16 bg-sage-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-sage-800 pointer-events-none whitespace-nowrap">
          Chat with Dr. Priya (24/7)
        </span>
      </motion.a>
    </div>
  );
}
