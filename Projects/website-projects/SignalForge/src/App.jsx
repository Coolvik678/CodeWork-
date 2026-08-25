import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Cpu, Zap, Activity, Shield, Terminal, Clock, LayoutTemplate } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Component A: Navbar ---
const Navbar = () => {
    const navRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    className: 'scrolled-nav',
                    targets: navRef.current
                }
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-in-out px-8 py-4 rounded-full flex items-center gap-12 w-[90%] max-w-5xl"
        >
            <div className="font-sans font-bold text-xl tracking-tight text-surface">SignalForge</div>
            <div className="hidden md:flex items-center gap-8 font-mono text-sm text-surface/80">
                <a href="#features" className="hover:text-accent transition-colors hover:-translate-y-px inline-block">Features</a>
                <a href="#manifesto" className="hover:text-accent transition-colors hover:-translate-y-px inline-block">Manifesto</a>
                <a href="#protocol" className="hover:text-accent transition-colors hover:-translate-y-px inline-block">Protocol</a>
            </div>
            <div className="ml-auto">
                <button className="magnetic-btn group relative overflow-hidden bg-accent text-background px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    <span className="relative z-10">Start Building Now</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-[#e0c068] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </button>
            </div>
        </nav>
    );
};

// --- Component B: Hero ---
const Hero = () => {
    const heroRef = useRef(null);
    const textRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRefs.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1590605996024-b1eb211d2d3a?q=80&w=2940&auto=format&fit=crop"
                    alt="Dark marble texture"
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-5xl">
                <h1 className="flex flex-col gap-2">
                    <span
                        ref={el => textRefs.current[0] = el}
                        className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-surface/90"
                    >
                        AI tools that turn ideas into
                    </span>
                    <span
                        ref={el => textRefs.current[1] = el}
                        className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-accent leading-[0.9] tracking-tight -ml-2"
                    >
                        working digital products instantly.
                    </span>
                </h1>
                <div ref={el => textRefs.current[2] = el} className="mt-12 flex gap-4">
                    <button className="magnetic-btn group relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans font-semibold text-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                        <span className="relative z-10">Start Building Now</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-[#e0c068] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- Component C: Features (Interactive Cards) ---

const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, title: 'Web App', icon: LayoutTemplate, desc: 'Full-stack React + Node architecture generated in seconds.' },
        { id: 2, title: 'Internal Tool', icon: Terminal, desc: 'Secure data dashes connected to your precise schema.' },
        { id: 3, title: 'Mobile Prototype', icon: Box, desc: 'React Native responsive layouts ready for device testing.' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-64 w-full flex items-center justify-center pt-8">
            {cards.map((card, i) => (
                <div
                    key={card.id}
                    className="absolute w-[85%] bg-darkText/40 border border-white/5 backdrop-blur-md rounded-3xl p-6 transition-all duration-[800ms] shadow-2xl"
                    style={{
                        transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
                        zIndex: 10 - i,
                        opacity: 1 - i * 0.2,
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    <div className="flex items-center gap-3 mb-3 text-accent"><card.icon size={20} /> <span className="font-mono text-xs text-surface/60">Module {card.id}</span></div>
                    <h3 className="font-sans font-semibold text-lg text-surface mb-1">{card.title}</h3>
                    <p className="font-sans text-sm text-surface/60 line-clamp-2">{card.desc}</p>
                </div>
            ))}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const [text, setText] = useState('');
    const fullText = "Analyzing schema dependencies...\nOptimizing render cycles...\nDeploying edge functions...\nSub-100ms response verified.";
    const index = useRef(0);

    useEffect(() => {
        const type = () => {
            if (index.current < fullText.length) {
                setText(prev => prev + fullText.charAt(index.current));
                index.current++;
                setTimeout(type, Math.random() * 50 + 20);
            } else {
                setTimeout(() => {
                    setText('');
                    index.current = 0;
                    type();
                }, 4000);
            }
        };
        setTimeout(type, 1000);
    }, []);

    return (
        <div className="h-64 bg-[#0a0a0f] rounded-3xl p-6 border border-white/5 flex flex-col font-mono text-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-surface/40 uppercase tracking-wider text-xs">Live Synthesis Feed</span>
            </div>
            <div className="text-accent/90 whitespace-pre-line leading-relaxed flex-1">
                {text}<span className="inline-block w-2 bg-accent h-4 ml-1 align-middle animate-pulse"></span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none"></div>
        </div>
    );
}

const CursorProtocolScheduler = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });
            const cursor = canvasRef.current.querySelector('.cursor-svg');
            const cell = canvasRef.current.querySelector('.target-cell');
            const btn = canvasRef.current.querySelector('.deploy-btn');

            tl.set(cursor, { x: 0, y: 150, opacity: 0 })
                .to(cursor, { opacity: 1, duration: 0.3 })
                .to(cursor, { x: 80, y: 40, duration: 0.8 })
                .to(cursor, { scale: 0.8, duration: 0.1 })
                .to(cell, { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.1 }, "<")
                .to(cursor, { scale: 1, duration: 0.1 })
                .to(cursor, { x: 180, y: 120, duration: 0.6, delay: 0.2 })
                .to(cursor, { scale: 0.8, duration: 0.1 })
                .to(btn, { scale: 0.95, backgroundColor: '#b39543', duration: 0.1 }, "<")
                .to(btn, { scale: 1, backgroundColor: '#C9A84C', duration: 0.1 })
                .to(cursor, { scale: 1, duration: 0.1 }, "<")
                .to(cursor, { opacity: 0, delay: 0.5, duration: 0.3 })
                .set(cell, { backgroundColor: 'transparent', color: '#FAF8F5' })
                .set(btn, { backgroundColor: 'transparent' });
        }, canvasRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={canvasRef} className="h-64 relative bg-darkText/20 rounded-3xl p-6 border border-white/5 flex flex-col">
            <div className="flex justify-between text-surface/40 font-mono text-xs mb-4">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-2 flex-1 relative">
                {Array.from({ length: 21 }).map((_, i) => (
                    <div key={i} className={`rounded-md border border-white/5 flex items-center justify-center text-xs font-mono transition-colors ${i === 10 ? 'target-cell' : ''}`}>
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
                <div className="deploy-btn border border-accent text-accent px-4 py-1.5 rounded-full text-xs font-mono">Deploy</div>
            </div>

            {/* Cursor SVG */}
            <svg className="cursor-svg absolute z-10 w-6 h-6 text-surface drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 5.333-7.538 2.04L10.333 19 4 4z" />
            </svg>
        </div>
    )
}

const Features = () => {
    return (
        <section id="features" className="py-32 px-8 md:px-16 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="bg-[#121218] rounded-[2.5rem] p-8 border border-white/5 overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                    <div className="mb-6">
                        <h2 className="font-sans font-bold text-2xl text-surface mb-2">Instant Product Creation</h2>
                        <p className="font-sans text-surface/60 text-sm">Turn raw ideas into functional websites, apps, and internal tools within minutes.</p>
                    </div>
                    <DiagnosticShuffler />
                </div>

                {/* Card 2 */}
                <div className="bg-[#121218] rounded-[2.5rem] p-8 border border-white/5 overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                    <div className="mb-6">
                        <h2 className="font-sans font-bold text-2xl text-surface mb-2">AI-Powered Precision</h2>
                        <p className="font-sans text-surface/60 text-sm">Advanced AI architecture that designs, builds, and optimizes automatically.</p>
                    </div>
                    <TelemetryTypewriter />
                </div>

                {/* Card 3 */}
                <div className="bg-[#121218] rounded-[2.5rem] p-8 border border-white/5 overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                    <div className="mb-6">
                        <h2 className="font-sans font-bold text-2xl text-surface mb-2">Launch Faster Than Ever</h2>
                        <p className="font-sans text-surface/60 text-sm">Go from concept to deployment without coding or complex infrastructure setup.</p>
                    </div>
                    <CursorProtocolScheduler />
                </div>

            </div>
        </section>
    );
};

// --- Component D: Philosophy ---
const Philosophy = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.manifesto-line', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="manifesto" ref={sectionRef} className="relative py-40 px-8 md:px-16 w-full overflow-hidden flex items-center justify-center min-h-[70vh]">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Dark abstract texture"
                    className="w-full h-full object-cover opacity-20 mix-blend-luminosity parallax-bg"
                    data-speed="0.5"
                />
                <div className="absolute inset-0 bg-background/90"></div>
            </div>

            <div className="relative z-10 max-w-4xl text-center flex flex-col gap-12">
                <p className="manifesto-line font-sans text-xl md:text-2xl text-surface/50 font-medium">
                    Most tools focus on: <span className="text-surface/80">complex setup and endless configuration.</span>
                </p>
                <p className="manifesto-line font-serif italic text-4xl md:text-6xl lg:text-7xl text-surface leading-tight">
                    We focus on: <br />
                    <span className="text-accent inline-block mt-4">immediate deployable precision.</span>
                </p>
            </div>
        </section>
    );
};

// --- Component E: Protocol (Stacking Cards) ---
const Protocol = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (index === cardsRef.current.length - 1) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    endTrigger: containerRef.current,
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.3,
                    filter: 'blur(10px)',
                    scrollTrigger: {
                        trigger: cardsRef.current[index + 1],
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const steps = [
        {
            num: '01', title: 'Conceptual Synthesis', desc: 'Input raw ideas. SignalForge maps the semantic intent to structural architecture.',
            graphic: (
                <svg className="w-full h-full text-surface/20 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="30" />
                    <path d="M50 10 L50 90 M10 50 L90 50" opacity="0.5" />
                </svg>
            )
        },
        {
            num: '02', title: 'Algorithmic Assembly', desc: 'AI agents select optimal tech stacks and write deployment-ready code.',
            graphic: (
                <div className="w-full h-full relative border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between p-4">
                    <div className="w-full h-px bg-accent absolute top-1/2 left-0 shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-[ping_3s_ease-in-out_infinite]"></div>
                    <div className="flex gap-2"> <div className="w-4 h-4 bg-white/10 rounded"></div> <div className="w-8 h-4 bg-white/10 rounded"></div> </div>
                    <div className="flex gap-2 self-end"> <div className="w-12 h-4 bg-white/10 rounded"></div> <div className="w-4 h-4 bg-white/10 rounded"></div> </div>
                </div>
            )
        },
        {
            num: '03', title: 'Instant Deployment', desc: 'Secure connection to global edge networks. Live within seconds.',
            graphic: (
                <svg className="w-full h-full text-accent" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M0 25 L30 25 L40 5 L60 45 L70 25 L100 25" style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: 'dash 3s linear infinite' }} />
                    <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                </svg>
            )
        }
    ];

    return (
        <section id="protocol" ref={containerRef} className="relative w-full pb-32">
            {steps.map((step, i) => (
                <div
                    key={i}
                    ref={el => cardsRef.current[i] = el}
                    className="h-[100dvh] w-full flex items-center justify-center p-8 md:p-16 sticky top-0"
                >
                    <div className="bg-[#101015] border border-white/5 rounded-[3rem] w-full max-w-6xl h-[80vh] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 shadow-2xl relative overflow-hidden">

                        {/* Text Content */}
                        <div className="flex-1 z-10">
                            <div className="font-mono text-accent text-xl mb-6">/ {step.num}</div>
                            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-surface mb-6 tracking-tight">{step.title}</h2>
                            <p className="font-sans text-xl text-surface/60 max-w-md">{step.desc}</p>
                        </div>

                        {/* Graphic Container */}
                        <div className="flex-1 w-full h-full relative z-0 flex items-center justify-center opacity-80 mix-blend-screen">
                            <div className="w-64 h-64 md:w-96 md:h-96">
                                {step.graphic}
                            </div>
                        </div>

                        {/* Very subtle noise on card */}
                        <div className="absolute inset-0 noise-overlay opacity-[0.02]"></div>
                    </div>
                </div>
            ))}
        </section>
    );
};

// --- Component F: Pricing ---
const Pricing = () => {
    return (
        <section className="py-32 px-8 md:px-16 w-full max-w-7xl mx-auto">
            <div className="text-center mb-24">
                <h2 className="font-serif italic text-5xl md:text-7xl text-surface mb-6">Select your forge.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Tier 1 */}
                <div className="bg-[#121218] border border-white/5 rounded-[2.5rem] p-10 flex flex-col">
                    <h3 className="font-mono text-surface/60 text-sm mb-4 uppercase tracking-wider">Creator</h3>
                    <div className="font-sans font-bold text-4xl text-surface mb-2">$49<span className="text-lg text-surface/40 font-normal">/mo</span></div>
                    <p className="font-sans text-sm text-surface/60 mb-8 border-b border-white/5 pb-8">For individuals forging new digital concepts.</p>
                    <ul className="flex flex-col gap-4 font-sans text-sm text-surface/80 flex-1 mb-8">
                        <li className="flex items-center gap-3"><Zap size={16} className="text-accent/50" /> 10 Projects / month</li>
                        <li className="flex items-center gap-3"><Activity size={16} className="text-accent/50" /> Standard AI Models</li>
                        <li className="flex items-center gap-3"><Box size={16} className="text-accent/50" /> Community Support</li>
                    </ul>
                    <button className="w-full py-3 rounded-full border border-white/10 font-sans font-medium hover:bg-white/5 transition-colors">Start Building</button>
                </div>

                {/* Tier 2 (Highlighted) */}
                <div className="bg-accent border-2 border-accent rounded-[3rem] p-10 flex flex-col relative transform md:scale-105 shadow-[0_0_50px_rgba(201,168,76,0.15)] z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-accent px-4 py-1 rounded-full text-xs font-mono border border-accent">RECOMMENDED</div>
                    <h3 className="font-mono text-background/60 text-sm mb-4 uppercase tracking-wider font-semibold">Studio</h3>
                    <div className="font-sans font-bold text-5xl text-background mb-2">$149<span className="text-lg text-background/60 font-normal">/mo</span></div>
                    <p className="font-sans text-sm text-background/80 mb-8 border-b border-background/20 pb-8 font-medium">For teams deploying products to production.</p>
                    <ul className="flex flex-col gap-4 font-sans text-sm text-background font-medium flex-1 mb-10">
                        <li className="flex items-center gap-3"><Zap size={18} className="text-background" /> Unlimited Projects</li>
                        <li className="flex items-center gap-3"><Cpu size={18} className="text-background" /> Pro AI Models (GPT-4o, Claude 3.5)</li>
                        <li className="flex items-center gap-3"><Clock size={18} className="text-background" /> Priority Edge Deployment</li>
                    </ul>
                    <button className="w-full py-4 rounded-full bg-background text-accent font-sans font-semibold hover:bg-[#1a1a24] transition-colors hover:scale-[1.02] active:scale-[0.98]">Deploy Studio</button>
                </div>

                {/* Tier 3 */}
                <div className="bg-[#121218] border border-white/5 rounded-[2.5rem] p-10 flex flex-col">
                    <h3 className="font-mono text-surface/60 text-sm mb-4 uppercase tracking-wider">Enterprise</h3>
                    <div className="font-sans font-bold text-4xl text-surface mb-2">Custom</div>
                    <p className="font-sans text-sm text-surface/60 mb-8 border-b border-white/5 pb-8">For organizations requiring private infrastructure.</p>
                    <ul className="flex flex-col gap-4 font-sans text-sm text-surface/80 flex-1 mb-8">
                        <li className="flex items-center gap-3"><Shield size={16} className="text-accent/50" /> Dedicated VPC</li>
                        <li className="flex items-center gap-3"><Cpu size={16} className="text-accent/50" /> Custom Model Fine-tuning</li>
                        <li className="flex items-center gap-3"><Activity size={16} className="text-accent/50" /> SLA & 24/7 Support</li>
                    </ul>
                    <button className="w-full py-3 rounded-full border border-white/10 font-sans font-medium hover:bg-white/5 transition-colors">Contact Sales</button>
                </div>
            </div>
        </section>
    );
}

// --- Component G: Footer ---
const Footer = () => {
    return (
        <footer className="bg-[#050508] mt-32 rounded-t-[4rem] px-8 md:px-16 pt-24 pb-12 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 mb-24">
                <div className="flex flex-col gap-6 max-w-sm">
                    <div className="font-sans font-bold text-3xl tracking-tight text-surface">SignalForge</div>
                    <p className="font-sans text-surface/40 text-sm leading-relaxed">AI tools that turn ideas into working digital products instantly. Precision engineering meets raw computational power.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm font-sans">
                    <div className="flex flex-col gap-4">
                        <div className="text-surface/40 font-mono text-xs uppercase mb-2">Platform</div>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Features</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Integrations</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Pricing</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-surface/40 font-mono text-xs uppercase mb-2">Resources</div>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Documentation</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">API Reference</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Blog</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-surface/40 font-mono text-xs uppercase mb-2">Company</div>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">About</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Careers</a>
                        <a href="#" className="text-surface/80 hover:text-accent transition-colors">Legal</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                    <span className="font-mono text-xs text-surface/60">System Operational</span>
                </div>
                <div className="font-mono text-xs text-surface/30">
                    &copy; {new Date().getFullYear()} SignalForge. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

// --- Main App Combiner ---
function App() {
    return (
        <div className="relative w-full min-h-screen">
            <div className="noise-overlay"></div>

            {/* Dynamic Nav Styling */}
            <style>{`
        .scrolled-nav {
          background-color: rgba(13, 13, 18, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

            <Navbar />
            <main>
                <Hero />
                <Features />
                <Philosophy />
                <Protocol />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}

export default App;
