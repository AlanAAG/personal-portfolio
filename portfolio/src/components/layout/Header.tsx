'use client';

import { useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import GlitchText from '@/components/ui/GlitchText';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 p-6 md:p-8 z-40 mix-blend-difference flex justify-between items-center w-full">
        <Link href="/" className="group">
          <GlitchText className="text-xl md:text-2xl font-bold font-sans tracking-tighter uppercase text-white">
            ALAN AYALA
          </GlitchText>
        </Link>

        <div className="flex gap-4 md:gap-8 items-center">
          <Link href="/info" className="text-white uppercase tracking-widest text-[10px] md:text-xs font-medium hover:underline">
            About Me
          </Link>
          <MagneticButton>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-white uppercase tracking-widest text-[10px] md:text-xs font-medium group"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Contact</span>
                <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Contact</span>
              </span>
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 group-hover:rotate-45" />
            </button>
          </MagneticButton>
        </div>
      </header>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
