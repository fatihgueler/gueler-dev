import * as React from "react";
import { Mail, MapPin, Github, Clock, Phone } from "lucide-react";

import { booking, contact, site } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { BookingButton } from "@/components/ui/BookingButton";

export function Contact() {
  return (
    <section id="kontakt" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="relative grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <Reveal>
            <div className="mb-12">
              <p
                className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
                style={{ textTransform: "uppercase" }}
              >
                {contact.eyebrow}
              </p>
              <h2
                className="font-display font-black tracking-tighter text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  maxWidth: "16ch",
                }}
              >
                {contact.title}
              </h2>
              <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
                {contact.subtitle}
              </p>
            </div>

            <div className="border-t border-border">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:text-foreground"
              >
                <Mail className="size-5 shrink-0 text-muted transition-colors group-hover:text-violet-3" aria-hidden />
                <span>
                  <span
                    className="block font-mono text-[0.65rem] tracking-[0.2em] text-muted-2"
                    style={{ textTransform: "uppercase" }}
                  >
                    E-Mail
                  </span>
                  <span className="text-sm text-foreground">{site.email}</span>
                </span>
              </a>

              <a
                href={`tel:${site.phone}`}
                className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:text-foreground"
              >
                <Phone className="size-5 shrink-0 text-muted transition-colors group-hover:text-violet-3" aria-hidden />
                <span>
                  <span
                    className="block font-mono text-[0.65rem] tracking-[0.2em] text-muted-2"
                    style={{ textTransform: "uppercase" }}
                  >
                    Telefon
                  </span>
                  <span className="text-sm text-foreground">{site.phone}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 border-b border-border py-5">
                <MapPin className="size-5 shrink-0 text-muted" aria-hidden />
                <span>
                  <span
                    className="block font-mono text-[0.65rem] tracking-[0.2em] text-muted-2"
                    style={{ textTransform: "uppercase" }}
                  >
                    Standort
                  </span>
                  <span className="text-sm text-foreground">{site.location}</span>
                </span>
              </div>

              <div className="flex items-center gap-4 border-b border-border py-5">
                <Clock className="size-5 shrink-0 text-muted" aria-hidden />
                <span>
                  <span
                    className="block font-mono text-[0.65rem] tracking-[0.2em] text-muted-2"
                    style={{ textTransform: "uppercase" }}
                  >
                    Antwortzeit
                  </span>
                  <span className="text-sm text-foreground">meist innerhalb 24 Std.</span>
                </span>
              </div>

              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:text-foreground"
              >
                <Github className="size-5 shrink-0 text-muted transition-colors group-hover:text-violet-3" aria-hidden />
                <span>
                  <span
                    className="block font-mono text-[0.65rem] tracking-[0.2em] text-muted-2"
                    style={{ textTransform: "uppercase" }}
                  >
                    GitHub
                  </span>
                  <span className="text-sm text-foreground">@fatihgueler</span>
                </span>
              </a>
            </div>

            {/* Booking */}
            <div className="mt-10 border border-border p-7">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {booking.title}
              </h3>
              <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                {booking.subtitle}
              </p>
              <BookingButton className="mt-5 w-full sm:w-auto">
                {booking.ctaLabel}
              </BookingButton>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
