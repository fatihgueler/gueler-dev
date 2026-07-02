import type { Metadata } from "next";

import { faq } from "@/lib/content";
import { SignalSpineLoader } from "@/components/three/SignalSpineLoader";
import { ChapterProgress } from "@/components/ui/ChapterProgress";
import { Hero } from "@/components/sections/Hero";
import { StoryPitch } from "@/components/sections/StoryPitch";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { StickyStory } from "@/components/sections/StickyStory";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { Outcomes } from "@/components/sections/Outcomes";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      {/* Persistenter Szenen-Layer (fixed, z-0) — die Kapitel scrollen darüber */}
      <SignalSpineLoader />
      <ChapterProgress />
      <div className="relative z-10">
        <Hero />
        <StoryPitch />
        <ProcessSteps />
        <FeaturesGrid />
        <TechStrip />
        <StickyStory />
        <ProjectHighlight />
        <Outcomes />
        <FaqAccordion />
        <FinalCta />
        <Contact />
      </div>
    </>
  );
}
