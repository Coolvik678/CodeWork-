"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Very nice experience. Happy with the treatment as well as staff behaviour.",
      author: "Verified Patient",
      treatment: "Dental Treatment",
      rating: 5,
      date: "Verified Review"
    },
    {
      id: 2,
      quote: "Doctors are very kind and provide excellent treatment at low cost. Being around them brings peace of mind.",
      author: "Patient",
      treatment: "Affordable Care",
      rating: 5,
      date: "Verified Review"
    },
    {
      id: 3,
      quote: "Clean clinic, painless treatment, and friendly doctor. Highly recommended.",
      author: "Local Resident",
      treatment: "Painless Procedure",
      rating: 5,
      date: "Verified Review"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> Patient Feedback
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Patient Testimonials
            </h2>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl border border-slate-200 flex items-center justify-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#10B981] font-extrabold text-lg flex items-center justify-center">
              ★
            </div>
            <div>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">High Patient Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Testimonial Showcase Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl relative overflow-hidden max-w-4xl mx-auto"
            >
              <Quote className="w-20 h-20 text-[#0A7E8C]/10 absolute -top-4 -left-4 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start text-left">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Quote Body */}
                <p className="text-slate-800 font-heading font-semibold text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="flex flex-wrap items-center justify-between w-full pt-6 border-t border-slate-100 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0A7E8C] text-white font-bold flex items-center justify-center text-sm">
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

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {testimonials[currentIndex].date}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-[#0A7E8C] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
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
                    idx === currentIndex ? "w-8 bg-[#0A7E8C]" : "w-2.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-[#0A7E8C] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
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
