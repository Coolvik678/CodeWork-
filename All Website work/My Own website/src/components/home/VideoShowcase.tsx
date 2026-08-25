"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "tween" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#0D9488] font-semibold tracking-wider uppercase text-sm mb-3 block">Behind the Scenes</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
            See How We Bring Your Vision to Life
          </h2>
          <p className="text-lg text-gray-600">
            Watch our streamlined design and development process in action. We don't just build websites; we engineer revenue-generating assets.
          </p>
        </motion.div>

        {/* Video Thumbnail */}
        <div 
          onClick={() => setModalOpen(true)}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[16px] overflow-hidden shadow-2xl group cursor-pointer border border-gray-100"
        >
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
            alt="Video Thumbnail"
            fill
            className="object-cover"
            priority
          />
          
          <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/40 transition-colors duration-300"></div>

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80px] h-[80px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#0D9488] border-b-[12px] border-b-transparent ml-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl text-center">
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 bg-[#0D9488]/10 text-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full video coming soon!</h3>
              <p className="text-gray-600 mb-8">
                We are actively producing our new studio tour. Contact us to see a live demo of our process right now.
              </p>
              
              <a 
                href="https://wa.me/919691504861" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full hover:bg-[#1DA851] transition-colors"
                onClick={() => setModalOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
