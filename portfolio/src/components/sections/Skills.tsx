'use client';

import GlitchText from '@/components/ui/GlitchText';

const SKILLS = [
  { category: "Programming", items: ["Python (Adv.)", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "React.js", "Next.js"] },
  { category: "AI & Backend", items: ["RAG", "FastAPI", "Vector Databases (Supabase)", "LLM Agents", "API Systems", "n8n"] },
  { category: "Infrastructure", items: ["Cursor", "Claude Code", "CI/CD", "Playwright", "AWS", "Shopify", "Render", "Vercel"] },
  { category: "Languages", items: ["Spanish (Native)", "English (C1)", "French (B1)"] },
  { category: "Strategy", items: ["GTM Strat", "Supply Chain", "D2C Ops", "Fin. Modeling", "Adv. Office", "Data Analytics"] }
];

export default function Skills() {
  return (
    <section className="min-h-[50vh] px-6 md:px-20 py-12 md:py-20 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-[5vw] font-bold font-inter mb-10 md:mb-20 leading-none tracking-tighter uppercase">
          SKILLS
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {SKILLS.map((group, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-xs md:text-sm font-mono text-white/50 mb-4 md:mb-6 uppercase tracking-widest border-b border-white/20 pb-2">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2 md:block md:space-y-4">
                {group.items.map((item, j) => (
                  <li key={j} className="md:text-lg font-light text-[11px] font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-white/80 md:bg-transparent md:border-none md:rounded-none md:p-0 md:text-white md:font-sans md:font-light">
                    <span className="md:hidden">{item}</span>
                    <span className="hidden md:inline"><GlitchText>{item}</GlitchText></span>
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
