'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

export default function VideoPlayer({ videoId }: { videoId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <>
      <div 
        className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
         <video 
            src={`https://res.cloudinary.com/${cloudName}/video/upload/vc_auto,q_auto,w_1280,c_limit/${videoId}.mov`}
            poster={`https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto,w_1280,c_limit,so_0/${videoId}.jpg`}
            autoPlay loop muted playsInline preload="auto"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
         />
         
         {/* Hover Overlay */}
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 shadow-2xl">
               <Play className="w-8 h-8 text-white ml-1.5" fill="currentColor" />
            </div>
         </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/20 transition-all duration-300 z-[110] cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Expanded Video Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
               {/* 
                  w_1920 pushes full 1080p HD for the modal. 
                  Removed 'muted' & 'loop', and passed 'controls' so users can inherently scrub processing sound.
               */}
               <video 
                  src={`https://res.cloudinary.com/${cloudName}/video/upload/vc_auto,q_auto,w_1920,c_limit/${videoId}.mov`}
                  autoPlay playsInline controls
                  className="w-full h-full object-contain bg-black"
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
