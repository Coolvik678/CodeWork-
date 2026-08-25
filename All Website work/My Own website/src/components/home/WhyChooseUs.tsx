"use client";

import React from "react";
import Image from "next/image";
import { Shield, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Unmatched Reliability",
    description: "We build secure, robust architectures that withstand traffic spikes and protect your data."
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Our Next.js implementations score 99+ on Google Lighthouse, ensuring zero bounce drops."
  },
  {
    icon: Globe,
    title: "Local Market Expertise",
    description: "We deeply understand the Indian consumer inside and out. We design for our market."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "tween" }}
            className="mb-12"
          >
            <span className="text-[#0D9488] font-semibold tracking-wider uppercase text-sm mb-3 block">Why PixelCraft?</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
              Designed to Dominate the Local Market
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Stop losing customers to your competitors due to an outdated website. We provide enterprise-grade web solutions tailored specifically to elevate Indian businesses.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                    <feature.icon className="w-8 h-8 text-[#0D9488]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "tween" }}
            className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600"
              alt="Professional Indian Workspace"
              fill
              className="object-cover"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
