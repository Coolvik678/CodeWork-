"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const clinicalData = [
  { year: "2010", procedures: 1200, satisfaction: 95 },
  { year: "2014", procedures: 2800, satisfaction: 97 },
  { year: "2018", procedures: 5400, satisfaction: 98 },
  { year: "2022", procedures: 8900, satisfaction: 99 },
  { year: "2026", procedures: 12500, satisfaction: 100 },
];

export function ClinicalRecoveryChart() {
  return (
    <div className="w-full rounded-2xl border border-teal-500/20 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            15+ Years Clinical Performance
          </span>
          <h3 className="text-lg font-bold text-white">Successful Treatments & Patient Satisfaction</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-400" /> Completed Procedures
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Satisfaction Rating
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clinicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProcedures" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#0d9488",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area type="monotone" dataKey="procedures" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorProcedures)" />
            <Area type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSatisfaction)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
