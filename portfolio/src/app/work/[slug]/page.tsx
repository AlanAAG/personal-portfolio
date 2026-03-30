import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';
import PitchdeckEmbed from '@/components/ui/PitchdeckEmbed';
const projectsData: Record<string, any> = {
  "tiora": {
    title: "Tiora",
    role: "Co-Founder",
    timeline: "January 2026 - Present",
    location: "New Delhi, India",
    summary: "Architected a headless e-commerce stack on Shopify and Shiprocket, validating PMF with $3k+ revenue in 21 days.",
    bullets: [
      "Digitized operations by building a headless e-commerce stack, reducing supply chain lead time from 7 days to 3 hours and validating PMF with $3,000+ first-month revenue.",
      "Optimized frontend performance and GTM strategy, resulting in 30% boost in conversion rates.",
      "Increased online visibility by 60% by securing 4 influencer promotion partnerships."
    ],
    stack: ["Shopify Headless", "React.js", "Supply Chain Ops"],
    images: ["tiora_2", "tiora_3"],
    video: "tiora_demo",
    links: [
      { label: "Website", url: "https://tiora.co/" },
      { label: "Instagram", url: "https://www.instagram.com/tiora.official/" }
    ],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_pdf/tiora-pitchdeck`
  },
  "professor-ai": {
    title: "Professor AI",
    role: "Co-Founder & Lead Developer",
    timeline: "October 2025 - Present",
    location: "UAE, India",
    summary: "Built a scalable RAG engine parsing complex PDFs to provide instant, personalized academic support for 250+ students.",
    bullets: [
      "Architected a scalable RAG system powered by FastAPI and Supabase, implementing a custom RRF algorithm to support 200+ students with instant academic context.",
      "Engineered advanced context-handling logic (Query Condensing and Map-Reduce), optimized through rigorous testing to handle complex, multi-turn conversations.",
      "Automated CI/CD pipelines for data ingestion, decreasing deployment time from 6h to 30 min."
    ],
    stack: ["FastAPI", "Supabase Vector", "React", "Python", "CI/CD"],
    video: "ai_tutor_demo",
    links: [
      { label: "Website", url: "https://asktetr.com/" },
      { label: "GitHub", url: "https://github.com/AlanAAG/professor-agent-platform" }
    ],
    images: ["gitex"],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_pdf/professor-ai-pitchdeck`
  },
  "beyond-common": {
    title: "Beyond Common",
    role: "Co-Founder",
    timeline: "August 2025 - January 2026",
    location: "Dubai, UAE",
    summary: "Secured seed funding by pitching a data-driven dropshipping model and automating online CRM operations globally.",
    bullets: [
      "Secured initial angel funding by pitching a scalable, data-driven e-commerce model to investors.",
      "Decreased order processing time by 40% by automating online operations with a headless setup."
    ],
    stack: ["Global Logistics", "GTM Strategy", "B2B Sales"],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/beyondcommonstore/" }
    ],
    images: ["bc_1?v=2"],
    pitchdeck: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_pdf/beyond-common-pitchdeck`
  },
  "wardrobe-assistant": {
    title: "AI Wardrobe & Travel Assistant",
    role: "Full Stack Developer",
    timeline: "2025",
    location: "Mexico, UAE",
    summary: "Built an intelligent flight-tracking and packing system using LLM agents, Notion API, and OpenWeather integrations.",
    bullets: [
      "Built a Python-based Agentic Workflow integrating Notion, Supabase, and OpenWeather APIs to automate travel packing and outfit planning.",
      "Designed modular architecture with LLM Agents and custom caching to optimize rate limits; deployed via Render with system monitoring."
    ],
    stack: ["Python", "n8n", "Render", "APIs", "Supabase"],
    links: [
      { label: "GitHub", url: "https://github.com/AlanAAG/Wardrobe_Assistant" }
    ]
  }
};

export default async function WorkPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const data = projectsData[slug];

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl">Project Not Found</h1>
        <Link href="/" className="mt-8 text-white/50 hover:text-white underline">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans pb-32">
      <div className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-32">
        <Link href="/#work" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Portfolio</span>
        </Link>
        
        {/* NEW CONDITIONAL SPLIT HEADER */}
        {data.video ? (
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 mb-16 xl:items-center">
            
            <div className="xl:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter capitalize mb-4">
                {data.title}
              </h1>
              <p className="text-xl md:text-3xl font-serif text-white/70 italic mb-6 md:mb-8">
                {data.role}
              </p>
              <div className="font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 space-y-1 md:space-y-2 mb-8">
                <p>{data.location}</p>
                <p>{data.timeline}</p>
              </div>

              {/* LINKS */}
              {data.links && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {data.links.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                      {link.label} ↗
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
                {data.role}
              </p>
            </div>
            <div className="text-left xl:text-right font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/50 space-y-1 md:space-y-2">
              <p>{data.location}</p>
              <p>{data.timeline}</p>

              {/* LINKS */}
              {data.links && (
                <div className="flex flex-wrap gap-4 mt-8 xl:justify-end">
                  {data.links.map((link: any, i: number) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                      {link.label} ↗
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
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">Tech Stack & Tools</h3>
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
                {data.summary}
              </h2>
              <div className="space-y-8">
                {data.bullets.map((bullet: string, i: number) => (
                  <div key={i} className="flex gap-6">
                    <div className="mt-3 w-2 h-2 rounded-full bg-[#6339FF] shrink-0 shadow-[0_0_10px_rgba(99,57,255,0.5)]" />
                    <p className="text-xl text-white/80 leading-relaxed font-normal">
                      {bullet}
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
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-4 border-b border-white/10 pb-4">Tech Stack & Tools</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {data.stack.map((item: string, i: number) => (
              <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-mono tracking-wider text-white/70 uppercase">
                {item}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-8 leading-tight">
            {data.summary}
          </h2>

          <div className="flex flex-col gap-8">
            {Array.from({ length: Math.max(data.bullets?.length || 0, Math.ceil((data.images?.length || 0) / 2)) }).map((_, i) => (
              <div key={i} className="flex flex-col gap-6">
                
                {/* Text Bullet */}
                {data.bullets && data.bullets[i] && (
                  <div className="flex gap-4">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6339FF] shrink-0 shadow-[0_0_10px_rgba(99,57,255,0.5)]" />
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {data.bullets[i]}
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
