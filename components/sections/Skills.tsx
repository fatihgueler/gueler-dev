import * as React from "react";

import { skills } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/anim/Reveal";

/** Skill-Gruppen als Mono-Tag-Wolken. */
export function Skills() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow={skills.eyebrow}
        title={skills.title}
        subtitle={skills.subtitle}
        centered
      />

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {skills.groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <div className="card-surface h-full rounded-[var(--radius-lg)] p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-teal hover:text-teal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
