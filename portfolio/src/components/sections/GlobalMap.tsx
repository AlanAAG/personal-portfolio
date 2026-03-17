'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobalMap() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={container} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      
      {/* SVG Map Path */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full max-w-5xl" fill="none">
          {/* Subtle background path */}
          <path 
            d="M 100 250 Q 250 100 400 300 T 700 200 T 900 250" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          {/* Animated path connecting locations */}
          <motion.path 
            d="M 100 250 Q 250 100 400 300 T 700 200 T 900 250" 
            stroke="white" 
            strokeWidth="3"
            style={{ pathLength }}
          />
          
          {/* Node points */}
          <circle cx="100" cy="250" r="4" fill="white" />
          <circle cx="400" cy="300" r="4" fill="white" />
          <circle cx="700" cy="200" r="4" fill="white" />
          <circle cx="900" cy="250" r="4" fill="white" />
        </svg>
      </div>

      <div className="z-10 text-center mix-blend-difference pointer-events-none">
        <motion.h2 style={{ y }} className="text-[10vw] font-bold font-sans leading-none tracking-tighter">
          GLOBAL
        </motion.h2>
        <motion.h2 style={{ y }} className="text-[10vw] font-serif italic text-white/70 leading-none">
          EXPERIENCE
        </motion.h2>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-between px-10 font-mono text-xs text-white/50">
        <p>UAE → INDIA → SG → GHANA → SPAIN → EU → US</p>
        <p>REMOTE & ON-SITE</p>
      </div>
    </section>
  );
}
