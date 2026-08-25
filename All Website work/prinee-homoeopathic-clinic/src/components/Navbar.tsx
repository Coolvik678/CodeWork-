"use client";

import { useState, useEffect } from "react";
import { Menu, X, Leaf, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Specialties", href: "#specialties" },
    { name: "Dr. Priya", href: "#about" },
    { name: "Apothecary", href: "#apothecary" },
    { name: "Alopecia Care", href: "#alopecia" },
    { name: "Reviews", href: "#testimonials" },
  ];

  const whatsappUrl = "https://api.whatsapp.com/send?phone=917982444157&text=Hello%20Dr.%20Priya,%20I%20was%20reading%20your%20reviews%20and%20would%20like%20to%20schedule%20a%20consultation...";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-sage-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/clinic/logo.png"
            alt="Prinee Homoeopathic Clinic Logo"
            width={36}
            height={36}
            className="rounded-xl border border-sage-200 shadow-inner group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <span className="font-serif font-extrabold text-sm sm:text-base text-sage-900 tracking-tight block leading-tight">
              PRINEE CLINIC
            </span>
            <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest block">
              The Blessing Homoeopathy
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-sage-800 hover:text-sage-600 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-xs shadow-md shadow-sage-600/10 border-b-2 border-gold-500 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 flex items-center gap-2 tracking-wide cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Book Consultation</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-sage-50 text-sage-800 border border-sage-100 hover:bg-sage-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-sage-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-extrabold text-sage-800 hover:text-sage-600 transition-colors uppercase tracking-wider py-1 border-b border-sage-50"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-xs shadow-md border-b-2 border-gold-500 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
