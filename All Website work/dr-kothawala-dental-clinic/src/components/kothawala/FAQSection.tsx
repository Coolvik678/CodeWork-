"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring a valid photo ID, any previous dental records or X-rays if available, and a list of any current medications you are taking. Arriving 10 minutes early allows us to complete your registration seamlessly."
    },
    {
      question: "How does the clinic maintain sterilization protocols?",
      answer: "We strictly adhere to international clinical safety standards. All reusable instruments undergo multi-stage ultrasonic cleaning and high-pressure B-Class autoclave sterilization. Single-use disposable consumables are utilized wherever applicable."
    },
    {
      question: "Do you handle dental emergencies?",
      answer: "Yes! We prioritize urgent dental emergencies including severe toothaches, chipped or knocked-out teeth, and acute swelling. Please contact our direct branch triage line for immediate priority scheduling."
    }
  ];

  return (
    <section id="faqs" className="py-28 lg:py-36 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Patient Guidance
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Frequently Asked <span className="text-[#0D9488]">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Essential logistical information to ensure a transparent, stress-free clinical visit.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#0D9488] shadow-lg shadow-[#0D9488]/5"
                    : "bg-white/80 border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left gap-4"
                >
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2.5">
                    <ShieldCheck className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-[#0D9488]" : "text-slate-400"}`} />
                    <span>{faq.question}</span>
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#0D9488]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/60 mt-1 pl-13"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
