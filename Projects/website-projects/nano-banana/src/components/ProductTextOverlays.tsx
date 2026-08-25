"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TextOverlayProps {
    section1: { title: string; subtitle: string; };
    section2: { title: string; subtitle: string; };
    section3: { title: string; subtitle: string; };
    section4: { title: string; subtitle: string; };
}

export default function ProductTextOverlays({
    section1, section2, section3, section4
}: TextOverlayProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    // Fades and translates based on scroll position 0.0 to 1.0 (across 500vh)

    // Section 1 (0.0 to 0.2)
    const o1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2 (0.2 to 0.4)
    const o2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

    // Section 3 (0.4 to 0.6)
    const o3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [50, 0, -50]);

    // Section 4 (0.6 to 0.8)
    const o4 = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [50, 0, -50]);

    return (
        <div ref={ref} className="absolute inset-0 z-10 pointer-events-none">

            {/* Section 1 */}
            <motion.div style={{ opacity: o1, y: y1 }} className="fixed top-[40%] text-center w-full px-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-2xl">{section1.title}</h1>
                <p className="text-xl md:text-2xl mt-4 max-w-xl mx-auto drop-shadow-lg">{section1.subtitle}</p>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ opacity: o2, y: y2 }} className="fixed top-[40%] text-center w-full px-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-2xl">{section2.title}</h2>
                <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto font-light">{section2.subtitle}</p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ opacity: o3, y: y3 }} className="fixed top-[40%] text-center w-full px-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-2xl">{section3.title}</h2>
                <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto font-light">{section3.subtitle}</p>
            </motion.div>

            {/* Section 4 */}
            <motion.div style={{ opacity: o4, y: y4 }} className="fixed top-[40%] text-center w-full px-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-2xl">{section4.title}</h2>
                <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto font-light">{section4.subtitle}</p>
            </motion.div>

        </div>
    );
}
