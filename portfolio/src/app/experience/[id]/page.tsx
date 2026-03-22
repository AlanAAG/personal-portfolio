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
      
      <div className="relative z-10 flex-1 w-full max-w-screen-xl mx-auto px-6 py-20 md:px-12 md:py-32">
        <Link href="/#map" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Globe</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-xs md:text-sm font-mono tracking-widest text-[#6339FF] uppercase mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> Global Node
            </span>
            <h1 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter capitalize mt-2">
              {data.title}
            </h1>
            <p className="text-xl md:text-3xl font-serif text-white/70 italic mt-4">
              {data.subtitle}
            </p>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-white/10 mb-16" />
        
        <p className="text-2xl md:text-4xl text-white font-sans font-light tracking-tight max-w-4xl leading-relaxed mb-20">
          {data.summary}
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
          
          {/* LEFT COLUMN: TIMELINE OPERATIONS */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12">
            {data.roles && data.roles.length > 0 && (
              <div className="space-y-8 w-full">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">Key Operations</h3>
                {data.roles.map((role: any, i: number) => {
                  const content = (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 hover:bg-white/10 transition-colors group">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-4 gap-2">
                        <h4 className={`text-xl lg:text-2xl font-bold ${role.link ? 'group-hover:text-[#6339FF] transition-colors flex items-center gap-2' : ''}`}>
                          {role.company}
                          {role.link && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6339FF] translate-y-[1px]">↗</span>}
                        </h4>
                        <span className="text-xs xl:text-sm font-mono text-white/50 tracking-wider bg-black/50 px-3 py-1 rounded inline-block w-max">{role.timeline}</span>
                      </div>
                      <h5 className="text-base lg:text-lg text-[#6339FF] font-semibold mb-4">{role.title}</h5>
                      <p className="text-white/70 leading-relaxed text-base lg:text-lg font-light">{role.description}</p>
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
            
            {/* Missing Content Logic */}
          {!data.roles && (
            <div className="flex flex-col items-center justify-center py-32 opacity-20 border border-white/10 rounded-2xl mx-6">
               <span className="font-mono text-sm tracking-widest uppercase">[ TBD ]</span>
            </div>
          )}
          </div>

          {/* RIGHT COLUMN: VERTICAL MEDIA STACK */}
          {data.images && data.images.length > 0 && (
            <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:mt-12">
              {data.images.map((img: string, i: number) => (
                <div 
                  key={i} 
                  className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt={`${data.title} graphical asset ${i + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
