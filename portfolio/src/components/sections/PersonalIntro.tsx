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
      
      {/* Wrapper forcing content inside frame limits - NEW FLEX LAYOUT */}
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 relative z-20 mix-blend-difference flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-center">
        
        {/* THE IMAGE (Left Column) */}
        <motion.div 
          style={{ y: yImage }} 
          className="relative z-10 w-full lg:w-1/2 h-[50vh] md:h-[65vh] lg:h-[75vh] rounded-2xl overflow-hidden shadow-2xl shrink-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="dubai_2"
              alt="Alan Ayala in Dubai"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* THE TEXT (Right Column) */}
        <div className="z-20 flex-1 flex flex-col justify-center">
          
          <div className="mb-10 flex flex-col font-sans font-bold tracking-tighter text-[11vw] md:text-[6.5vw] lg:text-[5vw] leading-[0.9] text-white">
            <div className="block">
              <ScrollRevealText text="AI-DRIVEN" progress={scrollYProgress} delayStart={0} delayEnd={0.2} />
            </div>
            <div className="block lg:-ml-2 mt-2">
              <ScrollRevealText text="TECHNICAL FOUNDER" progress={scrollYProgress} delayStart={0.1} delayEnd={0.3} className="font-serif italic tracking-tight font-normal text-white/90" />
            </div>
          </div>
           
          {/* BODY (Normalized Typography) */}
          <div className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/80 font-sans font-light">
            <ScrollRevealText 
              text="I am a Management & Technology student at Tetr College of Business, currently navigating a global rotation across the UAE, India, and beyond. My work lives at the edge of Full-Stack Development and Venture Building. Whether I’m engineering scalable AI Tutor platforms or launching D2C brands in new markets, I am driven by a single goal: building products that solve real problems with elegant code." 
              progress={scrollYProgress} 
              delayStart={0.2} 
              delayEnd={0.9} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
