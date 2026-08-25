"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ear, Wind, Speech, Activity, ShieldCheck, X, PhoneCall } from "lucide-react";

interface ServicesMatrixProps {
  onOpenBooking: () => void;
}

export default function ServicesMatrix({ onOpenBooking }: ServicesMatrixProps) {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const services = [
    {
      icon: Ear,
      title: "Ear Care (Otology)",
      short: "Ear wax removal, Audiometry testing, hearing aids, and advanced surgeries.",
      desc: "Complete evaluation and surgical/medical management of ear disorders to restore hearing and balance.",
      points: [
        "Painless Micro-suction ear wax removal",
        "Audiometry (hearing testing) & hearing aid fitting",
        "Tympanoplasty (eardrum repair surgery)",
        "Management of chronic ear discharge & infections",
        "Tinnitus (ringing in ear) counseling & management"
      ]
    },
    {
      icon: Wind,
      title: "Nose & Sinus (Rhinology)",
      short: "Treatment for chronic sinusitis, nasal blockages, and nasal allergies.",
      desc: "Advanced treatment pathways for chronic nasal congestion, sinusitis, allergies, and structural blockages.",
      points: [
        "FESS (Functional Endoscopic Sinus Surgery)",
        "Septoplasty (deviation correction of nasal septum)",
        "Nasal allergy testing and immunotherapy",
        "Treatment for chronic nosebleeds (epistaxis)",
        "Nasal polyp removal surgeries"
      ]
    },
    {
      icon: Speech,
      title: "Throat & Voice (Laryngology)",
      short: "Voice disorder treatments, tonsillitis, and complex throat surgeries.",
      desc: "Surgical and medical interventions for vocal cords, chronic throat infections, and breathing/swallowing difficulties.",
      points: [
        "Tonsillectomy & Adenoidectomy surgeries",
        "Micro-laryngeal surgeries for vocal cord polyps/nodules",
        "Treatment for chronic sore throat and laryngitis",
        "Snoring & Sleep Apnea surgical evaluations",
        "Voice therapy consultations"
      ]
    },
    {
      icon: Activity,
      title: "Specialized Vertigo Care",
      short: "Advanced diagnostics, positional vertigo maneuvers, and custom therapy.",
      desc: "Comprehensive diagnostic assessment and corrective pathways for dizziness, balance disorders, and positional vertigo.",
      points: [
        "Detailed clinical examination for inner ear balance issues",
        "Epley's maneuver and positional maneuvers for BPPV",
        "Medical therapy for Meniere's disease & Vestibular Neuritis",
        "Customized vestibular rehabilitation exercises",
        "Long-term balance restoration programs"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-medical-blue/10 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 rounded-full bg-medical-blue/30 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-medical-navy text-xs font-bold uppercase tracking-wider border border-slate-100 shadow-sm">
            Clinical Services
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-medical-navy tracking-tight">
            Specialized ENT Care
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Equipped with state-of-the-art diagnostic microscopes and endoscopy units, Tanish ENT Hospital offers precise, gentle, and honest treatments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveModal(idx)}
                className="p-8 rounded-clinical-lg bg-white/80 backdrop-blur-md border border-slate-200 hover:border-medical-teal shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-medical-light text-medical-navy flex items-center justify-center border border-slate-150 group-hover:bg-medical-navy group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-medical-navy leading-snug group-hover:text-medical-teal transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {service.short}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-medical-navy group-hover:text-medical-teal">
                  <span>View Details</span>
                  <motion.span
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="text-lg leading-none"
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Details Modals */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl bg-white rounded-clinical-lg shadow-2xl border border-slate-100 overflow-hidden flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-medical-navy to-slate-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    {(() => {
                      const IconComponent = services[activeModal].icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <h3 className="font-serif font-bold text-xl leading-tight">
                    {services[activeModal].title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[60vh] text-slate-700">
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  {services[activeModal].desc}
                </p>

                <div className="space-y-3">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-medical-teal">
                    Key Procedures & Treatments
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium">
                    {services[activeModal].points.map((pt, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <ShieldCheck className="w-4.5 h-4.5 text-medical-mint flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="tel:09510650570"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-medical-navy"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-medical-teal" />
                  <span>Call Hospital: 095106 50570</span>
                </a>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      onOpenBooking();
                    }}
                    className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-medical-navy hover:bg-slate-800 text-white font-bold text-xs uppercase border-b-2 border-medical-gold cursor-pointer"
                  >
                    Book Visit
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
