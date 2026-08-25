"use client";

import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Agrawal",
    location: "Itwari, Nagpur",
    treatment: "Dental Implants",
    text: "Dr. Abrar Kothawala completed my dental implant procedure with zero pain. Outstanding team and 100% sterile environment!",
    rating: 5,
  },
  {
    name: "Priyanka Deshmukh",
    location: "Mankapur, Nagpur",
    treatment: "Invisible Aligners",
    text: "Got my 3D aligners planned here. The digital simulation was so accurate and results showed in just 4 months. Highly recommended!",
    rating: 5,
  },
  {
    name: "Dr. Amit Tembhekar",
    location: "Dharampeth, Nagpur",
    treatment: "Laser RCT",
    text: "Single-visit painless root canal done by Dr. Khadeja and consultant team. Very professional approach and transparent cost.",
    rating: 5,
  },
  {
    name: "Sunita Kulkarni",
    location: "Sadar, Nagpur",
    treatment: "Full Mouth Care",
    text: "Best dental clinic in Nagpur. The 7 specialist consultants handle every domain with supreme expertise.",
    rating: 5,
  },
];

export function InfiniteReviewMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#070A0F] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#070A0F] to-transparent" />

      <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-6 hover:[animation-play-state:paused]">
        {[...reviews, ...reviews].map((rev, idx) => (
          <div
            key={idx}
            className="w-80 flex-shrink-0 rounded-2xl border border-[#E5C158]/25 bg-[#070A0F]/90 p-5 shadow-xl backdrop-blur-xl transition-all hover:border-[#E5C158]/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#E5C158]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="rounded-full bg-amber-950/80 px-2 py-0.5 text-[9px] font-bold text-[#E5C158] border border-[#E5C158]/30">
                Verified Google 5.0 ★
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed italic">
              "{rev.text}"
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div>
                <h5 className="text-xs font-bold text-white">{rev.name}</h5>
                <span className="text-[10px] text-slate-400">{rev.location}</span>
              </div>
              <span className="text-[10px] font-semibold text-cyan-400">{rev.treatment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
