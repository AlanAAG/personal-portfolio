'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── MagneticElement ──────────────────────────────────────────────────────────
// Physics applied to the CONTAINER, not individual characters.
// One onMouseMove event, one spring animation — O(1) cost regardless of text length.

function MagneticElement({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (left + width / 2)) * strength);
    rawY.set((e.clientY - (top + height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-wrap ${className ?? ''}`}
      whileHover="visible"
      initial="hidden"
      animate="hidden"
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedWord ─────────────────────────────────────────────────────────────
// Splits text into characters, each masked by overflow-hidden.
// They animate into view when hovered via staggerChildren propagated from MagneticElement.

function AnimatedWord({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-flex overflow-visible ${className ?? ''}`}
      variants={containerVariants}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="text-mask">
          <motion.span
            className="inline-block"
            variants={letterVariants}
            style={{ y: '0%' }} // Keep visible initially in normal state
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black text-white">

      {/* Subtle radial vignette — cheap gradient, no repaint */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,57,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Main name block */}
      <div className="flex-1 flex flex-col justify-end pb-8 px-4 md:px-10 z-10">
        <div className="w-full flex flex-col items-center">

          {/* ALAN AYALA — two magnetic word containers */}
          <div className="flex flex-nowrap items-baseline justify-center w-full leading-[0.82] mb-2 gap-[2.5vw]">

            <MagneticElement>
              <AnimatedWord
                text="ALAN"
                className="text-[13.5vw] font-bold tracking-tight font-sans text-white"
              />
            </MagneticElement>

            <MagneticElement>
              <AnimatedWord
                text="AYALA"
                className="text-[13.5vw] font-serif italic tracking-tight text-white"
              />
            </MagneticElement>

          </div>

          {/* Descriptor line */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 pt-6 pb-2"
          >
            <span className="h-[1px] w-12 bg-white/30" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-inter">
              Creative Developer &amp; Full-Stack Engineer
            </p>
            <span className="h-[1px] w-12 bg-white/30" />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-10 flex flex-col items-start gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-inter">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Year / location tag */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 right-10 z-10 font-mono text-[10px] text-white/25 tracking-wider text-right"
      >
        <p>© 2026</p>
        <p>WORLDWIDE</p>
      </motion.div>

    </section>
  );
}
