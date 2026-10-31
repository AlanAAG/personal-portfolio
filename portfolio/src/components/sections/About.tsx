'use client';

import Link from 'next/link';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';

const timelineData = [
  {
    year: { en: "Sep 2025 - Expected May 2029", es: "Sep 2025 - Previsto para mayo de 2029" },
    title: { en: "Bachelor in Management and Technology", es: "Licenciatura en Management and Technology" },
    entity: "Tetr College of Business",
    location: { en: "Global Rotation", es: "Rotación Global" },
    category: { en: "Education", es: "Educación" },
    description: {
      en: "Project-based global program combining technology, entrepreneurship, and business operations. Academic experiences include FITT at IIT Delhi and Fudan University.",
      es: "Programa global basado en proyectos que combina tecnología, emprendimiento y operaciones. Incluye experiencias académicas en FITT del IIT Delhi y Fudan University."
    },
    mediaId: "experience_1"
  },
  {
    year: { en: "August 2026 - Present", es: "Agosto 2026 - Presente" },
    title: { en: "Technical Product Management Intern", es: "Practicante de Gestión Técnica de Producto" },
    entity: "Tetr College of Business",
    location: { en: "Shanghai, China", es: "Shanghái, China" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Integrating Professor AI into Tetr's LMS and improving the user journey and UI/UX. Building feedback loops with students, teachers, and administrators while improving token efficiency, RAG reliability, and usage analytics to create value across the institution.",
      es: "Integro Professor AI al LMS de Tetr y mejoro la experiencia de usuario y el diseño UI/UX. Establezco ciclos de retroalimentación con estudiantes, docentes y administradores, mientras optimizo el uso de tokens, la confiabilidad de RAG y la analítica para generar valor en toda la institución."
    },
    mediaId: "tetr_logo"
  },
  {
    year: { en: "March 2026 - August 2026", es: "Marzo 2026 - Agosto 2026" },
    title: { en: "Development, Product and Founder's Office Intern", es: "Practicante de Desarrollo, Producto y Oficina del Fundador" },
    entity: "Magure Inc.",
    location: { en: "Dubai, UAE (Remote)", es: "Dubái, EAU (Remoto)" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Worked directly with CEO Akhil Koka on product scope, requirements, documentation, and enterprise AI delivery. Built custom MCP servers, MagOne automations, and Python scripts; contributed to 10+ production AI workflows.",
      es: "Trabajé directamente con el CEO Akhil Koka en alcance de producto, requisitos, documentación y entrega de IA empresarial. Construí servidores MCP, automatizaciones con MagOne y scripts en Python; contribuí a más de 10 flujos de IA en producción."
    },
    mediaId: "Magure"
  },
  {
    year: { en: "March 2026 - August 2026", es: "Marzo 2026 - Agosto 2026" },
    title: { en: "Software Engineering Intern", es: "Practicante de Ingeniería de Software" },
    entity: "CraftOS",
    location: { en: "Fukuoka, Japan (Remote)", es: "Fukuoka, Japón (Remoto)" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Architected a scalable Python multi-agent system with multi-LLM routing, ChromaDB-powered RAG memory, and dynamic tool execution across 100+ API integrations for an enterprise B2B SaaS platform. Engineered full-stack solutions for an open-source autonomous AI assistant, contributing core modules used by the broader developer community.",
      es: "Diseñé un sistema multi-agente escalable en Python con enrutamiento multi-LLM, memoria RAG con ChromaDB y ejecución dinámica de herramientas en más de 100 integraciones de API para una plataforma SaaS B2B empresarial. Desarrollé soluciones full-stack para un asistente de IA autónomo de código abierto, contribuyendo módulos centrales usados por la comunidad de desarrolladores."
    },
    mediaId: "CraftOS"
  },
  {
    year: { en: "Jan 2026 - May 2026", es: "Enero 2026 - Mayo 2026" },
    title: { en: "Co-Founder and Full-Stack Developer", es: "Cofundador y Desarrollador Full-Stack" },
    entity: "Tiora (Demi-fine Jewellery)",
    location: { en: "New Delhi, India", es: "Nueva Delhi, India" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Built a headless commerce stack and digitized inventory, fulfilment, and customer workflows. The brand generated $15,000+ in four months while supply-chain lead time fell from seven days to three hours.",
      es: "Construí una plataforma de comercio headless y digitalicé inventario, entregas y atención al cliente. La marca generó más de $15,000 en cuatro meses y el tiempo de suministro bajó de siete días a tres horas."
    },
    mediaType: "video",
    mediaId: "experience_2",
    link: "/work/tiora"
  },
  {
    year: { en: "Oct 2025 - Present", es: "Octubre 2025 - Presente" },
    title: { en: "Co-Founder and Lead Engineer", es: "Cofundador e Ingeniero Principal" },
    entity: "Professor AI",
    location: { en: "UAE, India", es: "EAU, India" },
    category: { en: "Projects", es: "Proyectos" },
    description: {
      en: "Built and sold an agentic tutoring platform to two educational institutions. Its FastAPI, PostgreSQL, and pgvector retrieval system now serves 400+ students.",
      es: "Construí y vendí una plataforma de tutoría con agentes a dos instituciones educativas. Su sistema de recuperación con FastAPI, PostgreSQL y pgvector ahora atiende a más de 400 estudiantes."
    },
    mediaType: "video",
    mediaId: "experience_3",
    link: "/work/professor-ai"
  },
  {
    year: { en: "Oct 2025 - Feb 2026", es: "Octubre 2025 - Febrero 2026" },
    title: { en: "Sales & AI Automation Intern", es: "Practicante de Ventas y Automatización con IA" },
    entity: "Academy for Sales Excellence",
    location: { en: "Dubai, UAE", es: "Dubái, EAU" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Built and delivered 10+ custom enterprise AI solutions with Python, n8n, and connected business systems. Supported prospecting, onboarding, implementation, and post-sale maintenance.",
      es: "Construí y entregué más de 10 soluciones empresariales de IA con Python, n8n y sistemas de negocio. Apoyé prospección, incorporación, implementación y mantenimiento posterior a la venta."
    },
    mediaId: "experience_4"
  },
  {
    year: { en: "Aug 2025 - Jan 2026", es: "Agosto 2025 - Enero 2026" },
    title: { en: "Co-Founder", es: "Cofundador" },
    entity: "Beyond Common",
    location: { en: "Dubai, UAE", es: "Dubái, EAU" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Secured initial angel funding by pitching a scalable, data-driven dropshipping model. Decreased order processing time by 40% via headless commerce automation.",
      es: "Aseguré financiamiento ángel inicial presentando un modelo de dropshipping escalable basado en datos. Reduje el tiempo de procesamiento de pedidos en 40% mediante automatización de comercio headless."
    },
    mediaId: "experience_5",
    link: "/work/beyond-common"
  },
  {
    year: { en: "2025", es: "2025" },
    title: { en: "AI Wardrobe & Travel Assistant", es: "Asistente de Guardarropa y Viajes con IA" },
    entity: "Autonomous Agent System",
    location: { en: "Mexico, UAE", es: "México, EAU" },
    category: { en: "Projects", es: "Proyectos" },
    description: {
      en: "Built a Python-based Agentic Workflow integrating Notion, Supabase, and OpenWeather APIs to automate travel packing and outfit planning deployed via Render.",
      es: "Construí un flujo de trabajo agéntico en Python integrando las APIs de Notion, Supabase y OpenWeather para automatizar el empaque de viajes y la planificación de outfits, desplegado en Render."
    },
    mediaId: "travel_planner",
    link: "/work/wardrobe-assistant"
  },
  {
    year: { en: "2024", es: "2024" },
    title: { en: "Global Volunteer & Fundraiser", es: "Voluntario Global y Recaudador de Fondos" },
    entity: "Chipangali Wildlife Orphanage",
    location: { en: "Bulawayo, Zimbabwe", es: "Bulawayo, Zimbabue" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Organized a fundraiser generating $1,200+ for 30+ staff members. Contributed to wildlife operations, habitat enrichment, and ethical conservation in a high-demand, resource-limited environment.",
      es: "Organicé una recaudación de fondos que generó más de $1,200 para más de 30 miembros del personal. Contribuí a operaciones de vida silvestre, enriquecimiento de hábitats y conservación ética en un entorno de alta demanda y recursos limitados."
    },
    mediaId: "experience_8"
  },
  {
    year: { en: "May 2024", es: "Mayo 2024" },
    title: { en: "High School Diploma, STEM", es: "Bachillerato, STEM" },
    entity: "Tecnológico de Monterrey",
    location: { en: "Santa Fe, Mexico", es: "Santa Fe, México" },
    category: { en: "Education", es: "Educación" },
    description: {
      en: "Graduated with 96.72/100 GPA. Three-time recipient of the Academic Excellence Award.",
      es: "Me gradué con promedio de 96.72/100. Tres veces ganador del Premio a la Excelencia Académica."
    },
    mediaId: "experience_9"
  },
  {
    year: { en: "May 2023 - May 2025", es: "Mayo 2023 - Mayo 2025" },
    title: { en: "Freelance Full-Stack Developer", es: "Desarrollador Full-Stack Freelance" },
    entity: "Independent Consultant",
    location: { en: "Remote", es: "Remoto" },
    category: { en: "Experience", es: "Experiencia" },
    description: {
      en: "Delivered custom full-stack solutions for 35+ clients, including a headless platform that generated 10k+ monthly visitors and digitized legacy retail operations.",
      es: "Entregué soluciones full-stack personalizadas a más de 35 clientes, incluyendo una plataforma headless que generó más de 10k visitantes mensuales y digitalizó operaciones de retail tradicionales."
    },
    mediaId: "experience_12.jpg"
  },
  {
    year: { en: "2021 - 2024", es: "2021 - 2024" },
    title: { en: "Club Secretary and Treasurer", es: "Secretario y Tesorero del Club" },
    entity: "Rotary International",
    location: { en: "Mexico", es: "México" },
    category: { en: "Leadership", es: "Liderazgo" },
    description: {
      en: "Managed a $5,000 budget and coordinated cross-functional projects across 5+ international clubs.",
      es: "Administré un presupuesto de $5,000 y coordiné proyectos multifuncionales en más de 5 clubes internacionales."
    },
    mediaId: "experience_13"
  },
  {
    year: { en: "2019 - 2024", es: "2019 - 2024" },
    title: { en: "Vice President", es: "Vicepresidente" },
    entity: "Debate Team",
    location: { en: "Mexico", es: "México" },
    category: { en: "Leadership", es: "Liderazgo" },
    description: {
      en: "Ranked top 5% regionally, competing in 35+ tournaments; mentored 35+ team members in structured thinking and complex argumentation.",
      es: "Clasificado en el top 5% regional, compitiendo en más de 35 torneos; mentoré a más de 35 miembros del equipo en pensamiento estructurado y argumentación compleja."
    },
    mediaId: "experience_14"
  }
];

const TimelineNode = ({ data, index }: { data: any; index: number }) => {
  const { lang } = useLang();
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
    <div ref={nodeRef} className={`relative flex items-center justify-between w-full my-6 lg:my-24 z-10 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
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
        className={`w-full lg:w-[42%] p-6 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 lg:border-white/10 rounded-3xl ${isEven ? 'lg:text-right' : 'lg:text-left'} mt-4 lg:mt-0 relative group ${data.link ? 'hover:bg-white/10 hover:border-[#6339FF]/50 transition-all duration-300 shadow-xl' : ''}`}
      >
        {/* Mobile Left Border indicator */}
        <div className="lg:hidden absolute top-0 left-0 w-1 h-full bg-[#6339FF]/30 rounded-l-3xl" />
        {data.link && (
          <Link href={data.link} className="absolute inset-0 z-20 rounded-2xl" aria-label={`View ${data.title[lang]} Case Study`} />
        )}

        {/* Mobile Media Integration */}
        <div className="lg:hidden w-full mb-4 rounded-xl overflow-hidden aspect-video border border-white/10 relative">
          {data.mediaType === 'video' ? (
            <video
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/video/upload/f_auto,q_auto,vc_auto,c_limit,w_720/${data.mediaId || `experience_${index + 1}`}`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={data.mediaId || `experience_${index + 1}`}
              alt={data.title[lang]}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )}
        </div>

        <span className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-mono tracking-widest uppercase border border-[#6339FF]/50 text-[#6339FF] rounded-full bg-[#6339FF]/10">
          {data.category[lang]}
        </span>
        <h3 className="text-xl md:text-2xl font-bold mb-2">{data.title[lang]}</h3>
        <h4 className={`text-lg md:text-xl font-serif italic text-white/70 mb-4 ${data.link ? 'group-hover:text-[#6339FF] transition-colors flex items-center ' + (isEven ? 'lg:justify-end' : 'lg:justify-start') + ' gap-2' : ''}`}>
          {data.entity}
        </h4>
        <div className={`flex flex-col gap-1 font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-4 ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
          <span>{data.location[lang]}</span>
          <span className="text-white/60 font-semibold">{data.year[lang]}</span>
        </div>
        <p className="text-white/80 leading-relaxed font-light text-sm md:text-base line-clamp-3 md:line-clamp-none">
          {data.description[lang]}
        </p>

        {data.category.en === 'Certification' && (
          <div className={`mt-6 flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <span className="text-[0.65rem] font-mono tracking-widest uppercase text-white/30 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
              {lang === 'es' ? 'Credencial Verificada' : 'Verified Credential'}
            </span>
          </div>
        )}

        {/* Read Full Story Affordance (Mobile/Tablet Compact focus) */}
        {data.link && (
          <div className={`mt-5 flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#6339FF] border border-[#6339FF]/50 rounded-full px-4 py-2 flex items-center gap-2 group-hover:bg-[#6339FF] group-hover:text-black transition-colors duration-300">
              {lang === 'es' ? 'Leer la Historia Completa' : 'Read Full Story'} <span className="text-sm leading-none translate-y-[1px]">→</span>
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
          <Link href={data.link} className="absolute inset-0 z-20 rounded-2xl" aria-label={`View ${data.title[lang]} media`} />
        )}
        {data.mediaType === 'video' ? (
          <video
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/video/upload/f_auto,q_auto,vc_auto,c_limit,w_720/${data.mediaId || `experience_${index + 1}`}`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <Image
            src={data.mediaId || `experience_${index + 1}`}
            alt={data.title[lang]}
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
  const { lang } = useLang();
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
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-20 py-20 md:py-32 bg-black text-white relative z-10 w-full overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto relative">
        <div className="mb-10 md:mb-32 max-w-4xl text-center mx-auto flex flex-col items-center">
          <h2 className="text-[10px] md:text-xs font-mono text-[#6339FF] mb-6 md:mb-8 uppercase tracking-widest">{lang === 'es' ? 'Quién Soy' : 'Who I Am'}</h2>
          <p className="text-2xl md:text-5xl lg:text-6xl font-light leading-tight text-white/90 font-sans tracking-tight mb-8">
            {lang === 'es' ? (
              <>Uso la tecnología para lograr <span className="font-bold">operaciones más eficientes y negocios con más valor.</span></>
            ) : (
              <>I use technology to make <span className="font-bold">business operations more efficient and valuable.</span></>
            )}
          </p>
          <p className="text-base md:text-2xl font-light leading-relaxed text-white/50 font-sans max-w-3xl">
            {lang === 'es'
              ? 'Me especializo en transformación digital de negocios. Combino ingeniería, producto y operaciones para convertir tecnología en eficiencia operativa y valor económico. He desarrollado sistemas de IA, vendido software educativo a instituciones y entregado productos digitales a más de 35 clientes.'
              : 'I specialize in digital business transformation. I combine engineering, product and operations to turn technology into operational efficiency and economic value. I have built AI systems, sold EdTech software to institutions, and delivered digital products for 35+ clients.'}
          </p>
          <Link
            href="/certifications"
            className="mt-10 px-8 py-4 border border-[#6339FF]/50 text-[#6339FF] font-mono text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#6339FF] hover:text-black transition-colors duration-300"
          >
            {lang === 'es' ? 'Ver Certificaciones →' : 'View Certifications →'}
          </Link>
        </div>

        {/* TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto pt-0 pb-20 md:py-20">
          
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
          <div className="flex flex-col relative z-10 pt-4 md:pt-10 pb-32">
            {timelineData.map((node, i) => (
              <TimelineNode key={i} data={node} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
