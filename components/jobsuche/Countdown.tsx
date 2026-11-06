"use client";

import * as React from "react";

/**
 * Tage bis zur Verfügbarkeit, live im Browser berechnet (veraltet nie).
 * Server/ohne JS: nur das Datum. Nach dem Stichtag: „ab sofort verfügbar".
 */
export function Countdown({ iso, label }: { iso: string; label: string }) {
  const [days, setDays] = React.useState<number | null>(null);

  React.useEffect(() => {
    const target = new Date(`${iso}T00:00:00`);
    const calc = () => {
      const diff = Math.ceil((target.getTime() - Date.now()) / 86_400_000);
      setDays(diff);
    };
    calc();
    const t = window.setInterval(calc, 60_000);
    return () => window.clearInterval(t);
  }, [iso]);

  return (
    <span className="inline-flex items-center gap-3 rounded-full border-2 border-border bg-signal px-4 py-2 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal">
      <span aria-hidden className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-ink opacity-60 motion-reduce:hidden" />
        <span className="relative size-2.5 rounded-full bg-ink" />
      </span>
      {days === null
        ? label
        : days > 0
          ? `${label} · noch ${days} ${days === 1 ? "Tag" : "Tage"}`
          : "Ab sofort verfügbar"}
    </span>
  );
}
