"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Stethoscope, Activity, ShieldCheck, Sparkle, ArrowRight, X } from "lucide-react";

interface ServicesGridProps {
  onOpenBooking: () => void;
}

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  steps: string[];
}

export default function ServicesGrid({ onOpenBooking }: ServicesGridProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Root Canal Specialist Treatment",
      subtitle: "MDS Endodontic Speciality",
      description: "Our signature painless root canal treatments save natural tooth structure. Performed in comfortable, single-visit sessions using state-of-the-art rotary endodontic equipment.",
      icon: Stethoscope,
      steps: [
        "Advanced digital diagnostic assessment of root structures",
        "Gentle localized anesthesia using computer-controlled comfort flow",
        "Ultrasonic micro-cleaning and disinfection of infection canals",
        "Hermetic sealing followed by direct cosmetic structural capping"
      ]
    },
    {
      id: 2,
      title: "Advanced Patient Care & Diagnostics",
      subtitle: "High-Tech Treatment Room",
      description: "Equipped with pristine clinical tools, low-radiation digital dental imaging, and ergonomic clinical chair setups to deliver exceptional diagnostics.",
      icon: Activity,
      steps: [
        "High-definition intraoral camera screenings",
        "Low-radiation intraoral digital radiography",
        "Prerendered structural diagnostics for absolute clinical precision",
        "Integrated high-speed, sterile operatory procedures"
      ]
    },
    {
      id: 3,
      title: "General & Preventive Dentistry",
      subtitle: "Complete Family Oral Care",
      description: "Routine examinations, teeth cleaning & polishing, structural tooth fillings, and decay prevention procedures to maintain lifelong oral health.",
      icon: ShieldCheck,
      steps: [
        "Comprehensive oral health visual charting and gum evaluation",
        "Professional scaling and micro-polishing to remove tartar",
        "Decay prevention using advanced fluoride coatings and sealants",
        "Cosmetic restorations for damaged or chipped teeth structures"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F0FDF4]/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkle className="w-3.5 h-3.5 text-[#B8975F]" /> Care Matrix
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Specialized Dental <span className="text-[#0F766E]">Focus Areas</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Headed by expert Endodontist Dr. Aadesh Jain, delivering highly-rated specialist treatments in Nashik.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedService(service)}
                className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-[#B8975F]/40 hover:shadow-clinical-hover transition-all duration-200 ease-out cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white flex items-center justify-center p-2.5 shadow-sm border border-emerald-100/60 transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8975F] mb-1.5 block">
                    {service.subtitle}
                  </span>

                  <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-3 group-hover:text-[#0F766E] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-[#0F766E]">
                  <span>View Treatment Orientation</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#0F766E] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal Overlay */}
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
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-3">
                {selectedService.subtitle}
              </span>

              <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-4">
                {selectedService.title}
              </h3>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Step-by-step Treatment Outline:
                </h4>
                <ul className="space-y-3">
                  {selectedService.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3 items-start text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#0F766E] border border-emerald-100 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#B8975F]">100% Painless Focus</span>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D5C55] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border-b-2 border-[#B8975F] cursor-pointer"
                >
                  Book Appointment →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
