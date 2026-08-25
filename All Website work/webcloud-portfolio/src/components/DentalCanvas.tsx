import React, { useEffect, useRef } from 'react';

interface DentalCanvasProps {
  totalFrames?: number;
}

export const DentalCanvas: React.FC<DentalCanvasProps> = ({ totalFrames = 60 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to window viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    const currentFrameRef = { current: 0 };

    // Generate high-resolution procedural frames simulating doctor examining mouth -> zoom into portal
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Use high-resolution Unsplash medical / dental examination sequence URLs
      const progress = i / (totalFrames - 1);
      
      // Sequence interpolation: frame 0 -> doctor examining, frame 30 -> zoom spotlight, frame 60 -> digital clinic portal
      if (progress < 0.4) {
        img.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600';
      } else if (progress < 0.7) {
        img.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1600';
      } else {
        img.src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600';
      }

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          renderFrame(0);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Render frame onto canvas with zoom & scale transform driven by scroll frame index
    const renderFrame = (frameIndex: number) => {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate cover dimensions
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const progress = frameIndex / (totalFrames - 1);
      // Apple-style scale zoom from 1.0 -> 3.5x as scroll progresses into the mouth portal
      const scale = 1.0 + progress * 2.5;

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );

      // Dark clinical spotlight vignette overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(7, 12, 20, 0.2)');
      gradient.addColorStop(0.7, 'rgba(7, 12, 20, 0.75)');
      gradient.addColorStop(1, 'rgba(7, 12, 20, 0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    // Scroll listener frame scrubbing
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrollFraction = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const targetFrame = Math.min(totalFrames - 1, Math.floor(scrollFraction * totalFrames));

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        requestAnimationFrame(() => renderFrame(targetFrame));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames]);

  return <canvas ref={canvasRef} className="canvas-fixed" />;
};
