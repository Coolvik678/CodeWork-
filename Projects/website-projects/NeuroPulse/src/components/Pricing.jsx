import React from 'react';

const tiers = [
    {
        name: "Synapse Base",
        price: "Free",
        desc: "Basic thought organization and retrieval.",
        features: ["1,000 Neural Tokens/mo", "Standard Analysis", "Community Support"],
        popular: false
    },
    {
        name: "Cortical Plus",
        price: "$49/mo",
        desc: "Advanced learning algorithms and automation.",
        features: ["Unlimited Tokens", "Vector-spaced DB", "Priority Queue", "Visual Insights"],
        popular: true
    },
    {
        name: "Neural Nexus",
        price: "$199/mo",
        desc: "Complete enterprise brain automation cluster.",
        features: ["Custom Weights", "Deploy Agents", "API Architecture", "Dedicated Host"],
        popular: false
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-[#020205] relative w-full overflow-hidden flex justify-center px-8 border-t border-plasma-purple/20 shadow-neon-purple pb-48">
            {/* Background radial gradient corresponding to Bioluminescent UI effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-plasma-purple/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-6xl w-full z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-white text-center mb-16 tracking-tight">Access the Architecture</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
                    {tiers.map((tier, i) => (
                        <div key={i} className={`p-8 rounded-[2rem] flex flex-col h-full bg-void-light border w-full
              ${tier.popular ? 'border-plasma-purple shadow-neon-purple relative md:scale-105 py-12' : 'border-plasma-blue/20 '}
            `}>
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-plasma-purple text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest font-mono">
                                    Recommended Core
                                </div>
                            )}

                            <h3 className="font-mono text-xl text-white mb-2">{tier.name}</h3>
                            <p className="font-mono text-sm text-gray-500 mb-6">{tier.desc}</p>

                            <div className="text-5xl font-sans font-bold text-white tracking-tighter mb-8">
                                {tier.price}
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-mono text-gray-300">
                                        <span className={`w-2 h-2 rounded-full ${tier.popular ? 'bg-plasma-purple shadow-neon-purple' : 'bg-plasma-blue/50'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`magnetic-btn w-full py-4 rounded-xl font-mono text-sm uppercase tracking-widest transition-colors ${tier.popular
                                    ? 'bg-plasma-purple text-white hover:bg-plasma-purple/80'
                                    : 'border border-plasma-blue/30 text-plasma-blue hover:bg-plasma-blue/10'
                                }`}>
                                Initialize Protocol
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
