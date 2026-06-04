import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

import { hero } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Hintergrund-Ebenen */}
      <div className="gold-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-4xl">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 opacity-0 backdrop-blur"
            style={{ animation: "var(--animate-fade-up)", animationDelay: "0ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-xs font-medium tracking-wide text-muted">
              {hero.eyebrow}
            </span>
          </div>

          <h1
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground opacity-0 sm:text-6xl md:text-7xl"
            style={{ animation: "var(--animate-fade-up)", animationDelay: "120ms" }}
          >
            {hero.titleStart}
            <span className="text-gradient-gold italic">{hero.titleHighlight}</span>
            {hero.titleEnd}
          </h1>

          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted opacity-0 md:text-xl"
            style={{ animation: "var(--animate-fade-up)", animationDelay: "240ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="mt-10 flex flex-col gap-4 opacity-0 sm:flex-row"
            style={{ animation: "var(--animate-fade-up)", animationDelay: "360ms" }}
          >
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8 opacity-0"
            style={{ animation: "var(--animate-fade-up)", animationDelay: "480ms" }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-medium text-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <Link
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-2 transition-colors hover:text-gold md:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </Link>
    </section>
  );
}
