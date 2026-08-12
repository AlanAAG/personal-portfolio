'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';
import PitchdeckEmbed from '@/components/ui/PitchdeckEmbed';
import { useLang, l } from '@/lib/i18n';
const projectsData: Record<string, any> = {
  "maestraia": {
    title: "MaestraIA",
    role: { en: "Founder & Developer", es: "Fundador y Desarrollador" },
    timeline: { en: "May 2026 - Present", es: "Mayo 2026 - Presente" },
    location: { en: "Mexico City, Mexico", es: "Ciudad de México, México" },
    summary: {
      en: "Built an all-in-one AI platform for preschool English teachers in Mexico, generating curriculum-compliant lesson plans, classroom materials, and qualitative student reports.",
      es: "Plataforma integral de IA para maestras de inglés preescolar en México, que genera planeaciones alineadas al currículo, materiales para el aula y reportes cualitativos de alumnos."
    },
    bullets: [
      {
        en: "Generates full 10-day lesson plans with Claude, grounded via RAG in official SEP curriculum documents (NEM, PRONI 2024) so output is compliant by design, exported as print-ready, coordinator-approved PDFs.",
        es: "Genera planeaciones completas de 10 días con Claude, fundamentadas vía RAG en documentos oficiales del currículo de la SEP (NEM, PRONI 2024) para cumplir la norma por diseño, exportadas como PDFs listos para imprimir y aprobados por coordinadoras."
      },
      {
        en: "Built AI-generated classroom materials: printable flashcards with cut lines, worksheets, an interactive Memory Match game, and curated YouTube playlists per lesson.",
        es: "Materiales de aula generados con IA: flashcards imprimibles con líneas de corte, hojas de trabajo, un memorama interactivo y playlists de YouTube curadas por lección."
      },
      {
        en: "Designed a qualitative-only student tracking system around NEM pedagogy (Logrado / En proceso / Requiere apoyo) with progress charts and AI-assisted observations, no numeric grades, ever.",
        es: "Sistema de seguimiento de alumnos 100% cualitativo basado en la pedagogía de la NEM (Logrado / En proceso / Requiere apoyo), con gráficas de progreso y observaciones asistidas por IA, nunca calificaciones numéricas."
      },
      {
        en: "Enforced Row Level Security on all 17 Supabase tables and server-side streamed Claude responses, plus Richmond Learning Platform sync via CSV import and a Chrome extension.",
        es: "Row Level Security en las 17 tablas de Supabase y respuestas de Claude en streaming desde el servidor, además de sincronización con Richmond Learning Platform vía importación CSV y una extensión de Chrome."
      }
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Claude API", "RAG", "Tailwind CSS", "react-pdf"],
    video: "MaestraIA_Demo",
    images: ["maestraia_1", "maestraia_2", "maestra_ia_3"],
    links: [
      { label: { en: "Website", es: "Sitio Web" }, url: "https://maestraia.com" },
      { label: "GitHub", url: "https://github.com/AlanAAG/MaestraAI" }
    ]
  },
  "tiora": {
    title: "Tiora",
    role: { en: "Co-Founder", es: "Cofundador" },
    timeline: { en: "January 2026 - Present", es: "Enero 2026 - Presente" },
    location: { en: "New Delhi, India", es: "Nueva Delhi, India" },
    summary: {
      en: "Architected a headless e-commerce stack on Shopify and Shiprocket, validating PMF with $3k+ revenue in 21 days.",
      es: "Arquitectura de e-commerce headless sobre Shopify y Shiprocket, validando PMF con más de $3k en ingresos en 21 días."
    },
    bullets: [
      {
        en: "Digitized operations by building a headless e-commerce stack, reducing supply chain lead time from 7 days to 3 hours and validating PMF with $3,000+ first-month revenue.",
        es: "Digitalicé la operación con un stack de e-commerce headless, reduciendo el lead time de la cadena de suministro de 7 días a 3 horas y validando PMF con más de $3,000 de ingresos en el primer mes."
      },
      {
        en: "Optimized frontend performance and GTM strategy, resulting in 30% boost in conversion rates.",
        es: "Optimicé el rendimiento del frontend y la estrategia GTM, logrando un aumento del 30% en la tasa de conversión."
      },
      {
        en: "Increased online visibility by 60% by securing 4 influencer promotion partnerships.",
        es: "Incrementé la visibilidad online en 60% al cerrar 4 alianzas de promoción con influencers."
      }
    ],
    stack: ["Shopify Headless", "React.js", "Supply Chain Ops"],
    images: ["tiora_2", "tiora_3"],
    video: "tiora_demo",
    links: [
      { label: { en: "Website", es: "Sitio Web" }, url: "https://tiora.co/" },
      { label: "Instagram", url: "https://www.instagram.com/tiora.official/" }
    ],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/image/upload/f_pdf/tiora-pitchdeck`
  },
  "professor-ai": {
    title: "Professor AI",
    role: { en: "Co-Founder & Lead Developer", es: "Cofundador y Desarrollador Líder" },
    timeline: { en: "October 2025 - Present", es: "Octubre 2025 - Presente" },
    location: { en: "UAE, India", es: "EAU, India" },
    summary: {
      en: "Built a scalable RAG engine parsing complex PDFs to provide instant, personalized academic support for 250+ students.",
      es: "Motor RAG escalable que procesa PDFs complejos para brindar apoyo académico instantáneo y personalizado a más de 250 estudiantes."
    },
    bullets: [
      {
        en: "Architected a scalable RAG system powered by FastAPI and Supabase, implementing a custom RRF algorithm to support 200+ students with instant academic context.",
        es: "Arquitectura de un sistema RAG escalable con FastAPI y Supabase, implementando un algoritmo RRF personalizado para dar contexto académico instantáneo a más de 200 estudiantes."
      },
      {
        en: "Engineered advanced context-handling logic (Query Condensing and Map-Reduce), optimized through rigorous testing to handle complex, multi-turn conversations.",
        es: "Lógica avanzada de manejo de contexto (Query Condensing y Map-Reduce), optimizada mediante pruebas rigurosas para manejar conversaciones complejas de múltiples turnos."
      },
      {
        en: "Automated CI/CD pipelines for data ingestion, decreasing deployment time from 6h to 30 min.",
        es: "Pipelines de CI/CD automatizados para la ingesta de datos, reduciendo el tiempo de despliegue de 6 h a 30 min."
      }
    ],
    stack: ["FastAPI", "Supabase Vector", "React", "Python", "CI/CD"],
    video: "ai_tutor_demo",
    acquired: true,
    links: [
      { label: { en: "Website", es: "Sitio Web" }, url: "https://asktetr.com/" }
    ],
    images: ["gitex"],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/image/upload/f_pdf/professor-ai-pitchdeck`
  },
  "beyond-common": {
    title: "Beyond Common",
    role: { en: "Co-Founder", es: "Cofundador" },
    timeline: { en: "August 2025 - January 2026", es: "Agosto 2025 - Enero 2026" },
    location: { en: "Dubai, UAE", es: "Dubái, EAU" },
    summary: {
      en: "Secured seed funding by pitching a data-driven dropshipping model and automating online CRM operations globally.",
      es: "Levantamos capital semilla al presentar un modelo de dropshipping basado en datos y automatizar la operación de CRM online a nivel global."
    },
    bullets: [
      {
        en: "Secured initial angel funding by pitching a scalable, data-driven e-commerce model to investors.",
        es: "Aseguré inversión ángel inicial al presentar a inversionistas un modelo de e-commerce escalable y basado en datos."
      },
      {
        en: "Decreased order processing time by 40% by automating online operations with a headless setup.",
        es: "Reduje el tiempo de procesamiento de pedidos en 40% al automatizar la operación online con un setup headless."
      }
    ],
    stack: ["Global Logistics", "GTM Strategy", "B2B Sales"],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/beyondcommonstore/" }
    ],
    images: ["bc_1?v=2"],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/image/upload/f_pdf/beyond-common-pitchdeck`
  },
  "wardrobe-assistant": {
    title: "AI Wardrobe & Travel Assistant",
    role: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
    timeline: { en: "2025", es: "2025" },
    location: { en: "Mexico, UAE", es: "México, EAU" },
    summary: {
      en: "Built an intelligent flight-tracking and packing system using LLM agents, Notion API, and OpenWeather integrations.",
      es: "Sistema inteligente de seguimiento de vuelos y empaque de maletas usando agentes LLM, la API de Notion e integraciones con OpenWeather."
    },
    bullets: [
      {
        en: "Built a Python-based Agentic Workflow integrating Notion, Supabase, and OpenWeather APIs to automate travel packing and outfit planning.",
        es: "Workflow agéntico en Python que integra las APIs de Notion, Supabase y OpenWeather para automatizar el empaque de viaje y la planeación de outfits."
      },
      {
        en: "Designed modular architecture with LLM Agents and custom caching to optimize rate limits; deployed via Render with system monitoring.",
        es: "Arquitectura modular con agentes LLM y caché personalizado para optimizar rate limits; desplegado en Render con monitoreo del sistema."
      }
    ],
    stack: ["Python", "n8n", "Render", "APIs", "Supabase"],
    video: "wardrobe",
    links: [
      { label: "GitHub", url: "https://github.com/AlanAAG/Wardrobe_Assistant" }
    ]
  },
  "layered": {
    title: "Layered",
    role: { en: "Founder & Developer", es: "Fundador y Desarrollador" },
    timeline: { en: "2026 - Present", es: "2026 - Presente" },
    location: { en: "Mexico City, Mexico", es: "Ciudad de México, México" },
    summary: {
      en: "Turns YouTube videos, PDFs, and articles into flashcards and quizzes, Spanish-first, built for Latin American university students.",
      es: "Convierte videos de YouTube, PDFs y artículos en flashcards y quizzes, en español primero, hecho para universitarios latinoamericanos."
    },
    bullets: [
      {
        en: "Turns any YouTube video, PDF, or web article into study-ready flashcards and quizzes, extracts the transcript or text, then generates cards with OpenAI validated through Zod schemas.",
        es: "Convierte cualquier video de YouTube, PDF o artículo web en flashcards y quizzes listos para estudiar, extrae la transcripción o el texto y genera las tarjetas con OpenAI validadas mediante esquemas de Zod."
      },
      {
        en: "Spanish-first by design for Latin American university students, generating quizzes and spaced-repetition-ready cards that plug into existing study workflows.",
        es: "Diseñado en español primero para universitarios latinoamericanos, generando quizzes y tarjetas listas para repetición espaciada que se integran en los flujos de estudio existentes."
      },
      {
        en: "Built on the Next.js App Router with Supabase auth and storage; content extraction handled via youtube-transcript, unpdf, and Mozilla Readability.",
        es: "Construido sobre el App Router de Next.js con autenticación y almacenamiento de Supabase; la extracción de contenido se maneja con youtube-transcript, unpdf y Mozilla Readability."
      }
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Zod"],
    video: "layered_demo",
    images: ["layered_1", "layered_2"],
    links: [
      { label: { en: "Website", es: "Sitio Web" }, url: "https://layered-tk7i.vercel.app" },
      { label: "GitHub", url: "https://github.com/AlanAAG/layered" }
    ]
  }
};

export default function WorkPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLang();
  const data = projectsData[slug];

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl">{lang === 'es' ? 'Proyecto No Encontrado' : 'Project Not Found'}</h1>
        <Link href="/" className="mt-8 text-white/50 hover:text-white underline">{lang === 'es' ? 'Volver al Inicio' : 'Return Home'}</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans pb-32">
      <div className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-32">
        <Link href="/#work" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">{lang === 'es' ? 'Volver al Portafolio' : 'Back to Portfolio'}</span>
        </Link>

        {/* NEW CONDITIONAL SPLIT HEADER */}
        {data.video ? (
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 mb-16 xl:items-center">

            <div className="xl:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter capitalize mb-4 flex flex-wrap items-center gap-3 md:gap-5">
                {data.title}
                {data.acquired && (
                  <span className="text-xs md:text-sm font-mono font-medium tracking-widest uppercase text-[#6339FF] border border-[#6339FF]/50 bg-[#6339FF]/10 rounded-full px-4 py-1.5 align-middle">
                    {lang === 'es' ? 'Adquirida' : 'Acquired'}
                  </span>
                )}
              </h1>
              <p className="text-xl md:text-3xl font-serif text-white/70 italic mb-6 md:mb-8">
                {data.role[lang]}
              </p>
              <div className="font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 space-y-1 md:space-y-2 mb-8">
                <p>{data.location[lang]}</p>
                <p>{data.timeline[lang]}</p>
              </div>

              {/* LINKS */}
              {data.links && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {data.links.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                      {l(link.label, lang)} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="xl:w-1/2">
              <VideoPlayer videoId={data.video} />
            </div>

          </div>
        ) : (
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
            <div>
              <h1 className="text-4xl md:text-8xl font-sans font-bold tracking-tighter capitalize mb-4">
                {data.title}
              </h1>
              <p className="text-xl md:text-3xl font-serif text-white/70 italic">
                {data.role[lang]}
              </p>
            </div>
            <div className="text-left xl:text-right font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 space-y-1 md:space-y-2">
              <p>{data.location[lang]}</p>
              <p>{data.timeline[lang]}</p>

              {/* LINKS */}
              {data.links && (
                <div className="flex flex-wrap gap-4 mt-8 xl:justify-end">
                  {data.links.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                      {l(link.label, lang)} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="h-[1px] w-full bg-white/10 mb-16" />

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:block w-full">
          <div className="grid grid-cols-3 gap-16 w-full">
            <div className="col-span-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">{lang === 'es' ? 'Stack y Herramientas' : 'Tech Stack & Tools'}</h3>
              <div className="flex flex-wrap gap-2">
                {data.stack.map((item: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-xs font-mono tracking-wider text-white/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="text-4xl font-bold tracking-tight mb-8 leading-tight">
                {data.summary[lang]}
              </h2>
              <div className="space-y-8">
                {data.bullets.map((bullet: any, i: number) => (
                  <div key={i} className="flex gap-6">
                    <div className="mt-3 w-2 h-2 rounded-full bg-[#6339FF] shrink-0 shadow-[0_0_10px_rgba(99,57,255,0.5)]" />
                    <p className="text-xl text-white/80 leading-relaxed font-normal">
                      {bullet[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PITCHDECK EMBED */}
          {data.pitchdeck && (
            <PitchdeckEmbed src={data.pitchdeck} title={`${data.title} Pitchdeck`} />
          )}

          {/* DYNAMIC IMAGE GALLERY */}
          {data.images && data.images.length > 0 && (
            <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {data.images.map((img: string, i: number) => (
                <div
                  key={i}
                  className={`w-full rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10 transition-transform duration-700 hover:scale-[1.01] bg-transparent ${data.images.length === 1 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}`}
                >
                  <img
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqfmytikd'}/image/upload/f_auto,c_limit,w_1080,q_auto:best/${img}`}
                    alt={`${data.title} graphical asset ${i + 1}`}
                    className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- MOBILE LAYOUT (INTERLEAVED) --- */}
        <div className="block lg:hidden w-full">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-4 border-b border-white/10 pb-4">{lang === 'es' ? 'Stack y Herramientas' : 'Tech Stack & Tools'}</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {data.stack.map((item: string, i: number) => (
              <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-mono tracking-wider text-white/70 uppercase">
                {item}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-8 leading-tight">
            {data.summary[lang]}
          </h2>

          <div className="flex flex-col gap-8">
            {Array.from({ length: Math.max(data.bullets?.length || 0, Math.ceil((data.images?.length || 0) / 2)) }).map((_, i) => (
              <div key={i} className="flex flex-col gap-6">

                {/* Text Bullet */}
                {data.bullets && data.bullets[i] && (
                  <div className="flex gap-4">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6339FF] shrink-0 shadow-[0_0_10px_rgba(99,57,255,0.5)]" />
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {data.bullets[i][lang]}
                    </p>
                  </div>
                )}

                {/* Image Pair (2 per row) */}
                {data.images && (data.images[i * 2] || data.images[i * 2 + 1]) && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {data.images[i * 2] && (
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10">
                        <Image src={data.images[i * 2]} alt={`Asset ${i * 2}`} fill className="object-cover" sizes="50vw" priority={i === 0} />
                      </div>
                    )}
                    {data.images[i * 2 + 1] && (
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10">
                        <Image src={data.images[i * 2 + 1]} alt={`Asset ${i * 2 + 1}`} fill className="object-cover" sizes="50vw" />
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* MOBILE PITCHDECK EMBED */}
          {data.pitchdeck && (
            <div className="mt-12">
              <PitchdeckEmbed src={data.pitchdeck} title={`${data.title} Pitchdeck`} />
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
