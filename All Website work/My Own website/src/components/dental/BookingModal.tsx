"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "General Dentistry",
    preferredDate: "",
    preferredTime: "Morning (10 AM - 1 PM)",
    notes: ""
  });

  const treatments = [
    "General Dentistry",
    "Root Canal Treatment (RCT)",
    "Tooth Extraction",
    "Dental Fillings",
    "Teeth Cleaning & Polishing",
    "Dental Crowns & Bridges",
    "Dentures (Complete & Partial)",
    "Dental Implants",
    "Braces & Aligners",
    "Cosmetic Dentistry & Whitening",
    "Pediatric (Child) Dentistry",
    "Gum Treatment (Periodontal Care)"
  ];

  const timeSlots = [
    "Morning (10 AM - 2 PM)",
    "Evening (5 PM - 9 PM)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-filled WhatsApp message for 8975889746
    const message = `Hello Dr. Chavhan's Multispeciality Dental Clinic!\nI would like to book a consultation.\n\n👤 *Patient Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🩺 *Treatment:* ${formData.treatment}\n📅 *Preferred Date:* ${formData.preferredDate || "Earliest Available"}\n⏰ *Preferred Time:* ${formData.preferredTime}\n📝 *Notes:* ${formData.notes || "None"}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918975889746?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setStep("success");
    setTimeout(() => {
      setStep("form");
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
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100"
          >
            <div className="bg-gradient-to-r from-[#0A7E8C] to-[#075963] p-6 text-white relative">
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
                Book Your Dental Visit
              </h3>
              <p className="text-teal-100 text-sm mt-1">
                Dr. Chavhan's Multispeciality Dental Clinic • Aundh, Pune
              </p>
            </div>

            <div className="p-6">
              {step === "success" ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                    Booking Request Sent!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    We have redirected your booking details to clinic reception on WhatsApp for instant slot confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0A7E8C]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A7E8C] focus:ring-2 focus:ring-[#0A7E8C]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0A7E8C]" /> Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A7E8C] focus:ring-2 focus:ring-[#0A7E8C]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Treatment
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A7E8C] focus:ring-2 focus:ring-[#0A7E8C]/10 text-slate-800 text-sm bg-white transition-all"
                    >
                      {treatments.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0A7E8C]" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A7E8C] text-slate-800 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0A7E8C]" /> Time Slot
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A7E8C] text-slate-800 text-sm bg-white"
                      >
                        {timeSlots.map((ts, idx) => (
                          <option key={idx} value={ts}>{ts}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#0A7E8C] to-[#10B981] text-white font-bold text-base shadow-lg shadow-[#0A7E8C]/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" /> Confirm Slot via WhatsApp
                  </button>

                  <p className="text-center text-xs text-slate-500 mt-2">
                    ⚡ Instant WhatsApp confirmation directly with clinic reception desk.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
