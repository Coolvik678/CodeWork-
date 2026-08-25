"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        
        {/* Adjusted spacing to normal values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "tween" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#0D9488] font-semibold tracking-wider uppercase text-sm mb-3 block">Our Portfolio</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
            Our Work Speaks for Itself
          </h2>
          <p className="text-lg text-gray-600">
            Explore a selection of our recent projects. From bespoke clinics to modern restaurants, we build digital experiences that command attention.
          </p>
        </motion.div>

        {/* 1 col on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Portfolio Item 1: Sparkle Dental */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-[5px]">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 group">
              <Image
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                alt="Sparkle Dental Care Live Preview"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sparkle Dental Care</h3>
              <p className="text-[#0D9488] text-sm font-semibold mb-6">Dental Clinic • Responsive • Modern</p>
              <a 
                href="https://sparkle-dental-care-beige.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 text-white bg-gray-900 hover:bg-gray-800 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                View Live Site
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Portfolio Item 2: Coming Soon */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-[5px]">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 group">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                alt="Restaurant"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase border-2 border-white px-6 py-2 rounded">Coming Soon</span>
              </div>
            </div>
            <div className="px-2 pb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">The Grand Pavilion</h3>
              <p className="text-gray-500 text-sm font-medium">Premium Restaurant Website</p>
            </div>
          </div>

          {/* Portfolio Item 3: Coming Soon */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-[5px]">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 group">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop"
                alt="Salon"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase border-2 border-white px-6 py-2 rounded">Coming Soon</span>
              </div>
            </div>
            <div className="px-2 pb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Aura Spa & Salon</h3>
              <p className="text-gray-500 text-sm font-medium">Modern Salon & Spa Website</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
