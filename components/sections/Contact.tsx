import * as React from "react";
import { Mail, MapPin, Github, Clock, Phone } from "lucide-react";

import { booking, contact, site } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { BookingButton } from "@/components/ui/BookingButton";

export function Contact() {
  return (
    <Section id="kontakt" className="relative overflow-hidden">
      <div className="gold-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Info-Spalte */}
        <Reveal>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            subtitle={contact.subtitle}
          />

          <div className="mt-10 space-y-5">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold transition-colors group-hover:border-gold-deep">
                <Mail className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-2">
                  E-Mail
                </span>
                <span className="text-foreground transition-colors group-hover:text-gold">
                  {site.email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${site.phone}`}
              className="group flex items-center gap-4"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold transition-colors group-hover:border-gold-deep">
                <Phone className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-2">
                  Telefon
                </span>
                <span className="text-foreground transition-colors group-hover:text-gold">
                  {site.phone}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-2">
                  Standort
                </span>
                <span className="text-foreground">{site.location}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold">
                <Clock className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-2">
                  Antwortzeit
                </span>
                <span className="text-foreground">meist innerhalb 24 Std.</span>
              </span>
            </div>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold transition-colors group-hover:border-gold-deep">
                <Github className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-2">
                  GitHub
                </span>
                <span className="text-foreground transition-colors group-hover:text-gold">
                  @fatihgueler
                </span>
              </span>
            </a>
          </div>

          {/* Terminbuchung via Cal.com */}
          <div className="card-surface mt-10 rounded-[var(--radius-lg)] p-7">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {booking.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {booking.subtitle}
            </p>
            <BookingButton className="mt-5 w-full sm:w-auto">
              {booking.ctaLabel}
            </BookingButton>
          </div>
        </Reveal>

        {/* Formular */}
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
