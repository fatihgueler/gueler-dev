import * as React from "react";
import Image from "next/image";

import { about, ausblick, site, skills, timeline, trust } from "@/lib/content";
import { SectionHead } from "@/components/Section";

/** Über mich: Porträt als Steckbrief links, Text rechts – Zeitungsspalte. */
export function About() {
  return (
    <section id="ueber" aria-labelledby="about-title" className="border-b-2 border-border">
      <div className="mx-auto grid w-full max-w-[96rem] md:grid-cols-12">
        <div className="border-b-2 border-border p-[var(--spacing-gutter)] py-10 md:col-span-5 md:border-b-0 md:border-r-2 md:py-14">
          <figure data-rv="up" className="border-2 border-border shadow-[10px_10px_0_0_var(--color-signal)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/fatih.jpg"
                alt="Fatih Güler – Freelance Webentwickler aus Hannover"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 92vw"
                className="object-cover grayscale contrast-[1.1]"
              />
            </div>
            <figcaption className="grid grid-cols-2 border-t-2 border-border bg-background">
              <span className="label border-r-2 border-border px-3 py-2 font-bold">{site.ownerName}</span>
              <span className="label px-3 py-2 text-muted">{site.location}</span>
            </figcaption>
          </figure>
        </div>
        <div className="p-[var(--spacing-gutter)] py-10 md:col-span-7 md:px-10 md:py-14">
          <p className="label flex items-center gap-3">
            <span className="bg-foreground px-1.5 py-0.5 text-background">01</span>
            {about.eyebrow}
          </p>
          <h2 id="about-title" data-rv="rise" className="display mt-6 text-[clamp(3rem,1.5rem+6vw,8rem)]">
            {about.title}
          </h2>
          <div className="mt-10 space-y-5 text-[length:var(--text-lead)] leading-relaxed md:columns-2 md:gap-10 md:space-y-0 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul data-rv-stagger="70" className="mt-10 border-t-2 border-border">
            {about.highlights.map((h) => (
              <li key={h} data-rv="left" className="flex gap-3 border-b-2 border-border py-3 font-medium">
                <span aria-hidden className="mt-[0.45em] size-2.5 shrink-0 bg-signal" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Werdegang als Zeitleiste mit Jahres-Spalte. */
export function Timeline() {
  return (
    <section aria-labelledby="timeline-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="timeline-title" index="02" label={timeline.eyebrow} title={timeline.title} />
      </div>
      <ol data-rv-stagger="100" className="mt-16 border-t-2 border-border">
        {timeline.steps.map((step) => (
          <li key={step.title} data-rv="up" className="row-invert border-b-2 border-border last:border-b-0">
            <div className="frame grid gap-3 py-8 md:grid-cols-12 md:gap-6">
              <span className="display text-[clamp(2rem,1.5rem+2vw,3.5rem)] md:col-span-3">{step.period}</span>
              <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-extrabold leading-tight md:col-span-4" style={{ fontStretch: "80%" }}>
                {step.title}
              </h3>
              <p className="muted-inv text-lg leading-snug text-muted md:col-span-5">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Stack als dreispaltiges Datenblatt (ungleich breit). */
export function Skills() {
  const spans = ["md:col-span-4", "md:col-span-3", "md:col-span-5"];
  return (
    <section aria-labelledby="skills-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="skills-title" index="03" label={skills.eyebrow} title={skills.title} subtitle={skills.subtitle} />
      </div>
      <div data-rv-stagger="120" className="frame-ruled mt-16 grid border-t-2 border-border md:grid-cols-12">
        {skills.groups.map((group, i) => (
          <div
            key={group.label}
            data-rv="up"
            className={`border-b-2 border-border p-[var(--spacing-gutter)] py-8 md:border-b-0 ${spans[i]} ${
              i < skills.groups.length - 1 ? "md:border-r-2" : ""
            }`}
          >
            <h3 className="label bg-foreground px-2 py-1 text-background inline-block">{group.label}</h3>
            <ul className="mt-6">
              {group.items.map((item) => (
                <li key={item} className="display border-b-2 border-border py-2 text-[clamp(1.75rem,1.3rem+1.5vw,2.75rem)] last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Warum ich: nummerierte Aussagen in versetzten Zeilen. */
export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="border-b-2 border-border py-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead id="trust-title" index="04" label={trust.eyebrow} title={trust.title} />
        <ol data-rv-stagger="90" className="mt-16 grid gap-0 border-t-2 border-border md:grid-cols-2">
          {trust.items.map((item, i) => (
            <li
              key={item.title}
              data-rv="up"
              className={`border-b-2 border-border py-8 md:px-8 ${i % 2 === 0 ? "md:border-r-2 md:pl-0" : "md:mt-16"}`}
            >
              <span className="label text-signal-text">{String(i + 1).padStart(2, "0")} /</span>
              <h3 className="mt-3 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-extrabold leading-tight" style={{ fontStretch: "80%" }}>
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-snug text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Ausblick 2027: als Notiz-Zettel mit Signalkante. */
export function Ausblick() {
  return (
    <section aria-labelledby="ausblick-title" className="border-b-2 border-border py-[var(--spacing-section)]">
      <div className="frame grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label flex items-center gap-3">
            <span className="bg-foreground px-1.5 py-0.5 text-background">05</span>
            {ausblick.eyebrow}
          </p>
          <h2 id="ausblick-title" data-rv="rise" className="display mt-6 text-[clamp(2.75rem,1.4rem+5vw,6.5rem)]">
            {ausblick.title}
          </h2>
        </div>
        <div data-rv="left" className="border-2 border-border border-l-[var(--rule-heavy)] border-l-signal p-6 md:col-span-7 md:p-10">
          {ausblick.paragraphs.map((p) => (
            <p key={p} className="mb-5 text-[length:var(--text-lead)] leading-relaxed last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
