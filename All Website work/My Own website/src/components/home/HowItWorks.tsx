"use client";

import React from "react";
import { PhoneCall, PenTool, Edit3, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "Tell us your business goals and requirements over a quick call.",
    icon: PhoneCall
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "We craft your custom website with modern UI/UX principles.",
    icon: PenTool
  },
  {
    num: "03",
    title: "Review & Refine",
    desc: "You review the design, we make unlimited revisions.",
    icon: Edit3
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "Your site goes live. We provide ongoing support.",
    icon: Rocket
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "tween" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
            Our 4-Step Proven Process
          </h2>
          <p className="text-lg text-gray-600">
            A simple, transparent timeline from our first handshake to your ultimate digital success.
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line (Desktop only) */}
          <div className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "tween" }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-[6px] border-[#F0FDFA] shadow-sm mb-6 transition-transform hover:scale-105">
                <step.icon className="w-8 h-8 text-[#0D9488]" />
              </div>
              <div className="bg-[#0D9488]/10 text-[#0D9488] font-bold px-4 py-1 rounded-full text-sm mb-4">
                Step {step.num}
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed px-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
