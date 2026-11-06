import * as React from "react";
import Link from "next/link";

import { hero, site } from "@/lib/content";
import { SplitChars } from "@/components/ui/SplitChars";
import { Magnetic } from "@/components/ui/Magnetic";

/**
 * Startseiten-Hero. Typografie ist das Bild: die Kernaussage in schmaler,
 * schwerer Display-Schrift bis an den Rand. „Zum Festpreis." ist der eine
 * Signature Moment – ein Signal-Stempel, der einmal aufschlägt und die
 * Zeile darüber überlappt. Primärer CTA liegt immer in den ersten 100vh.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-sp
      className="relative overflow-hidden border-b-2 border-border"
    >
      {/* Sichtbares 12er-Raster als Hilfslinien */}
      <div aria-hidden className="grid-lines grid-draw px-y pointer-events-none absolute -inset-y-40 inset-x-0" style={{ "--speed": 260 } as React.CSSProperties} />
      {/* Hintergrund-Ebene: Preis als riesige Outline, wandert gegen die Headline */}
      <span
        aria-hidden
        className="display hero-ghost px-x pointer-events-none absolute -right-[4vw] bottom-[18%] select-none whitespace-nowrap text-[clamp(8rem,30vw,32rem)] leading-none"
        style={{ "--speed": -700 } as React.CSSProperties}
      >
        ab 500 €
      </span>

      <div className="frame relative flex min-h-[calc(100svh-3.5rem)] flex-col md:min-h-[calc(100svh-4rem)]">
        {/* Kopfzeile des Blatts */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-border py-3">
          <p className="label flex items-center gap-3">
            <span className="bg-foreground px-1.5 py-0.5 text-background">00</span>
            {hero.overline}
          </p>
          <p className="label hidden text-muted sm:block">{site.location}</p>
        </div>

        <h1
          id="hero-title"
          className="display relative py-[clamp(1.5rem,4svh,3rem)] text-[clamp(3.1rem,min(15vw,19.5svh),20vw)]"
        >
          <span className="hero-line block"><span className="px-x block" style={{ "--speed": 520 } as React.CSSProperties}><SplitChars text={hero.lines[0]} className="chars" /></span></span>
          <span className="hero-line px-x relative z-10 -mt-[0.06em] block" style={{ "--speed": -760 } as React.CSSProperties}>
            <span className="stamp stamp-in inline-block origin-left border-2 border-ink bg-signal px-[0.08em] pb-[0.02em] pt-[0.1em] text-on-signal shadow-[0.06em_0.06em_0_0_var(--color-foreground)]">
              {hero.lines[1]}
            </span>
          </span>
        </h1>

        {/* Fußzeile: Subline · CTAs · Checks im Raster */}
        <div className="hero-foot relative z-10 mt-auto grid border-t-2 border-border bg-background md:grid-cols-12">
          <p className="py-5 text-[length:var(--text-lead)] leading-snug md:col-span-5 md:border-r-2 md:border-border md:py-6 md:pr-6">
            {hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 border-t-2 border-border py-5 sm:flex-row md:col-span-4 md:flex-col md:border-r-2 md:border-t-0 md:px-6 md:py-6">
            <Magnetic strength={0.25}>
            <Link
              href={hero.cta.href}
              data-umami-event="hero-cta"
              className="flex min-h-14 items-center justify-between gap-4 border-2 border-foreground bg-signal px-5 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] transition-[transform,box-shadow] duration-[90ms] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
            >
              {hero.cta.label}
              <span aria-hidden className="nudge">→</span>
            </Link>
            </Magnetic>
            <Link
              href={hero.secondary.href}
              className="flex min-h-12 items-center justify-between gap-4 border-2 border-foreground px-5 font-mono text-sm font-bold uppercase tracking-[0.06em] transition-colors duration-[90ms] hover:bg-foreground hover:text-background"
            >
              {hero.secondary.label}
              <span aria-hidden className="nudge nudge-down">↓</span>
            </Link>
          </div>
          <ul className="border-t-2 border-border py-4 md:col-span-3 md:border-t-0 md:py-6 md:pl-6">
            {hero.checks.map((item) => (
              <li key={item} className="flex items-start gap-3 py-1 text-[0.9375rem] leading-snug">
                <span aria-hidden className="mt-[0.35em] size-2.5 shrink-0 bg-signal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
