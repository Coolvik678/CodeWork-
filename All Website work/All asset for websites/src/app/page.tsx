"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Activity,
  ShieldCheck,
  Award,
  Sparkles,
  Stethoscope,
  Scan,
  Cpu,
  Smile,
  Calendar,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

import { AmbientShaderBackground } from "@/components/ui/react-bits/AmbientShaderBackground";
import { LiquidGlassCard } from "@/components/ui/kokonut/LiquidGlassCard";
import { InteractiveGlobe } from "@/components/ui/magic/InteractiveGlobe";
import { AnimatedBeam } from "@/components/ui/magic/AnimatedBeam";
import { BentoGrid, BentoCard } from "@/components/ui/magic/BentoGrid";
import { ShinyButton } from "@/components/ui/magic/ShinyButton";
import { ClinicalRecoveryChart } from "@/components/ui/charts/ClinicalRecoveryChart";
import { useAnimeStagger, useAnimePathDraw } from "@/hooks/use-anime";

export default function Home() {
  useAnimeStagger("#specialties-section", ".specialty-card");
  useAnimePathDraw(".medical-svg-path");

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. REACT BITS: GPU WebGL Canvas Background Shader */}
      <AmbientShaderBackground />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">APEX MEDICAL</span>
              <span className="ml-2 rounded bg-teal-950 px-2 py-0.5 text-[10px] font-bold text-teal-400 border border-teal-500/30">
                2026 EDITION
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            <a href="#specialties" className="hover:text-teal-400 transition-colors">Specialties</a>
            <a href="#workflow" className="hover:text-teal-400 transition-colors">Patient Pathway</a>
            <a href="#outcomes" className="hover:text-teal-400 transition-colors">Clinical Data</a>
            <a href="#accreditations" className="hover:text-teal-400 transition-colors">Global Network</a>
          </nav>

          <ShinyButton onClick={() => alert("Appointment Booking Modal Triggered")}>
            <Calendar className="h-4 w-4" /> Book Consultation
          </ShinyButton>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 pb-24 text-center md:pt-24">
        {/* KOKONUTUI Liquid Glass Live Availability Badge */}
        <LiquidGlassCard className="mb-6 max-w-md py-2 px-5" badgeText="LIVE CLINIC STATUS: OPEN NOW">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-200">
            <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Emergency Surgical Suite & 3D Imaging Active</span>
          </div>
        </LiquidGlassCard>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Ultra-Precision <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Medical & Healthcare</span> Architecture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg"
        >
          Integrating 60fps GPU WebGL canvas shaders, interactive 3D globes, animated care beam maps, and real-time clinical data visualizers for elite medical practices.
        </motion.p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ShinyButton className="h-12 px-8 text-base">
            Schedule Appointment Now
          </ShinyButton>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="tel:+18005550199"
            className="flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-slate-900/60 px-6 font-bold text-white backdrop-blur-md hover:bg-slate-800"
          >
            <PhoneCall className="h-4 w-4 text-teal-400" /> +1 (800) 555-0199
          </motion.a>
        </div>

        {/* Hero Stat Badges */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <LiquidGlassCard badgeText="PATIENT SATISFACTION">
            <div className="text-3xl font-black text-white">99.8%</div>
            <p className="mt-1 text-xs text-slate-300">Verified Post-Op Rating across 4,200+ procedures</p>
          </LiquidGlassCard>
          <LiquidGlassCard badgeText="3D SCAN ACCURACY">
            <div className="text-3xl font-black text-teal-400">10 Microns</div>
            <p className="mt-1 text-xs text-slate-300">Ultra-high resolution intraoral & cardiac imaging</p>
          </LiquidGlassCard>
          <LiquidGlassCard badgeText="STERILIZATION PROTOCOL">
            <div className="text-3xl font-black text-emerald-400">Class B UV-C</div>
            <p className="mt-1 text-xs text-slate-300">100% Hospital grade autoclaved instruments</p>
          </LiquidGlassCard>
        </div>
      </section>

      {/* 2. MAGIC UI BENTO GRID: Clinic Specialties */}
      <section id="specialties" className="border-t border-white/10 bg-slate-950/60 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              MAGIC UI BENTO GRID CONNECTOR
            </span>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
              Multispeciality Clinical Matrix
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Hover over cards to trigger border beam highlights and spring physics reactions.
            </p>
          </div>

          <div id="specialties-section">
            <BentoGrid>
              <BentoCard
                className="specialty-card md:col-span-2"
                badge="POPULAR SERVICE"
                icon={<Sparkles className="h-6 w-6" />}
                title="Cosmetic Dentistry & Invisible Aligners"
                description="Custom 3D-molded aligner series engineered with AI tooth-movement simulations for optimal alignment pathways."
                header={
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-teal-900/60 to-slate-900 border border-teal-500/20 p-4 flex items-center justify-center">
                    <Smile className="h-16 w-16 text-teal-400 animate-pulse" />
                  </div>
                }
              />

              <BentoCard
                className="specialty-card"
                badge="SURGICAL SUITE"
                icon={<Cpu className="h-6 w-6" />}
                title="Guided Implantology"
                description="Computer-guided flapless implant placement ensuring zero post-op downtime."
              />

              <BentoCard
                className="specialty-card"
                badge="CARDIOLOGY"
                icon={<Activity className="h-6 w-6" />}
                title="Non-Invasive Cardiac Diagnostics"
                description="Real-time ECG and arterial elasticity analysis using multi-lead sensor arrays."
              />

              <BentoCard
                className="specialty-card md:col-span-2"
                badge="PREVENTIVE CARE"
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Laser Periodontal Restoration"
                description="Painless bio-laser debridement stimulating natural bone & tissue regeneration."
              />

              <BentoCard
                className="specialty-card md:col-span-2"
                badge="EMERGENCY"
                icon={<Award className="h-6 w-6" />}
                title="24/7 Trauma & Urgent Pain Relief"
                description="Instant access to on-duty specialists for tooth fracture and acute pain management."
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 3. MAGIC UI ANIMATED BEAM & ANIME.JS: Patient Pathway */}
      <section id="workflow" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              MAGIC UI ANIMATED BEAM & ANIME.JS SVG CONNECTOR
            </span>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
              Precision Patient Treatment Flow
            </h2>
          </div>

          <AnimatedBeam
            steps={[
              {
                title: "1. AI 3D Diagnostic Scan",
                description: "Full jaw intraoral digital mapping in 60 seconds.",
                icon: <Scan className="h-6 w-6" />,
              },
              {
                title: "2. Virtual Simulation",
                description: "Biomechanical treatment outcome preview.",
                icon: <Cpu className="h-6 w-6" />,
              },
              {
                title: "3. Micro-Invasive Care",
                description: "Laser guided painless clinical execution.",
                icon: <Stethoscope className="h-6 w-6" />,
              },
              {
                title: "4. Lifetime Smile Warranty",
                description: "Automated digital recovery tracking.",
                icon: <CheckCircle2 className="h-6 w-6" />,
              },
            ]}
          />

          {/* ANIME.JS SVG Path Drawing Trigger */}
          <div className="mt-12 flex justify-center">
            <svg width="300" height="80" viewBox="0 0 300 80" className="stroke-teal-400">
              <path
                className="medical-svg-path"
                d="M 10 40 Q 75 10, 150 40 T 290 40"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 4. BKLIT / SHADCN CHARTS & 5. MAGIC UI GLOBE SECTION */}
      <section id="outcomes" className="border-t border-white/10 bg-slate-950/80 px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ClinicalRecoveryChart />
          </div>
          <div id="accreditations" className="flex flex-col items-center justify-center">
            <InteractiveGlobe />
            <p className="mt-4 text-center text-xs text-slate-400">
              Recognized across 14 international medical boards with JCI Gold Seal Accreditation.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Apex Medical Practice. Built with 7 Specialized Animation & UI Library Connectors.</p>
          <div className="flex gap-6 font-semibold text-slate-300">
            <a href="#" className="hover:text-teal-400">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400">HIPAA Compliance</a>
            <a href="#" className="hover:text-teal-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
