import * as React from "react";
import Link from "next/link";

import { projectHighlight, projects } from "@/lib/content";
import { SectionHead } from "@/components/Section";
import { ProjectRows } from "@/components/home/ProjectRows";

export function Projects() {
  const items = projects.items.filter((p) => !("hideOnHome" in p && p.hideOnHome));
  return (
    <section id="projekte" aria-labelledby="projekte-title" className="border-b-2 border-border pt-[var(--spacing-section)]">
      <div className="frame">
        <SectionHead
          id="projekte-title"
          index="05"
          label={projects.eyebrow}
          title={projectHighlight.title}
          subtitle={projectHighlight.description}
        />
      </div>
      <div className="mt-16">
        <ProjectRows items={items} />
      </div>
      <div className="frame py-8">
        <Link
          href={projectHighlight.cta.href}
          className="display inline-flex items-center gap-4 text-[clamp(2rem,1.4rem+2.5vw,3.5rem)] hover:bg-signal hover:text-on-signal"
        >
          {projectHighlight.cta.label} <span aria-hidden className="nudge">→</span>
        </Link>
      </div>
    </section>
  );
}
