"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Dr. Abrar Kothawala and his team are exceptional. The sterilization standards and pain-free treatment gave me complete peace of mind. Highly recommended!",
      author: "Priya Sharma",
      treatment: "Dental Implant & RCT",
      rating: 5,
      date: "Verified Patient Review"
    },
    {
      id: 2,
      quote: "Truly multi-specialty care under one roof. The staff is extremely warm, professional, and attentive. My child felt so comfortable during his checkup.",
      author: "Rajesh Patel",
      treatment: "Pediatric Care & Aligners",
      rating: 5,
      date: "Verified Patient Review"
    },
    {
      id: 3,
      quote: "Best dental clinic in town! Established reputation and 100% transparent treatment plans. My smile makeover exceeded all expectations.",
      author: "Ananya Deshmukh",
      treatment: "Cosmetic Smile Design",
      rating: 5,
      date: "Verified Patient Review"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> Patient Feedback
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Why Our Patients Trust Us
            </h2>
          </div>

          {/* Explicit Trust Badge (as requested) */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 flex items-center justify-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] font-extrabold text-xl flex items-center justify-center">
              5.0
            </div>
            <div>
              <div className="flex items-center text-amber-400 gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800 block">
                5.0/5.0 Rating based on verified Google & Local Patient Reviews.
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl relative overflow-hidden max-w-4xl mx-auto"
            >
              <Quote className="w-24 h-24 text-[#0D9488]/10 absolute -top-4 -left-4 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-800 font-heading font-semibold text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>

                <div className="flex flex-wrap items-center justify-between w-full pt-6 border-t border-slate-100 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#0D9488] text-white font-bold flex items-center justify-center text-base shadow-sm">
                      {testimonials[currentIndex].author[0]}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 flex items-center gap-1.5">
                        {testimonials[currentIndex].author}
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      </h4>
                      <p className="text-xs text-slate-500">{testimonials[currentIndex].treatment}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    {testimonials[currentIndex].date}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#0D9488] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-[#0D9488]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#0D9488] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200"
              aria-label="Next Review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
