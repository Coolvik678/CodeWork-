"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Shield, Smile, Activity, Sparkle, ArrowRight, X, Check, Stethoscope, Scissors, Award, HeartHandshake, Baby, Pill } from "lucide-react";

interface ServicesMatrixProps {
  onOpenBooking: () => void;
}

interface ServiceDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: any;
}

export default function ServicesMatrix({ onOpenBooking }: ServicesMatrixProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 1,
      title: "General Dentistry",
      category: "Preventive Care",
      description: "Comprehensive oral examinations, routine dental health checkups, and early cavity diagnostics.",
      icon: Shield
    },
    {
      id: 2,
      title: "Root Canal Treatment (RCT)",
      category: "Endodontic Care",
      description: "Advanced single-sitting and multi-sitting painless root canal procedures to save infected teeth.",
      icon: Stethoscope
    },
    {
      id: 3,
      title: "Tooth Extraction (Simple & Surgical)",
      category: "Oral Surgery",
      description: "Gentle, painless extraction of damaged teeth and wisdom teeth impactions with rapid healing.",
      icon: Scissors
    },
    {
      id: 4,
      title: "Dental Fillings",
      category: "Restorative Dentistry",
      description: "Esthetic tooth-colored composite restorations to repair decay and restore natural tooth structure.",
      icon: Check
    },
    {
      id: 5,
      title: "Teeth Cleaning & Polishing",
      category: "Hygiene & Maintenance",
      description: "Ultrasonic scaling and polishing to eliminate stain, calculus, tartar, and prevent gum infection.",
      icon: Sparkles
    },
    {
      id: 6,
      title: "Dental Crowns & Bridges",
      category: "Fixed Restorations",
      description: "High-translucency Zirconia and ceramic crowns to protect weakened teeth and restore bite force.",
      icon: Award
    },
    {
      id: 7,
      title: "Dentures (Complete & Partial)",
      category: "Removable Prosthetics",
      description: "Custom-fitted complete and partial flexible dentures designed for natural comfort and speech.",
      icon: HeartHandshake
    },
    {
      id: 8,
      title: "Dental Implants",
      category: "Permanent Replacement",
      description: "Biocompatible titanium implants serving as lifelong permanent replacements for missing teeth.",
      icon: Activity
    },
    {
      id: 9,
      title: "Braces & Aligners",
      category: "Orthodontics",
      description: "Esthetic ceramic braces and invisible clear aligners for precise tooth alignment.",
      icon: Smile
    },
    {
      id: 10,
      title: "Cosmetic Dentistry (Smile Designing & Whitening)",
      category: "Smile Aesthetics",
      description: "Laser teeth whitening, diastema closure, and digital smile designing for a radiant smile.",
      icon: Sparkle
    },
    {
      id: 11,
      title: "Pediatric (Child) Dentistry",
      category: "Children's Care",
      description: "Gentle, specialized preventive and restorative dental care tailored for children in a comfortable setting.",
      icon: Baby
    },
    {
      id: 12,
      title: "Gum Treatment (Periodontal Care)",
      category: "Gum Health",
      description: "Comprehensive therapy for bleeding gums, periodontitis, and deep periodontal maintenance.",
      icon: Pill
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="services" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A7E8C]/10 text-[#0A7E8C] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkle className="w-3.5 h-3.5" /> Treatments Offered
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Services Offered at Our <span className="text-[#0A7E8C]">Aundh Clinic</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            High-quality, ethical, and painless dental treatments provided under strict hygiene standards.
          </p>
        </div>

        {/* Responsive Grid Matrix for 12 Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedService(service)}
                className="group relative rounded-2xl p-6 bg-slate-50 border border-slate-200/80 hover:border-[#0A7E8C]/50 hover:bg-white hover:shadow-xl hover:shadow-[#0A7E8C]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white text-[#0A7E8C] group-hover:bg-[#0A7E8C] group-hover:text-white flex items-center justify-center shadow-sm border border-slate-200/60 group-hover:border-[#0A7E8C] transition-all duration-300 mb-4">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5 block">
                    {service.category}
                  </span>
                  
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 group-hover:text-[#0A7E8C] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#0A7E8C]">
                  <span>Consultation Details</span>
                  <div className="w-8 h-8 rounded-full bg-[#0A7E8C]/10 text-[#0A7E8C] group-hover:bg-[#0A7E8C] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                {selectedService.category}
              </span>

              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                {selectedService.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedService.description} At Dr. Chavhan’s Multispeciality Dental Clinic, all treatments are delivered using advanced painless techniques in a pristine, hygienic clinical environment.
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0A7E8C]">Ethical & Affordable Care</span>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#0A7E8C] hover:bg-[#075963] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  Book This Treatment →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
