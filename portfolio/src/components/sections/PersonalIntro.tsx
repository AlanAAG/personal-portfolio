'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';

// Animation Variant for the "Mask Reveal"
const textReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { 
    y: "0%",
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Helper for masking lines of text
const MaskedLine = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span className="block" variants={textReveal}>
      {children}
    </motion.span>
  </span>
);

export default function PersonalIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the image - moves slower than text
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Grid Container */}
      <div className="grid grid-cols-12 w-full h-full">
        
        {/* THE IMAGE (Far Left) */}
        {/* Occupies roughly 40-45% of width (5/12 columns) */}
        <motion.div 
          style={{ y: yImage }} 
          className="col-span-5 col-start-1 relative z-10 h-[85vh] w-full"
        >
          <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out">
            <Image
              src="/images/profile.png"
              alt="Alan Ayala"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>

        {/* THE TEXT */}
        <motion.div 
          className="col-span-12 md:col-span-7 md:col-start-5 absolute md:relative z-20 flex flex-col justify-center h-full px-6 md:px-0 mix-blend-difference"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={containerVariants}
        >
          {/* Overlapping Headline */}
          <div className="mb-12 whitespace-nowrap -ml-[10vw] z-30">
            <MaskedLine className="text-[12vw] font-bold font-sans tracking-tighter leading-[0.85] text-white">
              CREATIVE
            </MaskedLine>
            <MaskedLine className="text-[12vw] font-serif italic tracking-tight leading-[0.85] text-white/90">
              DEVELOPER
            </MaskedLine>
          </div>
           
          {/* BODY (Frames Image on Right) */}
          <div className="pl-10 md:pl-20 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed font-sans z-20 space-y-6">
            <MaskedLine>I engineer high-end digital experiences</MaskedLine>
            <MaskedLine>that blend performance with aesthetics.</MaskedLine>
            <br/>
            <MaskedLine>Specializing in Next.js, WebGL, and</MaskedLine>
            <MaskedLine>fluid motion systems, bridging the</MaskedLine>
            <MaskedLine>gap between design and mathematics.</MaskedLine>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
