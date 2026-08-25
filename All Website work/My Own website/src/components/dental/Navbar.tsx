"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Globe, PhoneCall } from "lucide-react";

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
            ? "glass-header py-3.5 shadow-sm"
            : "bg-white/90 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#0A7E8C]/20 transition-transform group-hover:scale-105 flex-shrink-0 relative">
              <Image
                src="/logo.png"
                alt="Dr. Chavhan's Dental Clinic Logo"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-base sm:text-lg text-slate-900 tracking-wide">
                Dr. Chavhan's <span className="font-bold text-[#0A7E8C]">Dental</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              Home
            </a>
            <a href="#about" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              About Us
            </a>
            <a href="#services" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              Services
            </a>
            <a href="#testimonials" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              Testimonials
            </a>
            <a href="#faqs" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              FAQs
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-[#0A7E8C] transition-colors tracking-wide">
              Contact Us
            </a>
          </nav>

          {/* Action Right */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-[#0A7E8C] hover:bg-[#075963] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 tracking-wide"
            >
              <Calendar className="w-4 h-4" />
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
            className="fixed inset-x-0 top-[65px] z-[9989] bg-white border-b border-slate-200 shadow-xl p-6 lg:hidden flex flex-col gap-4"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              Home
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              About Us
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              Services Offered
            </a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              Testimonials
            </a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              Frequently Asked Questions
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#0A7E8C] py-1.5 border-b border-slate-100">
              Contact Us
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-xl bg-[#0A7E8C] text-white font-bold text-base shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book Appointment Now
              </button>
              <a
                href="tel:8983821993"
                className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0A7E8C]" /> Call: 8983821993
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
