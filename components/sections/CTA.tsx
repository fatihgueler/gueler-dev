import * as React from "react";
import Link from "next/link";

import { cta } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/Magnetic";
import { BigMarquee } from "@/components/sections/BigMarquee";

/**
 * Abschluss-Block aller Unterseiten: Signalfläche über volle Breite,
 * Headline läuft asymmetrisch links, Buttons rechts unten.
 */
export function CTA() {
  return (
    <>
    <BigMarquee />
    <section className="bg-signal text-on-signal">
      <div className="frame grid gap-10 py-[var(--spacing-section)] md:grid-cols-12">
        <h2 data-rv="rise" className="display text-[clamp(3rem,1.5rem+7vw,9rem)] md:col-span-8">{cta.title}</h2>
        <div data-rv="up" className="flex flex-col justify-end gap-6 md:col-span-4">
          <p className="text-lg font-medium leading-snug">{cta.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Magnetic strength={0.2}>
            <Link
              href={cta.primary.href}
              className="flex min-h-14 items-center justify-between gap-3 border-2 border-ink bg-ink px-6 font-mono text-sm font-bold uppercase tracking-[0.06em] text-paper transition-transform duration-[90ms] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-paper)]"
            >
              {cta.primary.label}
              <span aria-hidden className="nudge">→</span>
            </Link>
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="border-ink text-ink hover:bg-ink hover:text-paper">
              <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
