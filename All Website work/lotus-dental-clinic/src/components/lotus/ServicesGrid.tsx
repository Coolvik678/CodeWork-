"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Stethoscope, Activity, Sparkle, ShieldCheck, ArrowRight, X } from "lucide-react";

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
      title: "Dental Implants & Restorations",
      subtitle: "Implant Center Specialization",
      description: "Permanent tooth replacements using premium biocompatible titanium implants, restoring complete chewing strength and aesthetic alignment.",
      icon: Activity,
      steps: [
        "Digital 3D CBCT diagnostic scanning to evaluate bone density",
        "Computer-guided sterile surgical implant placement",
        "Healing period (osseointegration) for secure bone bonding",
        "Placement of custom high-translucency Zirconia crown"
      ]
    },
    {
      id: 2,
      title: "Root Canal Treatment (RCT)",
      subtitle: "Painless Endodontics",
      description: "Advanced single-sitting precision therapy to save infected teeth, eliminate nerve pain, and restore root structure.",
      icon: Stethoscope,
      steps: [
        "High-definition digital X-ray to assess nerve infection",
        "Painless localized anesthesia for absolute comfort",
        "Micro-cleaning and shaping of root canals",
        "Hermetic sealing followed by core build-up and ceramic crown capping"
      ]
    },
    {
      id: 3,
      title: "Cosmetic Smile Designing",
      subtitle: "Aesthetic Dentistry",
      description: "Digital smile analysis, customized veneers, laser whitening, and dental laminates designed to build your dream smile.",
      icon: Sparkle,
      steps: [
        "Aesthetic smile photography and digital shape analysis",
        "Teeth cleaning and stain polishing preparation",
        "Custom design trial to preview your smile",
        "Permanent bonding of thin, high-durability porcelain veneers"
      ]
    },
    {
      id: 4,
      title: "General & Preventive Checkups",
      subtitle: "Family Dental Care",
      description: "Comprehensive oral health checkups, scaling, fluoride treatments, and gentle cavity prevention fillings.",
      icon: ShieldCheck,
      steps: [
        "Visual charting check of all teeth and gums",
        "Ultrasonic scaling to remove plaque and tartar build-up",
        "Detailed flossing and medical rinse application",
        "Customized home hygiene strategy guide for preventive care"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkle className="w-3.5 h-3.5 text-[#B8975F]" /> Specialized Treatments
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Precision Dental <span className="text-[#064E3B]">Services</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered with modern equipment and strict sterilization protocols by our specialist consultants.
          </p>
        </div>

        {/* 2x2 Services Matrix */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedService(service)}
                className="group p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-[#B8975F]/60 hover:shadow-xl hover:shadow-[#064E3B]/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white flex items-center justify-center p-2.5 shadow-sm border border-emerald-100/60 transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8975F] mb-1.5 block">
                    {service.subtitle}
                  </span>

                  <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-3 group-hover:text-[#064E3B] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-[#064E3B]">
                  <span>View Step-by-Step Orientation</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#064E3B] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal for Step-by-Step Description */}
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

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-3">
                {selectedService.subtitle}
              </span>

              <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-4">
                {selectedService.title}
              </h3>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Step-by-Step Treatment Orientation:
                </h4>
                <ul className="space-y-3">
                  {selectedService.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3 items-start text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#064E3B] border border-emerald-100 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#B8975F]">Painless Precision</span>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 border-b-2 border-[#B8975F] cursor-pointer"
                >
                  Book Appointment Now →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
