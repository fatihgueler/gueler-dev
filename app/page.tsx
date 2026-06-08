import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { BurobuckeFeature } from "@/components/home/BurobuckeFeature";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { WhatsappCta } from "@/components/home/WhatsappCta";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <BurobuckeFeature />
      <ServicesTeaser />
      <ProjectsTeaser />
      <WhatsappCta />
      <Process />
      <CTA />
    </>
  );
}
