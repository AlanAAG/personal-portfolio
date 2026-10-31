'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';

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
  const { lang } = useLang();
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
              alt={lang === 'es' ? 'Alan Ayala en Dubái' : 'Alan Ayala in Dubai'}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* THE TEXT (Right Column) */}
        <div className="z-20 flex-1 flex flex-col justify-center">
          
          <div className="mb-10 flex flex-col font-sans font-bold tracking-tighter text-[10vw] md:text-[6.5vw] lg:text-[5vw] leading-[0.9] text-white">
            <div className="block">
              <ScrollRevealText text={lang === 'es' ? 'TRANSFORMACIÓN' : 'DIGITAL'} progress={scrollYProgress} delayStart={0} delayEnd={0.2} />
            </div>
            <div className="block lg:-ml-2 mt-2">
              <ScrollRevealText text={lang === 'es' ? 'DIGITAL' : 'TRANSFORMATION'} progress={scrollYProgress} delayStart={0.1} delayEnd={0.3} className="font-serif italic tracking-tight font-normal text-white/90" />
            </div>
          </div>
           
          {/* BODY (Normalized Typography) */}
          <div className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/80 font-sans font-light">
            <ScrollRevealText 
              text={lang === 'es'
                ? 'Me especializo en transformación digital de negocios. Uso IA, software y estrategia de producto para hacer más eficientes las operaciones y generar valor económico para las empresas. He creado sistemas multiagente y RAG, vendido software educativo a instituciones y entregado productos digitales a más de 35 clientes.'
                : 'I specialize in digital business transformation. I use AI, software and product strategy to make operations more efficient and create economic value for businesses. I have built multi-agent and RAG systems, sold EdTech software to institutions, and delivered digital products for 35+ clients.'}
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
