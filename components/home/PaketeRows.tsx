import * as React from "react";
import Link from "next/link";

import { pakete } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/**
 * Pakete als Preis-Zeilen über die volle Breite – keine drei gleichen Karten.
 * Das beliebte Paket ist invertiert und trägt einen gedrehten Signal-Stempel.
 */
export function PaketeRows({ index = "04" }: { index?: string }) {
  return (
    <section id="pakete" aria-labelledby="pakete-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="pakete-title"
          index={index}
          label={pakete.eyebrow}
          title={pakete.title}
          subtitle={pakete.subtitle}
        />
      </div>

      <div className="mt-16 border-t-2 border-border">
        {pakete.items.map((item, i) => {
          const inv = item.featured;
          return (
            <article
              key={item.title}
              aria-labelledby={`paket-${i}`}
              className={`relative border-b-2 border-border ${inv ? "bg-foreground text-background" : ""}`}
            >
              <div className="frame grid gap-8 py-10 md:grid-cols-12 md:py-14">
                <div className="md:col-span-5">
                  <p className="label flex items-center gap-3">
                    <span className={inv ? "bg-background px-1.5 py-0.5 text-foreground" : "bg-foreground px-1.5 py-0.5 text-background"}>
                      P{i + 1}
                    </span>
                    {item.time}
                  </p>
                  <h3 id={`paket-${i}`} className="display mt-4 text-[clamp(2.25rem,1.5rem+3vw,4rem)]">
                    {item.title}
                  </h3>
                  <p className="display mt-3 text-[clamp(3.5rem,2rem+6vw,8rem)]">
                    {inv ? <span className="mark">{item.price}</span> : item.price}
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-6 md:col-span-3">
                  <p className="text-[length:var(--text-lead)] leading-snug">{item.description}</p>
                  <Link
                    href="/kontakt"
                    className={`inline-flex min-h-12 w-fit items-center gap-3 border-2 px-5 font-mono text-sm font-bold uppercase tracking-[0.06em] transition-colors duration-[90ms] ${
                      inv
                        ? "border-signal bg-signal text-on-signal hover:bg-background hover:text-foreground hover:border-background"
                        : "border-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {item.title} anfragen <span aria-hidden>→</span>
                  </Link>
                </div>
                <ul className="md:col-span-4">
                  {item.features.map((f) => (
                    <li
                      key={f}
                      className={`flex gap-3 border-b-2 py-3 first:border-t-2 ${inv ? "border-background/40" : "border-border"}`}
                    >
                      <span aria-hidden className="mt-[0.45em] size-2.5 shrink-0 bg-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {item.badge && (
                <span className="stamp label absolute right-[var(--spacing-gutter)] top-0 -translate-y-1/2 border-2 border-ink bg-signal px-3 py-1.5 text-sm font-bold text-on-signal">
                  ★ {item.badge}
                </span>
              )}
            </article>
          );
        })}
      </div>

      <div className="frame grid gap-4 py-8 md:grid-cols-12">
        <p className="label md:col-span-3">! Zahlung &amp; Preise</p>
        <div className="space-y-2 md:col-span-9">
          <p className="text-lg font-semibold">{pakete.payment}</p>
          <p className="max-w-3xl text-muted">{pakete.note}</p>
        </div>
      </div>
    </section>
  );
}
