"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const clinicalData = [
  { month: "Week 1", recovery: 68, satisfaction: 88 },
  { month: "Week 2", recovery: 82, satisfaction: 92 },
  { month: "Week 3", recovery: 91, satisfaction: 96 },
  { month: "Week 4", recovery: 97, satisfaction: 99 },
  { month: "Month 2", recovery: 99, satisfaction: 100 },
];

export function ClinicalRecoveryChart() {
  return (
    <div className="w-full rounded-2xl border border-teal-500/20 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Clinical Outcome & Performance Analytics
          </span>
          <h3 className="text-lg font-bold text-white">Post-Procedure Patient Recovery Rate (%)</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-400" /> Recovery Index
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Satisfaction Score
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clinicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[60, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#0d9488",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area type="monotone" dataKey="recovery" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRecovery)" />
            <Area type="monotone" dataKey="satisfaction" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorSatisfaction)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
