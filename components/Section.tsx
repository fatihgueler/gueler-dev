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

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-teal-deep" aria-hidden />
      <span className="font-mono text-xs font-semibold text-teal">
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
      <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
