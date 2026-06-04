import * as React from "react";
import { Mail, MapPin, Github, Clock } from "lucide-react";

import { contact, site } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

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
                <Mail className="size-5" />
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

            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-gold">
                <MapPin className="size-5" />
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
                <Clock className="size-5" />
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
                <Github className="size-5" />
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
        </Reveal>

        {/* Formular */}
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
