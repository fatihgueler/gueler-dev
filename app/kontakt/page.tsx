import type { Metadata } from "next";

import { pages, site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";

export const metadata: Metadata = {
  title: "Kontakt",
  description: pages.kontakt.subtitle,
  // Selbstreferenzierender Canonical statt geerbtem Startseiten-Canonical.
  alternates: { canonical: "/kontakt" },
};

const channels = [
  {
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: site.whatsapp,
    external: true,
  },
  {
    label: "Calendly",
    value: "30-Min-Gespräch buchen",
    href: site.calendly,
    external: true,
  },
  {
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Verfügbarkeit",
    value: site.availability,
  },
  {
    label: "Standort",
    value: site.location,
  },
  {
    label: "GitHub",
    value: "@fatihgueler",
    href: site.github,
    external: true,
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow={pages.kontakt.eyebrow}
        title={pages.kontakt.title}
        subtitle={pages.kontakt.subtitle}
        stamp="04"
      />

      <section aria-label="Kontaktwege und Formular" className="border-b-2 border-border">
        <div className="mx-auto grid w-full max-w-[96rem] lg:grid-cols-12">
          <div className="min-w-0 border-b-2 border-border p-[var(--spacing-gutter)] py-10 lg:col-span-5 lg:border-b-0 lg:border-r-2 lg:py-14">
            <h2 className="label flex items-center gap-3">
              <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">A</span>
              Direkte Wege
            </h2>
            <ul className="mt-6 border-t-2 border-border">
              {channels.map((channel) => {
                const inner = (
                  <>
                    <span className="label muted-inv w-28 shrink-0 text-muted">{channel.label}</span>
                    <span className="min-w-0 break-words text-lg font-semibold">{channel.value}</span>
                  </>
                );
                return (
                  <li key={channel.label}>
                  {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="row-invert flex items-baseline gap-4 border-b-2 border-border px-1 py-4"
                  >
                    {inner}
                    <span aria-hidden className="ml-auto font-mono">{channel.external ? "↗" : "→"}</span>
                  </a>
                ) : (
                  <div key={channel.label} className="flex items-baseline gap-4 border-b-2 border-border px-1 py-4">
                    {inner}
                  </div>
                )}
                </li>
                );
              })}
            </ul>
            <div className="mt-10">
              <ContactMap />
            </div>
          </div>

          <div className="min-w-0 p-[var(--spacing-gutter)] py-10 lg:col-span-7 lg:px-10 lg:py-14">
            <h2 className="label mb-6 flex items-center gap-3">
              <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">B</span>
              Formular
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
