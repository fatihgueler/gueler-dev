import Link from "next/link";

import { nav } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b-2 border-border">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div className="frame relative grid min-h-[80svh] gap-10 py-12 md:grid-cols-12">
        {/* 404 riesig, unten angeschnitten */}
        <p
          aria-label="404"
          className="display select-none overflow-hidden text-[clamp(9rem,42vw,34rem)] leading-[0.78] md:col-span-12"
          style={{ height: "0.7em" }}
        >
          4<span className="text-signal-text">0</span>4
        </p>
        <div className="md:col-span-5">
          <h1 className="display text-[clamp(2.5rem,1.5rem+4vw,5rem)]">Seite nicht gefunden</h1>
          <p className="mt-6 max-w-md text-lg">
            Diese Seite existiert nicht (mehr). Vielleicht findest du auf der
            Startseite, was du suchst.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-14 items-center gap-3 border-2 border-foreground bg-signal px-6 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
          >
            ← Zur Startseite
          </Link>
        </div>
        <nav aria-label="Weitere Seiten" className="md:col-span-6 md:col-start-7">
          <p className="label">Index</p>
          <ol className="mt-4 border-t-2 border-border">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="row-invert flex items-baseline gap-4 border-b-2 border-border px-1 py-3">
                  <span className="label w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[2rem]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
