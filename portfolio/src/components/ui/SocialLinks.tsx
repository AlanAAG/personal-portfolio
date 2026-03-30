'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function SocialLinks() {
  const { scrollYProgress } = useScroll();
  
  // Track the absolute bottom of the page natively
  const footerOpacity = useTransform(scrollYProgress, [0.97, 0.995], [1, 0]);
  const footerY = useTransform(scrollYProgress, [0.97, 0.995], [0, 20]);
  
  // Disable clicks when it fades out so it doesn't invisibly block anything below it
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.98 ? 'none' : 'auto'));

  return (
    <motion.div 
      style={{ opacity: footerOpacity, y: footerY, pointerEvents }} 
      className="fixed bottom-10 right-10 z-[60] hidden md:flex"
    >
      <motion.div 
        className="flex flex-col items-end gap-3 font-mono text-xs text-white/50 tracking-wider mix-blend-difference"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="https://www.instagram.com/a.ayala.g/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
        <a href="https://www.linkedin.com/in/alan-ayala-garcia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
        <a href="https://github.com/AlanAAG" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
        <a href="https://medium.com/@alanayalag" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MEDIUM</a>
        <a href="mailto:alanayalag@gmail.com" className="hover:text-white transition-colors">EMAIL</a>
      </motion.div>
    </motion.div>
  );
}
