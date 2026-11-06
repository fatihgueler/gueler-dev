import * as React from "react";

import { faq } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * FAQ mit nativem <details>: funktioniert ohne JS, per Tastatur, und alle
 * Antworten stehen im HTML (gut für Suche + KI-Antwortmaschinen).
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b-2 border-border py-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="faq-title" index="08" label={faq.eyebrow} title={faq.title} subtitle={faq.subtitle} />
        <div className="mt-16 grid md:grid-cols-12">
          <div data-rv-stagger="70" className="border-t-2 border-border md:col-span-9 md:col-start-4">
            {faq.items.map((item, i) => (
              <details key={item.question} data-rv="up" className="group border-b-2 border-border">
                <summary className="flex cursor-pointer list-none items-start gap-5 py-6 hover:bg-foreground hover:text-background [&::-webkit-details-marker]:hidden">
                  <span className="label shrink-0 pt-1.5">F{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold leading-tight">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center border-2 border-current font-mono text-xl leading-none group-open:bg-signal group-open:text-on-signal"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 pl-0 text-lg leading-relaxed md:pl-14">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
