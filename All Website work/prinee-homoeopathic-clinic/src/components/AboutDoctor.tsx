"use client";

import { motion } from "framer-motion";
import { Award, Heart, ClipboardCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutDoctor() {
  const credentials = [
    {
      icon: Award,
      title: "Academic Background",
      detail: "B.H.M.S (Bachelor of Homoeopathic Medicine and Surgery)"
    },
    {
      icon: ClipboardCheck,
      title: "Clinical Experience",
      detail: "Ex. Junior Resident, SHMC Govt. of NCT of Delhi"
    },
    {
      icon: Heart,
      title: "Holistic Counseling",
      detail: "Advocate of simple diet, lifestyle modifications, and mental well-being"
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* Subtle organic shape decoration */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-sage-50/60 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Doctor Desk Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative aspect-[3/4] sm:aspect-square lg:aspect-[3/4] rounded-clinical-lg overflow-hidden shadow-2xl border border-sage-100/60 bg-sage-50/30 group"
          >
            <Image
              src="/clinic/doctor-desk.png"
              alt="Dr. Priya Puri Consultation Desk & Stethoscope"
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-950/40 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 text-white z-10 bg-sage-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">Consultation Desk</span>
              <p className="text-xs text-slate-100 font-medium leading-relaxed">
                Authentic diagnostic instruments, stethoscope, and personalized clinical guidance.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Bio details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-50 text-sage-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Lead Practitioner
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-sage-900 tracking-tight leading-tight">
                Meet Dr. Priya Puri
              </h2>
              <p className="text-gold-500 font-serif font-bold text-sm tracking-wide">
                B.H.M.S | Ex. Jr. Resident, SHMC Govt. of NCT of Delhi
              </p>
            </div>

            <div className="space-y-6 text-sage-900/80 text-sm sm:text-base leading-relaxed">
              <p>
                Dr. Priya Puri is widely recognized in New Delhi as an exceptionally patient listener and empathetic healer. She firmly believes that true cure is not about suppressing symptoms with heavy medications, but understanding the patient’s complete mental, emotional, and physical ecosystem.
              </p>
              <p className="font-semibold text-sage-800 italic border-l-4 border-gold-500 pl-4 bg-sage-50/50 py-3 rounded-r-xl">
                &ldquo;Every patient has a unique story. Healing begins by calmly listening to that story and formulating a path that incorporates simple, practical diet and lifestyle adjustments.&rdquo;
              </p>
            </div>

            {/* Structured Credentials List */}
            <div className="space-y-4 pt-4 border-t border-sage-100">
              {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center flex-shrink-0 border border-sage-100/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-sage-900">{cred.title}</h4>
                      <p className="text-xs sm:text-sm text-sage-600 mt-0.5 leading-normal">{cred.detail}</p>
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
