'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';

export default function StickyNav() {
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
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
        className="sticky top-0 z-50 w-full px-8 md:px-20 py-6 grid grid-cols-3 items-center mix-blend-difference text-white bg-black/50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {/* Left: Location & Time */}
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest justify-start">
          <span>Dubai, UAE</span>
          <span>{time}</span>
        </div>

        {/* Center: Socials */}
        <div className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-white/50 transition-colors">Instagram</a>
          <span className="text-white/30">/</span>
          <a href="#" className="hover:text-white/50 transition-colors">Behance</a>
          <span className="text-white/30">/</span>
          <a href="#" className="hover:text-white/50 transition-colors">LinkedIn</a>
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center gap-8 font-medium text-sm uppercase tracking-widest justify-end">
          <Link href="/info" className="hover:opacity-50 transition-opacity">
            Info
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
