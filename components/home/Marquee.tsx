import * as React from "react";

import { techStack } from "@/lib/content";

/** Laufband in Ink. Für Screenreader nur einmal vorhanden; reduced-motion: steht still. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}
    >
      {techStack.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display px-5 text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none">{item}</span>
          <span aria-hidden className="size-3 bg-signal" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Kurz gesagt" className="marquee overflow-hidden border-b-2 border-border bg-foreground py-4 text-background">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
