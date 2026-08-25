"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function ToothLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center p-6"
        >
          <div className="relative flex items-center justify-center mb-6">
            {/* Pulsing Outer Ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-[#0A7E8C]/10 absolute"
            />
            
            {/* Tooth SVG Illustration */}
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A7E8C"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <path d="M12 2C8.5 2 6 4.5 6 7.5c0 3 1.5 5.5 2.5 8.5C9.3 18 10 22 12 22c2 0 2.7-4 3.5-6 1-3 2.5-5.5 2.5-8.5C18 4.5 15.5 2 12 2z" />
              <path d="M12 6v6" />
              <path d="M9.5 9h5" />
            </motion.svg>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -top-1 -right-1 text-[#10B981]"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="font-heading font-bold text-xl text-slate-900 tracking-tight">
              Dr. Chavhan's Dental Clinic
            </h3>
            <p className="text-sm font-medium text-[#0A7E8C] mt-1 flex items-center justify-center gap-1.5">
              <span>Multispeciality Care</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
