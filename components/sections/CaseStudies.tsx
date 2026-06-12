import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { type CaseStudyColor, caseStudies } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const colorMap: Record<CaseStudyColor, { accent: string; badge: string; dot: string }> = {
  indigo: {
    accent: "bg-indigo-500",
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    dot: "bg-indigo-400",
  },
  amber: {
    accent: "bg-amber-500",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    dot: "bg-amber-400",
  },
  violet: {
    accent: "bg-violet",
    badge: "border-violet-2/30 bg-violet/10 text-violet-3",
    dot: "bg-violet-2",
  },
  cyan: {
    accent: "bg-cyan",
    badge: "border-cyan/30 bg-cyan/10 text-cyan-2",
    dot: "bg-cyan",
  },
};

const blockConfig = [
  { emoji: "🔴", label: "Challenge", key: "challenge" as const },
  { emoji: "🔵", label: "Lösung", key: "solution" as const },
  { emoji: "🟢", label: "Ergebnis", key: "result" as const },
];

export function CaseStudies() {
  return (
    <Section id="projekte">
      <SectionHeading
        eyebrow="Projekte"
        title="Ausgewählte Projekte"
        subtitle="Echte Probleme. Echte Lösungen."
        centered
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {caseStudies.map((study, i) => {
          const colors = colorMap[study.color];
          return (
            <Reveal key={study.id} delay={i * 120}>
              <article
                className={cn(
                  "card-surface group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] transition-all duration-300",
                  "hover:scale-[1.01] hover:shadow-2xl",
                )}
              >
                {/* Accent stripe */}
                <div className={cn("h-1 w-full", colors.accent)} aria-hidden />

                <div className="flex flex-1 flex-col p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                          colors.badge,
                        )}
                      >
                        {study.category}
                      </span>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-foreground">
                        {study.title}
                      </h3>
                      <p className="mt-1 text-sm italic text-muted">{study.tagline}</p>
                    </div>

                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${study.title} live ansehen`}
                        className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-gold hover:text-gold"
                      >
                        <ArrowUpRight className="size-4" aria-hidden />
                      </a>
                    )}
                  </div>

                  {/* Challenge / Lösung / Ergebnis */}
                  <div className="mt-6 space-y-4">
                    {blockConfig.map(({ emoji, label, key }) => (
                      <div key={key} className="flex gap-3">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-base"
                          role="img"
                          aria-label={label}
                        >
                          {emoji}
                        </span>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                            {label}
                          </span>
                          <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">
                            {study[key]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
