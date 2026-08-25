import React from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS, CUSTOM_ENTERPRISE_INFO } from '../data/pricing';
import { CheckCircle2, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenWhatsApp }) => {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>TRANSPARENT INVESTMENT PLANS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
          Choose a plan that fits your practice
        </h2>
        <p className="text-base sm:text-lg text-slate-300 font-sans font-light">
          Fixed-price, high-value web packages with zero hidden fees. Built to turn visitors into confirmed patients.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {PRICING_PLANS.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white shadow-2xl border-2 border-emerald-400'
                : 'bg-slate-900/90 text-white border border-white/15 shadow-xl'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-emerald-500 text-slate-950 shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="mb-6 pt-2">
                <h3 className="font-serif text-2xl font-normal text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mt-3">
                  <span className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-emerald-400">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm font-sans font-light leading-relaxed text-slate-300">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 py-6 border-t border-white/10">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Included Package Features:
                </p>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span className="text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenWhatsApp(plan.whatsappMessage)}
              className={`mt-8 w-full py-4 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                plan.popular
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-white text-slate-950 hover:bg-slate-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-slate-950/20" />
              <span>{plan.ctaText}</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Custom Enterprise Consultation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-black text-white border border-emerald-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-3 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke 3D Enterprise Level</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal leading-tight text-white">
            {CUSTOM_ENTERPRISE_INFO.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed">
            {CUSTOM_ENTERPRISE_INFO.description}
          </p>
        </div>

        <button
          onClick={() => onOpenWhatsApp(CUSTOM_ENTERPRISE_INFO.whatsappMessage)}
          className="w-full lg:w-auto shrink-0 px-8 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950/20" />
          <span>{CUSTOM_ENTERPRISE_INFO.ctaText}</span>
        </button>
      </motion.div>
    </section>
  );
};
