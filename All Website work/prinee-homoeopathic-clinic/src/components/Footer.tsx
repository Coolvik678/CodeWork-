"use client";

import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const mapEmbedUrl = "https://maps.google.com/maps?q=Prinee%20The%20Blessing%20Homoeopathic%20Clinic,%20J-35,%20Ground%20floor,%20West%20Patel%20Nagar,%20New%20Delhi,%20Delhi%20110008&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <footer className="bg-clinical-dark text-white pt-20 pb-10 relative overflow-hidden border-t border-sage-800">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-sage-800/10 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        
        {/* Upper Footer: Info & Map grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-sage-800/60">
          
          {/* Col 1: Contact, Timings & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                PRINEE THE BLESSING HOMOEOPATHIC CLINIC
              </span>
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-slate-100 leading-snug">
                Gentle Healing. <br />
                Permanent Relief.
              </h3>
            </div>

            {/* Structured Contact Details */}
            <div className="space-y-4 text-sm text-slate-300">
              
              <div className="flex gap-3.5 items-start">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-0.5">Address</span>
                  <p className="leading-relaxed">
                    J-35, Ground floor, West Patel Nagar, New Delhi, Delhi 110008
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <Phone className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-0.5">Contact</span>
                  <a href="tel:+917982444157" className="hover:text-gold-500 transition-colors font-bold tracking-wide">
                    +91 79824 44157
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <Clock className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block mb-0.5">Opening Hours</span>
                  <p className="leading-relaxed">
                    Monday – Saturday: <span className="text-gold-400 font-extrabold">6:00 PM – 8:30 PM</span> <br />
                    <span className="text-slate-400 text-xs">Closed on Sundays</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Col 2: Storefront image overlay (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Our Clinic Location
            </h4>
            <div className="relative aspect-[4/3] rounded-clinical-md overflow-hidden border border-sage-800 shadow-xl group">
              <Image
                src="/clinic/storefront-day.png"
                alt="Prinee Homoeopathic Clinic Storefront Day"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-sage-950/20" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Located on the Ground Floor at J-35 West Patel Nagar, with street-level access and clear signboards.
            </p>
          </div>

          {/* Col 3: Styled Interactive Map iframe (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Interactive Map Directions
            </h4>
            <div className="w-full aspect-[4/3] rounded-clinical-md overflow-hidden border border-sage-800 shadow-xl bg-sage-900/50">
              <iframe
                title="Google Maps Location - Prinee Clinic"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Lower Footer: Copyright & Attribution */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 text-xs text-slate-500 font-medium">
          <div>
            &copy; {currentYear} Prinee The Blessing Homoeopathic Clinic. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Formulated constitutional care with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>by Dr. Priya Puri</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
