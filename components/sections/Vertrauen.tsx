"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { site, vertrauen } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Vertrauen ohne Kundenstimmen — nur prüfbare Fakten.
 *
 * Links das Porträt im selben Stil wie /ueber (Graustufen, solider
 * Offset-Block), rechts das Haarlinien-Raster aus Outcomes: Zellen
 * stanzen nacheinander ein, Hover invertiert hart.
 */
export function Vertrauen() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="vertrauen" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-14 md:mb-20">
          <Reveal variant="fadeIn">
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              {vertrauen.eyebrow}
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: "16ch",
              }}
            >
              {vertrauen.title}
            </h2>
          </Reveal>
          <Reveal variant="fadeIn" delay={0.15}>
            <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted">
              {vertrauen.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Porträt */}
          <Reveal variant="fadeUp">
            <div className="group relative mx-auto aspect-square w-full max-w-sm lg:mx-0">
              <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-violet" />
              <div className="relative h-full overflow-hidden border border-border-strong bg-surface">
                <Image
                  src="/fatih.jpg"
                  alt="Fatih Güler – Freelance Webentwickler aus Hannover"
                  fill
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover grayscale contrast-[1.15] transition-[filter] duration-200 group-hover:grayscale-0 group-hover:contrast-100 motion-reduce:grayscale-0 motion-reduce:contrast-100"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border-strong bg-background px-4 py-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                    {site.ownerName}
                  </span>
                  <span className="font-mono text-xs text-muted">{site.location}</span>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-sm text-base leading-relaxed text-foreground lg:mx-0">
              {vertrauen.person.line}
            </p>
            <Link
              href={vertrauen.person.link.href}
              className="tap mx-auto mt-3 inline-flex max-w-sm items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-violet-3 hover:text-foreground lg:mx-0"
            >
              {vertrauen.person.link.label}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </Reveal>

          {/* Bausteine */}
          <div className="grid gap-px self-start overflow-hidden border border-border bg-border">
            {vertrauen.items.map((item, i) => (
              <m.div
                key={item.title}
                className="group relative flex flex-col gap-2 bg-background p-6 transition-colors duration-100 hover:bg-foreground md:p-8"
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.01, delay: i * 0.09 }}
              >
                <span className="font-mono text-xs text-violet-3 transition-colors duration-100 group-hover:text-background/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold text-foreground transition-colors duration-100 group-hover:text-background md:text-2xl">
                  {item.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-muted transition-colors duration-100 group-hover:text-background/70 md:text-base">
                  {item.description}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
