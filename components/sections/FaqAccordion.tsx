"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

import { faq } from "@/lib/content";
import { MotionReveal } from "@/components/anim/MotionReveal";
import { cn } from "@/lib/utils";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-6 text-left font-display text-lg font-semibold transition-colors md:text-xl",
          isOpen ? "text-foreground" : "text-foreground/80 hover:text-foreground",
        )}
      >
        {question}
        <m.span
          aria-hidden
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
            isOpen ? "border-violet text-violet-3" : "border-border text-muted",
          )}
          animate={{ rotateZ: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ChevronDown className="size-4" />
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-base leading-relaxed text-muted">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr]">
        <MotionReveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
            {faq.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {faq.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {faq.subtitle}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <div className="border-t border-border">
            {faq.items.map((item, i) => (
              <FaqItem
                key={item.question}
                index={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
