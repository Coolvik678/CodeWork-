"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileCTAStickyBar() {
  const whatsappUrl = "https://wa.me/919510650570?text=Hello%20Dr.%20Akshay,%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tanish%20ENT%20Hospital...";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-45 md:hidden p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] flex gap-3">
      
      {/* Phone CTA */}
      <a
        href="tel:09510650570"
        className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200 transition-colors"
      >
        <Phone className="w-4 h-4 text-medical-teal" />
        <span>Call OPD</span>
      </a>

      {/* WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm border-b-2 border-emerald-600 transition-colors"
      >
        <MessageCircle className="w-4.5 h-4.5 fill-current" />
        <span>WhatsApp Book</span>
      </a>

    </div>
  );
}
