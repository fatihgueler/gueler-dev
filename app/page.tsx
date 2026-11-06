import { faq } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Problem } from "@/components/home/Problem";
import { Services } from "@/components/home/Services";
import { ProcessStairs } from "@/components/home/ProcessStairs";
import { PaketeRows } from "@/components/home/PaketeRows";
import { Projects } from "@/components/home/Projects";
import { Vertrauen } from "@/components/home/Vertrauen";
import { Outcomes } from "@/components/home/Outcomes";
import { Faq } from "@/components/home/Faq";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
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
      <Hero />
      <Marquee />
      <Problem />
      <Services />
      <ProcessStairs />
      <PaketeRows />
      <Projects />
      <Vertrauen />
      {/* Blendet sich aus, solange nur Platzhalter-Stimmen hinterlegt sind */}
      <Testimonials />
      <Outcomes />
      <Faq />
      <CTA />
      <Contact />
    </>
  );
}
