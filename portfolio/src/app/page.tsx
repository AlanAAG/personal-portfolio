import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

const PersonalIntro = dynamic(() => import("@/components/sections/PersonalIntro"));
const HorizontalGallery = dynamic(() => import("@/components/sections/HorizontalGallery"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const GlobalMap = dynamic(() => import("@/components/sections/GlobalMap"));

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <Hero />
      <PersonalIntro />
      <HorizontalGallery />
      <Skills />
      <GlobalMap />
    </main>
  );
}
