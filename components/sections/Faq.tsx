import * as React from "react";
import { ChevronDown } from "lucide-react";

import { faq } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function Faq() {
  return (
    <Section id="faq" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="teal-glow pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={faq.title}
            subtitle={faq.subtitle}
          />
        </Reveal>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details className="faq-item card-surface group rounded-[var(--radius-lg)]">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 font-display text-base font-semibold text-foreground transition-colors hover:text-teal md:text-lg">
                  {item.question}
                  <span
                    className="faq-chevron inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted"
                    aria-hidden
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <div className="faq-answer px-6 pb-6">
                  <p className="max-w-prose text-base leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
