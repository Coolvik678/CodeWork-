import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenWhatsApp }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-white/15 shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black backdrop-blur-md border border-white/10 transition-all cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-mono font-bold uppercase">
                {project.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
                Clinical Overview & Solution
              </h3>
              <p className="text-base text-slate-300 font-sans font-light leading-relaxed">
                {project.fullDetails}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
                Measured Performance Outcomes
              </h3>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
                Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-black/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Want a similar website for your practice?</p>
              <p className="text-xs text-slate-400">Custom clinical builds delivered in 3 to 7 days.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenWhatsApp(`Hi Webcloud! I saw your ${project.title} work and would like a similar website for my practice.`);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950/20" />
              <span>Get Similar Website on WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
