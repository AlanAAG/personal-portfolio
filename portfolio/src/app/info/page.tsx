'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';

export default function InfoPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.3], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative bg-black min-h-[300vh]">
      {/* Horizontal Section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x, opacity, scale }} className="flex h-full w-[200vw]">
          <div className="w-screen h-full flex items-center justify-center bg-neutral-900 border-r border-white/10">
            <h1 className="text-[15vw] font-bold text-white font-inter">INFO</h1>
          </div>
          <div className="w-screen h-full flex items-center justify-center bg-neutral-900">
             <div className="max-w-4xl p-20">
                <p className="text-4xl md:text-6xl font-light text-white leading-tight">
                  "I build digital experiences that <span className="font-serif italic text-white/50">defy</span> expectations."
                </p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Content */}
      <div className="relative z-10 bg-black mt-[-100vh] pt-[100vh]">
        <About />
        <Skills />
      </div>
    </main>
  );
}
