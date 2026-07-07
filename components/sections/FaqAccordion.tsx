"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { faq } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQPage-JSON-LD wird serverseitig in app/page.tsx ausgegeben (zuverlässig
// für Crawler + KI-Antwortmaschinen / GEO), nicht hier im Client-Component.

export function FaqAccordion() {
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

        <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-border">
          {faq.items.map((item, i) => (
            <m.div
              key={item.question}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <AccordionItem value={`faq-${i}`}>
                {/* Harter Zeilen-Invert beim Hover, kein weiches Easing */}
                <AccordionTrigger className="-mx-4 px-4 py-6 text-left font-display text-xl font-bold no-underline transition-colors duration-100 hover:bg-foreground hover:text-background hover:no-underline md:-mx-6 md:px-6 md:text-2xl [&[data-state=open]]:text-foreground [&[data-state=closed]]:text-foreground/80 [&[data-state=open]>svg]:text-violet-3 [&:hover>svg]:text-background">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-7 text-base leading-relaxed text-muted">
                  <p className="max-w-2xl border-l-2 border-violet pl-5">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </m.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
