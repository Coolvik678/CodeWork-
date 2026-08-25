"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Flame, ShieldAlert, Sparkles, X, Activity } from "lucide-react";

export default function Treatments() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);

  const specialties = [
    {
      id: 1,
      title: "Chronic Anxiety & Stress",
      subtitle: "Permanent Root-Cause Solution",
      icon: Smile,
      description: "Homoeopathic micro-doses regulate nervous system hypersensitivity naturally, restoring sleep and mental peace without chemical dependency or side-effects.",
      details: [
        "A holistic diagnosis mapping your stress triggers and emotional patterns.",
        "Custom dilutions that address systemic nerve fatigue and panic states.",
        "Gradual reduction of somatic anxiety symptoms like palpitations and tremors.",
        "Integrated counseling on breathing and lifestyle adjustments."
      ]
    },
    {
      id: 2,
      title: "Gastric & Acidity Disorders",
      subtitle: "Heartburn, Ulcers & Acidity Relief",
      icon: Flame,
      description: "Relief from chronic acidity, digestive gas, bloating, and stomach pain by normalizing gastric enzyme secretion and healing stomach mucosal linings.",
      details: [
        "Specialized solutions for peptic ulcers, acid reflux (GERD), and IBS.",
        "Normalizes hyper-acidity cycles without long-term chemical antacids.",
        "Promotes cell regeneration inside stomach mucosal linings.",
        "Provides customized dietary plans matching your body constitution."
      ]
    },
    {
      id: 3,
      title: "Thyroid & Hormonal Imbalance",
      subtitle: "Gentle Glandular Regulation",
      icon: Activity,
      description: "Stimulates natural thyroid hormone production to manage underactive (Hypothyroidism) or overactive thyroid glands without lifelong pills.",
      details: [
        "Supports metabolic optimization and energy level restoration.",
        "Corrects root cause of hormonal shifts naturally.",
        "Reduces systemic symptoms like weight fluctuations, hair loss, and fatigue.",
        "Safe, constitutional formulations checked regularly for progress."
      ]
    },
    {
      id: 4,
      title: "Constitutional Custom Skincare",
      subtitle: "Handmade Organic Remedies",
      icon: Sparkles,
      description: "Addresses root-cause blood purification and hormonal acne. Highlighted by our signature custom skincare formulations and handmade coffee soap.",
      details: [
        "Deep blood purification to treat stubborn acne, eczema, and psoriasis.",
        "Custom handmade coffee soap formulated by Dr. Priya for skin detoxification.",
        "Gentle natural local packs to soothe irritation and balance oily skin.",
        "Constitutional homoeopathy that ensures long-term glow from within."
      ]
    }
  ];

  return (
    <section id="specialties" className="py-24 lg:py-32 bg-[#F4F7F5]/50 relative overflow-hidden">
      
      {/* Background glow highlights */}
      <div className="absolute top-24 left-10 w-80 h-80 rounded-full bg-sage-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-gold-500" /> Focus Areas
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-sage-900 tracking-tight mb-4">
            Our Key Treatment <span className="text-sage-600">Specialties</span>
          </h2>
          <p className="text-sage-700/80 text-sm sm:text-base leading-relaxed">
            By targeting the constitutional root cause, we deliver permanent solutions and lasting relief for persistent, chronic health conditions.
          </p>
        </div>

        {/* 4-Card Grid with Snappy Hover Transitions */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {specialties.map((specialty, idx) => {
            const Icon = specialty.icon;
            return (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedSpecialty(specialty)}
                className="group p-8 rounded-clinical-md bg-white border border-sage-100/60 hover:border-gold-400/40 hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 group-hover:bg-sage-600 group-hover:text-white flex items-center justify-center p-2.5 border border-sage-100 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-sage-100/60 text-sage-700 px-3 py-1 rounded-full border border-sage-200/50">
                      View Details
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-1.5 block">
                    {specialty.subtitle}
                  </span>

                  <h3 className="font-serif font-extrabold text-xl text-sage-900 mb-3 group-hover:text-sage-600 transition-colors">
                    {specialty.title}
                  </h3>

                  <p className="text-sage-700/80 text-sm leading-relaxed">
                    {specialty.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-sage-100 flex items-center gap-2 text-xs font-bold text-sage-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Clinical Efficacy Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {selectedSpecialty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-clinical-lg max-w-lg w-full p-8 relative shadow-2xl border border-sage-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage-50 to-transparent rounded-bl-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-sage-50 text-sage-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-500">
                    {selectedSpecialty.subtitle}
                  </span>
                  <h3 className="font-serif font-extrabold text-2xl text-sage-900 mt-1">
                    {selectedSpecialty.title}
                  </h3>
                </div>

                <p className="text-sm text-sage-700/95 leading-relaxed">
                  {selectedSpecialty.description}
                </p>

                <div className="space-y-3.5 border-t border-sage-100 pt-6">
                  <h4 className="text-xs font-bold text-sage-900 uppercase tracking-widest">
                    Our Treatment Protocol Includes:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedSpecialty.details.map((detail: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-sage-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                        <span className="leading-normal">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedSpecialty(null)}
                    className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-xs shadow-md border-b-2 border-gold-500 transition-all duration-200 cursor-pointer"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
