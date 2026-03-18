'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

const ScrollRevealWord = ({
  word,
  progress,
  startPoint,
  endPoint
}: {
  word: string;
  progress: MotionValue<number>;
  startPoint: number;
  endPoint: number;
}) => {
  const opacity = useTransform(progress, [startPoint, endPoint], [0.15, 1]);
  const y = useTransform(progress, [startPoint, endPoint], [15, 0]);

  return (
    <span className="inline-block mr-[0.25em] mb-[0.1em]">
      <motion.span className="inline-block" style={{ opacity, y }}>
        {word}
      </motion.span>
    </span>
  );
};

const ScrollRevealText = ({
  text,
  progress,
  className = '',
  delayStart = 0.2, // When this block starts revealing
  delayEnd = 0.6    // When this block finishes revealing
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  delayStart?: number;
  delayEnd?: number;
}) => {
  const words = text.split(' ');
  const step = (delayEnd - delayStart) / words.length;

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => {
        const startPoint = delayStart + i * step;
        const endPoint = startPoint + step;
        return (
          <ScrollRevealWord
            key={i}
            word={word}
            progress={progress}
            startPoint={startPoint}
            endPoint={endPoint}
          />
        );
      })}
    </span>
  );
};

export default function PersonalIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start revealing slightly below center to ensure full length tracks smoothly through
    offset: ["start center", "end end"] 
  });

  // Parallax for the image - moves slower than text
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="min-h-screen bg-transparent text-white pt-[20vh] pb-32 relative overflow-hidden">
      
      {/* Wrapper forcing content inside frame limits */}
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 relative z-20 mix-blend-difference">
        
        {/* THE IMAGE (Floated Left so text wraps around it natively) */}
        <motion.div 
          style={{ y: yImage }} 
          className="float-none lg:float-left relative z-10 w-full lg:w-[45%] h-[50vh] md:h-[65vh] lg:mr-16 mb-12 rounded-2xl overflow-hidden shadow-2xl"
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
        <div className="pt-4 md:pt-10 z-20">
          
          <div className="mb-12 flex flex-col font-sans font-bold tracking-tighter text-[14vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.85] text-white">
            <div className="block">
              <ScrollRevealText text="CREATIVE" progress={scrollYProgress} delayStart={0} delayEnd={0.2} />
            </div>
            <div className="block">
              <ScrollRevealText text="DEVELOPER" progress={scrollYProgress} delayStart={0.1} delayEnd={0.3} className="font-serif italic tracking-tight font-normal text-white/90" />
            </div>
          </div>
           
          {/* BODY */}
          <div className="text-xl md:text-3xl lg:text-[2.2rem] leading-[1.3] text-white font-sans uppercase">
            <ScrollRevealText 
              text="I ENGINEER HIGH-END DIGITAL EXPERIENCES THAT BLEND PERFORMANCE WITH AESTHETICS. SPECIALIZING IN NEXT.JS, WEBGL, AND FLUID MOTION SYSTEMS, BRIDGING THE GAP BETWEEN DESIGN AND MATHEMATICS." 
              progress={scrollYProgress} 
              delayStart={0.2} 
              delayEnd={0.9} 
            />
          </div>
        </div>

        {/* Clear the float so parent container captures true height */}
        <div className="clear-both"></div>
      </div>
    </section>
  );
}
