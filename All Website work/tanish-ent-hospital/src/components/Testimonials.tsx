"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      author: "Shah Nisha",
      rating: 5,
      text: "Nice consultant and cooperative staff with clean, sterile surroundings. Dr. Akshay explained the issue in very simple words without any panic.",
      role: "Verified Patient"
    },
    {
      author: "Mehta Jigar",
      rating: 5,
      text: "Completely stress-free billing because of their excellent cashless insurance facility. The hospital staff handled the approvals in less than an hour.",
      role: "Verified Patient"
    },
    {
      author: "Patel Ramesh",
      rating: 5,
      text: "Best ENT hospital, very good treatment at affordable prices. Dr. Akshay is very straightforward and does not advise unnecessary surgeries.",
      role: "Verified Patient"
    }
  ];

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-medical-blue/10 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[10%] right-[-10%] w-[35rem] h-[35rem] bg-medical-blue/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-medical-navy text-xs font-bold uppercase tracking-wider border border-slate-100 shadow-sm">
            Patient Feedback
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-medical-navy tracking-tight">
            Trusted by 310+ Patients
          </h2>
          
          {/* Rating Summary Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm mx-auto">
            <span className="text-xl font-black text-medical-navy">4.9</span>
            <div className="flex items-center text-medical-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-bold border-l border-slate-200 pl-2">
              310+ Google Reviews
            </span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="p-8 rounded-clinical-lg bg-white border border-slate-100 hover:border-medical-teal/20 hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-medical-blue/20 pointer-events-none" />

              <div className="space-y-4">
                {/* Gold Stars */}
                <div className="flex items-center gap-0.5 text-medical-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Patient Details & Google Badge */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 leading-none">
                    {rev.author}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                    <span>{rev.role}</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
