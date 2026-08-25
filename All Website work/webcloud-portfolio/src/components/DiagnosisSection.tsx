import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, CheckCircle2, XCircle, MessageCircle } from 'lucide-react';

interface DiagnosisSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ onOpenWhatsApp }) => {
  return (
    <section id="diagnosis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative text-white">
      <div className="p-8 md:p-14 rounded-3xl clinical-glass shadow-2xl space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-mono">
            <Stethoscope className="w-4 h-4" />
            <span>THE CLINICAL DIAGNOSIS & WEBCLOUD INITIATIVE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
            Why Standard Doctor Websites Fail <br />
            <span className="text-emerald-400 font-sans font-bold">
              vs. The Webcloud Initiative
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            Most doctor websites are slow, generic templates that fail to build patient trust. Webcloud's initiative is simple: we engineer patient-centric platforms with sub-second speeds, interactive procedure matrices, and direct WhatsApp booking dispatches.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Sites */}
          <div className="p-8 rounded-2xl bg-black/60 border border-red-500/30 space-y-4">
            <div className="flex items-center gap-3 text-red-400 font-mono font-bold text-sm uppercase">
              <XCircle className="w-5 h-5" />
              <span>Standard Doctor Website Failures</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Slow 4+ second load times causing high patient bounce rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Cluttered forms that confuse elderly patients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Zero procedure clarity or treatment matrices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Dry, outdated designs that fail to instill clinical trust</span>
              </li>
            </ul>
          </div>

          {/* Webcloud Initiative */}
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-400 font-mono font-bold text-sm uppercase">
              <CheckCircle2 className="w-5 h-5" />
              <span>The Webcloud Clinical Initiative</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Sub-second 0.6s blazing speed on React & Vite</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>One-tap direct WhatsApp emergency & appointment booking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Interactive procedure guides for implants, orthodontics & cosmetic dental</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Verified Google 5-Star review accelerators & local SEO dominance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Callout */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-white">Ready to diagnose your clinic's digital presence?</p>
            <p className="text-xs text-slate-400">We deliver complete custom doctor websites in 3 to 7 days.</p>
          </div>
          <button
            onClick={() => onOpenWhatsApp('Hi Webcloud! I want a clinical diagnosis for my clinic website.')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950/20" />
            <span>Get Free Clinic Diagnosis</span>
          </button>
        </div>
      </div>
    </section>
  );
};
