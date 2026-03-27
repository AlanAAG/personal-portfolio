'use client';

import Link from 'next/link';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const timelineData = [
  {
    year: "Expected 2029",
    title: "BMT in Management and Technology",
    entity: "Tetr College of Business",
    location: "Global Rotation",
    category: "Education",
    description: "Project-based rotational program launching new businesses across UAE, India, Singapore, Ghana, Spain, Europe, and the US.",
    mediaId: "experience_1"
  },
  {
    year: "Jan 2026 - Present",
    title: "Co-Founder",
    entity: "Tiora (Demi-fine Jewellery)",
    location: "New Delhi, India",
    category: "Experience",
    description: "Digitized operations by building a headless e-commerce stack, reducing supply chain lead time from 7 days to 3 hours and validating PMF with $3,000+ first-month revenue.",
    mediaType: "video",
    mediaId: "experience_2",
    link: "/work/tiora"
  },
  {
    year: "Oct 2025 - Present",
    title: "Lead Developer & Co-Founder",
    entity: "Professor AI",
    location: "UAE, India",
    category: "Projects",
    description: "Architected a scalable RAG system powered by FastAPI and Supabase to support 250+ students with instant, high-accuracy context handling and query condensing.",
    mediaType: "video",
    mediaId: "experience_3",
    link: "/work/professor-ai"
  },
  {
    year: "Oct 2025 - Feb 2026",
    title: "Sales & AI Automation Intern",
    entity: "Academy for Sales Excellence",
    location: "Dubai, UAE",
    category: "Experience",
    description: "Secured 10 recurrent enterprise clients by creating custom AI workflows with n8n and Python. Automated CRM routing pipelines, reducing customer support latency by 80%.",
    mediaId: "experience_4"
  },
  {
    year: "Aug 2025 - Jan 2026",
    title: "Co-Founder",
    entity: "Beyond Common",
    location: "Dubai, UAE",
    category: "Experience",
    description: "Secured initial angel funding by pitching a scalable, data-driven dropshipping model. Decreased order processing time by 40% via headless commerce automation.",
    mediaId: "experience_5",
    link: "/work/beyond-common"
  },
  {
    year: "Sep 2025",
    title: "CS50 Introduction to Computer Science",
    entity: "Harvard University (CS50)",
    location: "Online",
    category: "Certification",
    description: "Rigorous introduction to the intellectual enterprises of computer science and the art of programming.",
    mediaId: "experience_6"
  },
  {
    year: "2025",
    title: "AI Wardrobe & Travel Assistant",
    entity: "Autonomous Agent System",
    location: "Mexico, UAE",
    category: "Projects",
    description: "Built a Python-based Agentic Workflow integrating Notion, Supabase, and OpenWeather APIs to automate travel packing and outfit planning deployed via Render.",
    mediaId: "experience_7",
    link: "/work/wardrobe-assistant"
  },
  {
    year: "2024",
    title: "Global Volunteer & Fundraiser",
    entity: "Chipangali Wildlife Orphanage",
    location: "Bulawayo, Zimbabwe",
    category: "Experience",
    description: "Organized a fundraiser generating $1,200+ for 30+ staff members. Contributed to wildlife operations, habitat enrichment, and ethical conservation in a high-demand, resource-limited environment.",
    mediaId: "experience_8"
  },
  {
    year: "May 2024",
    title: "High School Diploma, STEM",
    entity: "Tecnológico de Monterrey",
    location: "Santa Fe, Mexico",
    category: "Education",
    description: "Graduated with 96.72/100 GPA. Three-time recipient of the Academic Excellence Award.",
    mediaId: "experience_9"
  },
  {
    year: "Oct 2023",
    title: "C1 Advanced English",
    entity: "Pearson",
    location: "Global",
    category: "Certification",
    description: "Demonstrated advanced proficiency in English language comprehension and communication.",
    mediaId: "experience_10"
  },
  {
    year: "May 2023",
    title: "DELF B1 French Certification",
    entity: "Alliance Française de Paris",
    location: "Vichy, France",
    category: "Certification",
    description: "Studied intensive French immersion in Vichy, France, achieving B1 fluency certification.",
    mediaId: "experience_11"
  },
  {
    year: "May 2023 - May 2025",
    title: "Freelance Full-Stack Developer",
    entity: "Independent Consultant",
    location: "Remote",
    category: "Experience",
    description: "Delivered custom full-stack solutions for 35+ clients, including a headless platform that generated 10k+ monthly visitors and digitized legacy retail operations.",
    mediaId: "experience_12.jpg"
  },
  {
    year: "2021 - 2024",
    title: "Club Secretary and Treasurer",
    entity: "Rotary International",
    location: "Mexico",
    category: "Leadership",
    description: "Managed a $5,000 budget and coordinated cross-functional projects across 5+ international clubs.",
    mediaId: "experience_13"
  },
  {
    year: "2019 - 2024",
    title: "Vice President",
    entity: "Debate Team",
    location: "Mexico",
    category: "Leadership",
    description: "Ranked top 5% regionally, competing in 35+ tournaments; mentored 35+ team members in structured thinking and complex argumentation.",
    mediaId: "experience_14"
  }
];

const TimelineNode = ({ data, index }: { data: any; index: number }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start 90%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);

  const isEven = index % 2 === 0;

  return (
    <div ref={nodeRef} className={`relative flex items-center justify-between w-full my-12 lg:my-24 z-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
      {/* Central Connector System - Desktop Only */}
      <div className="absolute left-1/2 -translate-x-1/2 items-center justify-center z-20 hidden lg:flex">
        
        {/* The Giant Encapsulating Dot */}
        <motion.div 
          style={{ scale, opacity }}
          className="relative w-14 h-14 rounded-full bg-black border-[3px] border-[#6339FF]/80 flex items-center justify-center shadow-[0_0_20px_rgba(99,57,255,0.6)] backdrop-blur-md"
        >
          <div className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full animate-pulse opacity-90 shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
        </motion.div>

        {/* Horizontal Laser Connectors */}
        <motion.div
           style={{ opacity }}
           className={`absolute top-1/2 -translate-y-1/2 h-[1px] ${isEven ? 'right-[110%] w-16 xl:w-24 bg-gradient-to-l from-[#6339FF] to-transparent' : 'left-[110%] w-16 xl:w-24 bg-gradient-to-r from-[#6339FF] to-transparent'}`}
        />
      </div>

      {/* Content Box */}
      <motion.div 
        style={{ y, opacity }}
        className={`w-full lg:w-[42%] p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 lg:border-white/10 rounded-3xl ${isEven ? 'lg:text-right' : 'lg:text-left'} mt-8 lg:mt-0 relative group ${data.link ? 'hover:bg-white/10 hover:border-[#6339FF]/50 transition-all duration-300' : ''}`}
      >
        {/* Mobile Left Border indicator */}
        <div className="lg:hidden absolute top-0 left-0 w-1 h-full bg-[#6339FF]/30 rounded-l-3xl" />
        {data.link && (
          <Link href={data.link} className="absolute inset-0 z-20 rounded-2xl" aria-label={`View ${data.title} Case Study`} />
        )}

        {/* Mobile Media Integration */}
        <div className="lg:hidden w-full mb-6 rounded-xl overflow-hidden aspect-video border border-white/10 relative">
          {data.mediaType === 'video' ? (
            <video
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto,vc_auto,c_limit,w_720/${data.mediaId || `experience_${index + 1}`}`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={data.mediaId || `experience_${index + 1}`}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )}
        </div>

        <span className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-mono tracking-widest uppercase border border-[#6339FF]/50 text-[#6339FF] rounded-full bg-[#6339FF]/10">
          {data.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold mb-2">{data.title}</h3>
        <h4 className={`text-lg md:text-xl font-serif italic text-white/70 mb-4 ${data.link ? 'group-hover:text-[#6339FF] transition-colors flex items-center ' + (isEven ? 'lg:justify-end' : 'lg:justify-start') + ' gap-2' : ''}`}>
          {data.entity}
          {data.link && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6339FF] font-sans not-italic translate-y-[1px]">↗</span>}
        </h4>
        <div className={`flex flex-col gap-1 font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-4 ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
          <span>{data.location}</span>
          <span className="text-white/60 font-semibold">{data.year}</span>
        </div>
        <p className="text-white/80 leading-relaxed font-light text-base">
          {data.description}
        </p>

        {data.category === 'Certification' && (
          <div className={`mt-6 flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <span className="text-[0.65rem] font-mono tracking-widest uppercase text-white/30 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
              Verified Credential
            </span>
          </div>
        )}
      </motion.div>

      {/* Corresponding Image Block */}
      <motion.div 
        style={{ y, opacity }}
        className={`hidden lg:block w-[42%] relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group ${data.link ? 'cursor-pointer hover:border-[#6339FF]/50 transition-colors duration-300' : ''}`}
      >
        {data.link && (
          <Link href={data.link} className="absolute inset-0 z-20 rounded-2xl" aria-label={`View ${data.title} media`} />
        )}
        {data.mediaType === 'video' ? (
          <video
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto,vc_auto,c_limit,w_720/${data.mediaId || `experience_${index + 1}`}`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <Image
            src={data.mediaId || `experience_${index + 1}`}
            alt={data.title}
            fill
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        )}
      </motion.div>

    </div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  useEffect(() => {
    if (containerRef.current) {
      setLineHeight(containerRef.current.scrollHeight);
    }
    
    const handleResize = () => {
      if (containerRef.current) setLineHeight(containerRef.current.scrollHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Playful, organically pulsing wiggly line that mathematically stays within the hub bounds
  const generateWavyPath = (height: number) => {
    if (height === 0) return "M 50 0 L 50 1000";
    let path = "M 50 0";
    const segmentLength = 100; // Shorter lengths for higher frequency / more squiggles
    
    let isRight = true;
    for (let y = 0; y <= height; y += segmentLength) {
      const nextY = y + segmentLength;
      
      // Control points for a smooth Bezier curve
      const ctrlY1 = y + segmentLength / 3;
      const ctrlY2 = y + (2 * segmentLength) / 3;
      
      // Playful mathematical pulsating width. It breathes organically between 6 and 15 units.
      // Since 15 is the absolute mathematical maximum, it never breaches the 14-unit visual radius of the dot.
      const dynamicAmplitude = 6 + Math.abs(Math.sin(y * 0.01)) * 9; 
      
      const xOffset = isRight ? 50 + dynamicAmplitude : 50 - dynamicAmplitude;
      
      path += ` C ${xOffset} ${ctrlY1}, ${xOffset} ${ctrlY2}, 50 ${nextY}`;
      isRight = !isRight;
    }
    return path;
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-20 py-32 bg-black text-white relative z-10 w-full overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto relative">
        <div className="mb-20 md:mb-32 max-w-4xl text-center mx-auto flex flex-col items-center">
          <h2 className="text-[10px] md:text-xs font-mono text-[#6339FF] mb-6 md:mb-8 uppercase tracking-widest">Who I Am</h2>
          <p className="text-2xl md:text-5xl lg:text-6xl font-light leading-tight text-white/90 font-sans tracking-tight mb-8">
            I am a 20-year-old entrepreneur and <span className="font-bold">Global Builder</span> engineering scalable solutions across continents.
          </p>
          <p className="text-base md:text-2xl font-light leading-relaxed text-white/50 font-sans max-w-3xl">
            I thrive on immersing myself in new cultures and chasing impossible challenges. Whether I am architecting deep AI systems or launching D2C brands, I am constantly learning, building, and growing today—so that tomorrow, I can make a definitive impact.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-20">
          
          {/* THE WIGGLY LINE */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-40 z-0 opacity-50 lg:opacity-100 pointer-events-none hidden md:block">
            {lineHeight > 0 && (
              <>
                <svg viewBox={`0 0 100 ${lineHeight}`} preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full stroke-white/5 stroke-[2px] fill-none">
                  <path d={generateWavyPath(lineHeight)} />
                </svg>
                <svg viewBox={`0 0 100 ${lineHeight}`} preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full stroke-[#6339FF]/40 stroke-[4px] fill-none drop-shadow-[0_0_15px_rgba(99,57,255,0.4)]">
                  <motion.path 
                    d={generateWavyPath(lineHeight)} 
                    style={{ pathLength: scrollYProgress }} 
                  />
                </svg>
              </>
            )}
          </div>
          
          {/* Mobile Straight Line fallback */}
          <div className="absolute left-0 md:hidden top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden">
             <motion.div 
               className="w-full bg-[#6339FF] origin-top opacity-50"
               style={{ scaleY: scrollYProgress, height: '100%' }}
             />
          </div>

          {/* NODES */}
          <div className="flex flex-col relative z-10 pt-10 pb-32">
            {timelineData.map((node, i) => (
              <TimelineNode key={i} data={node} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
