import { faq } from "@/lib/content";
import { ChapterProgress } from "@/components/ui/ChapterProgress";
import { HardCut } from "@/components/ui/HardCut";
import { Hero } from "@/components/sections/Hero";
import { StoryPitch } from "@/components/sections/StoryPitch";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { StickyStory } from "@/components/sections/StickyStory";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { Outcomes } from "@/components/sections/Outcomes";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ScrollSequence } from "@/components/sections/ScrollSequence";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

// FAQPage-Schema serverseitig (SSR) für Rich Results + GEO: KI-Antwort-
// maschinen (ChatGPT, Perplexity, Google AI Overviews) extrahieren Q&A daraus.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ChapterProgress />
      <Hero />
      <HardCut chapter="01" title="Dein Problem" />
      <StoryPitch />
      <HardCut chapter="02" title="Dein Weg" />
      <ProcessSteps />
      <FeaturesGrid />
      <TechStrip />
      <StickyStory />
      <HardCut chapter="03" title="Der Beweis" />
      <ProjectHighlight />
      <HardCut chapter="04" title="Dein Erfolg" />
      <Outcomes />
      <FaqAccordion />
      <HardCut chapter="05" title="Der Prozess" />
      <ScrollSequence />
      <HardCut chapter="06" title="Dein Moment" />
      <FinalCta />
      <Contact />
    </>
  );
}
