"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const headlineWords = "We Build Websites That Build Your Business".split(" ");

  return (
    <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 bg-gray-50 overflow-hidden min-h-screen flex items-center">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-bl from-primary/10 to-transparent"></div>
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-center">
          
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6 lg:mb-8"
            >
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Trusted by Businesses Across India</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5, type: "tween" }} // No multi-keyframe spring
                  className="inline-block mr-3 lg:mr-4 last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed font-body"
            >
              Premium digital experiences crafted for unmatched performance and conversion. We turn clicks into loyal customers securely and beautifully.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* SOLID CTA BUTTON FIX */}
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#0D9488] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:bg-[#0F766E] hover:shadow-xl hover:scale-[1.03]"
              >
                Get Your Website
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#portfolio" 
                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-1"
              >
                View Our Work
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Simple Mockup Framing */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-card p-2 md:p-4 premium-shadow border border-white/40">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                  alt="Modern Design Workspace"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating Badge (no spring arrays) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-4 -bottom-8 lg:-right-8 lg:-bottom-12 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[240px]"
            >
              <p className="font-heading font-bold text-gray-900 mb-1 leading-tight">Quality Over Quantity</p>
              <p className="text-sm text-gray-600">Every single project perfected to standard.</p>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
