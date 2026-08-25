"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const whatsappUrl = "https://wa.me/917982444157?text=Hello%20Dr.%20Priya,%20I%20would%20like%20to%20book%20a%20consultation.";

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-gradient-to-tr from-sage-50 via-soft-white to-sage-100/50 overflow-hidden">
      
      {/* Decorative Organic Gradients */}
      <div className="absolute top-20 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-sage-200/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-gold-400/5 blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Trust Signals */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Reputation Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white border border-sage-100 shadow-sm text-xs font-bold text-sage-800">
              <span className="flex items-center gap-0.5 text-gold-500 font-extrabold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>5.0 Rating</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-sage-600 font-extrabold">155+ Google Reviews</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-sage-900 leading-[1.1] tracking-tight">
              Holistic Healing & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sage-700 via-sage-600 to-gold-500 bg-clip-text text-transparent">
                Permanent Solutions
              </span> <br />
              for Your Well-being
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-sage-800/80 leading-relaxed max-w-xl font-normal">
              Consult with **Dr. Priya Puri** at West Patel Nagar, New Delhi. Experience a patient-focused, gentle approach delivering permanent solutions for chronic anxiety, gastric issues, and skin health.
            </p>

            {/* Key Clinical Proof Points */}
            <div className="space-y-3.5 text-xs sm:text-sm font-semibold text-sage-900/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>Permanent, root-cause resolution for Chronic Anxiety & Stress</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>Genuine, patient-first counseling suggesting natural lifestyle changes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>Safe, chemical-free custom skincare & homoeopathic remedies</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-base shadow-lg shadow-sage-600/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 flex items-center justify-center gap-3 border-b-2 border-gold-500 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-gold-400" />
                <span>Book Consultation</span>
              </a>

              <a
                href="#specialties"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-sage-50 text-sage-800 font-extrabold text-base border border-sage-200/80 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Specialties</span>
                <ArrowRight className="w-4 h-4 text-gold-500" />
              </a>
            </div>
            <p className="text-xs text-sage-600 font-semibold pt-2 text-center sm:text-left">
              Drop us a WhatsApp anytime 24/7. In-person clinic hours: 6:00 PM – 8:30 PM.
            </p>
          </motion.div>

          {/* Right Column: Staggered Visual Layout utilizing storefront images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0"
          >
            {/* Background glowing gold ring */}
            <div className="absolute -inset-4 rounded-full border border-gold-500/20 bg-gold-400/5 blur-xl pointer-events-none -z-10" />

            {/* Staggered double image frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] sm:aspect-square">
              
              {/* Primary Image: Storefront Day */}
              <div className="absolute top-0 left-0 w-[80%] aspect-[4/5] rounded-clinical-lg overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/clinic/storefront-day.png"
                  alt="Prinee Homoeopathic Clinic Storefront Day"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">West Patel Nagar</span>
                  <h4 className="font-serif font-bold text-sm text-slate-100 leading-none">Day Clinic Storefront</h4>
                </div>
              </div>

              {/* Overlapping Image: Storefront Night */}
              <div className="absolute bottom-0 right-0 w-[55%] aspect-[4/5] rounded-clinical-md overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/clinic/storefront-night.png"
                  alt="Prinee Homoeopathic Clinic Storefront Night"
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 text-white z-10">
                  <h4 className="font-serif font-bold text-xs text-slate-100 leading-none">Evening Illumination</h4>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
