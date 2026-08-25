import React from 'react';
import { MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterSectionProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenWhatsApp }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12 rounded-t-[40px] md:rounded-t-[60px] border-t border-white/10 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Banner */}
        <div className="flex flex-col items-start gap-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Idea → Clinical Reality</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-tight text-white">
            Ready to upgrade your doctor or clinic website?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-sans font-light max-w-2xl">
            Connect directly with Webcloud's healthcare web design team on WhatsApp.
          </p>

          <button
            onClick={() => onOpenWhatsApp('Hi Webcloud! I want to discuss a new website for my clinic/business.')}
            className="group flex items-center gap-3 px-8 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-2xl cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950/20" />
            <span>Start WhatsApp Consultation Now</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Footer Legal & Links */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-xs font-mono text-slate-400">
          <div className="md:col-span-6 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                W
              </div>
              <span className="font-sans font-bold text-lg text-white tracking-tight">
                Webcloud
              </span>
            </div>
            <p className="text-slate-400">
              © {new Date().getFullYear()} Webcloud Studio. All rights reserved. Crafting high-converting doctor & dental clinic websites.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-wrap md:justify-end gap-6 text-slate-300">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenWhatsApp('Hi Webcloud! Direct inquiry via website footer.');
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp Support
            </a>
            <a href="#diagnosis" className="hover:text-white transition-colors">
              Diagnosis
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Teeth Showcase
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing Plans
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
