'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';

export default function StickyNav() {
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [showLogo, setShowLogo] = useState(pathname !== '/');

  useEffect(() => {
    setShowLogo(pathname !== '/');
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === '/') {
      setShowLogo(latest > 750);
    }
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-20 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white bg-black/50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {/* Left: Location & Time */}
        <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest w-1/4 md:w-1/3">
          <span className="hidden md:inline">New Delhi, IST</span>
          <span>{time}</span>
        </div>

        {/* Center: ALAN AYALA Logo */}
        <div className="w-2/4 md:w-1/3 flex justify-center items-center">
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="flex items-center gap-1 md:gap-2 group mix-blend-difference pointer-events-auto leading-none pt-1">
                  <span className="font-sans font-bold text-lg md:text-xl tracking-tighter group-hover:opacity-70 transition-opacity leading-none uppercase">ALAN</span>
                  <span className="font-serif italic text-xl md:text-2xl font-normal text-white/90 group-hover:opacity-70 transition-opacity leading-none translate-y-[1px] uppercase">AYALA</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-4 md:gap-8 font-medium text-[10px] md:text-sm uppercase tracking-widest justify-end w-1/4 md:w-1/3">
          <Link href="/info" className="hover:opacity-50 transition-opacity whitespace-nowrap">
            About
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hover:opacity-50 transition-opacity"
          >
            Contact
          </button>
        </div>
      </motion.div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
