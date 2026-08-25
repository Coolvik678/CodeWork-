"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, MessageSquare, Send } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [issue, setIssue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate pre-filled WhatsApp message
    const waBase = "https://wa.me/919510650570";
    const text = `Hello Dr. Akshay Suratwala, I would like to book an ENT consultation at Tanish ENT Hospital.%0A%0A` +
                 `*Name:* ${name || "Not Specified"}%0A` +
                 `*Phone:* ${phone || "Not Specified"}%0A` +
                 `*Preferred Date:* ${preferredDate || "Not Specified"}%0A` +
                 `*Preferred Time:* ${preferredTime || "Not Specified"}%0A` +
                 `*ENT Issue:* ${issue || "General checkup"}`;
                 
    const url = `${waBase}?text=${text}`;
    
    // Open in a new tab
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-md bg-white rounded-clinical-lg shadow-2xl border border-slate-100 overflow-hidden flex flex-col relative"
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-medical-navy to-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-medical-gold" />
                <h3 className="font-serif font-bold text-lg leading-tight">
                  Book ENT Consultation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              
              {/* Patient Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 uppercase tracking-wider">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-teal text-slate-900 font-medium"
                />
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 uppercase tracking-wider">Contact Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-teal text-slate-900 font-medium"
                />
              </div>

              {/* Booking Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase tracking-wider">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-teal text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase tracking-wider">Preferred Time</label>
                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-teal text-slate-900 font-medium bg-white"
                  >
                    <option value="">Select slot</option>
                    <option value="Morning (9:00 AM - 1:00 PM)">9:00 AM - 1:00 PM</option>
                    <option value="Evening (5:00 PM - 8:30 PM)">5:00 PM - 8:30 PM</option>
                  </select>
                </div>
              </div>

              {/* ENT Symptom Description */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 uppercase tracking-wider">ENT Concern (Symptom)</label>
                <textarea
                  placeholder="e.g. Chronic Ear pain, Nasal blockage, Vertigo, throat infection..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-medical-teal text-slate-900 font-medium resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Send Booking to WhatsApp</span>
                </button>
                
                <a
                  href="tel:09510650570"
                  className="w-full py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-medical-teal" />
                  <span>Call Hospital Reception</span>
                </a>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
