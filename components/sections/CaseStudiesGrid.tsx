import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { caseStudies } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";

/**
 * Klickbare Case-Study-Karten – jede verlinkt auf die Detailseite
 * /projekte/[slug]. Violetter Akzent, beide Themes über semantische Tokens.
 */
export function CaseStudiesGrid() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="Case Studies"
        title="Projekte im Detail"
        subtitle="Von der Herausforderung über die Lösung bis zum messbaren Ergebnis – ein genauer Blick auf ausgewählte Arbeiten."
      />

      <RevealGroup
        className="mt-14 grid gap-5 md:grid-cols-2"
        stagger={0.1}
      >
        {caseStudies.map((study) => (
          <RevealItem key={study.id} variant="fadeUp" className="h-full">
            <Link
              href={`/projekte/${study.id}`}
              data-cursor="view"
              className="card-surface group flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition-[transform,box-shadow,border-color] duration-100 hover:-translate-x-1 hover:-translate-y-1 hover:border-border-strong hover:shadow-[8px_8px_0_0_var(--color-violet)]"
              aria-label={`Case Study ansehen: ${study.title}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-3">
                  {study.category}
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted-2 transition-colors group-hover:text-violet-3"
                  aria-hidden
                />
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                {study.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {study.tagline}
              </p>

              {study.metrics.length > 0 && (
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <dt className="font-display text-xl font-semibold text-violet-2">
                        {metric.value}
                      </dt>
                      <dd className="mt-1 text-xs text-muted-2">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
