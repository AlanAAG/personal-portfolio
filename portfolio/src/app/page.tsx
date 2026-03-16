import Hero from "@/components/sections/Hero";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import PersonalIntro from "@/components/sections/PersonalIntro";
import Skills from "@/components/sections/Skills";
import GlobalMap from "@/components/sections/GlobalMap";

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
