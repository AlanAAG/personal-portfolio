'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CloudVideo from '@/components/ui/CloudVideo';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Scale and opacity effects for a premium entrance
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section ref={containerRef} className="w-full py-16 md:py-32 bg-transparent relative z-20 flex justify-center items-center">
      <motion.div 
        style={{ scale, opacity }}
        className="w-full max-w-screen-2xl px-6 md:px-12 h-[50vh] md:h-[80vh] relative group"
      >
        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative">
          <CloudVideo
            src="/videos/intro-placeholder.mp4" 
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls={false} // Custom mute button provided instead of clunky default controls
            className="w-full h-full object-cover scale-105" // slight scale to cover rounded corners safely
          />

          {/* Aesthetic Overlay */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
          
          {/* Custom Minimalist Unmute Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-30"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
