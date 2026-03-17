'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop — clicking outside the card closes the modal
        // isolation: isolate prevents mix-blend-mode from bleeding through
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ isolation: 'isolate' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onMouseDown={(e) => {
            // Only close if the backdrop itself was clicked, not a child
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative w-[90vw] h-[90vh] bg-neutral-900 border border-white/10 rounded-3xl p-10 md:p-20 overflow-y-auto shadow-2xl"
            // Prevent backdrop click firing when clicking inside the card
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="h-full flex flex-col md:flex-row gap-10 md:gap-20">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-[8vw] font-bold text-white font-inter leading-none mb-4">
                    LET'S TALK
                  </h2>
                  <p className="text-xl text-white/60 max-w-xl mb-10">
                    Have a project in mind? I'm always open to discussing new opportunities and ideas.
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Name *</label>
                        <input type="text" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Email *</label>
                        <input type="email" required className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Organization</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="Company Name" />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Service Type</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="Web Design, Development..." />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-widest">Message *</label>
                      <textarea required rows={4} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell me about your project..." />
                    </div>

                    <div className="pt-4">
                      <MagneticButton>
                        <button type="submit" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm">
                          Send Message
                        </button>
                      </MagneticButton>
                    </div>
                  </form>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col justify-end gap-10">
                <div>
                  <h3 className="text-sm font-mono text-white/50 mb-6 uppercase tracking-widest">Contact Details</h3>
                  <div className="space-y-4">
                    <a href="mailto:alanayalag@gmail.com" className="block text-xl md:text-2xl text-white hover:text-white/70 transition-colors">
                      alanayalag@gmail.com
                    </a>
                    <p className="text-xl md:text-2xl text-white">+971 50 123 4567</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-white/50 mb-6 uppercase tracking-widest">Socials</h3>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-lg text-white hover:text-white/70 transition-colors">LinkedIn</a>
                    <a href="#" className="text-lg text-white hover:text-white/70 transition-colors">GitHub</a>
                    <a href="#" className="text-lg text-white hover:text-white/70 transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
