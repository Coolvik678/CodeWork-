"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Users2, Award, CheckCircle, Stethoscope, Sparkles, UserCheck } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const directors = [
    {
      name: "Dr. Abrar Kothawala",
      role: "Lead Dental Surgeon & Implantologist",
      experience: "15+ Years Clinical Excellence",
      specialty: "Dental Implants & Complex Oral Surgery",
      badge: "BNI Crorepati Club Member",
      image: "/kothawala/dr-abrar.jpg"
    },
    {
      name: "Dr. Khadeja Kothawala",
      role: "Co-Director & Senior Aesthetic Consultant",
      experience: "15+ Years Clinical Care",
      specialty: "Cosmetic Dentistry & Pediatric Care",
      badge: "Master Consultant",
      image: "/kothawala/chair-blue.jpg"
    }
  ];

  const coreValues = [
    {
      icon: Cpu,
      title: "Advanced Equipment",
      description: "Utilizing cutting-edge modern dental techniques, digital imaging, and high-precision operatory chairs."
    },
    {
      icon: ShieldCheck,
      title: "Strict Sterilization",
      description: "Absolute priority on 100% hygiene, UV sterilization chambers, and clinical safety protocols."
    },
    {
      icon: Users2,
      title: "Multispecialty Team",
      description: "A combined force of 7 specialist consultants under one roof ensuring complete oral healthcare."
    }
  ];

  return (
    <section id="about" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        
        {/* About Section Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Established 2010
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              A Truly Multi-Specialty <span className="text-[#0D9488]">Dental Clinic</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Headed by renowned Dental Surgeons and Implantologists <strong>Dr. Abrar Kothawala</strong> & <strong>Dr. Khadeja Kothawala</strong> with over 15+ years of clinical excellence, backed by a highly trained, dedicated nursing staff.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-extrabold text-lg">
                  15+
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">Years Clinical</h4>
                  <p className="text-xs text-slate-500">Excellence</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center font-extrabold text-lg">
                  7
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">Specialist</h4>
                  <p className="text-xs text-slate-500">Consultants</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D9488]/20 rounded-full blur-3xl pointer-events-none" />
              
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Clinical Creed
              </span>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                "Dentistry is TeamWork"
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                At Dr. Kothawala's Dental Cure & Care Center, complex treatments like implants, orthodontics, and smile designs are collaboratively planned by specialized experts to deliver flawless, long-lasting clinical results.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle className="w-4 h-4" /> Patient-First Ethics
                </span>
                <span>Dr. Kothawala Care Center</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Meet the Directors Featurette (Clean 2-Column Layout) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-3">
              <UserCheck className="w-3.5 h-3.5" /> Leadership & Expertise
            </div>
            <h3 className="font-heading font-extrabold text-3xl text-slate-900 tracking-tight">
              Meet the Directors
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {directors.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#0D9488]/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 group"
              >
                <div className="relative w-28 h-36 rounded-2xl overflow-hidden bg-slate-900 shadow-md flex-shrink-0">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <span className="px-2.5 py-1 rounded-full bg-teal-100 text-[#0D9488] text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                    {doc.badge}
                  </span>
                  <h4 className="font-heading font-extrabold text-xl text-slate-900 leading-tight">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-[#0D9488] font-bold">{doc.role}</p>
                  <p className="text-xs text-slate-500 font-medium">{doc.experience}</p>
                  <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
                    🎯 {doc.specialty}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 Animated Core Value Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#0D9488]/40 hover:shadow-xl hover:shadow-[#0D9488]/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white flex items-center justify-center shadow-md border border-slate-200/60 transition-colors duration-300 mb-6">
                  <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                </div>

                <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-3 group-hover:text-[#0D9488] transition-colors">
                  {value.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
