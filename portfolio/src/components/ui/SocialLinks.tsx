'use client';

import { motion } from 'framer-motion';

export default function SocialLinks() {
  return (
    <motion.div 
      className="fixed bottom-10 right-10 z-[60] flex flex-col items-end gap-3 font-mono text-xs text-white/50 tracking-wider mix-blend-difference"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
      <a href="#" className="hover:text-white transition-colors">BEHANCE</a>
      <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
    </motion.div>
  );
}
