import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesTeaser />
      <ProjectsTeaser />
      <Process />
      <CTA />
    </>
  );
}
