import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/sections/CTA";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const pageUrl = `${baseUrl}/website-fuer-lokale-unternehmen`;

export const metadata: Metadata = {
  title: { absolute: "Website für lokale Unternehmen: Das braucht sie | Fatih Güler" },
  description:
    "Was braucht eine gute Website für lokale Unternehmen? Klares Angebot, Kontakt & Öffnungszeiten, Mobile-first, lokale SEO und Vertrauen. Die Must-haves und häufige Fehler.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "Website für lokale Unternehmen: Das braucht sie wirklich",
    description:
      "Die Must-haves für lokale Geschäfts-Websites: klares Angebot, Kontakt, Mobile-first, lokale SEO und Vertrauen.",
    url: pageUrl,
  },
};

const MUST_HAVES = [
  { title: "Klares Angebot in den ersten Sekunden", text: "Sofort erkennbar, was du anbietest und für wen – ohne Suchen." },
  { title: "Kontakt, Adresse & Öffnungszeiten", text: "Telefon, Standort und Erreichbarkeit gut sichtbar, idealderweise mit Karte." },
  { title: "Mobile-first & schnelle Ladezeit", text: "Die meisten lokalen Suchen passieren am Handy – unterwegs, mit wenig Geduld." },
  { title: "Lokale Suchmaschinen-Optimierung", text: "Damit du bei „[Dienstleistung] + [Ort]\" überhaupt auftauchst." },
  { title: "Vertrauen schaffen", text: "Echte Fotos, ein Gesicht zum Betrieb, ehrliche Inhalte – kein Stockfoto-Einerlei." },
  { title: "Ein klarer nächster Schritt", text: "Anrufen, Termin anfragen, Route starten – eine eindeutige Handlung pro Seite." },
];

const LOCAL_SEO = [
  { title: "Google-Unternehmensprofil", text: "Der wichtigste Hebel für lokale Sichtbarkeit. Vollständig ausgefüllt, mit Fotos und aktuellen Öffnungszeiten." },
  { title: "Lokale Keywords", text: "Dienstleistung plus Ort in Titeln, Überschriften und Texten – so, wie Menschen tatsächlich suchen." },
  { title: "Einheitliche Kontaktdaten (NAP)", text: "Name, Adresse, Telefon überall identisch – auf der Website, im Profil und in Verzeichnissen." },
  { title: "Bewertungen", text: "Echte Kundenbewertungen stärken Vertrauen und lokales Ranking. Niemals erfinden – aktiv darum bitten." },
];

const COMMON_MISTAKES = [
  "Keine oder schwer auffindbare Kontaktdaten und Öffnungszeiten.",
  "Nicht für Mobilgeräte optimiert – Text zu klein, Buttons nicht tippbar.",
  "Langsame Ladezeit durch riesige, unkomprimierte Bilder.",
  "Kein Bezug zum Ort – die Seite könnte überall stehen.",
  "Kein klarer Handlungsaufruf: Besucher wissen nicht, was sie tun sollen.",
];

const GUIDE_FAQ = [
  {
    q: "Was ist das Wichtigste an einer lokalen Unternehmens-Website?",
    a: "Dass Besucher in Sekunden verstehen, was du anbietest, und sofort Kontaktdaten plus einen klaren nächsten Schritt finden. Direkt danach kommen Mobile-Tauglichkeit und lokale Auffindbarkeit.",
  },
  {
    q: "Wie wird mein Unternehmen lokal in Google gefunden?",
    a: "Über die Kombination aus einem vollständigen Google-Unternehmensprofil, lokalen Keywords (Dienstleistung + Ort) auf der Website, einheitlichen Kontaktdaten und echten Bewertungen.",
  },
  {
    q: "Reicht ein Google-Profil – oder brauche ich eine eigene Website?",
    a: "Ein Profil hilft, ersetzt aber keine eigene Website. Die Website gehört dir, überzeugt mit Inhalten und Vertrauen und konvertiert Besucher zu Anfragen. Profil und Website wirken zusammen am besten.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}/#article`,
      headline: "Was braucht eine gute Website für lokale Unternehmen?",
      description:
        "Die Must-haves für lokale Geschäfts-Websites: klares Angebot, Kontakt, Mobile-first, lokale SEO und Vertrauen – plus häufige Fehler.",
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
        { "@type": "ListItem", position: 2, name: "Website für lokale Unternehmen", item: pageUrl },
      ],
    },
  ],
};

export default function WebsiteFuerLokaleUnternehmenPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Ratgeber"
        title="Website für lokale Unternehmen"
        subtitle="Was eine Geschäfts-Website wirklich braucht, um vor Ort gefunden zu werden und Anfragen zu bringen."
      >
        <nav aria-label="Brotkrumen" className="mt-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-violet-3">
                Startseite
              </Link>
            </li>
            <li aria-hidden className="text-muted-2">/</li>
            <li className="text-foreground">Website für lokale Unternehmen</li>
          </ol>
        </nav>
      </PageHero>

      <Section className="!pt-0">
        <div className="max-w-3xl border border-violet-3/30 bg-violet/5 p-7 md:p-9">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-3">
            Die kurze Antwort
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
            Eine gute Website für ein lokales Unternehmen braucht sechs Dinge: ein{" "}
            <strong className="font-semibold">klares Angebot</strong>, gut sichtbare{" "}
            <strong className="font-semibold">Kontaktdaten und Öffnungszeiten</strong>, eine{" "}
            <strong className="font-semibold">schnelle, mobile-taugliche</strong> Darstellung,{" "}
            <strong className="font-semibold">lokale SEO</strong>, echte{" "}
            <strong className="font-semibold">Vertrauenssignale</strong> und einen{" "}
            <strong className="font-semibold">klaren nächsten Schritt</strong>.
          </p>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Must-haves"
          title="Das braucht jede lokale Website"
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {MUST_HAVES.map((item) => (
            <div key={item.title} className="bg-background p-7">
              <Check className="size-5 text-cyan" aria-hidden />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Lokale SEO"
          title="So wirst du vor Ort gefunden"
          subtitle="Die vier Hebel für lokale Sichtbarkeit."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {LOCAL_SEO.map((item) => (
            <div key={item.title} className="border border-border bg-surface p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Vermeiden" title="Häufige Fehler" />
          <ul className="mt-8 space-y-4">
            {COMMON_MISTAKES.map((mistake) => (
              <li
                key={mistake}
                className="border border-border bg-surface/60 px-5 py-4 text-base leading-relaxed text-muted"
              >
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
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
