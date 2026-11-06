import * as React from "react";

import { booking, contact, site } from "@/lib/content";
import { ContactFormLazy } from "@/components/sections/ContactFormLazy";
import { BookingButton } from "@/components/ui/BookingButton";

const rows = [
  { label: "E-Mail", value: site.email, href: `mailto:${site.email}` },
  { label: "Telefon", value: site.phoneDisplay, href: `tel:${site.phone}`, event: "anrufen" },
  { label: "Standort", value: site.location },
  { label: "Antwortzeit", value: `meist innerhalb ${site.responseTime}` },
  { label: "GitHub", value: "@fatihgueler", href: site.github, external: true },
];

/** Kontakt-Datenblatt: Zeilen mit Mono-Label, Hover invertiert. */
export function ContactRows() {
  return (
    <ul data-rv-stagger="70" className="border-t-2 border-border">
      {rows.map((row) => {
        const inner = (
          <>
            <span className="label muted-inv w-28 shrink-0 text-muted">{row.label}</span>
            <span className="min-w-0 break-words text-lg font-semibold">{row.value}</span>
          </>
        );
        return (
          <li key={row.label}>
          {row.href ? (
          <a
            href={row.href}
            data-umami-event={row.event}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener noreferrer" : undefined}
            data-rv="left"
            className="row-invert flex items-baseline gap-4 border-b-2 border-border px-1 py-4"
          >
            {inner}
            <span aria-hidden className="ml-auto font-mono">{row.external ? "↗" : "→"}</span>
          </a>
        ) : (
          <div key={row.label} data-rv="left" className="flex items-baseline gap-4 border-b-2 border-border px-1 py-4">
            {inner}
          </div>
        )}
        </li>
        );
      })}
    </ul>
  );
}

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="border-b-2 border-border py-[var(--spacing-section)]">
      <div className="frame">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label flex items-center gap-3 self-start md:col-span-3">
            <span className="bg-foreground px-1.5 py-0.5 text-background rounded-full">09</span>
            {contact.eyebrow}
          </p>
          <div className="md:col-span-9">
            <h2 id="kontakt-title" data-rv="rise" className="display text-[clamp(2.75rem,1.2rem+6.5vw,8rem)]">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-muted">{contact.subtitle}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <ContactRows />
            <div className="mt-10 rounded-[1.25rem] border-2 border-border p-6">
              <h3 className="display text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)]">{booking.title}</h3>
              <p className="mt-3 text-muted">{booking.subtitle}</p>
              <BookingButton variant="outline" className="mt-6 w-full whitespace-normal text-left sm:w-auto">
                {booking.ctaLabel}
              </BookingButton>
            </div>
          </div>
          <div data-rv="up" className="min-w-0 lg:col-span-7">
            <ContactFormLazy />
          </div>
        </div>
      </div>
    </section>
  );
}
