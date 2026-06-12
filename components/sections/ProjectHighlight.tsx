"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { projectHighlight, projects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  WordReveal,
} from "@/components/animation/Reveal";

/**
 * Dunkle Premium-Showcase: Glassmorphism-Cards mit Glow-Ring,
 * rotierender Lichtstrahl im Hintergrund und Parallax-Versatz
 * der Card-Spalten beim Durchscrollen.
 */
export function ProjectHighlight() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Mittlere Card läuft den äußeren sichtbar entgegen (>100px Gesamtversatz)
  const outerY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const middleY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={sectionRef}
      id="projekte"
      className="showcase-bg relative overflow-hidden border-y border-border py-28 md:py-40"
    >
      <div className="showcase-beam" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <Reveal variant="fadeIn">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
              {projects.eyebrow}
            </p>
          </Reveal>
          <WordReveal
            text={projectHighlight.title}
            className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-6xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {projectHighlight.description}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3"
          stagger={0.12}
        >
          {projects.items.map((project, i) => (
            <RevealItem key={project.title} variant="fadeUp" className="h-full">
              <m.div
                className="h-full"
                style={
                  shouldReduceMotion
                    ? undefined
                    : { y: i === 1 ? middleY : outerY }
                }
              >
                <m.article
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="glow-card flex h-full flex-col rounded-[var(--radius-xl)] p-7 md:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                    {project.category}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologien">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-[0.7rem] text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-center gap-5 border-t border-border pt-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-3 transition-colors hover:text-foreground"
                      >
                        Live ansehen
                        <ArrowUpRight className="size-4" aria-hidden />
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-cyan"
                    >
                      <Github className="size-4" aria-hidden />
                      Code
                    </a>
                  </div>
                </m.article>
              </m.div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal variant="scaleIn" delay={0.2} className="mt-16 text-center md:mt-24">
          <Button asChild variant="outline" size="lg">
            <Link href={projectHighlight.cta.href}>
              {projectHighlight.cta.label}
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
