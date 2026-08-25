"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, Sparkles, UserCheck } from "lucide-react";

export default function AboutJain() {
  const points = [
    {
      icon: Award,
      title: "MDS Endodontic Specialization",
      desc: "Specially trained in advanced micro-endodontics, rotary techniques, and complex root canal anatomy."
    },
    {
      icon: ShieldCheck,
      title: "Painless Treatment Philosophy",
      desc: "Utilizes the latest localized comfort anesthesia and micro-procedures to ensure patients feel nothing."
    },
    {
      icon: Heart,
      title: "Highly Patient-Centric Care",
      desc: "Acclaimed by Nashik residents for detailed consultation, transparent advice, and comforting clinic chairside manners."
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Physician Credentials & Clinical Affiliation Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-[#042F2E] rounded-3xl p-8 border border-[#0F766E]/40 shadow-2xl text-slate-200 relative overflow-hidden flex flex-col justify-between aspect-[3/4] transition-all duration-200 hover:shadow-clinical-hover hover:border-[#B8975F]/35"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B8975F]/10 to-transparent rounded-bl-full pointer-events-none" />

            {/* Top Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8975F]">Verified Credentials</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight leading-tight">
                Dr. Aadesh Jain
              </h3>
              <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-3">
                BDS, MDS (Endodontics)
              </p>
            </div>

            {/* Middle Grid of credentials */}
            <div className="space-y-3.5 my-6 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-500 font-medium">Speciality</span>
                <span className="font-bold text-white">Endodontist & RCT Expert</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-500 font-medium">Registration</span>
                <span className="font-bold text-white">MDC Certified</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-500 font-medium">Core Focus</span>
                <span className="font-bold text-white">Single-Sitting Painless RCT</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Clinical Standards</span>
                <span className="font-bold text-emerald-400">Class-B Sterilization</span>
              </div>
            </div>

            {/* Bottom Affiliation badge */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-[11px] gap-2">
              <div className="text-slate-400">
                <span className="block font-bold text-white">Affiliations:</span>
                IDA & Indian Endodontic Society
              </div>
              <span className="text-[#B8975F] font-extrabold uppercase tracking-wide text-[9px] shrink-0 bg-[#B8975F]/10 px-2.5 py-1 rounded-full border border-[#B8975F]/20">
                MDS Specialist
              </span>
            </div>
          </motion.div>

          {/* Right Column: Profile details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4">
              <UserCheck className="w-3.5 h-3.5 text-[#B8975F]" /> Lead Director
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
              Meet Dr. Aadesh Jain <br />
              <span className="text-[#0F766E]">BDS, MDS (Endodontist)</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Dr. Aadesh Jain is a highly specialized Endodontist and Root Canal Specialist practicing in Nashik. Recognized for his precision, advanced skills, and caring behavior, Dr. Jain is committed to saving natural teeth structures painlessly using cutting-edge rotary techniques and micro-dentistry solutions.
            </p>

            {/* Core Values Points */}
            <div className="space-y-6 w-full">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F766E] flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-sm">
                      <Icon className="w-5 h-5 text-[#B8975F]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-900 leading-tight">
                        {pt.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
