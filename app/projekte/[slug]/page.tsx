import type { Metadata } from "next";
import type * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { caseStudies, type CaseStudy } from "@/lib/content";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";

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
    description: metaDescription(`${study.tagline} ${study.solution}`),
    alternates: { canonical: `/projekte/${slug}` },
  };
}

/** Auf ≤155 Zeichen an einer Wortgrenze kürzen (Snippet-Länge). */
function metaDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${space > 0 ? cut.slice(0, space) : cut}…`;
}

const NARRATIVE = [
  { label: "Herausforderung", key: "challenge" as const, step: "01" },
  { label: "Lösung", key: "solution" as const, step: "02" },
  { label: "Ergebnis", key: "result" as const, step: "03" },
];

/**
 * Live-Vorschaufenster — rahmt den Screenshot wie ein Browserfenster und
 * macht ihn klickbar: ein Klick öffnet die Live-Website in neuem Tab.
 * Ohne liveUrl bleibt es ein statischer Rahmen.
 */
function PreviewWindow({ study }: { study: CaseStudy }) {
  const host = study.liveUrl ? new URL(study.liveUrl).host.replace(/^www\./, "") : null;
  const hasLink = Boolean(study.liveUrl);

  const figure = (
    <figure className="group relative block overflow-hidden rounded-[1.25rem] border-2 border-border bg-background">
      {/* Browser-Leiste */}
      <div className="flex items-center gap-3 border-b-2 border-border px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 border-2 border-border" />
          <span className="size-3 border-2 border-border" />
          <span className="size-3 bg-signal sig-dot" />
        </span>
        {host && <span className="label min-w-0 truncate">{host}</span>}
        {hasLink && (
          <span className="label ml-auto hidden shrink-0 bg-foreground px-2 py-0.5 text-background group-hover:bg-signal group-hover:text-on-signal sm:inline">
            Live ansehen ↗
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">
        <Image
          src={study.image ?? "/case-studies/placeholder.svg"}
          alt={
            study.image
              ? `Screenshot der Website ${study.title} – ${study.category}`
              : `Vorschau der Website von ${study.title}`
          }
          width={1200}
          height={750}
          sizes="(min-width: 1536px) 1400px, 100vw"
          className="sp-zoom block aspect-[16/10] w-full object-cover object-top"
          priority
        />
        {hasLink && (
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full border-2 border-ink bg-signal px-4 py-2 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal opacity-0 transition-opacity duration-[90ms] group-hover:opacity-100">
            Website öffnen ↗
          </span>
        )}
      </div>
    </figure>
  );

  if (!hasLink) return figure;

  return (
    <a
      href={study.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${study.title} live öffnen (neuer Tab)`}
      data-cursor="Live ↗"
      className="block rounded-[1.25rem] shadow-[10px_10px_0_0_var(--color-foreground)] transition-[transform,box-shadow] duration-[90ms] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_var(--color-signal)]"
    >
      {figure}
    </a>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.id === slug);

  if (!study) {
    notFound();
  }
  const index = caseStudies.findIndex((s) => s.id === study.id);

  return (
    <article>
      {/* Kopf: Index-Spalte + riesiger Projektname */}
      <header data-sp className="overflow-hidden border-b-2 border-border">
        <div className="mx-auto grid w-full max-w-[96rem] md:grid-cols-12">
          <div className="flex items-center justify-between gap-4 border-b-2 border-border px-[var(--spacing-gutter)] py-4 md:col-span-3 md:flex-col md:items-start md:justify-start md:border-b-0 md:border-r-2 md:py-8">
            <Link href="/projekte" className="label link inline-block py-2">
              ← Zurück zu Projekten
            </Link>
            <span aria-hidden className="display outline-text text-[clamp(2.5rem,8vw,9rem)] leading-[0.8] md:mt-auto">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="px-[var(--spacing-gutter)] pb-12 pt-10 md:col-span-9 md:pb-16 md:pt-14">
            <p className="label flex flex-wrap items-center gap-3">
              <span
                className={
                  study.kind === "Kundenprojekt"
                    ? "border-2 border-ink bg-signal px-2 py-0.5 font-bold text-on-signal"
                    : "border-2 border-border px-2 py-0.5"
                }
              >
                {study.kind}
              </span>
              <span className="text-muted">{study.category}</span>
            </p>
            <h1 className="display hero-line mt-6 text-[clamp(3.5rem,1.5rem+11vw,14rem)]"><span className="px-x block" style={{ "--speed": 360 } as React.CSSProperties}>{study.title}</span></h1>
            <p className="mt-8 max-w-2xl text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug">
              {study.tagline}
            </p>
          </div>
        </div>
      </header>

      {/* Live-Vorschau */}
      <div className="grid-lines border-b-2 border-border py-[clamp(2.5rem,6vw,6rem)]">
        <div className="frame">
          <div data-rv="up" data-sp className="sp-grow mx-auto max-w-6xl pr-3">
            <PreviewWindow study={study} />
          </div>
        </div>
      </div>

      {/* Kennzahlen als Messleiste */}
      {study.metrics.length > 0 && (
        <dl data-rv-stagger="100" className="frame-ruled grid border-b-2 border-border sm:grid-cols-3">
          {study.metrics.map((metric, i) => (
            <div
              key={metric.label}
              data-rv="up"
              className={`flex flex-col-reverse justify-end border-b-2 border-border p-[var(--spacing-gutter)] py-8 last:border-b-0 sm:border-b-0 ${
                i < study.metrics.length - 1 ? "sm:border-r-2" : ""
              } ${i === 0 ? "bg-foreground text-background" : ""}`}
            >
              <dt className="label mt-3">{metric.label}</dt>
              <dd className="display text-[clamp(3rem,2rem+4vw,6rem)]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Herausforderung → Lösung → Ergebnis: Protokoll-Zeilen */}
      <ol data-sp data-rv-stagger="100" className="border-b-2 border-border">
        {NARRATIVE.map((block) => (
          <li key={block.key} data-rv="up" className="border-b-2 border-border last:border-b-0">
            <div className="frame grid gap-4 py-10 lg:grid-cols-12 lg:gap-6 lg:py-14">
              <p className="label lg:col-span-2">
                <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">{block.step}</span>
              </p>
              <h2 className="display px-x text-[clamp(2.25rem,1.2rem+2.6vw,3.75rem)] lg:col-span-5" style={{ "--speed": 160 } as React.CSSProperties}>{block.label}</h2>
              <p className="max-w-2xl text-[length:var(--text-lead)] leading-relaxed lg:col-span-5">{study[block.key]}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Stack + Aktionen */}
      <section className="py-[var(--spacing-section)]">
        <div className="frame grid gap-8 md:grid-cols-12">
          <h2 className="label md:col-span-3">Eingesetzte Technologien</h2>
          <div className="md:col-span-9">
            <ul className="flex flex-wrap gap-2" aria-label="Technologien">
              {study.tags.map((tag) => (
                <li key={tag} className="label border-2 border-border px-3 py-2 text-sm rounded-full">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              {study.liveUrl && (
                <Button asChild size="lg">
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live ansehen
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/projekte">
                  <ArrowLeft />
                  Alle Projekte
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </article>
  );
}
