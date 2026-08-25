"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, Coffee, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Apothecary() {
  const formulations = [
    {
      title: "Custom Skincare Roll-ons & Coffee Soap",
      desc: "Freshly ground organic coffee extract soap hand-milled by Dr. Priya to gently exfoliate, improve micro-circulation, and clear skin blemishes naturally."
    },
    {
      title: "Constitutional Hair Vitalizers",
      desc: "Custom-formulated homeopathic oil infusions designed to combat follicular thinning, genetic alopecia areata, and scalp dry scaling."
    },
    {
      title: "Gentle Gastric Enzyme Regulators",
      desc: "Herbal-homeopathic blends custom-dispensed to match your gut toxicity levels, promoting cellular regeneration of the stomach lining."
    }
  ];

  return (
    <section id="apothecary" className="py-24 lg:py-32 bg-sage-50/50 relative overflow-hidden">
      
      {/* Background shape */}
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-sage-50/70 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting emphasizing custom formulations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-50 text-sage-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Clinic Apothecary
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-sage-900 tracking-tight leading-tight">
                Handmade Formulations & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-sage-700 to-gold-500 bg-clip-text text-transparent">Custom Dispensation</span>
              </h2>
              <p className="text-sage-700/80 text-sm sm:text-base leading-relaxed max-w-xl">
                Unlike mass-market corporate clinics that dispense generic pre-packaged pills, Dr. Priya Puri hand-makes and customizes dilutions to match your exact constitutional profile.
              </p>
            </div>

            {/* List of custom formulations */}
            <div className="space-y-6">
              {formulations.map((form, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-sage-50/50 border border-sage-100 hover:border-gold-400/30 hover:bg-white hover:shadow-lg transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                    {idx === 0 ? <Coffee className="w-5 h-5 text-gold-600" /> : <ShieldCheck className="w-5 h-5 text-gold-600" />}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-sage-900">{form.title}</h4>
                    <p className="text-xs sm:text-sm text-sage-600 mt-1 leading-relaxed">{form.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Sourced interior photo (cupboards.jpg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 rounded-clinical-lg bg-gradient-to-tr from-sage-200/20 to-gold-500/10 blur-xl pointer-events-none -z-10" />

            <div className="relative aspect-[4/5] rounded-clinical-lg overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/clinic/cupboards.jpg"
                alt="Prinee Clinic Custom Medicine Cupboards"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-950/60 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 text-white z-10 bg-sage-900/60 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">Dispensation Chamber</span>
                <h4 className="font-serif font-bold text-base text-slate-100 leading-snug mb-1">
                  100% Pure German Dilutions
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Our raw compounds are kept under strict quality, temperature, and light control to preserve their chemical efficacy.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
