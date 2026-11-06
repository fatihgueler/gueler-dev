"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { caseStudies, projects } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

type ProjectItem = (typeof projects.items)[number];

const TAB = 18; // px: sichtbare Kante je gestapelter Tafel

/**
 * Projekte als gepinnter Kartenstapel (≥ md): jede Tafel klebt unter der
 * Kopfleiste, die nächste schiebt sich darüber; die verdeckte Tafel schrumpft
 * und tritt zurück, ihre Oberkante bleibt als Register-Reiter stehen.
 * Reines CSS-sticky – funktioniert auch ohne JS; JS ergänzt nur das
 * Zurücktreten (--cover). Mobil: normale Folge von Tafeln.
 */
export function ProjectStack({ items }: { items: readonly ProjectItem[] }) {
  const listRef = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const panels = Array.from(list.children) as HTMLElement[];
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        panels.forEach((p) => p.style.removeProperty("--cover"));
        return;
      }
      for (let i = 0; i < panels.length - 1; i++) {
        const cur = panels[i].getBoundingClientRect();
        const next = panels[i + 1].getBoundingClientRect();
        const cover = Math.min(1, Math.max(0, (cur.height - (next.top - cur.top)) / cur.height));
        panels[i].style.setProperty("--cover", cover.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const n = items.length;

  return (
    <ol ref={listRef} className="stack border-t-2 border-border">
      {items.map((project, i) => {
        const study = caseStudies.find((c) => c.title === project.title);
        const img = study?.image ?? "/case-studies/placeholder.svg";
        const host = new URL(project.liveUrl).host;
        return (
          <li
            key={project.title}
            className="stack-panel border-b-2 border-border bg-background md:sticky md:overflow-hidden md:border-b-0 md:border-t-2"
            style={
              {
                "--stack-top": `calc(4rem + ${i * TAB}px)`,
                "--stack-h": `calc(100svh - 4rem - ${(n - 1) * TAB}px)`,
                zIndex: i + 1,
              } as React.CSSProperties
            }
          >
            <div className="stack-inner frame grid h-full gap-8 py-10 md:grid-cols-12 md:py-[clamp(1.5rem,4svh,3rem)]">
              {/* Text */}
              <div className="flex min-w-0 flex-col md:col-span-5 md:justify-center">
                <p className="label flex flex-wrap items-center gap-3">
                  <span className="bg-foreground px-1.5 py-0.5 text-background">
                    {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
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
                <h3 className="display mt-4 break-words text-[clamp(3rem,min(6.5vw,11svh),8.5rem)]">{project.title}</h3>
                <p className="mt-4 text-[length:var(--text-lead)] leading-snug md:text-[clamp(1rem,0.6rem+0.9svh,1.25rem)]">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologien">
                  {project.tags.map((tag) => (
                    <li key={tag} className="label border-2 border-border px-2 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 border-2 border-foreground bg-signal px-4 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] transition-[transform,box-shadow] duration-[90ms] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
                  >
                    Live ansehen ↗<span className="sr-only"> – {project.title} (neuer Tab)</span>
                  </a>
                  {study && (
                    <Link
                      href={`/projekte/${study.id}`}
                      className="inline-flex min-h-12 items-center gap-2 border-2 border-foreground px-4 font-mono text-sm font-bold uppercase tracking-[0.06em] hover:bg-foreground hover:text-background"
                    >
                      Case Study <span aria-hidden className="nudge">→</span>
                      <span className="sr-only"> {project.title}</span>
                    </Link>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center px-2 font-mono text-sm font-bold uppercase tracking-[0.06em] underline decoration-2 underline-offset-4 hover:bg-foreground hover:text-background"
                  >
                    Code<span className="sr-only"> von {project.title} auf GitHub</span>
                  </a>
                </div>
              </div>

              {/* Screenshot im Browser-Rahmen, klickt zur Live-Seite */}
              <div className="flex min-w-0 items-center md:col-span-7">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden
                  data-cursor="Live ↗"
                  className="block w-full border-2 border-border bg-background shadow-[10px_10px_0_0_var(--color-signal)] transition-[translate,box-shadow] duration-[90ms] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_0_var(--color-signal)]"
                >
                  <span className="flex items-center gap-3 border-b-2 border-border px-3 py-2">
                    <span className="flex gap-1.5">
                      <span className="size-3 border-2 border-border" />
                      <span className="size-3 border-2 border-border" />
                      <span className="size-3 bg-signal" />
                    </span>
                    <span className="label min-w-0 truncate">{host}</span>
                  </span>
                  <span className="block overflow-hidden">
                    <Image
                      src={img}
                      alt=""
                      width={1200}
                      height={750}
                      sizes="(min-width: 768px) 56vw, 92vw"
                      className="stack-img block aspect-[16/10] w-full object-cover object-top"
                    />
                  </span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
