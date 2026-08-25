import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFABProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ onOpenWhatsApp }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => onOpenWhatsApp('Hi Webcloud! I would like to consult about a new website.')}
        className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-slate-950/20" />
        <span className="hidden sm:inline font-sans font-bold tracking-tight">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
};
