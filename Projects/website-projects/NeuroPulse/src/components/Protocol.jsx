import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        title: "Thought Distillation",
        desc: "We extract noise from conceptual abstraction.",
        art: (
            <svg viewBox="0 0 200 200" className="w-full h-full text-plasma-blue opacity-80 rotating-motif">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            </svg>
        )
    },
    {
        title: "Neural Sequencing",
        desc: "Mapping ideas into linear, executable tasks.",
        art: (
            <svg viewBox="0 0 200 200" className="w-full h-full text-plasma-purple opacity-80 waveform">
                <path d="M10 100 Q 40 20, 70 100 T 130 100 T 190 100" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M10 100 Q 40 160, 70 100 T 130 100 T 190 100" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
            </svg>
        )
    },
    {
        title: "Quantum Execution",
        desc: "Autonomous deployment of fully rendered intelligence.",
        art: (
            <svg viewBox="0 0 200 200" className="w-full h-full text-biolum-green opacity-80 scanner">
                <rect x="20" y="20" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="3" className="laser" />
            </svg>
        )
    }
];

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Art Animations
            gsap.to('.rotating-motif', { rotation: 360, duration: 20, repeat: -1, ease: 'linear', transformOrigin: "50% 50%" });
            gsap.to('.waveform path', { strokeDashoffset: -100, strokeDasharray: 100, duration: 4, repeat: -1, ease: 'linear' });
            gsap.to('.laser', { y: 60, yoyo: true, repeat: -1, duration: 1.5, ease: 'power1.inOut' });

            // Stacking Archive Logic
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    id: `card-${i}`,
                });
            });

            // Degradation logic
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Last card doesn't degrade

                gsap.to(card, {
                    scale: 0.9,
                    filter: "blur(10px)",
                    opacity: 0.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-void">
            {protocols.map((protocol, i) => (
                <div key={i} className="protocol-card w-full h-[100dvh] flex items-center justify-center p-8 absolute top-0 left-0 bg-void border-t border-plasma-blue/10">
                    <div className="absolute inset-0 bg-plasma-gradient opacity-10 pointer-events-none" />

                    <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10 p-12 bg-void-light border border-plasma-blue/20 rounded-[2rem] shadow-2xl">
                        <div className="w-full md:w-1/2 space-y-6">
                            <span className="font-mono text-plasma-blue text-sm uppercase tracking-[0.2em]">Protocol / 0{i + 1}</span>
                            <h2 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight">{protocol.title}</h2>
                            <p className="font-mono text-xl text-gray-400">{protocol.desc}</p>
                        </div>

                        <div className="w-full md:w-1/2 flex items-center justify-center relative">
                            <div className="relative w-64 h-64 flex items-center justify-center bg-void border border-plasma-blue/20 rounded-full shadow-neon-blue">
                                {protocol.art}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div style={{ height: `${protocols.length * 100}vh` }} />
        </section>
    );
}
