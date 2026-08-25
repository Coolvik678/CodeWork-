import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

interface GrowthSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const GrowthSection: React.FC<GrowthSectionProps> = ({ onOpenWhatsApp }) => {
  const capabilities = [
    {
      num: '01',
      title: 'Sub-Second Speed Architecture',
      icon: Zap,
      desc: 'Built on React and Vite for blazing fast page loads under 0.6 seconds, ensuring minimal patient bounce rates on mobile networks.',
      items: ['Sub-second page renders', 'Mobile-first optimization', 'Zero framework bloat']
    },
    {
      num: '02',
      title: 'Interactive Procedure Matrices',
      icon: Layers,
      desc: 'Clear visual guides explaining complex procedures (Dental Implants, Orthodontics, Smile Whitening) so patients book with confidence.',
      items: ['Procedure breakdowns', 'Before & After smile gallery', 'Cost transparency']
    },
    {
      num: '03',
      title: 'Direct WhatsApp Booking Funnel',
      icon: MessageCircle,
      desc: 'Pre-formatted WhatsApp messages dispatched directly to your clinic desk for instant appointment confirmation.',
      items: ['1-Tap WhatsApp CTA', 'Pre-filled patient details', 'Emergency fast-track']
    },
    {
      num: '04',
      title: 'Google Maps & Review Accelerators',
      icon: MapPin,
      desc: 'Integrated Google 5-Star review showcases and structured local schema to dominate local dental search results.',
      items: ['Google 5-Star review feed', 'Interactive clinic map', 'Local SEO schema']
    }
  ];

  return (
    <section id="growth" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative text-white">
      <div className="p-8 md:p-14 rounded-3xl clinical-glass shadow-2xl space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono">
            <Zap className="w-4 h-4" />
            <span>CAPABILITIES & DENTAL GROWTH ENGINE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
            Built to Turn Website Visitors into Chairside Patients
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            We don't build passive online brochures. We design high-converting clinical growth engines tailored to scale your dental practice.
          </p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-black/60 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 space-y-4 shadow-lg group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg">
                    {cap.num}
                  </div>
                  <Icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>

                <h3 className="font-serif text-2xl font-normal text-white group-hover:text-emerald-400 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed">
                  {cap.desc}
                </p>

                <div className="pt-3 space-y-2 border-t border-white/10">
                  {cap.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-white/10 flex justify-center">
          <button
            onClick={() => onOpenWhatsApp('Hi Webcloud! I want to inquire about website capabilities for my dental clinic.')}
            className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950/20" />
            <span>Consult Webcloud Capabilities on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};
