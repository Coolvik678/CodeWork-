"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      quote: "One of the best in city. I had got done my root canal treatment by Dr Aadesh. It was just so simple and painless. Highly recommended.",
      author: "Shailesh M.",
      treatment: "Root Canal Treatment",
      rating: 5
    },
    {
      id: 2,
      quote: "This doctor is great, his practice is also great and his experience and hard work makes him the best... Dr. Aadesh Sir gives his best to the patients.",
      author: "Vinit J.",
      treatment: "Painless Oral Care",
      rating: 5
    },
    {
      id: 3,
      quote: "Dr. has really good hands in tooth work, the treatment was painless, will definitely recommend it to everyone.",
      author: "Mayank B.",
      treatment: "Preventive & Tooth Work",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F0FDF4]/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Header containing the Google rating banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> Patient Feedback
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Why Our Patients Recommend Us
            </h2>
          </div>

          {/* Social Proof Google Review Badge */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200/80 flex items-center justify-center gap-4 shadow-sm mx-auto md:mx-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] font-extrabold text-xl flex items-center justify-center border border-emerald-100">
              5.0
            </div>
            <div className="text-left">
              <div className="flex items-center text-amber-400 gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800 block">
                5.0 ★ Rated Clinic on Google Maps (Nashik)
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md relative overflow-hidden"
            >
              <Quote className="w-24 h-24 text-[#0F766E]/5 absolute -top-4 -left-4 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-800 font-heading font-semibold text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-tight mb-8">
                  "{reviews[currentIndex].quote}"
                </p>

                <div className="flex flex-wrap items-center justify-between w-full pt-6 border-t border-slate-100 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {reviews[currentIndex].author[0]}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                        {reviews[currentIndex].author}
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      </h4>
                      <p className="text-xs text-slate-500">{reviews[currentIndex].treatment} Patient</p>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-[10px] font-extrabold tracking-wider uppercase border border-emerald-100/60">
                    Verified Google Review
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#0F766E] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200 cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-[#0F766E]" : "w-2.5 bg-slate-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white hover:bg-[#0F766E] hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm border border-slate-200 cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
