import * as React from "react";

import { techStack } from "@/lib/content";

export function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-14 pr-14">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="whitespace-nowrap text-lg font-medium tracking-wide text-muted-2 transition-colors hover:text-gold"
          >
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_38s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}
