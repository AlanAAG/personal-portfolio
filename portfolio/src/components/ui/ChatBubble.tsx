'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white text-black p-6 rounded-2xl shadow-2xl origin-bottom-right"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold font-inter">Alan.AI</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/5 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-black/80 font-mono">
              Hello! I'm Alan's AI assistant. How can I help you today?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <MagneticButton onClick={() => setIsOpen(!isOpen)}>
        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform duration-300">
          <MessageSquare className="w-6 h-6" />
        </button>
      </MagneticButton>
    </div>
  );
}
