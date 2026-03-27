'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: "Tiora",
    slug: "tiora",
    category: "D2C Demi-fine Jewellery",
    description: "Architected a headless e-commerce stack on Shopify and Shiprocket, validating PMF with $3k+ revenue in 21 days.",
    stack: ["Shopify Headless", "React.js", "Supply Chain Ops"],
    color: "#222222",
    image: "tiora_1"
  },
  {
    title: "Professor AI",
    slug: "professor-ai",
    category: "EdTech Platform",
    description: "Built a scalable RAG engine parsing complex PDFs to provide instant, personalized academic support for 250+ students.",
    stack: ["FastAPI", "Supabase Vector", "React", "Python"],
    color: "#1a1a1a",
    image: "asktetr"
  },
  {
    title: "Beyond Common",
    slug: "beyond-common",
    category: "Home Décor Startup",
    description: "Secured seed funding by pitching a data-driven dropshipping model and automating online CRM operations globally.",
    stack: ["Global Logistics", "GTM Strategy", "B2B Sales"],
    color: "#222222",
    image: "bc_1?v=2"
  },
  {
    title: "AI Wardrobe Assistant",
    slug: "wardrobe-assistant",
    category: "Agentic Automation",
    description: "Built an intelligent flight-tracking and packing system using LLM agents, Notion API, and OpenWeather integrations.",
    stack: ["Python", "n8n", "Render", "APIs"],
    color: "#1a1a1a",
    image: "wardrobe"
  }
];

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (scrollRef.current) {
        // Calculate the exact pixel width needed to slide the content to the left 
        // until its right edge touches the right side of the screen, plus a tiny margin buffer.
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative md:h-[400vh] bg-black">
      <div className="sticky top-0 h-[60vh] md:h-screen flex items-center overflow-hidden">
        
        {/* DESKTOP VIEW - Scroll Driven */}
        <motion.div 
          ref={scrollRef} 
          style={{ x }} 
          className="hidden md:flex gap-20 px-20 shrink-0 items-center w-max"
        >
          <div className="flex flex-col justify-center min-w-[40vw]">
            <h2 className="text-[10vw] font-bold text-white font-sans leading-none mb-4 tracking-tighter uppercase">
              SELECTED
            </h2>
            <h2 className="text-[10vw] font-serif italic text-white/50 leading-none tracking-tight uppercase">
              WORKS
            </h2>
          </div>
          
          {projects.map((project, i) => (
            <Link href={`/work/${project.slug}`} key={i} className="relative h-[60vh] w-[40vw] min-w-[400px] bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden group block cursor-pointer shrink-0">
               <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-white font-sans drop-shadow-md">{project.title}</h3>
                  <span className="font-mono text-xs text-white/80 border border-white/40 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">{project.category}</span>
                </div>
                
                <div>
                  <p className="text-white/90 drop-shadow-md mb-6 text-lg font-sans font-medium">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.stack.map((tech, j) => (
                      <span key={j} className="text-xs font-mono text-white/80 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
              <div className="absolute inset-0 z-0 bg-neutral-800 overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                  sizes="40vw"
                />
              </div>
            </Link>
          ))}

          {/* CV Call To Action */}
          <div className="relative h-[60vh] w-[30vw] min-w-[350px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 flex flex-col justify-center items-center text-center p-12 group hover:bg-white/10 transition-colors duration-500 shrink-0">
            <h3 className="text-3xl font-serif italic text-white/90 mb-8 leading-tight">
              Looking for<br />the full details?
            </h3>
            <a 
              href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_pdf/cv`}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-semibold font-mono text-xs uppercase tracking-[0.2em] transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] rounded-full"
            >
              View Full CV
            </a>
          </div>
          <div className="min-w-[5vw]" />
        </motion.div>

        {/* MOBILE VIEW - Native Scroll Snap (SOTA UX) */}
        <div className="md:hidden flex flex-col w-full h-[85vh] justify-center">
          <div className="px-6 mb-8 text-left">
            <h2 className="text-[14vw] font-bold text-white font-sans leading-none tracking-tighter uppercase">SELECTED</h2>
            <h2 className="text-[14vw] font-serif italic text-white/50 leading-none tracking-tight uppercase">WORKS</h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 w-full no-scrollbar pb-10">
            {/* Initial spacer to center first card */}
            <div className="min-w-[5vw] shrink-0" />

            {projects.map((project, i) => (
              <Link href={`/work/${project.slug}`} key={i} className="relative h-[60vh] w-[82vw] shrink-0 snap-center bg-neutral-900 rounded-[2.5rem] border border-white/10 overflow-hidden block shadow-2xl">
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-bold text-white font-sans tracking-tight">{project.title}</h3>
                    <span className="font-mono text-[9px] text-white/70 border border-white/20 bg-black/60 backdrop-blur-xl px-3 py-1 rounded-full uppercase tracking-widest">{project.category}</span>
                  </div>
                  
                  <div>
                    <p className="text-white/80 text-lg font-sans font-medium mb-8 line-clamp-3 leading-snug">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.stack.slice(0, 3).map((tech, j) => (
                        <span key={j} className="text-[10px] font-mono text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-lg uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />
                <div className="absolute inset-0 z-0 opacity-50">
                  <Image src={project.image} alt={project.title} fill className="object-cover" sizes="85vw" />
                </div>
              </Link>
            ))}

            {/* Mobile CV CTA */}
            <div className="relative h-[60vh] w-[82vw] shrink-0 snap-center rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-center items-center text-center p-10 backdrop-blur-lg">
              <h3 className="text-3xl font-serif italic text-white/90 mb-10 leading-tight">
                Looking for<br />the full details?
              </h3>
              <a 
                href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_pdf/cv`}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-black font-bold font-mono text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
              >
                View Full CV
              </a>
            </div>
            
            {/* Final spacer for padding */}
            <div className="min-w-[5vw] shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
