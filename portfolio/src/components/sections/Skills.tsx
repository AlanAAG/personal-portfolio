'use client';

import GlitchText from '@/components/ui/GlitchText';

const SKILLS = [
  { category: "Languages", items: ["Python", "SQL", "C", "JavaScript", "HTML/CSS"] },
  { category: "AI/ML Stack", items: ["RAG Systems", "FastAPI", "Selenium", "Supabase", "OpenAI API"] },
  { category: "Strategy", items: ["Process Mapping", "Digital Transformation", "Financial Modeling", "Market Research"] },
  { category: "Tools", items: ["Next.js", "Tailwind CSS", "Framer Motion", "Git/GitHub", "Vercel"] }
];

export default function Skills() {
  return (
    <section className="min-h-[50vh] px-8 md:px-20 py-20 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-[5vw] font-bold font-inter mb-20 leading-none">
          CAPABILITIES
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
