"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, GraduationCap, Heart, CheckCircle2 } from "lucide-react";

export default function AboutDoctor() {
  const credentials = [
    {
      icon: Award,
      title: "Gold Medalist (ENT)",
      desc: "Awarded top honor for outstanding clinical and academic excellence in MS - ENT."
    },
    {
      icon: GraduationCap,
      title: "MBBS, MS (ENT)",
      desc: "Post-graduate specialization in Advanced Otorhinolaryngology and Head-Neck Surgery."
    },
    {
      icon: Heart,
      title: "Gentle Patient Care",
      desc: "A reputation built on accurate diagnostics, simple straightforward work, and empathetic care."
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* Background shape */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-medical-blue/20 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dr. Akshay S Suratwala Profile Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 rounded-clinical-lg bg-gradient-to-tr from-medical-blue/30 to-medical-teal/10 blur-xl pointer-events-none -z-10" />

            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-clinical-lg overflow-hidden shadow-2xl border-4 border-white group bg-medical-navy">
              <Image
                src="/clinic/dr-akshay-banner.png"
                alt="Dr. Akshay Suratwala ENT Specialist"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              {/* Overlay with gold badge indicator */}
              <div className="absolute top-4 left-4 bg-medical-gold text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Gold Medalist Surgeon
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-medical-gold block mb-0.5">Surat's Leading Consultant</span>
                <h3 className="font-serif font-bold text-xl text-slate-100 leading-snug">
                  Dr. Akshay Suratwala
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal mt-1">
                  Dedicated to restore hearing, balance, and clear breathing.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile & Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-blue text-medical-navy text-xs font-bold uppercase tracking-wider">
                About the Lead Surgeon
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-medical-navy tracking-tight leading-tight">
                Meet Dr. Akshay Suratwala
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                As a prestigious **Gold Medalist** in MS - ENT, Dr. Akshay Suratwala brings world-class surgical expertise and advanced diagnostic standards to Surat. Tanish ENT Hospital is built on a simple promise: providing **accurate diagnosis**, avoiding unnecessary clinical procedures, and practicing **honest, straightforward, and highly gentle care** for every patient.
              </p>
            </div>

            {/* Credentials Listing */}
            <div className="space-y-5">
              {credentials.map((cred, idx) => {
                const IconComponent = cred.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-medical-teal/20 hover:bg-white hover:shadow-xl transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-medical-blue/50 text-medical-navy flex items-center justify-center flex-shrink-0 border border-medical-blue">
                      <IconComponent className="w-6 h-6 text-medical-navy fill-current" />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-medical-navy">
                        {cred.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Bulletins */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="flex gap-2 items-start text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                <span>State-of-the-art diagnostic microscopes & endoscopes</span>
              </div>
              <div className="flex gap-2 items-start text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                <span>Transparent billing and honest surgical advisories</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
