import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { site, vertrauen } from "@/lib/content";

/**
 * Vertrauen: asymmetrisch. Links (sticky) Titel + Porträt im harten Rahmen,
 * rechts die prüfbaren Punkte als abgehakte Prüfliste.
 */
export function Vertrauen() {
  return (
    <section id="vertrauen" aria-labelledby="vertrauen-title" className="border-b-2 border-border">
      <div className="mx-auto grid w-full max-w-[96rem] md:grid-cols-12">
        <div className="px-[var(--spacing-gutter)] py-[var(--spacing-section)] md:col-span-5 md:border-r-2 md:border-border">
          <div className="md:sticky md:top-24">
            <p className="label flex items-center gap-3">
              <span className="bg-foreground px-1.5 py-0.5 text-background">06</span>
              {vertrauen.eyebrow}
            </p>
            <h2 id="vertrauen-title" data-rv="rise" className="display mt-6 text-[clamp(2.75rem,1.4rem+5vw,6.5rem)]">
              {vertrauen.title}
            </h2>
            <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-snug">{vertrauen.subtitle}</p>

            <figure data-rv="up" className="mt-10 w-full max-w-sm border-2 border-border shadow-[8px_8px_0_0_var(--color-signal)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/fatih.jpg"
                  alt="Fatih Güler – Freelance Webentwickler aus Hannover"
                  fill
                  sizes="(min-width: 768px) 24rem, 90vw"
                  className="object-cover grayscale contrast-[1.1]"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t-2 border-border bg-background px-3 py-2">
                <span className="label font-bold">{site.ownerName}</span>
                <span className="label text-muted">{site.location}</span>
              </figcaption>
            </figure>
            <p className="mt-8 text-lg font-semibold">{vertrauen.person.line}</p>
            <Link href={vertrauen.person.link.href} className="link label mt-3 inline-block py-2 text-sm">
              {vertrauen.person.link.label} →
            </Link>
          </div>
        </div>

        <ol data-rv-stagger="90" className="md:col-span-7 md:pt-[var(--spacing-section)]">
          {vertrauen.items.map((item, i) => (
            <li
              key={item.title}
              data-rv="left"
              className="row-invert grid grid-cols-[auto_1fr] gap-x-5 border-t-2 border-border px-[var(--spacing-gutter)] py-8 last:border-b-0 md:px-10 md:py-10"
            >
              <span
                aria-hidden
                className="mt-1 flex size-9 items-center justify-center border-2 border-current font-mono text-base font-bold"
              >
                ✓
              </span>
              <div>
                <p className="label muted-inv text-muted">Prüfpunkt {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-extrabold leading-tight" style={{ fontStretch: "80%" }}>
                  {item.title}
                </h3>
                <p className="muted-inv mt-3 max-w-xl text-lg leading-snug text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
