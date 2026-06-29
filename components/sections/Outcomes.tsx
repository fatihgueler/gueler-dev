import { outcomes } from "@/lib/content";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Kapitel 04 — "Dein Erfolg" / Transformation.
 *
 * Ehrliche Outcome-Projektion (was sich für DICH ändert) als eckig-editoriales
 * 2-Spalten-Raster mit Haarlinien-Trennern. Ersetzt die früheren, erfundenen
 * Testimonials – kein fremder Social Proof, nur belegbare Fähigkeiten.
 */
export function Outcomes() {
  return (
    <section id="chapter-4" className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 md:mb-20">
          <Reveal variant="fadeIn">
            <p
              className="mb-3 font-mono text-[0.65rem] tracking-[0.3em] text-violet-3"
              style={{ textTransform: "uppercase" }}
            >
              Kapitel 04 — Dein Erfolg
            </p>
            <p
              className="mb-6 font-mono text-xs tracking-[0.3em] text-muted"
              style={{ textTransform: "uppercase" }}
            >
              {outcomes.eyebrow}
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05}>
            <h2
              className="font-display font-black tracking-tighter text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: "16ch",
              }}
            >
              {outcomes.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {outcomes.items.map((item, i) => (
            <Reveal
              key={item.title}
              variant="fadeUp"
              delay={i * 0.06}
              className="flex h-full flex-col gap-3 bg-background p-8 md:p-10"
            >
              <span className="font-mono text-xs text-violet-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
