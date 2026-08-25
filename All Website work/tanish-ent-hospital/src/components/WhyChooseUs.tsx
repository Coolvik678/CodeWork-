"use client";

import { motion } from "framer-motion";
import { ShieldAlert, MapPin, BadgeDollarSign, HelpCircle, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Stress-Free Cashless Insurance",
      desc: "We provide seamless cashless hospitalization facilities. Our dedicated desk handles all the TPA approvals and paperwork directly, making your billing completely stress-free."
    },
    {
      icon: MapPin,
      title: "Accessible Main-Road Location",
      desc: "Conveniently located on Anand Mahal Road in Adajan, our clinic offers road-touch accessibility, elevator service, clean sterile environments, and modern facilities."
    },
    {
      icon: BadgeDollarSign,
      title: "Affordable & Honest Care",
      desc: "We are committed to providing simple, straightforward medical work. Dr. Akshay Suratwala advises surgeries only when absolute necessary, charging highly reasonable rates."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* Background shapes */}
      <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-medical-blue/10 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-blue text-medical-navy text-xs font-bold uppercase tracking-wider border border-slate-100">
            Why Choose Us
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-medical-navy tracking-tight">
            Designed Around Patient Comfort
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We focus on honest advice, simplified paperwork, and a stress-free hospital experience for every family.
          </p>
        </div>

        {/* 3-Column Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="p-8 rounded-clinical-lg bg-slate-50 border border-slate-100 hover:border-medical-teal/25 hover:bg-white hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-medical-blue text-medical-navy flex items-center justify-center border border-medical-blue group-hover:bg-medical-navy group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-medical-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100/60 flex items-center gap-1.5 text-xs text-medical-teal font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-medical-mint" />
                  <span>Verified Patient Benefit</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
