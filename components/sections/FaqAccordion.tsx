"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

import { faq } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";

// FAQPage-JSON-LD wird serverseitig in app/page.tsx ausgegeben (zuverlässig
// für Crawler + KI-Antwortmaschinen / GEO), nicht hier im Client-Component.

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
            "inline-flex h-8 w-8 shrink-0 items-center justify-center border transition-colors",
            isOpen ? "border-violet bg-violet/5 text-violet-3" : "border-border text-muted",
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
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Reveal variant="fadeIn">
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              {faq.eyebrow}
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              {faq.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
              {faq.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {faq.items.map((item, i) => (
            <m.div
              key={item.question}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <FaqItem
                index={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
