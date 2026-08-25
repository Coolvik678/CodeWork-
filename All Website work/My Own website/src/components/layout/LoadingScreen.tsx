"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hard maximum timeout of 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] bg-white flex items-center justify-center flex-col"
        >
          {/* Simple, safe tween animation instead of spring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
              <span className="text-4xl font-heading font-black text-primary relative z-10">P</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">PixelCraft <span className="text-primary">Studios</span></h2>
            <div className="w-48 h-1 bg-gray-100 rounded-full mt-6 overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
