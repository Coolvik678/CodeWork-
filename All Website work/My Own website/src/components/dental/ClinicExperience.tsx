"use client";

import { motion } from "framer-motion";
import { UserCheck, Stethoscope, ShieldCheck, Smile, Sparkles, CheckCircle2, Award, HeartHandshake } from "lucide-react";
import Image from "next/image";

export default function ClinicExperience() {
  const whyChooseUs = [
    "Experienced and caring dentist",
    "Modern & painless dental procedures",
    "Affordable and transparent treatment",
    "Clean, hygienic, patient-friendly clinic",
    "Dental care for all age groups"
  ];

  return (
    <section id="about" className="py-28 lg:py-36 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: About Dr. Chavhan's Clinic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-[#0A7E8C] text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="w-3.5 h-3.5" /> About The Clinic
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Trusted Dental Care Center in <span className="text-[#0A7E8C]">Aundh, Pune</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                <strong>Dr. Chavhan’s Multispeciality Dental Clinic</strong> is a trusted dental care center located in Chanchal Apartment, near Bank of Maharashtra, Sindh Society, Aundh, Pune.
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                Under the expert guidance of Dr. Gurudeo Shamrao Chavhan (BDS, MDS), the clinic focuses on patient comfort, advanced painless technology, and strict sterilization protocols to deliver ethical, affordable care for all age groups.
              </p>
            </div>

            {/* Real Clinic Photos Showcase (Grid of 3 actual images) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              
              {/* Image 1: Consultation Suite Desk */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md group border border-white/40">
                <Image
                  src="/clinic/consultation-desk.jpg"
                  alt="Dr. Chavhan Consultation Desk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded-lg text-center backdrop-blur-sm">
                  Executive Suite
                </span>
              </div>

              {/* Image 2: Night Entrance Sign */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md group border border-white/40">
                <Image
                  src="/clinic/clinic-sign-night.jpg"
                  alt="Dr. Chavhan Clinic Signboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded-lg text-center backdrop-blur-sm">
                  Clinic Entrance
                </span>
              </div>

              {/* Image 3: Endodontic Rubber Dam */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-md group border border-white/40">
                <Image
                  src="/clinic/clinical-procedure.jpg"
                  alt="Specialized Endodontic Care"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded-lg text-center backdrop-blur-sm">
                  Painless Procedure
                </span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Why Choose Us Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Patient Excellence
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-6">
                Why Choose Dr. Chavhan's Clinic?
              </h3>

              <div className="space-y-4">
                {whyChooseUs.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4 hover:border-[#0A7E8C]/30 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0A7E8C]/10 text-[#0A7E8C] group-hover:bg-[#0A7E8C] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-bold text-slate-800 text-sm sm:text-base">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-[#0A7E8C]">
                  <ShieldCheck className="w-4 h-4" /> 100% Ethical Practice
                </span>
                <a href="https://maps.app.goo.gl/WG3H85yBkr4neGrb9?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A7E8C] underline">
                  Sindh Society, Aundh, Pune
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
