"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Heart, Award } from "lucide-react";

export default function Highlights() {
  const items = [
    {
      icon: Star,
      iconColor: "text-amber-500 fill-current",
      title: "5.0 ★ Highly Rated",
      desc: "Based on verified patient Google Maps reviews"
    },
    {
      icon: Award,
      iconColor: "text-[#B8975F]",
      title: "Specialist Endodontist",
      desc: "Advanced clinical specialization in complex root canals"
    },
    {
      icon: ShieldCheck,
      iconColor: "text-[#0F766E]",
      title: "100% Painless Focus",
      desc: "Gentle treatments with modern single-sitting precision"
    }
  ];

  return (
    <section className="py-12 bg-[#0F766E] text-white relative overflow-hidden border-t-4 border-[#B8975F]">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-[#0F766E] to-teal-950 opacity-90 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-lg text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 leading-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
