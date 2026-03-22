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
    <section className="min-h-[50vh] px-8 md:px-20 py-20 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-[5vw] font-bold font-inter mb-20 leading-none">
          SKILLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SKILLS.map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-mono text-white/50 mb-6 uppercase tracking-widest border-b border-white/20 pb-2">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map((item, j) => (
                  <li key={j} className="text-lg font-light">
                    <GlitchText>{item}</GlitchText>
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
