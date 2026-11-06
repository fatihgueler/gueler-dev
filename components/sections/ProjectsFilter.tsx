"use client";

import * as React from "react";

import { projects } from "@/lib/content";
import { ProjectRows } from "@/components/home/ProjectRows";
import { cn } from "@/lib/utils";

const ALL = "Alle";

/**
 * Projekt-Register mit Kategorie-Filter. Filter = Reiter in einer
 * Raster-Zeile, aktiv invertiert. Ohne JS sind alle Projekte sichtbar.
 */
export function ProjectsFilter() {
  const categories = [ALL, ...Array.from(new Set(projects.items.map((p) => p.category)))];
  const [active, setActive] = React.useState(ALL);
  const filtered = active === ALL ? projects.items : projects.items.filter((p) => p.category === active);

  return (
    <section aria-label="Projekte" className="border-b-2 border-border">
      <div className="frame flex flex-wrap items-stretch gap-0 py-6">
        <p className="label mr-4 flex items-center py-2 text-muted">Filter /</p>
        <div role="group" aria-label="Nach Kategorie filtern" className="flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={cn(
                "mb-2 mr-2 min-h-11 rounded-full border-2 border-border px-4 font-mono text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-[90ms] first:ml-0",
                active === category ? "bg-foreground text-background" : "hover:bg-signal hover:text-on-signal",
              )}
            >
              {category}
              {category !== ALL && (
                <span className="ml-2 opacity-70">
                  {projects.items.filter((p) => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} Projekte angezeigt
      </p>
      <ProjectRows items={filtered} />
    </section>
  );
}
