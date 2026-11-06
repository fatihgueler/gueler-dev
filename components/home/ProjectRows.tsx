import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { caseStudies, projects } from "@/lib/content";

type ProjectItem = (typeof projects.items)[number];

/**
 * Projekte als große Tafeln. Hover/Fokus (Desktop): der echte Screenshot
 * springt als Live-Vorschau neben den Titel. Mobil steht er direkt in der Zeile.
 * Live, Code und Case Study sind eigene Links (keine verschachtelten Anker).
 */
export function ProjectRows({ items, startIndex = 1 }: { items: readonly ProjectItem[]; startIndex?: number }) {
  return (
    <ol data-rv-stagger="100" className="border-t-2 border-border">
      {items.map((project, i) => {
        const study = caseStudies.find((c) => c.title === project.title);
        const img = study?.image ?? "/case-studies/placeholder.svg";
        const host = new URL(project.liveUrl).host;
        return (
          <li key={project.title} data-rv="up" className="group relative border-b-2 border-border">
            <div className="frame grid gap-6 py-8 md:grid-cols-12 md:py-12">
              <div className="md:col-span-1">
                <span className="label">{String(startIndex + i).padStart(2, "0")}</span>
              </div>

              <div className="md:col-span-6">
                <p className="label flex flex-wrap items-center gap-3">
                  <span
                    className={
                      project.kind === "Kundenprojekt"
                        ? "border-2 border-ink bg-signal px-2 py-0.5 font-bold text-on-signal"
                        : "border-2 border-border px-2 py-0.5"
                    }
                  >
                    {project.kind}
                  </span>
                  <span className="text-muted">{project.category}</span>
                </p>
                <h3 className="display mt-4 text-[clamp(3.25rem,2rem+6vw,9rem)] transition-transform duration-[180ms] ease-[var(--ease-snap)] md:group-hover:translate-x-4">
                  {project.title}
                </h3>

                {/* Mobil: Screenshot inline */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden
                  className="mt-6 block border-2 border-border md:hidden"
                >
                  <Image
                    src={img}
                    alt=""
                    width={1200}
                    height={750}
                    sizes="100vw"
                    className="block aspect-[16/10] w-full object-cover object-top"
                  />
                </a>
              </div>

              <div className="flex flex-col gap-6 md:col-span-5">
                <p className="text-[length:var(--text-lead)] leading-snug">{project.description}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Technologien">
                  {project.tags.map((tag) => (
                    <li key={tag} className="label border-2 border-border px-2 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex min-h-12 items-center gap-2 border-2 border-foreground bg-signal px-4 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] transition-[transform,box-shadow] duration-[90ms] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
                  >
                    Live ansehen ↗<span className="sr-only"> – {project.title} (neuer Tab)</span>
                  </a>
                  {study && (
                    <Link
                      href={`/projekte/${study.id}`}
                      className="relative z-10 inline-flex min-h-12 items-center gap-2 border-2 border-foreground px-4 font-mono text-sm font-bold uppercase tracking-[0.06em] hover:bg-foreground hover:text-background"
                    >
                      Case Study →<span className="sr-only"> {project.title}</span>
                    </Link>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex min-h-12 items-center gap-2 px-2 font-mono text-sm font-bold uppercase tracking-[0.06em] underline decoration-2 underline-offset-4 hover:bg-foreground hover:text-background"
                  >
                    Code<span className="sr-only"> von {project.title} auf GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop: Live-Vorschau springt beim Hover/Fokus auf */}
            <div
              aria-hidden
              className="preview-pop absolute right-[38%] top-6 z-20 hidden w-[min(30rem,32vw)] border-2 border-border bg-background shadow-[8px_8px_0_0_var(--color-signal)] md:block"
            >
              <div className="flex items-center justify-between border-b-2 border-border px-3 py-1.5">
                <span className="label truncate">{host}</span>
                <span className="label">● Live</span>
              </div>
              <Image
                src={img}
                alt=""
                width={1200}
                height={750}
                sizes="32vw"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
