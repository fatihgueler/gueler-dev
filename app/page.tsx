import { Hero } from "@/components/sections/Hero";
import { StoryPitch } from "@/components/sections/StoryPitch";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { StickyStory } from "@/components/sections/StickyStory";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryPitch />
      <ProcessSteps />
      <FeaturesGrid />
      <TechStrip />
      <StickyStory />
      <ProjectHighlight />
      <Testimonials />
      <FaqAccordion />
      <FinalCta />
      <Contact />
    </>
  );
}
