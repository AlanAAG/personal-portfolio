'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import ContactModal from '@/components/ui/ContactModal';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
      className={`font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-1.5 ${className}`}
    >
      <span className={lang === 'en' ? 'text-white' : 'text-white/40 hover:text-white/70 transition-colors'}>EN</span>
      <span className="text-white/25">/</span>
      <span className={lang === 'es' ? 'text-white' : 'text-white/40 hover:text-white/70 transition-colors'}>ES</span>
    </button>
  );
}

export default function StickyNav() {
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLang();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [showLogo, setShowLogo] = useState(pathname !== '/');

  useEffect(() => {
    setShowLogo(pathname !== '/');
    setMenuOpen(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === '/') {
      setShowLogo(latest > 750);
    }
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-20 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white bg-black/50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {/* Left: Location & Time */}
        <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest w-1/4 md:w-1/3">
          <span className="hidden md:inline">{lang === 'es' ? 'Shanghái, China' : 'Shanghai, China'}</span>
          <span>{time}</span>
          <span className="hidden md:inline text-white/20">·</span>
          <LangToggle className="hidden md:flex" />
        </div>

        {/* Center: ALAN AYALA Logo */}
        <div className="w-2/4 md:w-1/3 flex justify-center items-center">
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="flex items-center gap-1 md:gap-2 group mix-blend-difference pointer-events-auto leading-none pt-1">
                  <span className="font-sans font-bold text-lg md:text-xl tracking-tighter group-hover:opacity-70 transition-opacity leading-none uppercase">ALAN</span>
                  <span className="font-serif italic text-xl md:text-2xl font-normal text-white/90 group-hover:opacity-70 transition-opacity leading-none translate-y-[1px] uppercase">AYALA</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-widest justify-end w-1/3">
          <Link href="/info" className="hover:opacity-50 transition-opacity whitespace-nowrap">
            {lang === 'es' ? 'Acerca' : 'About'}
          </Link>
          <Link href="/blog" className="hover:opacity-50 transition-opacity whitespace-nowrap">
            Blog
          </Link>
          <Link href="/certifications" className="hover:opacity-50 transition-opacity whitespace-nowrap">
            {lang === 'es' ? 'Credenciales' : 'Credentials'}
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:opacity-50 transition-opacity uppercase tracking-widest"
          >
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </button>
        </div>

        {/* Right: Burger (Mobile) */}
        <div className="flex md:hidden justify-end w-1/4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="p-1"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {[
              { label: lang === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: lang === 'es' ? 'Acerca' : 'About', href: '/info' },
              { label: 'Blog', href: '/blog' },
              { label: lang === 'es' ? 'Credenciales' : 'Credentials', href: '/certifications' },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-serif italic text-white/90 hover:text-[#6339FF] transition-colors uppercase tracking-tight"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.3 }}
              onClick={() => { setMenuOpen(false); setIsModalOpen(true); }}
              className="mt-4 px-8 py-3 border border-white/30 rounded-full font-mono text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors"
            >
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </motion.button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <LangToggle className="mt-6 scale-125" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
