"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from "lucide-react";

export default function ContactFooter() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      // Calculate IST time (UTC + 5:30)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      
      const day = istTime.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeDecimal = hours + minutes / 60;

      if (day === 0) {
        // Sunday is closed
        setIsOpen(false);
      } else {
        // Mon-Sat: 9:00 AM to 8:30 PM (20.5 hours)
        setIsOpen(timeDecimal >= 9.0 && timeDecimal <= 20.5);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-24 pb-12 relative overflow-hidden">
      
      {/* Background glowing gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Contact details and Location Map */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-slate-800">
          
          {/* Left Column: Hospital Identity & Timings (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-medical-gold block mb-1">
                Clinical Headquarters
              </span>
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                Tanish ENT Hospital
              </h3>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">
                Dr. Akshay Suratwala (Gold Medalist Surgeon)
              </p>
            </div>

            {/* Timings with Live Status Badge */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-medical-teal" /> Hospital OPD Hours
                </span>
                
                {/* Live Open/Closed Status Badge */}
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-inner ${
                    isOpen
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {isOpen ? (
                    <span className="relative flex h-2.5 w-2.5 mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-1.5" />
                  )}
                  <span>{isOpen ? "Open Now" : "Closed Now"}</span>
                </span>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monday – Saturday</span>
                  <span className="text-slate-200">9:00 AM – 8:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sunday</span>
                  <span className="text-rose-400 font-bold uppercase">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Contact buttons */}
            <div className="space-y-4">
              <a
                href="tel:09510650570"
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-white font-bold text-sm border border-slate-800 transition-colors"
              >
                <Phone className="w-5 h-5 text-medical-teal flex-shrink-0" />
                <span>Call OPD Desk: 095106 50570</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-400 leading-relaxed font-normal">
                <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0" />
                <span>Seamless Cashless Insurance Desk available at the reception.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Address (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group bg-slate-800">
              {/* Google Maps Iframe centered on Green Elina, Anand Mahal Rd, Adajan, Surat */}
              <iframe
                title="Tanish ENT Hospital Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.866160037628!2d72.79373247596041!3d21.197479782574045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e3805aaaaab%3A0x6e2dfb14b2d56a2f!2sGreen%20Elina%2C%20Anand%20Mahal%20Rd%2C%20above%20ICICI%20Bank%2C%20near%20Sneh%20Sankul%20Wadi%2C%20Giriraj%20Society%2C%20Adajan%2C%20Surat%2C%20Gujarat%20395009!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
              
              <a
                href="https://maps.google.com/?q=Tanish+ENT+Hospital+Dr+Akshay+Suratwala+Green+Elina+Adajan+Surat"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 bg-medical-navy hover:bg-slate-800 text-white text-xs font-bold p-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xl border-b border-medical-gold/30"
              >
                <Navigation className="w-4 h-4 text-medical-gold" />
                <span>Open in Google Maps for Navigation</span>
              </a>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-medical-teal flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-white mb-0.5">
                  Tanish ENT Hospital Address:
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  332, <strong className="text-white font-extrabold">3rd Floor, Green Elina (Above ICICI Bank)</strong>, Anand Mahal Rd, near Sneh Sankul Wadi, Giriraj Society, Adajan, Surat, Gujarat 395009
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyrights and Navigation Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Tanish ENT Hospital Surat. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About Dr. Akshay</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#reviews" className="hover:text-white">Patient Reviews</a>
            <a href="#contact" className="hover:text-white">Contact Us</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
