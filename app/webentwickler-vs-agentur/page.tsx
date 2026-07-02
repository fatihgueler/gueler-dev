import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";

import { site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/sections/CTA";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const pageUrl = `${baseUrl}/webentwickler-vs-agentur`;

export const metadata: Metadata = {
  title: { absolute: "Webentwickler oder Agentur? Der ehrliche Vergleich | Fatih Güler" },
  description:
    "Freelance Webentwickler oder Agentur – was lohnt sich für Ihr Unternehmen? Ehrlicher Vergleich von Preis, Kommunikation, Tempo und Betreuung. Wann sich welche Option lohnt.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    images: [{ url: "/og", width: 1200, height: 630 }],
    title: "Webentwickler oder Agentur? Der ehrliche Vergleich",
    description:
      "Was lohnt sich für KMU: Freelancer oder Agentur? Preis, Tempo, Kommunikation und Betreuung im Vergleich.",
    url: pageUrl,
  },
};

const COMPARISON = [
  { aspect: "Preis", freelancer: "Kein Agentur-Aufschlag – der Overhead entfällt", agency: "Höher durch Overhead (Büro, Management, mehrere Rollen)" },
  { aspect: "Ansprechpartner", freelancer: "Eine Person – die auch wirklich baut", agency: "Projektmanager als Mittelschicht, wechselnde Teams" },
  { aspect: "Tempo", freelancer: "Kurze Wege, schnelle Entscheidungen", agency: "Abstimmungsschleifen zwischen Abteilungen" },
  { aspect: "Persönlicher Bezug", freelancer: "Sie sprechen direkt mit dem Macher", agency: "Distanzierter, standardisierter Prozess" },
  { aspect: "Skalierung", freelancer: "Begrenzt – ein Mensch hat ein Zeitbudget", agency: "Viele parallele Gewerke gleichzeitig möglich" },
  { aspect: "Spezial-Disziplinen", freelancer: "Fokussiert; bei Bedarf Netzwerk", agency: "Eigene Spezialisten für Branding, Video, SEA …" },
];

const GUIDE_FAQ = [
  {
    q: "Ist ein Freelancer günstiger als eine Agentur?",
    a: "In der Regel ja. Bei einem Freelancer entfällt der Agentur-Overhead (Büro, Management, mehrere Zwischenrollen) – dieselbe Website kostet dadurch meist spürbar weniger, bei gleicher oder höherer Qualität für KMU-Projekte.",
  },
  {
    q: "Wann lohnt sich eine Agentur mehr?",
    a: "Wenn ein Projekt sehr groß ist und viele Disziplinen gleichzeitig braucht – etwa Markenentwicklung, Foto/Video, bezahlte Kampagnen und laufendes Marketing aus einer Hand – oder wenn ein großes Team parallel arbeiten muss.",
  },
  {
    q: "Bekomme ich bei einem Freelancer dieselbe Qualität?",
    a: "Für Websites und Web-Apps von kleinen und mittleren Unternehmen: ja. Moderne Tools und Frameworks ermöglichen Ergebnisse auf Agenturniveau – mit dem Vorteil, dass Sie direkt mit der Person sprechen, die Ihre Seite tatsächlich entwickelt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}/#article`,
      headline: "Webentwickler oder Agentur? Der ehrliche Vergleich",
      description:
        "Freelance Webentwickler oder Agentur: Vergleich von Preis, Kommunikation, Tempo und Betreuung – und wann sich welche Option lohnt.",
      inLanguage: "de-DE",
      author: { "@id": `${baseUrl}/#person` },
      publisher: { "@id": `${baseUrl}/#business` },
      datePublished: "2026-06-27",
      dateModified: "2026-06-27",
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      mainEntity: GUIDE_FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Webentwickler oder Agentur?", item: pageUrl },
      ],
    },
  ],
};

export default function WebentwicklerVsAgenturPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Ratgeber"
        title="Webentwickler oder Agentur?"
        subtitle="Der ehrliche Vergleich für kleine und mittlere Unternehmen – ohne die eigene Seite schönzureden."
      >
        <nav aria-label="Brotkrumen" className="mt-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-violet-3">
                Startseite
              </Link>
            </li>
            <li aria-hidden className="text-muted-2">/</li>
            <li className="text-foreground">Webentwickler oder Agentur?</li>
          </ol>
        </nav>
      </PageHero>

      <Section className="!pt-0">
        <div className="max-w-3xl border border-violet-3/30 bg-violet/5 p-7 md:p-9">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-3">
            Die kurze Antwort
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
            Für die meisten kleinen und mittleren Unternehmen ist ein{" "}
            <strong className="font-semibold">freier Webentwickler die bessere Wahl</strong>:
            günstiger, schneller und persönlicher, weil Sie direkt mit der Person sprechen, die
            Ihre Seite baut. Eine <strong className="font-semibold">Agentur</strong> lohnt sich,
            wenn ein Projekt sehr groß ist und viele Disziplinen gleichzeitig braucht.
          </p>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Direkt verglichen"
          title="Freelancer vs. Agentur"
          subtitle="Die wichtigsten Unterschiede auf einen Blick."
        />
        <div className="mt-12 overflow-hidden border border-border">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            <div className="bg-surface p-4 font-mono text-xs font-semibold uppercase tracking-wider text-muted-2">
              Aspekt
            </div>
            <div className="bg-surface p-4 font-mono text-xs font-semibold uppercase tracking-wider text-violet-3">
              Freelancer
            </div>
            <div className="bg-surface p-4 font-mono text-xs font-semibold uppercase tracking-wider text-muted-2">
              Agentur
            </div>
            {COMPARISON.map((row) => (
              <React.Fragment key={row.aspect}>
                <div className="bg-background p-4 font-display text-sm font-semibold text-foreground">
                  {row.aspect}
                </div>
                <div className="flex items-start gap-2 bg-background p-4 text-sm leading-relaxed text-foreground/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                  {row.freelancer}
                </div>
                <div className="flex items-start gap-2 bg-background p-4 text-sm leading-relaxed text-muted">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-2" aria-hidden />
                  {row.agency}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-violet-3/30 bg-surface p-7">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Wann ein Freelancer passt
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li>Sie sind ein kleines oder mittleres Unternehmen oder selbstständig.</li>
              <li>Sie wollen einen festen Ansprechpartner statt einer Telefon-Hotline.</li>
              <li>Das Projekt ist klar umrissen: Website, Landing Page, Web-App, KI-Tool.</li>
              <li>Ihnen sind Tempo, Festpreis und direkte Kommunikation wichtig.</li>
            </ul>
          </div>
          <div className="border border-border bg-surface p-7">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Wann eine Agentur passt
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li>Sehr großes Projekt mit vielen parallelen Gewerken.</li>
              <li>Sie brauchen Branding, Foto/Video, Kampagnen und Marketing aus einer Hand.</li>
              <li>Es muss ein großes Team gleichzeitig arbeiten.</li>
              <li>Langfristige, abteilungsübergreifende Betreuung steht im Vordergrund.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen zum Vergleich" />
        <dl className="mt-10 max-w-3xl divide-y divide-border border-t border-border">
          {GUIDE_FAQ.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-display text-lg font-semibold text-foreground">{item.q}</dt>
              <dd className="mt-3 text-base leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTA />
    </article>
  );
}
