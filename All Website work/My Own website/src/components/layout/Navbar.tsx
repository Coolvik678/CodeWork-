"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // solid background when scrolled past 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-in-out font-heading",
          isScrolled
            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105 drop-shadow-md">
              <Image src="/logo.png" alt="PixelCraft Studios Logo" fill className="object-contain" priority />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              PixelCraft <span className="text-primary">Studios</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#services" className="text-gray-700 hover:text-primary font-medium transition-colors">Services</Link>
            <Link href="#portfolio" className="text-gray-700 hover:text-primary font-medium transition-colors">Portfolio</Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-primary font-medium transition-colors">Testimonials</Link>
            <Link 
              href="#contact" 
              className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-[#239996] transition-all shadow-md hover:shadow-lg"
            >
              Start Project
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gray-900" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-[9998] bg-white transition-transform duration-300 lg:hidden flex flex-col items-center justify-center space-y-8",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading font-bold text-gray-900 hover:text-primary">Services</Link>
        <Link href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading font-bold text-gray-900 hover:text-primary">Portfolio</Link>
        <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading font-bold text-gray-900 hover:text-primary">Testimonials</Link>
        <Link 
          href="#contact" 
          onClick={() => setMobileMenuOpen(false)} 
          className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg mt-4 shadow-lg active:scale-95 transition-transform"
        >
          Start Project
        </Link>
      </div>
    </>
  );
}
