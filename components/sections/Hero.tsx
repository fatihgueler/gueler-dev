"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";

import { hero } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/anim/Counter";
import { OrbLoader } from "@/components/three/OrbLoader";
import { prefersReducedMotion } from "@/lib/motion";

function Words({ text }: { text: string }) {
  return (
    <>
      {text
        .trim()
        .split(" ")
        .map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-hero-word className="inline-block" style={{ willChange: "transform" }}>
              {word}&nbsp;
            </span>
          </span>
        ))}
    </>
  );
}

export function Hero() {
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero-word]",
          { yPercent: 115, duration: 0.9, stagger: 0.035 },
          "-=0.2",
        )
        .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero-badge]", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from("[data-hero-stats]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Hintergrund-Ebenen */}
      <div className="teal-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_40%_40%,black,transparent)]"
        aria-hidden
      />

      {/* Riesiges Outline-Wortzeichen */}
      <span
        className="text-outline pointer-events-none absolute -bottom-[6vw] left-1/2 -z-0 -translate-x-1/2 select-none font-display text-[28vw] font-extrabold leading-none tracking-tighter opacity-50"
        aria-hidden
      >
        GÜLER
      </span>

      {/* 3D-Orb (rechts, blendet nach links aus) */}
      <OrbLoader className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-90 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_45%,black,transparent_75%)] lg:w-[58%]" />

      {/* Inhalt */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-4xl">
          <div
            data-hero-eyebrow
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            <span className="font-mono text-xs font-medium tracking-wide text-muted">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            <Words text={hero.titleStart} />
            <span className="inline-block overflow-hidden align-bottom">
              <span
                data-hero-word
                className="text-gradient-gold inline-block"
                style={{ willChange: "transform" }}
              >
                {hero.titleHighlight}&nbsp;
              </span>
            </span>
            <Words text={hero.titleEnd} />
          </h1>

          <p
            data-hero-sub
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            {hero.subtitle}
          </p>

          <div data-hero-cta className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic strength={0.4}>
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button asChild variant="outline" size="lg">
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </Magnetic>
          </div>

          {hero.socialProof && (
            <p
              data-hero-badge
              className="mt-5 flex items-center gap-2 text-sm text-muted"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              {hero.socialProof}
            </p>
          )}

          <div
            data-hero-stats
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {stat.count ? (
                    <Counter to={stat.count} suffix={stat.suffix ?? ""} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <Link
        href="#projekte"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-2 transition-colors hover:text-teal md:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </Link>
    </section>
  );
}
