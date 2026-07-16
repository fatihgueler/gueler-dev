"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { projectHighlight, projects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/Reveal";

export function ProjectHighlight() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projekte"
      className="relative border-y border-border py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-3xl md:mb-20">
          {/* Kapitel-Label steht im HardCut-Balken über der Sektion */}
          <Reveal variant="fadeIn">
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              Projekte
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              {projectHighlight.title}
            </h2>
          </Reveal>
          <Reveal variant="fadeIn" delay={0.15}>
            <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted">
              {projectHighlight.description}
            </p>
          </Reveal>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {projects.items.map((project, i) => (
            <m.div
              key={project.title}
              className={cn("h-full", i === 0 && "md:col-span-2")}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Sticker-Hover: Karte springt hart nach oben-links,
                  darunter erscheint ein solider Offset-Block (kein Soft-Shadow) */}
              <div className="flex h-full flex-col border border-border bg-background p-7 transition-[transform,box-shadow,border-color] duration-100 hover:-translate-x-1 hover:-translate-y-1 hover:border-border-strong hover:shadow-[8px_8px_0_0_var(--color-violet)] md:p-8">
              <p
                className="font-mono text-xs tracking-[0.2em] text-cyan"
                style={{ textTransform: "uppercase" }}
              >
                {project.category}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologien">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono text-[0.65rem] text-muted rounded-none">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-5 border-t border-border pt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap inline-flex items-center gap-1.5 text-sm font-medium text-violet-3 transition-colors hover:text-foreground"
                  >
                    Live ansehen
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-cyan"
                >
                  <Github className="size-4" aria-hidden />
                  Code
                </a>
              </div>
              </div>
            </m.div>
          ))}
        </div>

        <Reveal variant="fadeIn" delay={0.2} className="mt-16 md:mt-24">
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
