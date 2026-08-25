import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain as BrainIcon, Network, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DiagnosticShuffler = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.shuffler-card');

            gsap.set(cards, { y: (i) => i * 40, scale: (i) => 1 - (i * 0.05), opacity: (i) => 1 - (i * 0.2), zIndex: (i) => cards.length - i });

            const tl = gsap.timeline({ repeat: -1, defaults: { ease: "elastic.out(1, 0.7)", duration: 2.5 } });

            tl.to(cards[0], { y: -120, opacity: 0, scale: 0.8, zIndex: 0 })
                .to(cards[1], { y: 0, scale: 1, opacity: 1, zIndex: 3 }, "<")
                .to(cards[2], { y: 40, scale: 0.95, opacity: 0.8, zIndex: 2 }, "<")
                .set(cards[0], { y: 80, scale: 0.9, opacity: 0.6 })

                // Step 2
                .to(cards[1], { y: -120, opacity: 0, scale: 0.8, zIndex: 0 }, "+=1")
                .to(cards[2], { y: 0, scale: 1, opacity: 1, zIndex: 3 }, "<")
                .to(cards[0], { y: 40, scale: 0.95, opacity: 0.8, zIndex: 2 }, "<")
                .set(cards[1], { y: 80, scale: 0.9, opacity: 0.6 })

                // Step 3
                .to(cards[2], { y: -120, opacity: 0, scale: 0.8, zIndex: 0 }, "+=1")
                .to(cards[0], { y: 0, scale: 1, opacity: 1, zIndex: 3 }, "<")
                .to(cards[1], { y: 40, scale: 0.95, opacity: 0.8, zIndex: 2 }, "<")
                .set(cards[2], { y: 80, scale: 0.9, opacity: 0.6 })
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-64 w-full max-w-sm flex items-center justify-center">
            {[1, 2, 3].map((i) => (
                <div key={i} className={`shuffler-card absolute w-full p-6 rounded-2xl border border-plasma-blue/20 bg-void-light/80 backdrop-blur-xl shadow-neon-blue`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-plasma-blue/10 p-3 rounded-xl border border-plasma-blue/20 text-plasma-blue text-xs uppercase tracking-widest font-mono">
                            Process ID {i}0{i}A
                        </div>
                        <BrainIcon className="text-plasma-blue w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-plasma-blue/20 rounded w-full" />
                        <div className="h-2 bg-plasma-blue/10 rounded w-4/5" />
                        <div className="h-2 bg-plasma-blue/5 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const textRef = useRef(null);
    const cursorRef = useRef(null);
    const [text, setText] = useState("");
    const fullText = "Accelerated Learning Protocol Initiated. Synthesizing topic vectors... Compressing conceptual abstractions into visual insights... Download complete.";

    useEffect(() => {
        let index = 0;
        let speed = 100;

        const typeText = () => {
            if (index < fullText.length) {
                setText((prev) => prev + fullText.charAt(index));
                index++;
                speed = speed * 0.9; // accelerate cursor
                if (speed < 10) speed = 10;
                setTimeout(typeText, speed);
            }
        };

        const scrollTrigger = ScrollTrigger.create({
            trigger: textRef.current,
            start: "top 80%",
            onEnter: () => setTimeout(typeText, 500),
            once: true
        });

        gsap.to(cursorRef.current, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.4,
            ease: "steps(1)"
        });

        return () => scrollTrigger.kill();
    }, []);

    return (
        <div className="w-full bg-void-light border border-plasma-purple/30 p-8 font-mono text-plasma-purple shadow-neon-purple rounded-xl min-h-[160px]">
            <div className="text-xs uppercase tracking-[0.3em] mb-4 text-gray-500">// NEURAL_SYNC_TML_v2</div>
            <p ref={textRef} className="text-sm md:text-base leading-relaxed">
                {text}
                <span ref={cursorRef} className="inline-block w-2.5 h-4 bg-plasma-purple ml-1 align-middle" />
            </p>
        </div>
    );
};

const CursorProtocolScheduler = () => {
    const svgRef = useRef(null);
    const cursorRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Basic Grid automation via Cursor
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, ease: "power1.inOut" });
            tl.to(cursorRef.current, { x: 80, y: 30, duration: 1 })
                .to(pathRef.current, { strokeDashoffset: 60, duration: 0.5 })  // drawing line
                .to(cursorRef.current, { x: 190, y: 110, duration: 1.2 })
                .to(pathRef.current, { strokeDashoffset: 0, duration: 0.8 })
                .to(cursorRef.current, { x: 250, y: 40, duration: 0.8, scale: 0.8 })
                .to(cursorRef.current, { scale: 1, duration: 0.2 }) // click state
                .to('.save-btn', { backgroundColor: '#00ff66', color: '#020205', duration: 0.2 }, "-=0.2")
                .to('.save-btn', { backgroundColor: 'transparent', color: '#00ff66', duration: 0.8, delay: 0.5 })
                .to(cursorRef.current, { x: 10, y: 10, duration: 1 })
                .set(pathRef.current, { strokeDashoffset: 120 })
        }, svgRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full h-[220px] bg-void border border-biolum-green/20 overflow-hidden flex flex-col items-center justify-center rounded-xl p-4">
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" style={{ backgroundSize: '30px 30px' }} />

            <svg ref={svgRef} className="w-full h-full z-10" viewBox="0 0 300 150">
                <path ref={pathRef} d="M80 30 L190 110" stroke="#00ff66" strokeWidth="2" fill="none" strokeDasharray="120" strokeDashoffset="120" />

                {/* Nodes */}
                <circle cx="80" cy="30" r="4" fill="#00ff66" />
                <circle cx="190" cy="110" r="4" fill="#00ff66" />

                {/* Save Deploy Button (Simulated) */}
                <g className="cursor-pointer" transform="translate(230, 25)">
                    <rect className="save-btn" width="60" height="30" rx="4" stroke="#00ff66" fill="transparent" strokeWidth="1" />
                    <text x="30" y="19" fill="#00ff66" className="save-btn" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1">DEPLOY</text>
                </g>

                {/* SVG Cursor */}
                <path ref={cursorRef} d="M10,10 L25,18 L18,22 L22,30 L18,32 L13,24 L6,28 Z" fill="white" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))" />
            </svg>
        </div>
    );
};

export default function Features() {
    return (
        <section id="features" className="py-32 w-full px-8 relative bg-void overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-32 relative z-10">
                <div className="font-mono text-plasma-blue text-sm uppercase tracking-[0.3em] font-bold">
                    Modular Processing /001
                </div>

                {/* Value Prop 1 */}
                <div className="w-full flex w-full flex-col md:flex-row items-center gap-12 md:gap-24 justify-between">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">AI Brain Assistant</h2>
                        <p className="font-mono text-gray-400 text-lg leading-relaxed">
                            Helps organize thoughts, generate ideas, and solve complex problems instantly. The Shuffler cycles diagnostics seamlessly.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <DiagnosticShuffler />
                    </div>
                </div>

                {/* Value Prop 2 */}
                <div className="w-full flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 justify-between">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">Accelerated Learning</h2>
                        <p className="font-mono text-gray-400 text-lg leading-relaxed">
                            Turn any topic into clear explanations, summaries, and visual insights mapped directly into your neural pathways.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <TelemetryTypewriter />
                    </div>
                </div>

                {/* Value Prop 3 */}
                <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-24 justify-between">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">Smart Workflow Automation</h2>
                        <p className="font-mono text-gray-400 text-lg leading-relaxed">
                            Automate repetitive thinking tasks so you focus on creativity and decisions. Visual deployment built-in.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <CursorProtocolScheduler />
                    </div>
                </div>

            </div>
        </section>
    );
}
