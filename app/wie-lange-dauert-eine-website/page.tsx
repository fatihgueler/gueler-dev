import type { Metadata } from "next";
import Link from "next/link";

import { site, process as processContent } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/sections/CTA";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const pageUrl = `${baseUrl}/wie-lange-dauert-eine-website`;

export const metadata: Metadata = {
  title: { absolute: "Wie lange dauert eine Website? Realistische Zeiten | Fatih Güler" },
  description:
    "Wie lange dauert es, eine Website erstellen zu lassen? One-Pager in 5–7 Tagen, Business-Website in 2–3 Wochen. Was den Zeitplan beeinflusst und wie der Ablauf aussieht.",
  alternates: { canonical: pageUrl },
  openGraph: {
    images: [{ url: "/og", width: 1200, height: 630, alt: "Fatih Güler – Webdesign Hannover" }],
    type: "article",
    title: "Wie lange dauert eine Website? Realistische Zeiten",
    description:
      "One-Pager in 5–7 Tagen, Business-Website in 2–3 Wochen. Was den Zeitplan beeinflusst.",
    url: pageUrl,
  },
};

const TIMELINES = [
  { type: "One-Pager", duration: "5–7 Tage", note: "Alles Wichtige auf einer Seite, mit Kontaktformular und SEO-Basis." },
  { type: "Business-Website", duration: "2–3 Wochen", note: "Bis zu 5 Unterseiten, individuelles Design, SEO für lokale Sichtbarkeit." },
  { type: "Web-App / KI-Lösung", duration: "Nach Absprache", note: "Individueller Funktionsumfang – Zeitplan ergibt sich aus dem Konzept." },
];

const TIMELINE_FACTORS = [
  { title: "Wie schnell Inhalte vorliegen", text: "Texte und Bilder sind der häufigste Engpass. Liegen sie bereit, geht es deutlich zügiger." },
  { title: "Dein Feedback-Tempo", text: "Schnelle Rückmeldungen zu Zwischenständen halten das Projekt in Bewegung." },
  { title: "Funktionsumfang", text: "Ein Kontaktformular ist schnell gebaut. Buchung, Shop oder KI-Chatbot brauchen länger." },
  { title: "Anzahl der Korrekturschleifen", text: "Klare Vorstellungen am Anfang sparen Runden am Ende." },
];

const GUIDE_FAQ = [
  {
    q: "Wie lange dauert eine einfache Website?",
    a: "Ein One-Pager ist in der Regel in 5–7 Tagen fertig – vorausgesetzt, die Inhalte (Texte und Bilder) liegen vor.",
  },
  {
    q: "Wie lange dauert eine mehrseitige Business-Website?",
    a: "Eine Business-Website mit bis zu 5 Unterseiten dauert üblicherweise 2–3 Wochen, je nach Umfang und wie schnell Feedback und Inhalte kommen.",
  },
  {
    q: "Was verzögert ein Website-Projekt am häufigsten?",
    a: "Fast immer fehlende Inhalte. Wenn Texte und Bilder noch nicht bereitstehen, wartet die Entwicklung. Dabei unterstütze ich bei Struktur und Aufbereitung, damit es zügig weitergeht.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}/#article`,
      headline: "Wie lange dauert es, eine Website erstellen zu lassen?",
      description:
        "Realistische Zeitrahmen: One-Pager in 5–7 Tagen, Business-Website in 2–3 Wochen – und was den Zeitplan beeinflusst.",
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
        { "@type": "ListItem", position: 2, name: "Wie lange dauert eine Website?", item: pageUrl },
      ],
    },
  ],
};

export default function WieLangeDauertEineWebsitePage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Ratgeber"
        title="Wie lange dauert eine Website?"
        stamp="5–7"
        subtitle="Realistische Zeitrahmen statt leerer Versprechen – und was die Dauer wirklich bestimmt."
      >
        <nav aria-label="Brotkrumen" className="mt-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="link">
                Startseite
              </Link>
            </li>
            <li aria-hidden className="text-muted-2">/</li>
            <li className="text-foreground">Wie lange dauert eine Website?</li>
          </ol>
        </nav>
      </PageHero>

      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <div className="max-w-4xl border-2 border-border border-l-[length:var(--rule-heavy)] border-l-signal bg-surface p-6 shadow-[8px_8px_0_0_var(--color-foreground)] md:p-10 rounded-[1.25rem]">
          <p className="label font-bold">
            Die kurze Antwort
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
            Ein <strong className="font-semibold">One-Pager</strong> ist in{" "}
            <strong className="font-semibold">5–7 Tagen</strong> fertig, eine mehrseitige{" "}
            <strong className="font-semibold">Business-Website</strong> in{" "}
            <strong className="font-semibold">2–3 Wochen</strong>. Größere Web-Apps und
            KI-Projekte laufen nach Absprache. Der wichtigste Faktor bist am Ende du: wie schnell
            Inhalte vorliegen und Feedback kommt.
          </p>
        </div>
      </Section>

      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading
          eyebrow="Zeitrahmen"
          title="Dauer nach Projekttyp"
          subtitle="Richtwerte, wenn die Inhalte bereitstehen."
        />
        <div className="mt-12 grid border-l-2 border-t-2 border-border md:grid-cols-3">
          {TIMELINES.map((item) => (
            <div key={item.type} className="border-b-2 border-r-2 border-border p-7">
              <h3 className="text-xl font-bold leading-tight">
                {item.type}
              </h3>
              <p className="display mt-3 text-[2.75rem]">
                {item.duration}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading
          eyebrow="Einflussfaktoren"
          title="Was den Zeitplan beeinflusst"
        />
        <div className="mt-12 grid border-l-2 border-t-2 border-border sm:grid-cols-2">
          {TIMELINE_FACTORS.map((factor) => (
            <div key={factor.title} className="border-b-2 border-r-2 border-border p-7">
              <h3 className="text-xl font-bold leading-tight">
                {factor.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{factor.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading
          eyebrow="Ablauf"
          title="So läuft ein Projekt ab"
          subtitle="Von der ersten Nachricht bis zum Launch."
        />
        <ol className="mt-12 grid border-l-2 border-t-2 border-border md:grid-cols-2">
          {processContent.steps.map((step) => (
            <li key={step.number} className="border-b-2 border-r-2 border-border p-7">
              <span className="font-mono text-sm font-semibold text-violet-3">
                {step.number}
              </span>
              <h3 className="mt-2 text-xl font-bold leading-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="!py-[clamp(3rem,2rem+4vw,6rem)]">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen zur Dauer" />
        <dl className="mt-10 max-w-3xl divide-y-2 divide-border border-y-2 border-border">
          {GUIDE_FAQ.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="text-xl font-bold leading-tight">{item.q}</dt>
              <dd className="mt-3 text-base leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTA />
    </article>
  );
}
