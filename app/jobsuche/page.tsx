import type { Metadata } from "next";
import { Download, Mail, Linkedin, Github, MapPin, CalendarCheck } from "lucide-react";

import { site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "Jobsuche – Junior Softwareentwickler Hannover",
  description:
    "Fatih Güler, Fachinformatiker für Anwendungsentwicklung (IHK 01/2027), sucht eine Stelle als Junior Softwareentwickler im Raum Hannover. Verfügbar ab 01.02.2027.",
  alternates: { canonical: "/jobsuche" },
};

const facts = [
  { icon: CalendarCheck, label: "Verfügbar ab", value: "01.02.2027" },
  { icon: MapPin, label: "Raum", value: "Hannover" },
  { icon: Download, label: "Abschluss", value: "Fachinformatiker AE, IHK Winter 2026/27" },
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
    title: "Kundenprojekte mit Next.js",
    text: "Weitblick Energieberatung (Fördercheck, SEO, WCAG AA), Relaunch der PComplett-Website mit Ticket-Anbindung und KI-Chatbot, diese Seite hier.",
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
        subtitle="Ich schließe im Januar 2027 meine Umschulung zum Fachinformatiker für Anwendungsentwicklung ab und suche eine Stelle im Raum Hannover."
        stamp="07"
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/Lebenslauf_Fatih_Gueler.pdf"
            className="inline-flex items-center justify-center gap-2 bg-foreground px-6 py-3 font-mono text-sm font-semibold text-background"
          >
            <Download className="size-4" aria-hidden /> Lebenslauf als PDF
          </a>
          <a
            href={`mailto:${site.email}?subject=Stelle%20als%20Junior%20Entwickler`}
            className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-3 font-mono text-sm font-semibold text-foreground"
          >
            <Mail className="size-4" aria-hidden /> {site.email}
          </a>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="card-surface h-full p-7">
                <f.icon className="size-5 text-muted" aria-hidden />
                <p className="mt-4 font-mono text-xs text-muted">{f.label}</p>
                <p className="mt-1 font-display text-xl font-semibold text-foreground">
                  {f.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-black tracking-tighter text-foreground md:text-4xl">
          Was ich mitbringe
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {proof.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-surface h-full p-7">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {stack.map((s) => (
            <Badge key={s} variant="outline" className="rounded-none font-mono text-xs text-muted">
              {s}
            </Badge>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Davor: Kundenservice mit technischer Beratung und Fahrzeuglogistik. Ich arbeite
          gern direkt mit Menschen und behalte unter Druck den Überblick. Gehaltsvorstellung:
          45.000 € brutto im Jahr.
        </p>
      </Section>

      <Section>
        <h2 className="font-display text-3xl font-black tracking-tighter text-foreground md:text-4xl">
          Kontakt
        </h2>
        <ul className="mt-8 space-y-3 font-mono text-sm text-foreground">
          <li>
            <a className="inline-flex items-center gap-2 underline underline-offset-4" href={`mailto:${site.email}`}>
              <Mail className="size-4" aria-hidden /> {site.email}
            </a>
          </li>
          <li>
            <a className="inline-flex items-center gap-2 underline underline-offset-4" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="size-4" aria-hidden /> LinkedIn
            </a>
          </li>
          <li>
            <a className="inline-flex items-center gap-2 underline underline-offset-4" href={site.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" aria-hidden /> GitHub
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}
