"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutSoni() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image / Flyer Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-[#B8975F]/10 blur-2xl pointer-events-none -z-10" />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 group">
              <Image
                src="/lotus/flyer.jpg"
                alt="Dr. Deepika Soni Clinic Flyer Info"
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8975F] block mb-0.5">
                  Senior specialist & Surgeon
                </span>
                <h3 className="font-heading font-bold text-lg leading-tight">
                  Dr. Deepika Soni, BDS, MDS
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copywriting */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#064E3B] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#B8975F]" /> Clinical Leadership
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Meet Dr. Deepika Soni <br />
              <span className="text-[#064E3B]">Lead Surgeon & Director</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Under the expert guidance of <strong>Dr. Deepika Soni (BDS, MDS, Indore)</strong>, Lotus Dental Clinic and Implant Center has become a trusted landmark for advanced oral care on Sanwer Road. Dr. Soni specializing in <strong>complex dental implants, painless tooth extractions, and cosmetic smile designs</strong>, ensures every procedure is executed with surgical precision and optimal patient comfort.
            </p>

            {/* Checklist of clinical protocols */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8975F]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">MDS Specialization</h4>
                  <p className="text-xs text-slate-500">Advanced diagnostic & surgical care</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8975F]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">Painless RCT Technology</h4>
                  <p className="text-xs text-slate-500">Root Canal Treatment in minimum sessions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8975F]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">100% Sterile Protocol</h4>
                  <p className="text-xs text-slate-500">B-Class autoclave sterilization</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-3.5 h-3.5 text-[#B8975F]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">Gentle Pediatric Care</h4>
                  <p className="text-xs text-slate-500">Specialized child-friendly dental care</p>
                </div>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-0.5">
                  Indore Main Branch
                </span>
                <p className="text-xs font-bold text-slate-950">A-60, Sanwer Rd, near Sidhhant Hotel, Jakhya</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-[10px] font-bold tracking-wider uppercase flex-shrink-0">
                Women-Owned
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
