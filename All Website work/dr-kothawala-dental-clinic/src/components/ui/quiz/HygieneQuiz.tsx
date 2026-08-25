"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle, RotateCcw } from "lucide-react";
import { ShinyButton } from "@/components/ui/magic/ShinyButton";

const questions = [
  {
    q: "How often do you experience tooth sensitivity or mild pain?",
    options: ["Never", "Occasionally when cold", "Frequently"],
  },
  {
    q: "What is your main dental goal right now?",
    options: ["Brighter & Straighter Smile", "Replace Missing Tooth", "Routine Cleaning"],
  },
  {
    q: "When was your last dental checkup?",
    options: ["Within 6 Months", "6-12 Months Ago", "Over a Year Ago"],
  },
];

export function HygieneQuiz({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (opt: string) => {
    const updated = [...answers, opt];
    setAnswers(updated);
    setStep(step + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <div className="w-full rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <HelpCircle className="h-6 w-6 text-teal-400" />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
            DIAGNOSTIC WIDGET
          </span>
          <h3 className="text-lg font-bold text-white">3-Step Smile Health Evaluation</h3>
        </div>
      </div>

      <div className="mt-6">
        {step < questions.length ? (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-teal-400">
              <span>Question {step + 1} of 3</span>
              <span>{Math.round(((step + 1) / 3) * 100)}% Completed</span>
            </div>
            <h4 className="text-base font-bold text-white">{questions[step].q}</h4>

            <div className="mt-4 space-y-2">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-left text-xs font-semibold text-slate-200 hover:border-teal-500 hover:bg-teal-950/40 cursor-pointer transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
            <h4 className="mt-2 text-lg font-bold text-white">Evaluation Complete!</h4>
            <p className="mt-1 text-xs text-slate-300">
              Based on your answers, we recommend a <strong>Consultant Examination & Digital Scan</strong>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShinyButton onClick={onOpenBooking} className="h-10 text-xs">
                Schedule Recommended Checkup
              </ShinyButton>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
