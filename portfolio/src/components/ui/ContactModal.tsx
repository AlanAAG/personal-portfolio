'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset status when modal re-opens
  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xjgaqyzo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ isolation: 'isolate' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative w-[95vw] h-[90dvh] bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-20 overflow-y-auto shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-[60]"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="min-h-full flex flex-col md:flex-row gap-10 md:gap-20 pb-12 md:pb-0">
              <div className="flex-1 flex flex-col justify-between pt-6 md:pt-0">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <CheckCircle2 className="w-20 h-20 text-[#6339FF] mb-8" />
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">MESSAGE SENT</h2>
                    <p className="text-xl text-white/50 max-w-md mx-auto mb-10">
                      Thank you for reaching out. I usually respond within 24 hours.
                    </p>
                    <button 
                      onClick={onClose}
                      className="text-sm font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    <h2 className="text-4xl md:text-[8vw] font-bold text-white font-inter leading-none mb-2 md:mb-4 tracking-tighter">
                      LET'S TALK
                    </h2>
                    <p className="hidden md:block text-xl text-white/60 max-w-xl mb-10">
                      Have a project in mind? I'm always open to discussing new opportunities and ideas.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pt-2 md:pt-0">
                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="group">
                          <label className="block text-[10px] md:text-xs font-mono text-white/50 mb-1 md:mb-2 uppercase tracking-widest">Name *</label>
                          <input name="name" type="text" required className="w-full bg-transparent border-b border-white/20 py-1.5 md:py-2 text-sm md:text-base text-white focus:outline-none focus:border-white transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="group">
                          <label className="block text-[10px] md:text-xs font-mono text-white/50 mb-1 md:mb-2 uppercase tracking-widest">Email *</label>
                          <input name="email" type="email" required className="w-full bg-transparent border-b border-white/20 py-1.5 md:py-2 text-sm md:text-base text-white focus:outline-none focus:border-white transition-colors" placeholder="john@example.com" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="group">
                          <label className="block text-[10px] md:text-xs font-mono text-white/50 mb-1 md:mb-2 uppercase tracking-widest">Company</label>
                          <input name="organization" type="text" className="w-full bg-transparent border-b border-white/20 py-1.5 md:py-2 text-sm md:text-base text-white focus:outline-none focus:border-white transition-colors" placeholder="Company Name" />
                        </div>
                        <div className="group">
                          <label className="block text-[10px] md:text-xs font-mono text-white/50 mb-1 md:mb-2 uppercase tracking-widest">Need</label>
                          <input name="service" type="text" className="w-full bg-transparent border-b border-white/20 py-1.5 md:py-2 text-sm md:text-base text-white focus:outline-none focus:border-white transition-colors" placeholder="Type..." />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-[10px] md:text-xs font-mono text-white/50 mb-1 md:mb-2 uppercase tracking-widest">Message *</label>
                        <textarea name="message" required rows={2} className="w-full bg-transparent border-b border-white/20 py-1.5 md:py-2 text-sm md:text-base text-white focus:outline-none focus:border-white transition-colors resize-none md:min-h-[100px]" placeholder="Tell me about your project..." />
                      </div>

                      <div className="pt-2 md:pt-4 pb-4 md:pb-12 overflow-visible">
                        <MagneticButton>
                          <button 
                            disabled={status === 'submitting'}
                            type="submit" 
                            className="w-full md:w-auto px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 disabled:bg-neutral-600 disabled:text-white/50 transition-colors uppercase tracking-widest text-xs md:text-sm relative z-10"
                          >
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                          </button>
                        </MagneticButton>
                        {status === 'error' && (
                          <p className="mt-2 md:mt-4 text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-widest">Something went wrong. Please try again.</p>
                        )}
                      </div>
                      
                      {/* MOBILE ONLY: Contact & Socials integrated into form flow */}
                      <div className="md:hidden mt-8 pt-6 border-t border-white/10 flex flex-col gap-8 pb-10">
                        <div>
                          <h3 className="text-[10px] font-mono text-white/50 mb-4 uppercase tracking-widest">Contact Details</h3>
                          <div className="space-y-2">
                            <a href="mailto:alanayalag@gmail.com" className="block text-sm text-white hover:text-white/70 transition-colors">
                              alanayalag@gmail.com
                            </a>
                            <p className="text-sm text-white">+52 5519361230</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[10px] font-mono text-white/50 mb-4 uppercase tracking-widest">Socials</h3>
                          <div className="flex flex-row flex-wrap gap-6">
                            <a href="https://www.linkedin.com/in/alan-ayala-garcia/" target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-widest uppercase text-white hover:text-white/70 transition-colors">LinkedIn</a>
                            <a href="https://github.com/AlanAAG" target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-widest uppercase text-white hover:text-white/70 transition-colors">GitHub</a>
                            <a href="https://www.instagram.com/a.ayala.g/" target="_blank" rel="noopener noreferrer" className="text-xs font-mono tracking-widest uppercase text-white hover:text-white/70 transition-colors">Instagram</a>
                          </div>
                        </div>
                      </div>

                    </form>
                  </div>
                )}
              </div>

              {/* DESKTOP ONLY: Side Column Contact Info */}
              <div className="hidden md:flex md:w-1/3 flex-col justify-end gap-10">
                <div>
                  <h3 className="text-sm font-mono text-white/50 mb-6 uppercase tracking-widest">Contact Details</h3>
                  <div className="space-y-4">
                    <a href="mailto:alanayalag@gmail.com" className="block text-xl md:text-2xl text-white hover:text-white/70 transition-colors">
                      alanayalag@gmail.com
                    </a>
                    <p className="text-xl md:text-2xl text-white">+52 5519361230</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-white/50 mb-6 uppercase tracking-widest">Socials</h3>
                  <div className="flex flex-col gap-4">
                    <a href="https://www.linkedin.com/in/alan-ayala-garcia/" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-white/70 transition-colors">LinkedIn</a>
                    <a href="https://github.com/AlanAAG" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-white/70 transition-colors">GitHub</a>
                    <a href="https://www.instagram.com/a.ayala.g/" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-white/70 transition-colors">Instagram</a>
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
