"use client";

import React, { useState, useEffect } from "react";
import { Stethoscope, Calendar, PhoneCall } from "lucide-react";
import { ShinyButton } from "@/components/ui/magic/ShinyButton";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b border-[#D4AF37]/25 ${
        isScrolled
          ? "bg-[#05070A]/95 py-3 backdrop-blur-2xl shadow-2xl"
          : "bg-[#05070A]/70 py-5 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/80 border border-[#D4AF37]/60 text-[#F5D77F] shadow-md shadow-amber-500/10">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">DR. KOTHAWALA</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#F5D77F]">MULTISPECIALTY DENTAL</span>
              <span className="rounded bg-amber-950 px-1.5 py-0.2 text-[9px] font-bold text-[#D4AF37] border border-[#D4AF37]/40">
                2 BRANCHES
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          <a href="#specialties" className="hover:text-[#F5D77F] transition-colors">Specialties</a>
          <a href="#branches" className="hover:text-[#F5D77F] transition-colors">Nagpur Branches</a>
          <a href="#workflow" className="hover:text-[#F5D77F] transition-colors">Pathway</a>
          <a href="#reviews" className="hover:text-[#F5D77F] transition-colors">Reviews</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:9326888667"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#F5D77F] hover:underline"
          >
            <PhoneCall className="h-3.5 w-3.5" /> 9326888667
          </a>
          <ShinyButton onClick={onOpenBooking} className="h-10 text-xs px-5">
            <Calendar className="h-4 w-4 text-[#F5D77F]" /> Book Appointment
          </ShinyButton>
        </div>
      </div>
    </header>
  );
}
