"use client";

import * as React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

const ALL = "Alle";

const REFLOW_SPRING = { type: "spring", stiffness: 350, damping: 32 } as const;

/** Filterbare Projekt-Galerie mit animiertem Karten-Reflow (layout). */
export function ProjectsFilter() {
  const categories = [
    ALL,
    ...Array.from(new Set(projects.items.map((p) => p.category))),
  ];
  const [active, setActive] = React.useState(ALL);

  const filtered =
    active === ALL
      ? projects.items
      : projects.items.filter((p) => p.category === active);

  return (
    <section className="relative px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* Filter */}
        <div className="flex flex-wrap gap-2.5">
          {/* Gestempelte Filter-Tabs: aktiv = harter Invert-Block */}
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "tap border px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-colors duration-100",
                active === category
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:bg-foreground hover:text-background",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Galerie */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <m.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={REFLOW_SPRING}
                className={cn(
                  "card-surface group relative flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition-[transform,box-shadow,border-color] duration-100 hover:-translate-x-1 hover:-translate-y-1 hover:border-border-strong hover:shadow-[8px_8px_0_0_var(--color-violet)]",
                  project.featured && "md:col-span-2 md:p-10",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {project.category}
                    </span>
                    <h3
                      className={cn(
                        "mt-2 font-display font-semibold text-foreground",
                        project.featured ? "text-3xl md:text-4xl" : "text-2xl",
                      )}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} auf GitHub`}
                        className="tap inline-flex h-11 w-11 items-center justify-center rounded-none border border-border text-muted transition-all hover:border-teal hover:text-teal"
                      >
                        <Github className="size-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live ansehen`}
                        className="tap inline-flex h-11 w-11 items-center justify-center rounded-none border border-border text-muted transition-all hover:border-teal hover:text-teal"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p
                  className={cn(
                    "mt-4 leading-relaxed text-muted",
                    project.featured && "max-w-2xl text-lg",
                  )}
                >
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-none border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
