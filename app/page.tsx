import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Trust } from "@/components/sections/Trust";
import { Pakete } from "@/components/sections/Pakete";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <Projects />
      <Process />
      <Trust />
      <Pakete />
      <About />
      <Contact />
    </>
  );
}
