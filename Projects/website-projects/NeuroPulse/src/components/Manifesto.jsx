import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const manifestoText = "While the world relies on scattered thoughts and disconnected tools, we build integrated cortical infrastructure. We do not augment your speed; we fundamentally rewrite the velocity of your cognition.";

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax Background
            gsap.to('.parallax-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Word-by-word reveal
            const words = gsap.utils.toArray('.manifesto-word');
            gsap.fromTo(words,
                { opacity: 0.1, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 75%",
                        end: "bottom 40%",
                        scrub: 1,
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#010102]">
            {/* Slow Parallaxing Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none parallax-bg overflow-hidden scale-110">
                <svg className="w-full h-full" filter="url(#noise)">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" fill="transparent" />
                </svg>
            </div>

            <div className="absolute inset-0 z-0 bg-gradient-radial from-plasma-blue/5 via-void to-void" />

            <div className="max-w-5xl mx-auto px-8 py-32 relative z-10 font-sans z-10 text-center">
                <h3 className="font-mono text-plasma-blue uppercase tracking-[0.4em] text-sm mb-12">The Manifesto</h3>
                <p ref={textRef} className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tight text-white flex flex-wrap justify-center gap-3 md:gap-4">
                    {manifestoText.split(" ").map((word, index) => (
                        <span key={index} className="manifesto-word inline-block">{word}</span>
                    ))}
                </p>
            </div>
        </section>
    );
}
