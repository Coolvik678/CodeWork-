"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Activity, CheckCircle2 } from "lucide-react";

export default function Gallery() {
  const safetyProtocols = [
    {
      id: 1,
      title: "Class-B Vacuum Autoclaving",
      subtitle: "EN 13060 Standard",
      description: "Our clinic utilizes advanced Class-B autoclaves. All handpieces and surgical instruments undergo dynamic vacuum-pulse sterilization cycles to guarantee 100% micro-organism elimination.",
      icon: Activity,
      badge: "Thermal Precision"
    },
    {
      id: 2,
      title: "Biological Indicator Monitoring",
      subtitle: "ISO 11138 Verification",
      description: "We regularly verify autoclave efficiency using biological indicators. This is the highest standard in medical hygiene control, ensuring every cycle is certified sterile.",
      icon: Shield,
      badge: "ISO Certified"
    },
    {
      id: 3,
      title: "Sealed Sterilization Pouches",
      subtitle: "Freshness Opened In Front Of You",
      description: "Instruments are packed and sealed in medical-grade paper-film rolls. Every pack remains sealed and is opened directly in front of you at the start of your procedure.",
      icon: CheckCircle2,
      badge: "Sealed & Safe"
    },
    {
      id: 4,
      title: "Single-Use Bio-Safe Consumables",
      subtitle: "Zero Cross-Infection Risk",
      description: "All patient cups, bibs, syringe tips, suction devices, and gloves are strictly single-use disposables, discarded immediately after use via secure bio-waste channels.",
      icon: Sparkles,
      badge: "Disposables Focus"
    }
  ];

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-24 left-10 w-80 h-80 rounded-full bg-[#0F766E]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-10 w-80 h-80 rounded-full bg-[#B8975F]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100/60">
            <Shield className="w-3.5 h-3.5 text-[#B8975F]" /> Sterile Assurance
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-4">
            Our Sterilization & <span className="text-[#0F766E]">Safety Protocols</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We follow strict international guidelines to ensure 100% infection control and absolute treatment hygiene for every dental and root canal session.
          </p>
        </div>

        {/* 4-Card Structured Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {safetyProtocols.map((protocol, idx) => {
            const Icon = protocol.icon;
            return (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-200/60 hover:border-[#B8975F]/40 hover:bg-white hover:shadow-clinical-hover transition-all duration-200 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white flex items-center justify-center p-2.5 border border-emerald-100/60 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#0F766E] text-[10px] font-extrabold tracking-wider uppercase">
                      {protocol.badge}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8975F] mb-1.5 block">
                    {protocol.subtitle}
                  </span>

                  <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-3 group-hover:text-[#0F766E] transition-colors">
                    {protocol.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {protocol.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/50 flex items-center gap-2 text-xs font-bold text-[#0F766E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Safety Protocol Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
