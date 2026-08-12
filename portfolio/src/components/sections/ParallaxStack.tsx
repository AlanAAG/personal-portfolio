'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ParallaxCard from '@/components/ui/ParallaxCard';
import { useLang } from '@/lib/i18n';

const projects = [
  {
    title: "Professor AI",
    category: { en: "EdTech Platform", es: "Plataforma EdTech" },
    image: "/project1.jpg",
    color: "#EFE8D3"
  },
  {
    title: "Wardrobe Assistant",
    category: { en: "Fashion Tech", es: "Tecnología de Moda" },
    image: "/project2.jpg",
    color: "#C7D0D8"
  },
  {
    title: "Finance Tracker",
    category: { en: "FinTech", es: "FinTech" },
    image: "/project3.jpg",
    color: "#D8C7C7"
  },
  {
    title: "Smart Home",
    category: { en: "IoT Dashboard", es: "Panel IoT" },
    image: "/project4.jpg",
    color: "#C7D8D3"
  }
];

export default function ParallaxStack() {
  const container = useRef(null);
  const { lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative mt-[50vh] mb-[50vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center mb-20">
        <h2 className="text-[8vw] font-bold text-white/10 font-inter">{lang === 'es' ? 'TRABAJO SELECCIONADO' : 'SELECTED WORK'}</h2>
      </div>

      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05);
        return (
          <CardWrapper key={i} i={i} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} project={{ ...project, category: project.category[lang] }} />
        );
      })}
    </section>
  );
}

function CardWrapper({ i, progress, range, targetScale, project }: any) {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <ParallaxCard project={project} index={i} range={range} targetScale={scale} />
  )
}
