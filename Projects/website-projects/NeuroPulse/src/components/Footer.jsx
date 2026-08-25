import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-[#010102] rounded-t-[4rem] text-white overflow-hidden z-20 pt-24 pb-12 px-8 -mt-24">
            {/* Bioluminescent glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-biolum-green/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-10 relative">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <BrainCircuit className="text-biolum-green w-8 h-8" />
                        <span className="font-mono font-bold tracking-widest text-xl">NeuroPulse</span>
                    </div>
                    <p className="font-mono text-gray-400 text-sm max-w-sm leading-relaxed">
                        Neural architecture for augmented human computation.
                        Automated intelligence systems tailored for high-frequency thinkers.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 font-mono text-sm tracking-widest">
                    <div className="space-y-4 flex flex-col">
                        <h4 className="text-plasma-blue/50 mb-4">Architecture</h4>
                        <a href="#" className="hover:text-plasma-blue transition-colors">Documentation</a>
                        <a href="#" className="hover:text-plasma-blue transition-colors">API References</a>
                        <a href="#" className="hover:text-plasma-blue transition-colors">Changelog</a>
                    </div>
                    <div className="space-y-4 flex flex-col">
                        <h4 className="text-plasma-purple/50 mb-4">Foundation</h4>
                        <a href="#" className="hover:text-plasma-purple transition-colors">About</a>
                        <a href="#" className="hover:text-plasma-purple transition-colors">Security Node</a>
                        <a href="#" className="hover:text-plasma-purple transition-colors">Terms of Matrix</a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <p className="font-mono text-gray-600 text-xs">© 2026 NeuroPulse Systems. All connections secured.</p>

                {/* Pulsing "System Operational" UI indicator */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-biolum-green border border-biolum-green/20 px-4 py-2 rounded-full bg-biolum-green/5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-biolum-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-biolum-green shadow-neon-green"></span>
                    </span>
                    System Operational
                </div>
            </div>
        </footer>
    );
}
