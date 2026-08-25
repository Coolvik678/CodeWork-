"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/919691504861"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[24px] right-[24px] z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:animate-ping"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 21.066c-1.579 0-3.132-.424-4.492-1.229l-.321-.19-3.344.877.893-3.258-.209-.333a9.043 9.043 0 01-1.385-4.809C3.173 7.151 6.848 3.5 11.236 3.5c4.356 0 7.9 3.535 7.9 7.89 0 4.356-3.544 7.89-7.9 7.89m-4.66-2.585l.18.107c1.32.784 2.85 1.2 4.45 1.2 3.864 0 7.009-3.146 7.009-7.01s-3.145-7.008-7.009-7.008c-3.865 0-7.01 3.144-7.01 7.008 0 1.564.407 3.086 1.18 4.417l.115.197-.53 1.934 1.983-.521zM15.441 12.87c-.198-.1-1.173-.58-1.353-.646-.182-.066-.315-.1-.448.1-.133.199-.512.646-.628.78-.116.132-.231.149-.43.05-.198-.1-8.38-2.67-2.618-6.027-.144-.222-.213.102-.455.305-.662.695-.662 2.05-.158 2.766.198.281 1.905 2.91 4.614 4.08.644.278 1.146.444 1.54.568.646.205 1.234.176 1.696.106.518-.078 1.59-.65 1.815-1.278.225-.628.225-1.164.158-1.278-.066-.114-.248-.181-.446-.28z" />
      </svg>
    </motion.a>
  );
}
