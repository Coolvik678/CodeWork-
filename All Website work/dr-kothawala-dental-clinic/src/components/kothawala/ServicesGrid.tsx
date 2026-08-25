"use client";

import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoCard } from "@/components/ui/magic/BentoGrid";
import { Sparkles, ShieldCheck, Cpu, Smile, Activity, Award, ArrowRight } from "lucide-react";

interface ServicesGridProps {
  onOpenBooking: () => void;
}

export default function ServicesGrid({ onOpenBooking }: ServicesGridProps) {
  return (
    <section id="services" className="py-24 bg-slate-950 text-white relative border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            MULTI-SPECIALTY DENTAL CLINIC MATRIX
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Complete Oral Healthcare Under One Roof
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Powered by Dr. Abrar Kothawala, Dr. Khadeja Kothawala, and a panel of 7 expert consultant surgeons.
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            className="md:col-span-2"
            badge="MOST REQUESTED"
            icon={<Sparkles className="h-6 w-6" />}
            title="Dental Implants & Full Mouth Rehabilitation"
            description="Computer-guided precision implant placement restoring natural bite aesthetics and bone density without pain."
            header={
              <div className="h-28 w-full rounded-xl bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-500/30 p-4 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300">Lifetime Warranty Option</span>
                <button
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  Consult Specialist <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            }
          />

          <BentoCard
            badge="COSMETIC"
            icon={<Smile className="h-6 w-6" />}
            title="Invisible Braces & Aligners"
            description="3D digital smile simulation for rapid, comfortable alignment without metal wires."
          />

          <BentoCard
            badge="PAIN FREE"
            icon={<Cpu className="h-6 w-6" />}
            title="Single-Visit Root Canal (RCT)"
            description="Advanced rotary endodontic tech for painless 45-minute tooth preservation."
          />

          <BentoCard
            className="md:col-span-2"
            badge="PREVENTIVE"
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Laser Periodontics & Gum Care"
            description="Bio-laser gum therapy eliminating infection and tightening loose teeth naturally."
          />

          <BentoCard
            badge="PEDIATRIC"
            icon={<Activity className="h-6 w-6" />}
            title="Pediatric Dentistry"
            description="Gentle, friendly oral care tailored for children with zero dental anxiety."
          />

          <BentoCard
            badge="SURGERY"
            icon={<Award className="h-6 w-6" />}
            title="Wisdom Tooth Extraction"
            description="Micro-surgical painless removal of impacted teeth by senior oral surgeons."
          />
        </BentoGrid>
      </div>
    </section>
  );
}
