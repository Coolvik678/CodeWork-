"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone, MessageSquare, AlertTriangle, Send, CheckCircle2, Shield } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
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

    const message = `Hello Dr. Aadesh Jain’s Dental and Root Canal Speciality Centre!\nI would like to book an appointment.\n\n👤 *Patient:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🩺 *Service:* ${formData.service}\n📅 *Preferred Date:* ${formData.preferredDate || "Earliest Slot"}\n🕒 *Slot:* ${formData.preferredSlot}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=917507807444&text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8975F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Full-scale Maps Embed focusing directly on Wadala - Pathardi Road coordinates */}
        <div className="w-full h-80 sm:h-[400px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-16 relative bg-slate-950">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.9723000673895!2d73.77519967600742!3d19.96107602324901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb001bf5a363%3A0x7dc5c7cfb81989b8!2sDr.Aadesh%20Jain%E2%80%99s%20Dental%20and%20Root%20Canal%20Speciality%20Centre!5e0!3m2!1sen!2sin!4v1782815680000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location for Dr. Aadesh Jain clinic"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          ></iframe>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-800">
          
          {/* Column 1: Clinic Timings & Location (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-500/20">
                Contact & Timings
              </span>
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Dr. Aadesh Jain’s Dental & Root Canal Speciality Centre
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Led by expert Endodontist Dr. Aadesh Jain, providing comfortable, painless root canals and oral surgeries in Nashik.
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 space-y-4 shadow-xl transition-all duration-200 hover:border-[#0F766E]/40 hover:shadow-2xl">
              <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0F766E]" /> Operating Hours
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <span className="text-slate-400 font-medium">Monday – Saturday</span>
                  <span className="font-extrabold text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                    10:00 AM – 2:00 PM | 5:00 PM – 9:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 font-medium">Sunday</span>
                  <span className="font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                    10:00 AM – 3:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 space-y-4 shadow-xl transition-all duration-200 hover:border-[#B8975F]/35 hover:shadow-2xl">
              <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B8975F]" /> Clinic Address
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                <p className="text-slate-300 leading-normal">
                  Wadala - Pathardi Rd, Indira Nagar, Rane Nagar, Nashik, Maharashtra 422009.
                </p>
                
                <div className="pt-3 border-t border-slate-700 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+917507807444"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700 text-white font-extrabold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#B8975F]" /> +91 75078 07444
                  </a>

                  <a
                    href="https://api.whatsapp.com/send?phone=917507807444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp Direct
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Quick Booking Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-slate-950 border border-slate-100 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="w-3.5 h-3.5 text-[#B8975F]" /> Direct Booking
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mb-2">
                Quick Appointment Form
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Fill in your details below. We will launch WhatsApp to verify your slot with Dr. Aadesh Jain's assistant.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-[#B8975F]" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-slate-900">Request Initiated!</h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    We have redirected your slot preferences to WhatsApp for direct clinic response.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shailesh Mishra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 75078 07444"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service Category *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                    >
                      {services.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Time Slot *
                      </label>
                      <select
                        value={formData.preferredSlot}
                        onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F766E] text-slate-800 text-sm bg-white"
                      >
                        <option value="Morning (10:00 AM – 2:00 PM)">Morning (10:00 AM – 2:00 PM)</option>
                        <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#B8975F] text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer duration-300 border-b-2 border-[#B8975F]"
                  >
                    <Send className="w-5 h-5" /> Submit Booking Slot
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Medical Disclaimer & Bottom Bar */}
        <div className="pt-8 space-y-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl mx-auto lg:mx-0">
            <strong>Disclaimer:</strong> Information provided on this website is for educational purposes and does not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified healthcare provider with any questions regarding a medical condition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-800/60 pt-4">
            <p>© {new Date().getFullYear()} Dr. Aadesh Jain’s Dental & Root Canal Speciality Centre. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Home</a>
              <a href="#about" className="hover:text-white">About</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#gallery" className="hover:text-white">Gallery</a>
              <a href="#testimonials" className="hover:text-white">Reviews</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
