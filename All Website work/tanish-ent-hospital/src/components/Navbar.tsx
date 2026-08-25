"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Calendar, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Dr. Akshay", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-inner group-hover:scale-105 transition-all duration-300 relative flex-shrink-0 bg-white">
            <Image
              src="/clinic/logo.png"
              alt="Tanish ENT Hospital Logo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <span className="font-serif font-extrabold text-sm sm:text-base text-medical-navy tracking-tight block leading-tight">
              TANISH ENT
            </span>
            <span className="text-[9px] font-bold text-medical-teal uppercase tracking-widest block">
              Hospital | Surat
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-medical-navy transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Trigger */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:09510650570"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-medical-navy transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-medical-teal" />
            <span>095106 50570</span>
          </a>
          
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-medical-navy hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase border-b-2 border-medical-gold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="tel:09510650570"
            className="w-9 h-9 rounded-xl bg-medical-blue/30 text-medical-navy flex items-center justify-center border border-medical-blue/60"
            aria-label="Call Hospital"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg absolute top-full left-0 right-0"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold text-slate-700 hover:text-medical-navy border-b border-slate-50 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:09510650570"
                  className="w-full py-3 rounded-xl border border-slate-200 text-center font-bold text-sm text-slate-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-medical-teal" /> Call 095106 50570
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 rounded-xl bg-medical-navy text-white text-center font-bold text-sm border-b-2 border-medical-gold"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
