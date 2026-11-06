import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";

import { site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: { absolute: "Junior-Entwickler Hannover ab 02/2027 | Fatih Güler" },
  description:
    "Fatih Güler, Fachinformatiker für Anwendungsentwicklung (IHK 01/2027), sucht eine Stelle als Junior Softwareentwickler im Raum Hannover. Verfügbar ab 01.02.2027.",
  alternates: { canonical: "/jobsuche" },
};

const facts = [
  { label: "Verfügbar ab", value: "01.02.2027" },
  { label: "Raum", value: "Hannover" },
  { label: "Abschluss", value: "Fachinformatiker AE, IHK Winter 2026/27" },
];

const stack = [
  "C# / .NET",
  "Blazor",
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "SQL / PostgreSQL",
  "Git",
  "xUnit",
  "Claude API",
];

const proof = [
  {
    title: "Zeiterfassung bei PComplett",
    text: "IHK-Abschlussprojekt mit Blazor (.NET 10): Kunden, Projekte, Timer, Dashboard, Excel-Export, Audit-Log. 39 automatisierte Unit-Tests. Im Betrieb im Einsatz.",
  },
  {
    title: "Projekte mit Next.js",
    text: "Kundenprojekt Weitblick Energieberatung (Fördercheck, SEO, WCAG AA). In Arbeit: Relaunch der PComplett-Website mit Ticket-Anbindung und KI-Chatbot. Dazu diese Website.",
  },
  {
    title: "Eigene Produkte",
    text: "BüroBrücke: Behördenbriefe per Foto verstehen, mit OCR und Claude, in fünf Sprachen. Häkelwelt: Online-Shop mit Stripe-Checkout, als Next.js- und als Blazor-Variante.",
  },
];

export default function JobsuchePage() {
  return (
    <>
      <PageHero
        eyebrow="Jobsuche"
        title="Junior-Entwickler gesucht? Hier bin ich."
        subtitle="Fachinformatiker für Anwendungsentwicklung (IHK-Abschluss Januar 2027). Ich suche eine Stelle als Junior-Entwickler im Raum Hannover, verfügbar ab 01.02.2027."
        stamp="07"
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href="/Lebenslauf_Fatih_Gueler.pdf"
            className="inline-flex min-h-14 items-center justify-center gap-3 border-2 border-foreground bg-signal px-6 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] transition-[transform,box-shadow] duration-[90ms] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
          >
            <Download className="size-4" aria-hidden /> Lebenslauf als PDF
          </a>
          <a
            href={`mailto:${site.email}?subject=Stelle%20als%20Junior%20Entwickler`}
            className="inline-flex min-h-14 min-w-0 items-center justify-center gap-3 break-all border-2 border-foreground px-6 py-3 font-mono text-sm font-bold hover:bg-foreground hover:text-background"
          >
            <Mail className="size-4 shrink-0" aria-hidden /> {site.email}
          </a>
        </div>
      </PageHero>

      {/* Eckdaten als Datenzeile */}
      <dl data-rv-stagger="100" className="frame-ruled grid border-b-2 border-border md:grid-cols-12">
        {facts.map((f, i) => (
          <div
            key={f.label}
            data-rv="up"
            className={`flex flex-col-reverse justify-end border-b-2 border-border p-[var(--spacing-gutter)] py-8 md:border-b-0 ${
              i === 0 ? "bg-signal text-on-signal md:col-span-3" : i === 1 ? "md:col-span-3" : "md:col-span-6"
            } ${i < facts.length - 1 ? "md:border-r-2" : ""}`}
          >
            <dd className="display text-[clamp(2.25rem,1.5rem+2.5vw,4rem)]">{f.value}</dd>
            <dt className="label mb-3">{f.label}</dt>
          </div>
        ))}
      </dl>

      <section aria-labelledby="mitbringen" className="border-b-2 border-border pt-[var(--spacing-section)]">
        <div className="frame">
          <SectionHead id="mitbringen" index="01" label="Profil" title="Was ich mitbringe" />
        </div>
        <ol data-rv-stagger="100" className="mt-16 border-t-2 border-border">
          {proof.map((p, i) => (
            <li key={p.title} data-rv="up" className="row-invert border-b-2 border-border">
              <div className="frame grid gap-3 py-8 md:grid-cols-12 md:gap-6">
                <span className="label md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-extrabold leading-tight md:col-span-4" style={{ fontStretch: "80%" }}>
                  {p.title}
                </h3>
                <p className="text-lg leading-snug md:col-span-7">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="frame grid gap-8 py-12 md:grid-cols-12">
          <h3 className="label md:col-span-3">Stack</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 md:col-span-9" aria-label="Technologien">
            {stack.map((item, i) => (
              <li key={item} className="display text-[clamp(1.75rem,1.2rem+2vw,3rem)]">
                {item}
                {i < stack.length - 1 && <span aria-hidden className="ml-5 inline-block size-3 bg-signal align-middle" />}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl text-lg leading-relaxed md:col-span-9 md:col-start-4">
            Davor: Kundenservice mit technischer Beratung und Fahrzeuglogistik. Ich arbeite
            gern direkt mit Menschen und behalte unter Druck den Überblick. Meine
            Freelance-Arbeit stimme ich offen mit dem Arbeitgeber ab.
          </p>
        </div>
      </section>

      <section aria-labelledby="job-kontakt" className="border-b-2 border-border py-[var(--spacing-section)]">
        <div className="frame">
          <SectionHead id="job-kontakt" index="02" label="Erreichbarkeit" title="Kontakt" />
          <ul className="mt-12 border-t-2 border-border md:ml-[25%]">
            {[
              { label: "E-Mail", value: site.email, href: `mailto:${site.email}` },
              { label: "LinkedIn", value: "LinkedIn ↗", href: site.linkedin, external: true },
              { label: "GitHub", value: "GitHub ↗", href: site.github, external: true },
            ].map((row) => (
              <li key={row.label}>
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="row-invert flex items-baseline gap-4 border-b-2 border-border px-1 py-4"
                >
                  <span className="label muted-inv w-24 shrink-0 text-muted">{row.label}</span>
                  <span className="min-w-0 break-words text-lg font-semibold">{row.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
