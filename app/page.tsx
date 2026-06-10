import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSteps />
      <FeaturesGrid />
      <ProjectHighlight />
      <FaqAccordion />
      <FinalCta />
      <Contact />
    </>
  );
}
