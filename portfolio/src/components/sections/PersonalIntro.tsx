'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';

// Animation Variant for the "Blur Reveal"
const textReveal: Variants = {
  hidden: { filter: "blur(15px)", opacity: 0, y: 50 },
  visible: { 
    filter: "blur(0px)", 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
  }
};

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
            {/* Optional overlay for better text contrast if needed, though mix-blend handles it */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </motion.div>

        {/* THE TEXT (Overlapping Headline + Right-side Body) */}
        <motion.div 
          className="col-span-7 col-start-5 relative z-20 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
        >
           
           {/* BODY (Frames Image on Right) */}
           <motion.div 
              variants={textReveal} 
              className="pl-10 md:pl-20 max-w-xl text-lg md:text-xl text-white leading-relaxed"
           >

           </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
