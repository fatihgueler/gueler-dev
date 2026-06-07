import type { Metadata } from "next";
import { Mail, MapPin, Github, Clock } from "lucide-react";

import { pages, site } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMap } from "@/components/sections/ContactMap";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: pages.kontakt.subtitle,
};

const channels = [
  {
    icon: Mail,
    label: "E-Mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Standort",
    value: site.location,
  },
  {
    icon: Clock,
    label: "Antwortzeit",
    value: "meist innerhalb 24 Std.",
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
      />

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const inner = (
                  <>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-teal transition-colors group-hover:border-teal-deep">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-muted-2">
                        {channel.label}
                      </span>
                      <span className="text-foreground transition-colors group-hover:text-teal">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );
                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={channel.label} className="group flex items-center gap-4">
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
