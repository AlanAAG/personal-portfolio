'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: "Professor AI",
    category: "EdTech Platform",
    description: "RAG system for personalized academic support.",
    stack: ["Next.js", "OpenAI", "Tailwind"],
    color: "#1a1a1a"
  },
  {
    title: "Wardrobe Assistant",
    category: "Fashion Tech",
    description: "AI-powered wardrobe & travel assistant.",
    stack: ["Python", "Notion API", "Supabase"],
    color: "#222222"
  },
  {
    title: "Finance Tracker",
    category: "FinTech",
    description: "Automated financial tracking and analysis.",
    stack: ["React", "Node.js", "PostgreSQL"],
    color: "#1a1a1a"
  },
  {
    title: "Smart Home",
    category: "IoT Dashboard",
    description: "Centralized control for smart devices.",
    stack: ["Vue.js", "Firebase", "MQTT"],
    color: "#222222"
  }
];

export default function HorizontalGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-20 shrink-0">
          <div className="flex flex-col justify-center min-w-[40vw]">
            <h2 className="text-[10vw] font-bold text-white font-sans leading-none mb-4 tracking-tighter">
              SELECTED
            </h2>
            <h2 className="text-[10vw] font-serif italic text-white/50 leading-none tracking-tight">
              WORKS
            </h2>
          </div>
          
          {projects.map((project, i) => (
            <div key={i} className="relative h-[60vh] w-[40vw] min-w-[400px] bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-white font-sans">{project.title}</h3>
                  <span className="font-mono text-xs text-white/60 border border-white/20 px-2 py-1 rounded-full">{project.category}</span>
                </div>
                
                <div>
                  <p className="text-white/80 mb-6 text-lg font-sans">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.stack.map((tech, j) => (
                      <span key={j} className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              {/* Subtle noise in cards instead of flat colors */}
              <div className="absolute inset-0 z-[1] opacity-20 mix-blend-overlay mix-blend-difference" style={{ backgroundColor: project.color }} />
              <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
          {/* Padding at the end */}
          <div className="min-w-[40vw]" />
        </motion.div>
      </div>
    </section>
  );
}
