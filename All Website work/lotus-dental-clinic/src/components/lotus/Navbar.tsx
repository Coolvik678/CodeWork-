"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md py-3 shadow-md border-b border-slate-200/50"
            : "bg-white/80 backdrop-blur-sm py-4.5 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          
          {/* Clinic Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center border border-[#064E3B]/10 transition-transform group-hover:scale-105 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#B8975F]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base sm:text-lg text-[#064E3B] tracking-tight leading-none">
                LOTUS DENTAL
              </span>
              <span className="text-[10px] font-bold text-[#B8975F] tracking-wider uppercase mt-1">
                Clinic & Implant Center
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-slate-700 hover:text-[#064E3B] transition-colors tracking-wide">
              Home
            </a>
            <a href="#about" className="text-sm font-bold text-slate-700 hover:text-[#064E3B] transition-colors tracking-wide">
              Meet Dr. Soni
            </a>
            <a href="#services" className="text-sm font-bold text-slate-700 hover:text-[#064E3B] transition-colors tracking-wide">
              Services
            </a>
            <a href="#testimonials" className="text-sm font-bold text-slate-700 hover:text-[#064E3B] transition-colors tracking-wide">
              Reviews
            </a>
            <a href="#contact" className="text-sm font-bold text-slate-700 hover:text-[#064E3B] transition-colors tracking-wide">
              Contact & Hours
            </a>
          </nav>

          {/* Action Right */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white font-extrabold text-xs shadow-md border-b-2 border-[#B8975F] hover:scale-102 active:scale-98 transition-all flex items-center gap-2 tracking-wide cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#B8975F]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-[9989] bg-white border-b border-slate-200 shadow-2xl p-6 lg:hidden flex flex-col gap-4"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-800 hover:text-[#064E3B] py-2 border-b border-slate-100">
              Home
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-800 hover:text-[#064E3B] py-2 border-b border-slate-100">
              Meet Dr. Soni
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-800 hover:text-[#064E3B] py-2 border-b border-slate-100">
              Services
            </a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-800 hover:text-[#064E3B] py-2 border-b border-slate-100">
              Reviews
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-800 hover:text-[#064E3B] py-2 border-b border-slate-100">
              Contact & Hours
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-xl bg-[#064E3B] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 border-b-2 border-[#B8975F]"
              >
                <Calendar className="w-4 h-4 text-[#B8975F]" /> Book Appointment Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
