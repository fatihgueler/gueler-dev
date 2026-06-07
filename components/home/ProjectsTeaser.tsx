import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";

import { projects } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/anim/Reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";

/** Projekt-Teaser (nur Highlights) für die Startseite – verlinkt auf /projekte. */
export function ProjectsTeaser() {
  const featured = projects.items.filter((p) => p.featured);

  return (
    <Section id="projekte-teaser" className="bg-dot-grid">
      <SectionHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        subtitle={projects.subtitle}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <article className="card-surface group relative flex h-full flex-col rounded-[var(--radius-lg)] p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
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

              <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

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
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Magnetic strength={0.35}>
          <Button asChild variant="outline" size="lg">
            <Link href="/projekte">
              Alle Projekte ansehen
              <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
      </div>
    </Section>
  );
}
