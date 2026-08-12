'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useLang, l } from '@/lib/i18n';

const experienceData: Record<string, any> = {
  "dubai": {
    title: { en: "Dubai, UAE", es: "Dubái, EAU" },
    subtitle: {
      en: "E-Commerce, Sales Automation & Aviation Innovation",
      es: "E-Commerce, Automatización de Ventas e Innovación en Aviación"
    },
    summary: {
      en: "Secured seed funding for a home décor startup, built B2B AI workflows, and won 1st Place at the Emirates Ebdaa Pitch Competition.",
      es: "Aseguré financiamiento semilla para una startup de decoración del hogar, construí flujos de trabajo B2B con IA y gané el 1er lugar en la Emirates Ebdaa Pitch Competition."
    },
    roles: [
      {
        title: { en: "Founders Office Intern", es: "Practicante en Founders Office" },
        company: "Magure Inc.",
        timeline: { en: "Mar 2026 - Present", es: "Mar 2026 - Presente" },
        description: {
          en: "Engineered and sold 10+ AI workflow automations to third-party enterprises, improving department-specific efficiency by up to 30% while reporting directly to the CEO. Automated ISO 42001, 9001, and 27001 compliance infrastructure, tripling certified coverage across client systems.",
          es: "Diseñé y vendí más de 10 automatizaciones de flujos de trabajo con IA a empresas externas, mejorando la eficiencia por departamento hasta en 30%, reportando directamente al CEO. Automaticé la infraestructura de cumplimiento ISO 42001, 9001 y 27001, triplicando la cobertura certificada en los sistemas de los clientes."
        },
        link: "/info#experience"
      },
      {
        title: { en: "Co-Founder", es: "Cofundador" },
        company: "Beyond Common",
        timeline: { en: "Aug 2025 - Jan 2026", es: "Ago 2025 - Ene 2026" },
        description: {
          en: "Secured initial angel funding by pitching a scalable, data-driven dropshipping model. Decreased order processing time by 40% via headless commerce automation.",
          es: "Aseguré financiamiento ángel inicial al presentar un modelo de dropshipping escalable y basado en datos. Reduje el tiempo de procesamiento de pedidos en 40% mediante automatización de comercio headless."
        },
        link: "/info#experience"
      },
      {
        title: { en: "Sales & AI Automation Intern", es: "Practicante de Ventas y Automatización con IA" },
        company: "Academy for Sales Excellence",
        timeline: { en: "Oct 2025 - Feb 2026", es: "Oct 2025 - Feb 2026" },
        description: {
          en: "Secured 10 recurrent enterprise clients using custom n8n and Python API workflows. Reduced customer support latency by 80% through CRM routing pipelines.",
          es: "Conseguí 10 clientes empresariales recurrentes con flujos personalizados de n8n y APIs en Python. Reduje la latencia de soporte al cliente en 80% mediante pipelines de enrutamiento en CRM."
        },
        link: "/info#experience"
      },
      {
        title: { en: "1st Place Winner", es: "Ganador del 1er Lugar" },
        company: "Emirates Ebdaa Pitch Competition",
        timeline: { en: "2025", es: "2025" },
        description: {
          en: "Developed 'FlyBand', an NFC smart bracelet unifying digital identity, payments, and Skywards loyalty, presented directly to the Emirates Group VP of Technology Futures.",
          es: "Desarrollé 'FlyBand', un brazalete inteligente NFC que unifica identidad digital, pagos y el programa de lealtad Skywards, presentado directamente al VP de Technology Futures de Emirates Group."
        },
        link: "/info#experience"
      }
    ],
    images: ["tiora_2", "dubai_5", "dubai_7", "bc_1?v=2"]
  },
  "delhi": {
    title: { en: "New Delhi, India", es: "Nueva Delhi, India" },
    subtitle: {
      en: "D2C Brand Building & EdTech AI Integration",
      es: "Construcción de Marca D2C e Integración de IA en EdTech"
    },
    summary: {
      en: "Scaling a D2C demi-fine jewellery brand hitting PMF rapidly while anchoring engineering operations for an AI EdTech platform.",
      es: "Escalando una marca D2C de joyería demi-fine que alcanzó PMF rápidamente, mientras lidero las operaciones de ingeniería de una plataforma EdTech con IA."
    },
    roles: [
      {
        title: { en: "Co-Founder & CTO", es: "Cofundador y CTO" },
        company: "Tiora (Demi-fine Jewellery)",
        timeline: { en: "Jan 2026 - Present", es: "Ene 2026 - Presente" },
        description: {
          en: "Validated PMF via $3,000+ revenue in the first month. Reduced COGS by 66% and supply chain lead time from 7 days to 3 hours by negotiating with 110+ international manufacturers.",
          es: "Validé el PMF con más de $3,000 en ingresos durante el primer mes. Reduje el COGS en 66% y el lead time de la cadena de suministro de 7 días a 3 horas negociando con más de 110 fabricantes internacionales."
        }
      },
      {
        title: { en: "Lead Developer", es: "Desarrollador Líder" },
        company: "Professor AI",
        timeline: { en: "Oct 2025 - Present", es: "Oct 2025 - Presente" },
        description: {
          en: "Architected a scalable RAG system powered by FastAPI and Supabase to support 250+ students with instant, high-accuracy context handling and query condensing.",
          es: "Diseñé un sistema RAG escalable con FastAPI y Supabase para dar soporte a más de 250 estudiantes, con manejo de contexto instantáneo de alta precisión y condensación de consultas."
        },
        link: "/info#experience"
      },
      {
        title: { en: "Selected Founder", es: "Fundador Seleccionado" },
        company: "YC Startup School India",
        timeline: { en: "2026", es: "2026" },
        description: {
          en: "Selected for Y Combinator's exclusive India cohort, leveraging intensive YC methodologies to refine go-to-market frameworks alongside top-tier technical founders. Secured $25,000 USD in AI credits during the program to aggressively scale ongoing AI-driven platforms and optimize computational infrastructure.",
          es: "Seleccionado para la cohorte exclusiva de Y Combinator en India, aplicando metodologías intensivas de YC para refinar estrategias de go-to-market junto a fundadores técnicos de primer nivel. Obtuve $25,000 USD en créditos de IA durante el programa para escalar agresivamente plataformas impulsadas por IA y optimizar la infraestructura computacional."
        }
      }
    ],
    images: ["tiora_1", "tiora_3", "tiora_4", "india_1", "YC_school"]
  },
  "milan": {
    title: { en: "Milan, Italy", es: "Milán, Italia" },
    subtitle: {
      en: "Upcoming Full-Time Internship",
      es: "Próxima Pasantía de Tiempo Completo"
    },
    summary: {
      en: "Scheduled global immersion and corporate deployment as part of the Tetr College of Business global rotation.",
      es: "Inmersión global y despliegue corporativo programados como parte de la rotación global de Tetr College of Business."
    },
    roles: []
  },
  "shanghai": {
    title: { en: "Shanghai, China", es: "Shanghái, China" },
    subtitle: {
      en: "Upcoming Asian Market Rotation",
      es: "Próxima Rotación en el Mercado Asiático"
    },
    summary: {
      en: "Scheduled global immersion focused on scalable manufacturing and supply chain architecture.",
      es: "Inmersión global programada, enfocada en manufactura escalable y arquitectura de cadenas de suministro."
    },
    roles: []
  },
  "us": {
    title: { en: "United States", es: "Estados Unidos" },
    subtitle: {
      en: "Upcoming Rotation & HQ",
      es: "Próxima Rotación y Sede Central"
    },
    summary: {
      en: "Finalizing the global management operational footprint and VC scaling mechanisms.",
      es: "Consolidando la huella operativa de gestión global y los mecanismos de escalamiento con capital de riesgo."
    },
    roles: []
  },
  "accra": {
    title: { en: "Accra, Ghana", es: "Acra, Ghana" },
    subtitle: {
      en: "Upcoming African Market Rotation",
      es: "Próxima Rotación en el Mercado Africano"
    },
    summary: {
      en: "Scheduled global immersion establishing emerging market infrastructural dynamics.",
      es: "Inmersión global programada para entender las dinámicas de infraestructura de los mercados emergentes."
    },
    roles: []
  },
  "ba": {
    title: { en: "Buenos Aires, Argentina", es: "Buenos Aires, Argentina" },
    subtitle: {
      en: "Upcoming LatAm Rotation",
      es: "Próxima Rotación en LatAm"
    },
    summary: {
      en: "Scheduled global immersion mapping Latin American digital adoption vectors.",
      es: "Inmersión global programada mapeando los vectores de adopción digital en América Latina."
    },
    roles: []
  }
};

export default function ExperiencePage() {
  const params = useParams<{ id: string }>();
  const { lang } = useLang();
  const id = params.id;
  const data = experienceData[id];

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl">{lang === 'es' ? 'Ubicación No Encontrada' : 'Location Not Found'}</h1>
        <Link href="/#experience" className="mt-8 text-white/50 hover:text-white underline">{lang === 'es' ? 'Volver al Inicio' : 'Return Home'}</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden pb-32">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#6339FF]/10 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />

      <div className="relative z-10 flex-1 w-full max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-32">
        <Link href="/#map" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">{lang === 'es' ? 'Volver al Globo' : 'Back to Globe'}</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[10px] md:text-sm font-mono tracking-widest text-[#6339FF] uppercase mb-2 md:mb-4 flex items-center">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" /> {lang === 'es' ? 'Nodo Global' : 'Global Node'}
            </span>
            <h1 className="text-4xl md:text-8xl font-sans font-bold tracking-tighter capitalize mt-2">
              {l(data.title, lang)}
            </h1>
            <p className="text-lg md:text-3xl font-serif text-white/70 italic mt-3 md:mt-4">
              {l(data.subtitle, lang)}
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/10 mb-16" />

        <p className="text-xl md:text-4xl text-white font-sans font-light tracking-tight max-w-4xl leading-relaxed mb-16 md:mb-20 px-1">
          {l(data.summary, lang)}
        </p>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:flex gap-16 w-full">
          {/* LEFT COLUMN: TIMELINE OPERATIONS */}
          <div className="w-1/2 flex flex-col gap-12">
            {data.roles && data.roles.length > 0 && (
              <div className="space-y-8 w-full">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">{lang === 'es' ? 'Operaciones Clave' : 'Key Operations'}</h3>
                {data.roles.map((role: any, i: number) => {
                  const content = (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-colors group relative overflow-hidden h-full">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#6339FF] opacity-50" />
                      <div className="flex flex-row items-center justify-between mb-6 gap-3">
                        <h4 className={`text-3xl font-bold ${role.link ? 'group-hover:text-[#6339FF] transition-colors flex items-center gap-2' : ''}`}>
                          {role.company}
                          {role.link && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#6339FF] translate-y-[1px]">↗</span>}
                        </h4>
                        <span className="text-xs font-mono text-white/40 tracking-[0.2em] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-block uppercase whitespace-nowrap">{l(role.timeline, lang)}</span>
                      </div>
                      <h5 className="text-xl text-[#6339FF] font-semibold mb-6 tracking-tight">{l(role.title, lang)}</h5>
                      <p className="text-white/80 leading-relaxed text-lg normal-case">
                        {l(role.description, lang)}
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
                    alt={`${l(data.title, lang)} graphical asset ${i + 1}`}
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
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">{lang === 'es' ? 'Operaciones Clave' : 'Key Operations'}</h3>

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
                        {l(data.roles[i].timeline, lang)}
                      </span>
                    </div>

                    <h5 className="text-base text-[#6339FF] font-semibold mb-4 tracking-tight leading-snug">
                      {l(data.roles[i].title, lang)}
                    </h5>
                    <p className="text-white/80 leading-relaxed text-sm font-light">
                      {l(data.roles[i].description, lang)}
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
