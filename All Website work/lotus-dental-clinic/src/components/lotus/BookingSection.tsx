"use client";

import { useState, useEffect } from "react";
import { Clock, MessageSquare, Phone, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function BookingSection() {
  const [clinicStatus, setClinicStatus] = useState({ isOpen: false, text: "Loading timings..." });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Dental Implants & Restorations",
    preferredDate: "",
    preferredSlot: "Morning (11:00 AM – 2:00 PM)",
    notes: ""
  });

  const services = [
    "Dental Implants & Restorations",
    "Root Canal Treatment (RCT)",
    "Cosmetic Smile Designing",
    "General & Preventive Checkups",
    "Orthodontic Alignment",
    "Pediatric Dentistry"
  ];

  // Dynamic clinical timings validator logic
  useEffect(() => {
    const updateClinicStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0: Sun, 1: Mon, 2: Tue, ..., 6: Sat
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hours * 60 + minutes;

      // Monday is Closed
      if (day === 1) {
        setClinicStatus({
          isOpen: false,
          text: "Closed — Opens Tuesday at 11:00 AM"
        });
        return;
      }

      // Shift timings: 
      // Morning: 11:00 AM - 2:00 PM (660 to 840 mins)
      // Evening: 5:00 PM - 9:00 PM (1020 to 1260 mins)
      const morningStart = 11 * 60;
      const morningEnd = 14 * 60;
      const eveningStart = 17 * 60;
      const eveningEnd = 21 * 60;

      if (timeVal >= morningStart && timeVal < morningEnd) {
        setClinicStatus({
          isOpen: true,
          text: "Open Now — Morning session closes at 2:00 PM"
        });
      } else if (timeVal >= eveningStart && timeVal < eveningEnd) {
        setClinicStatus({
          isOpen: true,
          text: "Open Now — Evening session closes at 9:00 PM"
        });
      } else {
        // Closed state description helper
        if (timeVal < morningStart) {
          setClinicStatus({
            isOpen: false,
            text: "Closed — Opens today at 11:00 AM"
          });
        } else if (timeVal >= morningEnd && timeVal < eveningStart) {
          setClinicStatus({
            isOpen: false,
            text: "Closed — Evening session opens today at 5:00 PM"
          });
        } else {
          // Night time closed
          if (day === 0) { // Sunday evening closed, next is Tuesday
            setClinicStatus({
              isOpen: false,
              text: "Closed — Opens Tuesday at 11:00 AM"
            });
          } else {
            setClinicStatus({
              isOpen: false,
              text: "Closed — Opens tomorrow at 11:00 AM"
            });
          }
        }
      }
    };

    updateClinicStatus();
    const interval = setInterval(updateClinicStatus, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the selected date is a Monday (Closed)
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      if (selectedDate.getDay() === 1) {
        alert("The clinic is closed on Mondays. Please select any other day from Tuesday to Sunday.");
        return;
      }
    }

    const message = `Hello Lotus Dental Clinic and Implant Center!\nI would like to book a dental consultation.\n\n👤 *Patient:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n🩺 *Service Needed:* ${formData.service}\n📅 *Preferred Date:* ${formData.preferredDate || "Earliest Slot"}\n🕒 *Preferred Time Slot:* ${formData.preferredSlot}\n📝 *Note:* ${formData.notes || "None"}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919009050501?text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Live Timings & Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-3">
                <Clock className="w-3.5 h-3.5 text-[#B8975F]" /> Instant Check
              </span>
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Plan Your Visit
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Check our real-time clinic status and select a slot that fits your schedule.
              </p>
            </div>

            {/* Dynamic Status Indicator Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-full ${clinicStatus.isOpen ? "bg-emerald-500 animate-ping" : "bg-red-500"}`} />
                <span className={`w-3.5 h-3.5 rounded-full absolute ${clinicStatus.isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                <h4 className="font-heading font-bold text-base text-slate-900 pl-5">
                  {clinicStatus.isOpen ? "Currently Open" : "Currently Closed"}
                </h4>
              </div>
              <p className="text-sm font-semibold text-slate-600 pl-5">
                {clinicStatus.text}
              </p>
            </div>

            {/* Standard Timings Panel */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider text-[#B8975F]">
                Standard Working Hours
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Tuesday – Sunday</span>
                  <span className="font-bold text-slate-950">
                    11:00 AM – 2:00 PM <br className="sm:hidden" /> & 5:00 PM – 9:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-red-600">
                  <span className="font-medium">Monday</span>
                  <span className="font-bold uppercase tracking-wider">Closed</span>
                </div>
              </div>
            </div>

            {/* Emergency Info Callout */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900">
              <h4 className="font-heading font-bold text-sm flex items-center gap-2">
                🚨 Emergency Triage Desk
              </h4>
              <p className="text-xs mt-1.5 leading-relaxed text-amber-800">
                Facing severe dental trauma, acute facial swelling, or extreme toothache? Skip the form queue and call our direct branch desk at <strong>+91 90090 50501</strong> for emergency priority scheduling.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/60 text-slate-950">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mb-2">
                Frictionless Booking
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Fill in your details below. We will launch WhatsApp to verify your slot with Dr. Deepika Soni's assistant.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-[#B8975F]" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-slate-900">Booking Request Ready!</h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    We have redirected your request to WhatsApp to confirm your slot directly with our clinic.
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
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 90000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 text-slate-800 text-sm transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] text-slate-800 text-sm bg-white"
                      >
                        {services.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] text-slate-800 text-sm bg-white"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] text-slate-800 text-sm bg-white"
                    >
                      <option value="Morning (11:00 AM – 2:00 PM)">Morning (11:00 AM – 2:00 PM)</option>
                      <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Clinical Notes / Symptoms (Optional)
                    </label>
                    <textarea
                      placeholder="Specify symptoms or surgical request details..."
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10 text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#B8975F] text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer duration-300"
                  >
                    <Send className="w-5 h-5" /> Submit Booking Slot
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
