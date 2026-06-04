import * as React from "react";
import { ArrowUpRight, Github } from "lucide-react";

import { projects } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section id="projekte" className="bg-dot-grid">
      <SectionHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        subtitle={projects.subtitle}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {projects.items.map((project, i) => {
          const isPlaceholder = !project.repoUrl && !project.liveUrl;
          return (
            <Reveal
              key={project.title}
              delay={i * 90}
              className={cn(project.featured && "md:col-span-2")}
            >
              <article
                className={cn(
                  "card-surface group relative flex h-full flex-col rounded-[var(--radius-lg)] p-8",
                  project.featured && "md:p-10",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {project.category}
                    </span>
                    <h3
                      className={cn(
                        "mt-2 font-display font-medium text-foreground",
                        project.featured ? "text-3xl md:text-4xl" : "text-2xl",
                      )}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {!isPlaceholder && (
                    <div className="flex shrink-0 gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} auf GitHub`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-gold hover:text-gold"
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
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-gold hover:text-gold"
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
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
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
