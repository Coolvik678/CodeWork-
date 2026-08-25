import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsApp }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Diagnosis', href: '#diagnosis' },
    { name: 'Teeth Showcase', href: '#portfolio' },
    { name: 'Capabilities', href: '#growth' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-3 md:px-6 md:py-3.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'clinical-glass shadow-2xl border border-white/20 backdrop-blur-xl'
            : 'bg-slate-900/80 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand Emblem */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm tracking-tight group-hover:scale-105 transition-transform shadow-md">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base md:text-lg tracking-tight text-white leading-none">
              Webcloud
            </span>
            <span className="text-[9px] uppercase font-mono text-emerald-400 tracking-wider">
              Clinical 3D Studio
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenWhatsApp('Hi Webcloud! I want to consult about a website for my clinic/business.')}
            className="group hidden sm:inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-slate-950/20" />
            <span>Connect on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-white/15 p-6 shadow-2xl z-50 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWhatsApp('Hi Webcloud! I want to consult about a website for my clinic/business.');
            }}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 text-sm font-bold shadow-lg active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950/20" />
            <span>Connect on WhatsApp</span>
          </button>
        </div>
      )}
    </header>
  );
};
