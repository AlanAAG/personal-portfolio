'use client';

import GlitchText from '@/components/ui/GlitchText';
import { useLang } from '@/lib/i18n';

const SKILLS = [
  {
    category: { en: "AI & Machine Learning", es: "IA y Machine Learning" },
    items: [
      { en: "LLM & Agent Orchestration (Multi-Agent, Multi-LLM Routing)", es: "Orquestación de LLM y Agentes (Multi-Agente, Enrutamiento Multi-LLM)" },
      { en: "RAG Systems (Hybrid Retrieval: RRF + MMR)", es: "Sistemas RAG (Recuperación Híbrida: RRF + MMR)" },
      { en: "Embeddings & Vector Search (pgvector, Supabase, ChromaDB)", es: "Embeddings y Búsqueda Vectorial (pgvector, Supabase, ChromaDB)" },
      { en: "MCP (Model Context Protocol), Tool Calling", es: "MCP (Model Context Protocol), Tool Calling" },
      { en: "Prompt Engineering & Persona Systems", es: "Ingeniería de Prompts y Sistemas de Persona" },
      { en: "LLM Evaluation", es: "Evaluación de LLMs" },
      { en: "Computer Vision (Applied), Speech-to-Text (Whisper)", es: "Visión Computacional (Aplicada), Voz a Texto (Whisper)" },
      { en: "LLM Integration (Claude API, OpenAI, LangChain)", es: "Integración de LLMs (Claude API, OpenAI, LangChain)" }
    ]
  },
  {
    category: { en: "AI Governance & Compliance", es: "Gobernanza y Cumplimiento de IA" },
    items: [
      { en: "ISO 42001 (AI Management Systems)", es: "ISO 42001 (Sistemas de Gestión de IA)" },
      { en: "ISO 27001 (Information Security)", es: "ISO 27001 (Seguridad de la Información)" },
      { en: "ISO 9001 (Quality Management)", es: "ISO 9001 (Gestión de Calidad)" },
      { en: "AI Risk & Compliance Frameworks", es: "Marcos de Riesgo y Cumplimiento de IA" },
      { en: "Responsible AI Implementation", es: "Implementación de IA Responsable" }
    ]
  },
  {
    category: { en: "Digital Transformation & Automation", es: "Transformación Digital y Automatización" },
    items: [
      { en: "Business Process Automation & Orchestration (n8n)", es: "Automatización y Orquestación de Procesos de Negocio (n8n)" },
      { en: "Enterprise AI Adoption & Integration", es: "Adopción e Integración de IA Empresarial" },
      { en: "Legacy Operations Digitization", es: "Digitalización de Operaciones Tradicionales" },
      { en: "Solution Architecture", es: "Arquitectura de Soluciones" },
      { en: "API Systems & Connectivity", es: "Sistemas de API y Conectividad" }
    ]
  },
  {
    category: { en: "Engineering & Infrastructure", es: "Ingeniería e Infraestructura" },
    items: [
      { en: "Python (Advanced), TypeScript, JavaScript, SQL", es: "Python (Avanzado), TypeScript, JavaScript, SQL" },
      { en: "React.js, Next.js 14, FastAPI, REST API Design", es: "React.js, Next.js 14, FastAPI, Diseño de APIs REST" },
      { en: "PostgreSQL, Supabase", es: "PostgreSQL, Supabase" },
      { en: "AWS, Vercel, Render", es: "AWS, Vercel, Render" },
      { en: "CI/CD (GitHub Actions), Playwright, Git", es: "CI/CD (GitHub Actions), Playwright, Git" },
      { en: "Cursor, Claude Code", es: "Cursor, Claude Code" }
    ]
  },
  {
    category: { en: "Business, Strategy & Delivery", es: "Negocios, Estrategia y Entrega" },
    items: [
      { en: "Venture Building & 0 to 1 Product Development", es: "Venture Building y Desarrollo de Producto de 0 a 1" },
      { en: "Project Management (PMBOK 8: Predictive, Agile, Hybrid)", es: "Gestión de Proyectos (PMBOK 8: Predictivo, Ágil, Híbrido)" },
      { en: "GTM Strategy & PMF Validation", es: "Estrategia GTM y Validación de PMF" },
      { en: "Enterprise & B2B SaaS Sales", es: "Ventas Empresariales y de SaaS B2B" },
      { en: "Financial Modeling", es: "Modelado Financiero" },
      { en: "Market & Industry Analysis", es: "Análisis de Mercado e Industria" },
      { en: "Product Strategy (Spec & PRD Writing)", es: "Estrategia de Producto (Redacción de Specs y PRDs)" },
      { en: "Supply Chain & D2C Operations", es: "Cadena de Suministro y Operaciones D2C" },
      { en: "Data Analytics", es: "Analítica de Datos" }
    ]
  },
  {
    category: { en: "Languages", es: "Idiomas" },
    items: [
      { en: "Spanish (Native)", es: "Español (Nativo)" },
      { en: "English (C1)", es: "Inglés (C1)" },
      { en: "French (B1)", es: "Francés (B1)" },
      { en: "Mandarin (Beginner)", es: "Mandarín (Principiante)" }
    ]
  }
];

export default function Skills() {
  const { lang } = useLang();

  return (
    <section className="min-h-[50vh] px-6 md:px-20 py-12 md:py-20 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-[5vw] font-bold font-inter mb-10 md:mb-20 leading-none tracking-tighter uppercase">
          {lang === 'es' ? 'HABILIDADES' : 'SKILLS'}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {SKILLS.map((group, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-xs md:text-sm font-mono text-white/50 mb-4 md:mb-6 uppercase tracking-widest border-b border-white/20 pb-2">
                {group.category[lang]}
              </h3>
              <ul className="flex flex-wrap gap-2 md:block md:space-y-4">
                {group.items.map((item, j) => (
                  <li key={j} className="md:text-base font-light text-[11px] font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-white/80 md:bg-transparent md:border-none md:rounded-none md:p-0 md:text-white md:font-sans md:font-light">
                    <span className="md:hidden">{item[lang]}</span>
                    <span className="hidden md:inline"><GlitchText>{item[lang]}</GlitchText></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
