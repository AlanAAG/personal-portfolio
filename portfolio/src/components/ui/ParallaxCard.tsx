'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  category: string;
  image: string;
  color: string;
}

export default function ParallaxCard({ project, index, range, targetScale }: { project: Project; index: number; range: number[]; targetScale: any }) {
  const container = useRef(null);
  const { title, category, image, color } = project;

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          backgroundColor: color, 
          scale: targetScale, 
          top: `calc(-5vh + ${index * 25}px)` 
        }} 
        className="flex flex-col relative w-[1000px] h-[500px] rounded-3xl p-12 origin-top transform-gpu border border-white/10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-black">{title}</h2>
          <span className="font-mono text-sm uppercase tracking-widest text-black/60">{category}</span>
        </div>
        
        <div className="flex h-full gap-12">
          <div className="w-[40%] flex flex-col justify-between text-black/80">
             <p className="text-lg leading-relaxed">
               A cutting-edge AI solution designed to revolutionize the way we interact with technology. 
               Built with precision and engineered for performance.
             </p>
             <div className="flex gap-4 font-mono text-xs">
               <span className="px-3 py-1 border border-black/20 rounded-full">Next.js</span>
               <span className="px-3 py-1 border border-black/20 rounded-full">OpenAI</span>
               <span className="px-3 py-1 border border-black/20 rounded-full">Tailwind</span>
             </div>
          </div>

          <motion.div 
            className="relative w-[60%] h-full rounded-2xl overflow-hidden cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-black/10 z-10" />
            {/* Placeholder for project image */}
            <div className="w-full h-full bg-gray-200 object-cover" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
