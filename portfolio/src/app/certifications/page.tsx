'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';
import { useLang } from '@/lib/i18n';

const certifications = [
  {
    id: "fitt-microsoft",
    year: { en: "March 2026", es: "Marzo 2026" },
    title: { en: "AI Workshop", es: "Taller de IA" },
    entity: "FITT, IIT Delhi × Microsoft",
    location: { en: "New Delhi, India", es: "Nueva Delhi, India" },
    description: {
      en: "AI workshop conducted by the Foundation for Innovation and Technology Transfer (FITT) at IIT Delhi, in partnership with Microsoft.",
      es: "Taller de IA impartido por la Foundation for Innovation and Technology Transfer (FITT) del IIT Delhi, en alianza con Microsoft."
    },
    mediaId: "FIIT_Microsoft-1_mdfbng"
  },
  {
    id: "cs50",
    year: { en: "Sep 2025", es: "Sep 2025" },
    title: { en: "CS50 Introduction to Computer Science", es: "CS50: Introducción a las Ciencias de la Computación" },
    entity: "Harvard University (CS50)",
    location: { en: "Online", es: "En línea" },
    description: {
      en: "Rigorous introduction to the intellectual enterprises of computer science and the art of programming.",
      es: "Introducción rigurosa a las disciplinas intelectuales de las ciencias de la computación y el arte de la programación."
    },
    mediaId: "experience_6"
  },
  {
    id: "dsig",
    year: { en: "2025", es: "2025" },
    title: { en: "Resilient Markets, Smarter Moves", es: "Resilient Markets, Smarter Moves" },
    entity: "DSIG · Dubai Chambers",
    location: { en: "Dubai, UAE", es: "Dubái, EAU" },
    description: {
      en: "Roundtable hosted by the Dubai Stockbrokers and Investment Services Group (DSIG) under Dubai Chambers.",
      es: "Mesa redonda organizada por el Dubai Stockbrokers and Investment Services Group (DSIG) bajo Dubai Chambers."
    },
    mediaId: "Alan_Ayala_Certificate_DSIG_o4jm20"
  },
  {
    id: "be-there",
    year: { en: "2025", es: "2025" },
    title: { en: "Be There Certificate", es: "Be There Certificate" },
    entity: "Jack.org × Born This Way Foundation",
    location: { en: "Online", es: "En línea" },
    description: {
      en: "Mental health training certification on how to safely and effectively support someone struggling with their mental health.",
      es: "Certificación en salud mental sobre cómo apoyar de manera segura y efectiva a alguien que atraviesa dificultades de salud mental."
    },
    mediaId: "be_there_certificate_Alan_Ayala_García-1_sq17mp"
  },
  {
    id: "c1-english",
    year: { en: "Oct 2023", es: "Oct 2023" },
    title: { en: "C1 Advanced English", es: "Inglés Avanzado C1" },
    entity: "Pearson",
    location: { en: "Global", es: "Global" },
    description: {
      en: "Demonstrated advanced proficiency in English language comprehension and communication.",
      es: "Dominio avanzado comprobado en comprensión y comunicación en inglés."
    },
    mediaId: "experience_10"
  },
  {
    id: "delf-b1",
    year: { en: "May 2023", es: "Mayo 2023" },
    title: { en: "DELF B1 French Certification", es: "Certificación DELF B1 de Francés" },
    entity: "Alliance Française de Paris",
    location: { en: "Vichy, France", es: "Vichy, Francia" },
    description: {
      en: "Studied intensive French immersion in Vichy, France, achieving B1 fluency certification.",
      es: "Inmersión intensiva en francés en Vichy, Francia, donde obtuve la certificación de nivel B1."
    },
    mediaId: "experience_11"
  }
];

// Scattered positions + drift timing for the desktop floating collage
const floatConfig = [
  { className: "top-[22%] left-[4%] w-[15vw] rotate-[-6deg]", duration: 7 },
  { className: "top-[10%] right-[6%] w-[14vw] rotate-[5deg]", duration: 9 },
  { className: "top-[56%] left-[9%] w-[12vw] rotate-[3deg]", duration: 8 },
  { className: "top-[44%] right-[3%] w-[15vw] rotate-[-4deg]", duration: 6.5 },
  { className: "bottom-[6%] left-[27%] w-[14vw] rotate-[4deg]", duration: 7.5 },
  { className: "bottom-[8%] right-[20%] w-[13vw] rotate-[-3deg]", duration: 8.5 }
];

export default function CertificationsPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const lenis = useLenis();
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-32 relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] bg-[#6339FF]/10 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />

      {/* --- HERO: FLOATING COLLAGE (DESKTOP) --- */}
      <section className="relative hidden lg:flex h-screen items-center justify-center">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={`#${cert.id}`}
            onClick={(e) => {
              e.preventDefault();
              setHovered(null);
              lenis?.scrollTo(`#${cert.id}`, { offset: -96, duration: 1.1 });
            }}
            className={`absolute ${floatConfig[i].className} z-10`}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: floatConfig[i].duration, repeat: Infinity, ease: "easeInOut" }}
            onMouseEnter={() => setHovered(cert.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden border transition-all duration-500 ${
                hovered === cert.id
                  ? 'border-[#6339FF] shadow-[0_0_40px_rgba(99,57,255,0.4)] scale-110 z-20'
                  : hovered
                  ? 'border-white/10 opacity-30'
                  : 'border-white/10 opacity-80'
              }`}
            >
              <Image src={cert.mediaId} alt={cert.title[lang]} fill className="object-cover" sizes="15vw" />
            </div>
            <div className={`mt-3 text-center transition-opacity duration-300 ${hovered === cert.id ? 'opacity-100' : 'opacity-0'}`}>
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-[#6339FF] bg-black/80 border border-[#6339FF]/40 rounded-2xl px-3 py-1 leading-relaxed">
                {cert.title[lang]}
              </span>
            </div>
          </motion.a>
        ))}

        <div className="relative z-0 text-center pointer-events-none">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6339FF] mb-6">{lang === 'es' ? 'Verificado y Certificado' : 'Verified & Certified'}</p>
          <h1 className="text-[9vw] font-serif italic leading-none tracking-tight uppercase whitespace-nowrap">{lang === 'es' ? 'Credenciales' : 'Credentials'}</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-8 animate-pulse">{lang === 'es' ? 'Desliza · Pasa el cursor' : 'Scroll · Hover the cards'}</p>
        </div>

        <Link href="/info" className="absolute top-24 left-12 z-40 inline-flex items-center text-white/50 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">{lang === 'es' ? 'Volver' : 'Back'}</span>
        </Link>
      </section>

      {/* --- HERO (MOBILE) --- */}
      <section className="lg:hidden px-6 pt-28 pb-4 relative z-10">
        <Link href="/info" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-mono text-xs uppercase tracking-widest">{lang === 'es' ? 'Volver' : 'Back'}</span>
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#6339FF] mb-4">{lang === 'es' ? 'Verificado y Certificado' : 'Verified & Certified'}</p>
        <h1 className="text-[14.5vw] font-serif italic text-white leading-none tracking-tight uppercase mb-8 whitespace-nowrap">{lang === 'es' ? 'Credenciales' : 'Credentials'}</h1>
      </section>

      {/* --- DETAIL LIST --- */}
      <section className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:pt-20">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            id={cert.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-12 lg:py-16 border-t border-white/10 scroll-mt-24"
          >
            <div className="lg:col-span-2 font-mono text-xs uppercase tracking-widest text-white/40 flex lg:flex-col gap-4 lg:gap-2">
              <span className="text-[#6339FF]">0{i + 1}</span>
              <span>{cert.year[lang]}</span>
              <span className="text-white/25">{cert.location[lang]}</span>
            </div>

            <div className={`lg:col-span-4 ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 group hover:border-[#6339FF]/60 transition-colors duration-500">
                <Image
                  src={cert.mediaId}
                  alt={cert.title[lang]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">{cert.title[lang]}</h2>
              <p className="text-lg md:text-xl font-serif italic text-white/60 mb-5">{cert.entity}</p>
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl mb-6">{cert.description[lang]}</p>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                {lang === 'es' ? 'Credencial Verificada' : 'Verified Credential'}
              </span>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
      </section>
    </main>
  );
}
