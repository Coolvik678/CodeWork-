import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Staggered fade-up
            gsap.fromTo(".fade-up",
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.2 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center px-8 md:px-16 overflow-hidden pt-40 pb-16">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-[-2]">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Biotech Void"
                    className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
                />
            </div>
            <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-plasma-blue/20 via-void to-void" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-[-1] bg-grid-pattern opacity-10" />

            <div className="max-w-7xl mx-auto w-full flex flex-col items-start z-10 relative">
                <div className="mb-6 fade-up">
                    <span className="font-mono text-plasma-blue border border-plasma-blue/30 rounded-full px-4 py-2 text-sm uppercase tracking-[0.2em] shadow-neon-blue bg-void/50 backdrop-blur-md">
                        Neural Architecture v4.2
                    </span>
                </div>

                {/* Strict Typographic Contrast */}
                <h1 className="flex flex-col gap-2">
                    <span className="font-sans font-bold text-6xl md:text-8xl tracking-tight text-white fade-up leading-[0.9]">
                        NEUROPULSE
                    </span>
                    <span className="font-serif italic text-7xl md:text-9xl text-gray-400 mt-2 fade-up leading-[0.8] opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
                        intelligent tools.
                    </span>
                </h1>

                <p className="mt-12 text-lg md:text-xl max-w-2xl font-mono text-gray-400 leading-relaxed fade-up">
                    An AI platform that helps people think, learn, and work <span className="text-plasma-blue">faster</span> using advanced biological algorithms. Automate your repetitive thinking tasks.
                </p>

                <div className="mt-16 flex items-center gap-6 fade-up">
                    <button className="magnetic-btn group relative overflow-hidden bg-plasma-blue text-void font-bold font-mono px-8 py-4 rounded uppercase tracking-widest text-sm shadow-neon-blue">
                        <span className="relative z-10">Activate Your AI Brain</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                    <a href="#demo" className="font-mono text-plasma-purple uppercase tracking-widest text-sm underline underline-offset-8 hover:text-white transition-colors duration-300">
                        Initialize Demo
                    </a>
                </div>
            </div>
        </section>
    );
}
