"use client";

import { MapPin, Phone, Clock, ShieldCheck, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#064E3B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8975F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Full-Scale Embedded Map Section */}
        <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-16 relative bg-slate-950">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.625345719363!2d75.83403377604473!3d22.816353923985794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630325d7426177%3A0xe543eb3c4d5d3b66!2sSanwer%20Rd%2C%20Madhya%20Pradesh%20453555!5e0!3m2!1sen!2sin!4v1782815600000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location for Lotus Dental Clinic"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          ></iframe>
        </div>

        {/* 3-Column Footer Layout */}
        <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Badge */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-white tracking-tight leading-none">
                LOTUS DENTAL
              </span>
              <span className="text-[10px] font-bold text-[#B8975F] tracking-wider uppercase mt-1">
                Clinic & Implant Center
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing premium implants, pain-free root canals, and cosmetic design dentistry in Indore, Madhya Pradesh.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#B8975F]" />
              <span>Identifies as Women-Owned</span>
            </div>
          </div>

          {/* Col 2: Timings Summary */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8975F]" /> Operational Hours
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between items-center">
                <span>Tuesday – Sunday</span>
                <span className="font-bold text-white">
                  11:00 AM – 2:00 PM <br />
                  & 5:00 PM – 9:00 PM
                </span>
              </li>
              <li className="flex justify-between items-center border-t border-slate-800 pt-2 text-red-400">
                <span>Monday</span>
                <span className="font-bold uppercase">Closed</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Phone */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8975F]" /> Contact Details
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="leading-relaxed">
                A-60, Sanwer Rd, near Sidhhant Hotel, Jakhya, Indore, Madhya Pradesh 453555.
              </p>
              
              <div className="pt-2 border-t border-slate-800">
                <a
                  href="tel:+919009050501"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#B8975F]" /> Call Desk: +91 90090 50501
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright Bottom */}
        <div className="pt-8 space-y-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl mx-auto md:mx-0">
            <strong>Disclaimer:</strong> Information provided on this website is for educational purposes and does not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified healthcare provider with any questions regarding a medical condition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-800/60 pt-4">
            <p>© {new Date().getFullYear()} Lotus Dental Clinic and Implant Center. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Home</a>
              <a href="#about" className="hover:text-white">About</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#testimonials" className="hover:text-white">Reviews</a>
              <a href="#booking" className="hover:text-white">Book Slot</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
