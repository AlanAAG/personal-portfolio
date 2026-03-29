import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin } from 'lucide-react';

const experienceData: Record<string, any> = {
  "dubai": {
    title: "Dubai, UAE",
    subtitle: "E-Commerce, Sales Automation & Aviation Innovation",
    summary: "Secured seed funding for a home décor startup, built B2B AI workflows, and won 1st Place at the Emirates Ebdaa Pitch Competition.",
    roles: [
      {
        title: "Co-Founder",
        company: "Beyond Common",
        timeline: "Aug 2025 - Jan 2026",
        description: "Secured initial angel funding by pitching a scalable, data-driven dropshipping model. Decreased order processing time by 40% via headless commerce automation.",
        link: "/info#experience"
      },
      {
        title: "Sales & AI Automation Intern",
        company: "Academy for Sales Excellence",
        timeline: "Oct 2025 - Feb 2026",
        description: "Secured 10 recurrent enterprise clients using custom n8n and Python API workflows. Reduced customer support latency by 80% through CRM routing pipelines.",
        link: "/info#experience"
      },
      {
        title: "1st Place Winner",
        company: "Emirates Ebdaa Pitch Competition",
        timeline: "2025",
        description: "Developed 'FlyBand', an NFC smart bracelet unifying digital identity, payments, and Skywards loyalty, presented directly to the Emirates Group VP of Technology Futures.",
        link: "/info#experience"
      }
    ],
    images: ["tiora_2", "dubai_5", "dubai_7", "bc_1?v=2"]
  },
  "delhi": {
    title: "New Delhi, India",
    subtitle: "D2C Brand Building & EdTech AI Integration",
    summary: "Scaling a D2C demi-fine jewellery brand hitting PMF rapidly while anchoring engineering operations for an AI EdTech platform.",
    roles: [
      {
        title: "Co-Founder & CTO",
        company: "Tiora (Demi-fine Jewellery)",
        timeline: "Jan 2026 - Present",
        description: "Validated PMF via $3,000+ revenue in the first month. Reduced COGS by 66% and supply chain lead time from 7 days to 3 hours by negotiating with 110+ international manufacturers."
      },
      {
        title: "Lead Developer",
        company: "Professor AI",
        timeline: "Oct 2025 - Present",
        description: "Architected a scalable RAG system powered by FastAPI and Supabase to support 250+ students with instant, high-accuracy context handling and query condensing.",
        link: "/info#experience"
      }
    ],
    images: ["tiora_1", "tiora_3", "tiora_4", "india_1"]
  },
  "milan": {
    title: "Milan, Italy",
    subtitle: "Upcoming Full-Time Internship",
    summary: "Scheduled global immersion and corporate deployment as part of the Tetr College of Business global rotation.",
    roles: []
  },
  "shanghai": {
    title: "Shanghai, China",
    subtitle: "Upcoming Asian Market Rotation",
    summary: "Scheduled global immersion focused on scalable manufacturing and supply chain architecture.",
    roles: []
  },
  "us": {
    title: "United States",
    subtitle: "Upcoming Rotation & HQ",
    summary: "Finalizing the global management operational footprint and VC scaling mechanisms.",
    roles: []
  },
  "accra": {
    title: "Accra, Ghana",
    subtitle: "Upcoming African Market Rotation",
    summary: "Scheduled global immersion establishing emerging market infrastructural dynamics.",
    roles: []
  },
  "ba": {
    title: "Buenos Aires, Argentina",
    subtitle: "Upcoming LatAm Rotation",
    summary: "Scheduled global immersion mapping Latin American digital adoption vectors.",
    roles: []
  }
};

export default async function ExperiencePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const data = experienceData[id];

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl">Location Not Found</h1>
        <Link href="/#experience" className="mt-8 text-white/50 hover:text-white underline">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden pb-32">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#6339FF]/10 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />
      
      <div className="relative z-10 flex-1 w-full max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-32">
        <Link href="/#map" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Globe</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[10px] md:text-sm font-mono tracking-widest text-[#6339FF] uppercase mb-2 md:mb-4 flex items-center">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Global Node
            </span>
            <h1 className="text-4xl md:text-8xl font-sans font-bold tracking-tighter capitalize mt-2">
              {data.title}
            </h1>
            <p className="text-lg md:text-3xl font-serif text-white/70 italic mt-3 md:mt-4">
              {data.subtitle}
            </p>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-white/10 mb-16" />
        
        <p className="text-xl md:text-4xl text-white font-sans font-light tracking-tight max-w-4xl leading-relaxed mb-16 md:mb-20 px-1">
          {data.summary}
        </p>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:flex gap-16 w-full">
          {/* LEFT COLUMN: TIMELINE OPERATIONS */}
          <div className="w-1/2 flex flex-col gap-12">
            {data.roles && data.roles.length > 0 && (
              <div className="space-y-8 w-full">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">Key Operations</h3>
                {data.roles.map((role: any, i: number) => {
                  const content = (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-colors group relative overflow-hidden h-full">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#6339FF] opacity-50" />
                      <div className="flex flex-row items-center justify-between mb-6 gap-3">
                        <h4 className={`text-3xl font-bold ${role.link ? 'group-hover:text-[#6339FF] transition-colors flex items-center gap-2' : ''}`}>
                          {role.company}
                          {role.link && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6339FF] translate-y-[1px]">↗</span>}
                        </h4>
                        <span className="text-xs font-mono text-white/40 tracking-[0.2em] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block uppercase whitespace-nowrap">{role.timeline}</span>
                      </div>
                      <h5 className="text-xl text-[#6339FF] font-semibold mb-6 tracking-tight">{role.title}</h5>
                      <p className="text-white/80 leading-relaxed text-lg normal-case">
                        {role.description}
                      </p>
                    </div>
                  );
                  return role.link ? (
                    <Link key={i} href={role.link} className="block cursor-pointer">
                      {content}
                    </Link>
                  ) : (
                    <div key={i}>{content}</div>
                  );
                })}
              </div>
            )}
            {!data.roles && (
              <div className="flex flex-col items-center justify-center py-32 opacity-20 border border-white/10 rounded-2xl mx-6">
                 <span className="font-mono text-sm tracking-widest uppercase">[ TBD ]</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: MEDIA GRID */}
          {data.images && data.images.length > 0 && (
            <div className="w-1/2 flex flex-col gap-8 mt-12">
              {data.images.map((img: string, i: number) => (
                <div 
                  key={i} 
                  className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-transform duration-700 hover:scale-[1.02]"
                >
                  <Image
                    src={img}
                    alt={`${data.title} graphical asset ${i + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- MOBILE LAYOUT (INTERLEAVED) --- */}
        <div className="flex flex-col lg:hidden w-full gap-10">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">Key Operations</h3>
          
          {(!data.roles || data.roles.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20 border border-white/10 rounded-2xl">
               <span className="font-mono text-xs tracking-widest uppercase">[ TBD ]</span>
            </div>
          ) : (
            Array.from({ length: Math.max(data.roles?.length || 0, Math.ceil((data.images?.length || 0) / 2)) }).map((_, i) => (
              <div key={i} className="flex flex-col gap-6">
                
                {/* Text Block */}
                {data.roles && data.roles[i] && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#6339FF] opacity-50" />
                    <div className="flex flex-col mb-4 gap-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-2xl font-bold font-sans tracking-tight">
                          {data.roles[i].company}
                        </h4>
                        {data.roles[i].link && (
                          <Link href={data.roles[i].link} className="text-[#6339FF] border border-[#6339FF]/50 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                            <span className="text-xs translate-y-[0.5px]">↗</span>
                          </Link>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase shrink-0">
                        {data.roles[i].timeline}
                      </span>
                    </div>
                    
                    <h5 className="text-base text-[#6339FF] font-semibold mb-4 tracking-tight leading-snug">
                      {data.roles[i].title}
                    </h5>
                    <p className="text-white/80 leading-relaxed text-sm font-light">
                      {data.roles[i].description}
                    </p>
                  </div>
                )}

                {/* Images Block (2 per row) */}
                {data.images && (data.images[i * 2] || data.images[i * 2 + 1]) && (
                  <div className="grid grid-cols-2 gap-2">
                    {data.images[i * 2] && (
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-white/10">
                        <Image src={data.images[i * 2]} alt={`Asset ${i * 2}`} fill className="object-cover" sizes="50vw" />
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
