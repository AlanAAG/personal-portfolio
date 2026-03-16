'use client';

import GlitchText from '@/components/ui/GlitchText';

export default function About() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-20 bg-black text-white relative z-10">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-white/50 mb-8 uppercase tracking-widest">Who I Am</h2>
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-white/90">
            I am an <GlitchText className="font-bold">AI Business Engineer</GlitchText> bridging the gap between 
            complex algorithms and real-world value. My mission is to build systems that not only function 
            but <span className="italic font-serif">thrive</span> in the market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-mono text-white/50 mb-8 uppercase tracking-widest">Education</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Tetr College of Business & Illinois Tech</h3>
                <p className="text-white/60 mb-2">B.Sc. in AI & Business • Expected 2029</p>
                <p className="text-white/80 leading-relaxed">
                  Global rotational program launching a new business each semester across diverse industries. 
                  Studying in UAE, India, Singapore, Ghana, Spain, Europe, and the US.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tecnológico de Monterrey</h3>
                <p className="text-white/60">High School Diploma, Multicultural Program • 2024</p>
                <p className="text-white/80">GPA: 96.72/100 • Academic Excellence Award</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-mono text-white/50 mb-8 uppercase tracking-widest">Experience</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Academy for Sales Excellence</h3>
                <p className="text-white/60 mb-2">Sales & AI Automation Intern • Dubai</p>
                <p className="text-white/80 leading-relaxed">
                  Mastering B2B sales pipelines and leveraging AI for automation and lead generation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Beyond Common</h3>
                <p className="text-white/60 mb-2">Co-founder • Dubai</p>
                <p className="text-white/80 leading-relaxed">
                  Directing e-commerce operations, marketing analytics, and supplier acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
