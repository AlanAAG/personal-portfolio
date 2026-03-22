import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';

export default function InfoPage() {
  return (
    <main className="relative bg-black min-h-screen">
      
      {/* Global Timeline Content */}
      <div className="relative z-10 bg-black pt-12 md:pt-20">
        <About />
        <Skills />
      </div>
      
    </main>
  );
}
