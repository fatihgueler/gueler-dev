"use client";

import * as React from "react";

import { useVelocityMarquee } from "@/lib/useVelocityMarquee";

/** Stack als Laufband, an das Scroll-Tempo gekoppelt. */
export function StackBand({ items }: { items: string[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useVelocityMarquee(ref, { base: 0.8 });
  const row = (dup: boolean) => (
    <ul aria-hidden={dup || undefined} aria-label={dup ? undefined : "Technologien"} className={`flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="display px-6 text-[clamp(2rem,1.2rem+3vw,4rem)] leading-none">{item}</span>
          <span aria-hidden className="size-4 rounded-full bg-signal" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y-2 border-border bg-foreground py-5 text-background">
      <div ref={ref} className="marquee-track will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
