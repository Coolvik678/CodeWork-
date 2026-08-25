"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
                    {/* Abstract Banana/Lightning SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 10.3 21.6 8.7 20.9 7.2L13 15L15 9C15 9 10 13 8 16L12 11L9.6 4.2C5.6 5.8 2.5 9.5 2 13.9C1.9 14.6 2 15.3 2 16L4 18V20L6 22H12Z" fill="url(#paint0_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F97316" />
                                <stop offset="1" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                        Nano Banana
                    </span>
                </div>

                <button className="relative group px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 overflow-hidden">
                    <span className="relative z-10 font-medium text-sm text-white drop-shadow-sm">Order Now</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/50 to-pink-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </nav>
    );
}
