"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar, User, Phone, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialty: "Root Canal Treatment (RCT)",
    preferredDate: "",
    notes: ""
  });

  const specialties = [
    "Root Canal Treatment (RCT)",
    "Advanced Dental Implants",
    "Cosmetic & Smile Design",
    "Crowns & Bridges Fixing",
    "Orthodontics & Braces",
    "Comprehensive Oral Health",
    "Pediatric Dentistry"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello Dr. Kothawala's Dental Cure & Care Center!\nI would like to book a consultation.\n\n👤 *Patient:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🩺 *Specialty:* ${formData.specialty}\n📅 *Preferred Date:* ${formData.preferredDate || "Earliest Available"}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
          >
            <div className="bg-gradient-to-r from-[#0D9488] to-[#0F766E] p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider text-teal-100 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Direct Consultation Booking
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                Book Your Consultation
              </h3>
              <p className="text-teal-100 text-sm mt-1">
                Dr. Kothawala's Dental Cure & Care Center
              </p>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                    Request Launched!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    We have redirected your appointment request to WhatsApp for instant verification with reception.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0D9488]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0D9488]" /> Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Specialty *
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D9488] text-slate-800 text-sm bg-white transition-all"
                    >
                      {specialties.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0D9488]" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D9488] text-slate-800 text-sm bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white font-bold text-base shadow-lg shadow-[#0D9488]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" /> Confirm Slot via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
