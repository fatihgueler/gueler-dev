import type { Metadata } from "next";
import { Mail, MapPin, Github, Clock, MessageCircle, Calendar } from "lucide-react";

import { pages, site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: pages.kontakt.subtitle,
  // Selbstreferenzierender Canonical statt geerbtem Startseiten-Canonical.
  alternates: { canonical: "/kontakt" },
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: site.whatsapp,
    external: true,
  },
  {
    icon: Calendar,
    label: "Calendly",
    value: "15-Min Gespräch buchen",
    href: site.calendly,
    external: true,
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    label: "Verfügbarkeit",
    value: site.availability,
  },
  {
    icon: MapPin,
    label: "Standort",
    value: site.location,
  },
  {
    icon: Github,
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

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const inner = (
                  <>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-teal transition-colors duration-100 group-hover:border-transparent group-hover:bg-background/10 group-hover:text-background">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-muted-2 transition-colors duration-100 group-hover:text-background/60">
                        {channel.label}
                      </span>
                      <span className="text-foreground transition-colors duration-100 group-hover:text-background">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );
                return channel.href ? (
                  // Datenblatt-Zeile: Hover invertiert hart
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group -mx-3 flex items-center gap-4 px-3 py-1.5 transition-colors duration-100 hover:bg-foreground"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={channel.label} className="flex items-center gap-4 px-0 py-1.5">
                    {inner}
                  </div>
                );
              })}
            </div>

            <ContactMap />
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
