"use client";

import * as React from "react";
import { ArrowUpRight, Github } from "lucide-react";

import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

const ALL = "Alle";

/** Filterbare Projekt-Galerie mit sanftem Re-Animations-Effekt. */
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
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-wide transition-all",
                active === category
                  ? "border-teal bg-teal/10 text-teal"
                  : "border-border text-muted hover:border-teal-deep hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Galerie */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {filtered.map((project, i) => (
            <article
              key={`${active}-${project.title}`}
              className={cn(
                "card-surface group relative flex h-full flex-col rounded-[var(--radius-lg)] p-8",
                project.featured && "md:col-span-2 md:p-10",
              )}
              style={{
                animation: "var(--animate-fade-up)",
                animationDelay: `${i * 70}ms`,
                opacity: 0,
              }}
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
                <div className="flex shrink-0 gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} auf GitHub`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-teal hover:text-teal"
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-teal hover:text-teal"
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
                    className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
