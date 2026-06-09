import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesTeaser />
      <CaseStudies />
      <Packages />
      <Process />
      <Contact />
      <CTA />
    </>
  );
}
