"use client";

import React, { useState } from "react";
import Image from "next/image";

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
          CLINICAL SMILE TRANSFORMATION
        </span>
        <span className="text-xs font-semibold text-slate-300">Drag Slider to Compare</span>
      </div>

      <div className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-xl bg-slate-950">
        {/* After Image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-950 to-slate-900 text-teal-300">
          <div className="text-center p-6">
            <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              AFTER ALIGNMENT & IMPLANT RESTORATION
            </span>
            <h4 className="mt-3 text-xl font-bold text-white">Symmetrical 5-Star Natural Smile</h4>
          </div>
        </div>

        {/* Before Image Overlay */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-slate-900 border-r-2 border-teal-400"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-slate-950 to-slate-900 text-slate-400">
            <div className="text-center p-6">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                BEFORE TREATMENT
              </span>
              <h4 className="mt-3 text-xl font-bold text-slate-300">Initial Malocclusion & Wear</h4>
            </div>
          </div>
        </div>

        {/* Drag Input Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize h-full w-full z-20"
        />

        {/* Handle Bar */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-teal-400 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg font-bold text-xs">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
