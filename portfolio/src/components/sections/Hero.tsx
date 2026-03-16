'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import StickyNav from '@/components/layout/StickyNav';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black text-white">
      {/* Dynamic Granular Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-slow" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="flex-1 flex flex-col justify-end pb-10 px-4 md:px-10 z-10">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-nowrap items-baseline justify-center w-full leading-[0.85] mb-4 gap-[3vw]">
            <MagneticText className="text-[13.5vw] font-bold tracking-tight font-suisse py-4">
              ALAN
            </MagneticText>
            <MagneticText className="text-[13.5vw] font-serif italic font-playfair py-4">
              AYALA
            </MagneticText>
          </div>
        </div>
      </div>

      <StickyNav />
    </section>
  );
}

function MagneticText({ children, className }: { children: string; className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {children.split('').map((char, i) => (
        <MagneticChar key={i}>{char}</MagneticChar>
      ))}
    </div>
  );
}

function MagneticChar({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block cursor-default text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-white animate-gradient-fast bg-[length:200%_auto] py-4 px-2"
    >
      {children}
    </motion.span>
  );
}
