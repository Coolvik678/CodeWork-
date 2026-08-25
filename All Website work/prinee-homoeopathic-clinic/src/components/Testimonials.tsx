"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      author: "Deepak C.",
      role: "Verified Google Reviewer",
      text: "Dr. Priya is an incredibly patient listener. She gives genuine care and suggests simple diet and lifestyle changes instead of just piling on medicines. I found a permanent solution for my chronic anxiety here after trying many other places.",
      rating: 5
    },
    {
      author: "Sumith S.",
      role: "Verified Patient",
      text: "Very nice doctor. She successfully cured my severe acne and stomach ulcers. Her custom formulations, including the handmade soap, are very effective. Highly recommend Prinee Clinic to everyone.",
      rating: 5
    },
    {
      author: "Kushagra",
      role: "Verified Google Reviewer",
      text: "Safe homoeopathic treatments without any side-effects. Dr. Priya listens very calmly and diagnoses the exact constitutional trigger. The clinic atmosphere is very soothing too.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-20 right-[-5%] w-80 h-80 rounded-full bg-sage-50/50 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-50 text-sage-800 text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-gold-500" /> Patient Stories
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-sage-900 tracking-tight mb-4">
            What Our Patients <span className="text-sage-600">Experience</span>
          </h2>
          <p className="text-sage-700/80 text-sm sm:text-base leading-relaxed">
            Real feedback from verified patients who found root-cause healing under Dr. Priya Puri’s customized homoeopathic care.
          </p>
        </div>

        {/* Staggered cards list */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="p-8 rounded-clinical-md bg-sage-50/30 border border-sage-100/50 hover:bg-white hover:shadow-2xl hover:border-gold-400/20 transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-sage-200/50" />

              <div className="space-y-4">
                {/* Gold Stars */}
                <div className="flex items-center gap-0.5 text-gold-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-sage-900/80 leading-relaxed font-normal italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-sage-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-serif font-bold text-sm">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-sage-900 leading-none">{rev.author}</h4>
                  <span className="text-[10px] text-sage-500 font-bold uppercase tracking-wider flex items-center mt-1">
                    <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>{rev.role}</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Verified platform notice */}
        <div className="text-center mt-12 text-xs font-bold text-sage-500/80 uppercase tracking-widest">
          🛡️ Verified Google Local Business feedback
        </div>

      </div>
    </section>
  );
}
