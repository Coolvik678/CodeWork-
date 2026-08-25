"use client";

import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ProductBottleScrollProps {
    folderPath: string;
}

export default function ProductBottleScroll({ folderPath }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 0 to 119 frames
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 120]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Image caching logic
        const imageObjects: HTMLImageElement[] = [];
        let loaded = 0;

        // Ensure canvas sizes correctly
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(Math.floor(frameIndex.get()));
        };

        window.addEventListener('resize', resize);
        resize();

        for (let i = 1; i <= 120; i++) {
            const img = new Image();
            img.src = `${folderPath}/${i}.webp`;
            img.onload = () => {
                loaded++;
                // If it's the first frame, draw it initially
                if (i === 1) {
                    renderFrame(1);
                }
            }
            // Add error handling to fall back to png if necessary or just skip if webp not available 
            // In typical setup, you'd ensure they all exist.
            imageObjects[i] = img;
        }

        function renderFrame(index: number) {
            if (!canvas || !context) return;
            const idx = Math.max(1, Math.min(120, index));
            const img = imageObjects[idx];
            if (img && img.complete) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                // "contain" drawing logic
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.min(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.drawImage(
                    img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        }

        // Subscribing to framer-motion value
        const unsubscribe = frameIndex.on("change", (latest) => {
            requestAnimationFrame(() => renderFrame(Math.floor(latest)));
        });

        return () => {
            window.removeEventListener('resize', resize);
            unsubscribe();
        };
    }, [folderPath, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
                />
            </div>
        </div>
    );
}
