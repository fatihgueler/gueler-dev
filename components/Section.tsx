import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

/**
 * Signal-Tick — der bewusste, benannte Kicker der Marke (kein generischer
 * Eyebrow-Reflex). Greift das Signal-Motiv aus dem Hero auf: ein Cyan-Punkt
 * im Knoten-Ring. Bewusst zurückgenommen (muted Label), damit die Überschrift
 * die Hierarchie trägt – nicht der Kicker.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2.5">
      <span
        className="relative flex size-2.5 shrink-0 items-center justify-center"
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full border border-cyan/40" />
        <span className="size-1 rounded-full bg-cyan shadow-[0_0_6px_rgba(240,190,94,0.7)] motion-safe:[animation:signal-pulse_3s_ease-in-out_infinite]" />
      </span>
      <span className="font-mono text-xs font-medium tracking-[0.04em] text-muted">
        {children}
      </span>
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <div className={cn(centered && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground [text-wrap:balance] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
