"use client";

import React from "react";
import { Monitor, Smartphone, Search, RefreshCw, Zap, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Web Design",
    description: "Beautiful, conversion-focused websites tailored strictly to your brand's unique identity.",
    icon: Monitor,
  },
  {
    title: "Mobile App Development",
    description: "Lightning-fast, intuitive iOS and Android applications built for the modern user.",
    icon: Smartphone,
  },
  {
    title: "SEO Optimization",
    description: "Dominate search rankings and drive sustainable, organic traffic directly to your business.",
    icon: Search,
  },
  {
    title: "Continuous Maintenance",
    description: "We keep your digital assets secure, updated, and running at peak performance.",
    icon: RefreshCw,
  },
  {
    title: "High-Speed Hosting",
    description: "Ultra-fast, secure, and reliable hosting infrastructure guaranteeing 99.9% uptime.",
    icon: Zap,
  },
  {
    title: "24/7 Priority Support",
    description: "Dedicated assistance whenever you need it. We treat your emergencies as our own.",
    icon: Headphones,
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-20 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "tween" }} // Safe tween
          className="max-w-3xl mb-16 text-center mx-auto"
        >
          <span className="text-[#0D9488] font-semibold tracking-wider uppercase text-sm mb-3 block">What We Do</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-lg text-gray-600 border-b border-gray-100 pb-12">
            We don't just build websites; we engineer comprehensive digital ecosystems designed to scale your operations and skyrocket your revenue.
          </p>
        </motion.div>

        {/* 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "tween" }} // Safe tween
              className="relative overflow-hidden rounded-2xl p-8 bg-white border border-gray-200 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ opacity: 1 }} // CSS fallback
            >
              <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-[#0D9488]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
