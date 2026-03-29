'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactModal from '@/components/ui/ContactModal';
import Image from 'next/image';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="w-full bg-black text-white border-t border-white/10 py-12 px-6 md:px-12 z-40 relative">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center gap-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
            
            {/* Desktop Brand */}
            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-3xl font-bold font-sans tracking-tighter">ALAN AYALA</span>
              <span className="text-sm font-mono text-white/50 tracking-widest uppercase mt-2">AI-Driven Technical Founder</span>
            </div>

            {/* Mobile Brand & Nav (Row Layout) */}
            <div className="flex md:hidden flex-row justify-between items-center w-full">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <Image src="/images/profile.png" alt="Alan Ayala" fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-bold font-sans tracking-tight leading-none">ALAN AYALA</span>
                  <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase mt-1">Founder</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Link href="/" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300">Home</Link>
                <Link href="/info" className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300">About Me</Link>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-white font-bold"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Desktop Quick Navigation Links & Highlighted Contact Button */}
            <div className="hidden md:flex flex-row items-center gap-10 font-mono text-xs tracking-widest uppercase text-white/50">
              <Link href="/" className="hover:text-white transition-colors duration-300">Home</Link>
              <Link href="/info" className="hover:text-white transition-colors duration-300">About Me</Link>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="px-6 py-2.5 ml-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social Links for Mobile (SOTA Cleanliness) */}
          <div className="flex flex-wrap justify-center md:hidden gap-x-8 gap-y-4 mb-4 border-y border-white/5 py-6 w-full">
            <a href="https://www.instagram.com/a.ayala.g/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em]">Instagram</a>
            <a href="https://www.linkedin.com/in/alan-ayala-garcia/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em]">LinkedIn</a>
            <a href="https://github.com/AlanAAG" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em]">GitHub</a>
            <a href="mailto:alanayalag@gmail.com" className="text-white/70 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em]">Email</a>
          </div>

          {/* Centered Copyright Below */}
          <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase text-center">
            © {year} Alan Ayala. All rights reserved.
          </span>

        </div>
      </footer>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
