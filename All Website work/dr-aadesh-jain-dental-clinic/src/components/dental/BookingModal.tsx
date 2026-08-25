"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    service: "Root Canal Specialist Treatment",
    preferredDate: "",
    preferredSlot: "Morning (10:00 AM – 2:00 PM)"
  });

  const services = [
    "Root Canal Specialist Treatment",
    "Advanced Diagnostics & Screening",
    "General & Preventive Dentistry",
    "Teeth Polishing & Cosmetic Work",
    "Pediatric Tooth Care"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello Dr. Aadesh Jain’s Dental and Root Canal Speciality Centre!\nI would like to book a consultation.\n\n👤 *Patient:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🩺 *Service:* ${formData.service}\n📅 *Preferred Date:* ${formData.preferredDate || "Earliest Slot"}\n🕒 *Slot:* ${formData.preferredSlot}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=917507807444&text=${encoded}`, "_blank");

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
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0F766E] to-[#0D5C55] p-6 text-white relative border-b-2 border-[#B8975F]">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider text-[#B8975F] mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Direct Reservation Desk
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                Book Your Consultation
              </h3>
              <p className="text-teal-100 text-xs sm:text-sm mt-1">
                Dr. Aadesh Jain’s Dental & Root Canal Speciality Centre, Nashik
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-[#B8975F]" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                    Request Launched!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    We have redirected your appointment details to WhatsApp for instant verification with our desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0F766E]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shailesh Mishra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0F766E]" /> Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 75078 07444"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Service Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                      >
                        {services.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0F766E]" /> Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                    >
                      <option value="Morning (10:00 AM – 2:00 PM)">Morning (10:00 AM – 2:00 PM)</option>
                      <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#B8975F] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer duration-300 border-b-2 border-[#B8975F]"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" /> Confirm Slot on WhatsApp
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
