'use client';

import { useState, useEffect } from 'react';

export default function PitchdeckEmbed({ src, title }: { src: string; title: string }) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Directly use the Cloudinary URL with a view parameter for full width
  const nativeSrc = `${src}#view=FitH&toolbar=0`;
  const googleViewerSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(src)}&embedded=true`;
  const iframeSrc = isMobile ? googleViewerSrc : nativeSrc;

  return (
    <div className="mt-24 w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-white/10 pb-4 gap-4">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest text-white/50">Investor Pitchdeck</h3>
        </div>
      </div>
      
      <div
        className="w-full aspect-video md:aspect-auto md:h-[80vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 relative group"
        onMouseLeave={() => setActive(false)}
      >
        <iframe
          src={iframeSrc}
          className="absolute inset-0 w-full h-full rounded-3xl bg-white/5"
          title={title}
        />
        
        {!active && (
          <div
            className="absolute inset-0 z-10 cursor-pointer flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500"
            onClick={() => setActive(true)}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-center">
              <span className="text-white text-xs font-mono uppercase tracking-[0.2em] block">
                Interact with Deck
              </span>
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-1 block">
                Unlocks Scroll
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
