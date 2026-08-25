import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Dental Practice' | 'Beauty & Editorial'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative text-white">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>THE TEETH SHOWCASE • FEATURED CLINICAL BUILDS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            High-Converting Dental & Studio Platforms
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 bg-black/60 p-1.5 rounded-full border border-white/15 w-fit backdrop-blur-md">
          {(['All', 'Dental Practice', 'Beauty & Editorial'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => onSelectProject(project)}
            className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-slate-900/90 border border-white/15 overflow-hidden shadow-xl hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/15">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{project.client} • {project.year}</span>
                  <span className="text-emerald-400 font-bold">
                    ✦ {project.stats[0]?.value}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 font-sans font-light line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Features Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.features.slice(0, 2).map((feat, fIdx) => (
                    <span key={fIdx} className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/40 border-t border-white/10 text-center">
              <span className="text-xs font-mono text-emerald-400 font-semibold group-hover:underline">
                View Full Case Study & Specs →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
