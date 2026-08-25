"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Phone, Clock, ExternalLink, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export const branches = [
  {
    id: "itwari",
    name: "Itwari / Teen Nal Chowk Branch",
    address: "Near Teen Nal Chowk, Main Road, Itwari, Nagpur, Maharashtra 440002",
    timing: "Morning: 10:30 AM – 2:00 PM | Evening: 6:00 PM – 9:30 PM",
    phone: "9326888667",
    mapUrl: "https://maps.google.com/?q=Teen+Nal+Chowk+Itwari+Nagpur",
    landmark: "Heart of Commercial Nagpur • Easy Parking",
  },
  {
    id: "mankapur",
    name: "New Mankapur Branch",
    address: "Opp. Sports Complex, Main Highway Road, New Mankapur, Nagpur, Maharashtra 440030",
    timing: "Morning: 11:00 AM – 2:30 PM | Evening: 5:30 PM – 9:00 PM",
    phone: "9326888667",
    mapUrl: "https://maps.google.com/?q=New+Mankapur+Nagpur",
    landmark: "State-of-the-Art Surgical Facility & 3D Imaging",
  },
];

export function BranchLocationSwitcher() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="w-full rounded-3xl border border-[#E5C158]/35 bg-gradient-to-b from-slate-900/90 to-[#070A0F]/90 p-6 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C158]">
            NAGPUR DUAL CLINIC LOCATIONS
          </span>
          <h3 className="text-xl font-bold text-white">Select Clinic Branch</h3>
        </div>

        {/* Branch Selector Buttons */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#070A0F] p-1.5">
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b)}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedBranch.id === b.id
                  ? "bg-[#E5C158] text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {b.id === "itwari" ? "Teen Nal Chowk" : "New Mankapur"}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={selectedBranch.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/80 border border-[#E5C158]/40 text-[#E5C158] flex-shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{selectedBranch.name}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedBranch.address}</p>
              <span className="inline-block mt-2 text-[11px] font-semibold text-cyan-400">
                ★ {selectedBranch.landmark}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 border-t border-white/10">
            <Clock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>{selectedBranch.timing}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <Phone className="h-4 w-4 text-[#E5C158] flex-shrink-0" />
            <span>Emergency & Booking: <strong>+91 {selectedBranch.phone}</strong></span>
          </div>
        </div>

        {/* Action card */}
        <div className="rounded-2xl border border-white/10 bg-[#070A0F]/90 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <CheckCircle className="h-4 w-4" /> Live Status: Open Today
            </span>
            <span className="rounded-full bg-amber-950/80 px-2.5 py-0.5 text-[10px] font-bold text-[#E5C158] border border-[#E5C158]/30">
              Verified Location
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Equipped with 3D digital imaging, Class B autoclave sterilization, and dedicated consultant consultation suites.
          </p>

          <a
            href={selectedBranch.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-cyan-600 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Navigation className="h-4 w-4 text-slate-950" /> Get 1-Click Google Maps Directions <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
