'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  return (
    <footer className="relative h-screen bg-black text-white overflow-hidden flex flex-col justify-between p-8 md:p-20">
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif italic text-2xl md:text-4xl text-white/50">Contact</h3>
          <a href="mailto:alanayalag@gmail.com" className="text-xl md:text-2xl hover:text-white/70 transition-colors">alanayalag@gmail.com</a>
          <a href="https://linkedin.com/in/alan-ayala-garcia" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl hover:text-white/70 transition-colors">LinkedIn</a>
          <a href="https://github.com/AlanAAG" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl hover:text-white/70 transition-colors">GitHub</a>
        </div>
        
        <div className="text-right">
           <p className="font-mono text-xs text-white/30 uppercase tracking-widest">© 2025 Alan Ayala</p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-full h-full flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
               className="font-inter font-bold text-[35vw] leading-none text-[#2a1b3d] mix-blend-difference z-0 flex gap-[10vw]"
             >
                <span>A</span>
                <span className="font-serif italic font-light">A</span>
             </motion.div>
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
               className="absolute bottom-0 left-1/2 -translate-x-1/2 font-inter font-bold text-[35vw] leading-none text-white/5 z-0"
             >
                25
             </motion.div>
        </div>
      </div>
    </footer>
  );
}
