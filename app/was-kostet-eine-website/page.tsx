import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { site, pakete } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/sections/CTA";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const pageUrl = `${baseUrl}/was-kostet-eine-website`;

export const metadata: Metadata = {
  title: { absolute: "Was kostet eine Website? Preise & Festpreise | Fatih Güler" },
  description:
    "Was kostet eine Website? One-Pager ab 1.000 €, Business-Site ab 2.500 € – zum Festpreis, ohne Agentur-Aufschlag. Ehrliche Preisübersicht für KMU und was den Preis beeinflusst.",
  alternates: { canonical: pageUrl },
  openGraph: {
    images: [{ url: "/og", width: 1200, height: 630, alt: "Fatih Güler – Webdesign Hannover" }],
    type: "article",
    title: "Was kostet eine Website? Ehrliche Preise zum Festpreis",
    description:
      "One-Pager ab 1.000 €, Business-Website ab 2.500 € – Festpreis statt Stundensatz. Was den Preis wirklich beeinflusst.",
    url: pageUrl,
  },
};

// Was-beeinflusst-den-Preis: faktische Treiber, allgemeingültig.
const PRICE_FACTORS = [
  {
    title: "Umfang & Seitenanzahl",
    text: "Eine einzelne Landing Page ist günstiger als ein mehrseitiger Auftritt mit Leistungs-, Über- und Kontaktseiten.",
  },
  {
    title: "Individuelles Design vs. Vorlage",
    text: "Ein maßgeschneidertes Design kostet mehr als ein angepasstes Template – sieht aber auch nicht aus wie tausend andere Seiten.",
  },
  {
    title: "Funktionen",
    text: "Kontaktformular ist Standard. Buchungssystem, Online-Shop, mehrsprachige Inhalte oder ein KI-Chatbot erhöhen den Aufwand.",
  },
  {
    title: "Inhalte",
    text: "Liegen Texte und Bilder schon vor, geht es schneller. Wenn nicht, unterstütze ich bei Struktur und Aufbereitung.",
  },
  {
    title: "SEO & lokale Sichtbarkeit",
    text: "Eine sauber für Suchmaschinen optimierte Seite, die lokal gefunden wird, braucht etwas mehr Arbeit als reines Schaufenster.",
  },
  {
    title: "Betreuung nach dem Launch",
    text: "Einmalig erstellen oder laufend pflegen und weiterentwickeln – das entscheidest du.",
  },
];

// Mini-FAQ: sichtbar gerendert UND als FAQPage-Schema (GEO/Rich Results).
const GUIDE_FAQ = [
  {
    q: "Was kostet eine einfache Website?",
    a: "Ein One-Pager – alles Wichtige auf einer Seite, mit Kontaktformular und SEO-Basis – startet bei 1.000 € zum Festpreis und ist in 5–7 Tagen fertig.",
  },
  {
    q: "Was kostet eine mehrseitige Business-Website?",
    a: "Eine Business-Website mit bis zu 5 Unterseiten, individuellem Design und SEO für lokale Sichtbarkeit beginnt bei 2.500 € zum Festpreis. Umsetzung in der Regel in 2–3 Wochen.",
  },
  {
    q: "Gibt es laufende Kosten?",
    a: "Ja: eine Domain kostet rund 10–20 € pro Jahr, dazu kommt Hosting (je nach Anbieter und Umfang). Wartung ist optional. Ich berate dich, welche Variante zu deinem Projekt passt – ohne dich an teure Pakete zu binden.",
  },
  {
    q: "Warum ein Festpreis statt Stundensatz?",
    a: "Damit du vorher genau weißt, was deine Website kostet – planbar, ohne laufenden Stundenzähler und ohne böse Überraschungen am Ende.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}/#article`,
      headline: "Was kostet eine Website? Preise & Festpreise",
      description:
        "Ehrliche Preisübersicht für Websites: One-Pager ab 1.000 €, Business-Website ab 2.500 € zum Festpreis – und was den Preis beeinflusst.",
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
        { "@type": "ListItem", position: 2, name: "Was kostet eine Website?", item: pageUrl },
      ],
    },
  ],
};

export default function WasKostetEineWebsitePage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Ratgeber"
        title="Was kostet eine Website?"
        stamp="€"
        subtitle="Ehrliche Preisorientierung für kleine Unternehmen und Selbstständige – konkrete Festpreise statt vager Stundensätze."
      >
        {/* Breadcrumb (matcht BreadcrumbList-Schema) */}
        <nav aria-label="Brotkrumen" className="mt-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="link">
                Startseite
              </Link>
            </li>
            <li aria-hidden className="text-muted-2">
              /
            </li>
            <li className="text-foreground">Was kostet eine Website?</li>
          </ol>
        </nav>
      </PageHero>

      {/* Kurz-Antwort: der extrahierbare Kern für Suche + KI-Antwortmaschinen */}
      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="max-w-4xl border-2 border-border border-l-[length:var(--rule-heavy)] border-l-signal bg-surface p-6 shadow-[8px_8px_0_0_var(--color-foreground)] md:p-10 rounded-[1.25rem]">
          <p className="label font-bold">
            Die kurze Antwort
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
            Eine professionelle Website kostet bei mir zwischen{" "}
            <strong className="font-semibold">1.000 €</strong> für einen One-Pager und{" "}
            <strong className="font-semibold">ab 2.500 €</strong> für eine mehrseitige
            Business-Website – jeweils zum <strong className="font-semibold">Festpreis</strong>.
            Individuelle Web-Apps und KI-Lösungen rechne ich projektbezogen ab. Was du am Ende
            zahlst, hängt vor allem vom Umfang und von individuellen Anforderungen ab – nicht
            von einem laufenden Stundenzähler.
          </p>
        </div>
      </Section>

      {/* Preisübersicht aus den echten Paketen */}
      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading
          eyebrow="Preise im Überblick"
          title="Drei Pakete, ein Festpreis"
          subtitle="Du weißt vorher genau, was du bekommst – ohne versteckte Kosten."
        />
        <div className="mt-12 grid border-l-2 border-t-2 border-border md:grid-cols-3">
          {pakete.items.map((pkg) => (
            <div
              key={pkg.title}
              className="flex flex-col border-b-2 border-r-2 border-border p-7"
            >
              <h3 className="display text-[2.25rem]">
                {pkg.title}
              </h3>
              <p className="display mt-3 text-[3.25rem]">
                {pkg.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pkg.description}
              </p>
              <p className="label mt-2">
                {pkg.time}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">{pakete.payment} {pakete.note}</p>
      </Section>

      {/* Was den Preis beeinflusst */}
      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading
          eyebrow="Preistreiber"
          title="Was den Preis beeinflusst"
          subtitle="Diese Faktoren entscheiden, wo dein Projekt in der Spanne landet."
        />
        <div className="mt-12 grid border-l-2 border-t-2 border-border sm:grid-cols-2">
          {PRICE_FACTORS.map((factor) => (
            <div key={factor.title} className="border-b-2 border-r-2 border-border p-7">
              <h3 className="text-xl font-bold leading-tight">
                {factor.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{factor.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Einmalige vs. laufende Kosten */}
      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Einmalig & laufend"
            title="Einmalige und laufende Kosten"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              <strong className="text-foreground">Einmalig</strong> ist die Erstellung selbst –
              Konzept, Design, Entwicklung und Launch. Das ist der Festpreis, den wir vorher
              vereinbaren.
            </p>
            <p>
              <strong className="text-foreground">Laufend</strong> fallen nur deine Domain
              (rund 10–20 € pro Jahr) und das Hosting an – je nach Anbieter und Umfang. Einfache
              Seiten lassen sich auf modernen Plattformen sehr günstig betreiben. Wartung und
              Weiterentwicklung sind optional und buchst du nur, wenn du sie brauchst.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ – sichtbar + als FAQPage-Schema */}
      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen zu Website-Kosten" />
        <dl className="mt-10 max-w-3xl divide-y-2 divide-border border-y-2 border-border">
          {GUIDE_FAQ.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="text-xl font-bold leading-tight">
                {item.q}
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTA />
    </article>
  );
}
