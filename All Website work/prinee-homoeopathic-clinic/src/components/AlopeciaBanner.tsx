"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AlopeciaBanner() {
  const whatsappUrl = "https://wa.me/917982444157?text=Hello%20Dr.%20Priya,%20I%20would%20like%20to%20inquire%20about%20my%20alopecia%20and%20hair%20loss%20treatment...";

  const facts = [
    {
      title: "Constitutional Auto-Immune Correction",
      desc: "Homoeopathy regulates the auto-immune response internally, stopping white blood cells from attacking hair follicles without using systemic steroids."
    },
    {
      title: "Zero Local Side-Effects",
      desc: "No painful corticosteroid scalp injections, no chemical dependence, and no synthetic minoxidil irritation. All remedies are organic and safe."
    },
    {
      title: "Stress-Follicle Interception",
      desc: "Alopecia patches are heavily linked to acute nervous stress. Our customized dilutions address both the anxiety trigger and the hair root."
    }
  ];

  return (
    <section id="alopecia" className="py-24 lg:py-32 bg-[#F4F7F5]/50 relative overflow-hidden">
      
      {/* Background shape */}
      <div className="absolute top-[10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-gold-400/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Upper Split Section: Graphical banner and Context details */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Sourced graphical banner (alopecia-facts.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 rounded-clinical-lg bg-gradient-to-tr from-sage-200/20 to-gold-500/10 blur-xl pointer-events-none -z-10" />

            <div className="relative aspect-square rounded-clinical-lg overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/clinic/alopecia-facts.png"
                alt="Facts About Alopecia Areata Homoeopathy Cures"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-sage-950/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Right Column: Key Copy & Quick Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Trichology Focus
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-sage-900 tracking-tight leading-tight">
                Resolving Alopecia Areata <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-sage-700 to-gold-500 bg-clip-text text-transparent">Where Allopathy Fails</span>
              </h2>
              <p className="text-sage-700/80 text-sm sm:text-base leading-relaxed">
                Auto-immune patchy hair loss (Alopecia) is often treated with temporary steroid creams or minoxidil which fail once you stop them. Homoeopathy offers a permanent, natural cure by correcting your auto-immune triggers from within.
              </p>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-xs shadow-md border-b-2 border-gold-500 flex items-center gap-2 cursor-pointer transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-gold-400" />
                <span>Inquire About Alopecia Care</span>
              </a>
            </div>

          </motion.div>

        </div>

        {/* Lower Section: 3-Column Scan-friendly Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-sage-100">
          {facts.map((fact, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-white border border-sage-100 shadow-sm hover:shadow-md hover:border-gold-400/25 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center mb-4 border border-sage-100">
                <ShieldCheck className="w-5 h-5 text-gold-500" />
              </div>
              <h4 className="font-heading font-extrabold text-base text-sage-900 mb-2">{fact.title}</h4>
              <p className="text-xs sm:text-sm text-sage-600 leading-relaxed font-normal">{fact.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
