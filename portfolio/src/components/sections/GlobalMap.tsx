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

  return (
    <section ref={container} className="h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
         {/* Placeholder for Globe/Map Visual */}
         <div className="w-[80vw] h-[80vw] border border-white/20 rounded-full animate-spin-slow" />
      </div>

      <div className="z-10 text-center mix-blend-difference">
        <motion.h2 style={{ y }} className="text-[10vw] font-bold font-inter leading-none">
          GLOBAL
        </motion.h2>
        <motion.h2 style={{ y }} className="text-[10vw] font-serif italic font-fraunces leading-none">
          EXPERIENCE
        </motion.h2>
      </div>
      
      <div className="absolute bottom-20 left-10 font-mono text-xs text-white/50">
        <p>WORKING WORLDWIDE</p>
        <p>REMOTE & ON-SITE</p>
      </div>
    </section>
  );
}
