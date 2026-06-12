import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { caseStudies } from "@/lib/content";
import { Section } from "@/components/Section";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem, WordReveal } from "@/components/animation/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.id === slug);

  if (!study) {
    return { title: "Case Study nicht gefunden" };
  }

  return {
    title: `${study.title} – Case Study`,
    description: study.tagline,
  };
}

const NARRATIVE = [
  { label: "Herausforderung", key: "challenge" as const, step: "01" },
  { label: "Lösung", key: "solution" as const, step: "02" },
  { label: "Ergebnis", key: "result" as const, step: "03" },
];

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.id === slug);

  if (!study) {
    notFound();
  }

  return (
    <article className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-36 md:pb-20 md:pt-44">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_25%,black,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <Reveal variant="fadeIn">
            <Link
              href="/projekte"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-violet-3"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Zurück zu Projekten
            </Link>
          </Reveal>

          <Reveal variant="fadeIn" className="mt-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-violet-3">
              {study.category}
            </p>
          </Reveal>

          <WordReveal
            as="h1"
            text={study.title}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {study.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Screenshot placeholder */}
      <div className="px-6">
        <Reveal variant="scaleIn" className="mx-auto w-full max-w-5xl">
          {/* TODO: echten Screenshot einsetzen */}
          <Image
            src="/case-studies/placeholder.svg"
            alt={`Vorschau der Website von ${study.title}`}
            width={1200}
            height={750}
            className="h-auto w-full rounded-[var(--radius-xl)] border border-border-strong"
            priority
          />
        </Reveal>
      </div>

      {/* Metrics band */}
      {study.metrics.length > 0 && (
        <Section className="py-16 md:py-20">
          <RevealGroup
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {study.metrics.map((metric) => (
              <RevealItem key={metric.label} variant="fadeUp" className="h-full">
                <div className="card-surface flex h-full flex-col items-center rounded-[var(--radius-lg)] p-8 text-center">
                  <span className="font-display text-4xl font-semibold text-violet-2 md:text-5xl">
                    {metric.value}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">
                    {metric.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Herausforderung → Lösung → Ergebnis */}
      <Section className="py-8 md:py-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {NARRATIVE.map((block, i) => (
            <Reveal key={block.key} delay={i * 0.1} className="h-full">
              <div className="card-surface flex h-full flex-col rounded-[var(--radius-lg)] p-8">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-violet-3">
                  {block.step}
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
                  {block.label}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {study[block.key]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stack / Tags */}
      <Section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-violet-3">
              Eingesetzte Technologien
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Technologien">
              {study.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs font-medium text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/projekte">
                  <ArrowLeft />
                  Alle Projekte
                </Link>
              </Button>
              {study.liveUrl && (
                <Button asChild size="lg">
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live ansehen
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <CTA />
    </article>
  );
}
