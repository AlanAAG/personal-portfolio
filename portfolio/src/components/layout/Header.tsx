'use client';

import { useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 p-8 z-40 mix-blend-difference flex gap-4">
        <Link href="/info" className="text-white uppercase tracking-widest text-sm font-medium hover:underline">
          Info
        </Link>
        <MagneticButton>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-white uppercase tracking-widest text-sm font-medium group"
          >
            <span className="relative overflow-hidden">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">Contact</span>
              <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Contact</span>
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </MagneticButton>
      </header>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
