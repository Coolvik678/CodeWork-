import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // GSAP Context for morphing animation
        let ctx = gsap.context(() => {
            if (scrolled) {
                gsap.to(navRef.current, {
                    backgroundColor: 'rgba(10, 11, 20, 0.8)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    color: '#00f0ff',
                    duration: 0.4,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(navRef.current, {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(0px)',
                    border: '1px solid transparent',
                    color: '#d1d5db', // text-gray-300
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, [scrolled]);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
            <div
                ref={navRef}
                className="rounded-full px-8 py-4 flex items-center justify-between transition-shadow duration-300"
                style={{
                    boxShadow: scrolled ? '0 10px 30px -10px rgba(0,240,255,0.1)' : 'none'
                }}
            >
                <div className="flex items-center gap-3">
                    <BrainCircuit className={scrolled ? 'text-plasma-blue' : 'text-gray-300'} />
                    <span className="font-mono font-bold tracking-widest uppercase text-sm">NeuroPulse</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest">
                    <a href="#features" className="hover:text-plasma-purple transition-colors">Platform</a>
                    <a href="#philosophy" className="hover:text-plasma-purple transition-colors">Philosophy</a>
                    <a href="#pricing" className="hover:text-plasma-green transition-colors">Access</a>
                </div>

                <button className="magnetic-btn border border-plasma-blue/50 text-plasma-blue px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wide hover:bg-plasma-blue/10 hover:shadow-neon-blue">
                    Activate
                </button>
            </div>
        </nav>
    );
}
