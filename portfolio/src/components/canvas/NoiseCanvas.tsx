'use client';

import { useEffect, useRef } from 'react';

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Create random noise pattern once.
    const generateNoise = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;

      // Optimized single loop for static grain, bypassing continuous repaints
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 12; // Extremely subtle alpha (equivalent to ~0.047 opacity)
      }

      ctx.putImageData(imgData, 0, 0);
    };

    generateNoise();

    // Re-generate only on resize (debounced)
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(generateNoise, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay"
      aria-hidden="true"
    />
  );
}
