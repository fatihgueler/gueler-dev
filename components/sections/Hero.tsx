"use client";

import * as React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { hero } from "@/lib/content";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";

const WORD_STAGGER_SECONDS = 0.08;

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Die Headline reagiert auf den "Fund" der Signal-Szene: rastet der
  // Such-Strahl auf dem Signal ein, glüht die Akzentzeile auf.
  const [found, setFound] = React.useState(false);
  React.useEffect(() => {
    const onFound = () => setFound(true);
    const onLost = () => setFound(false);
    window.addEventListener("signal:found", onFound);
    window.addEventListener("signal:lost", onLost);
    return () => {
      window.removeEventListener("signal:found", onFound);
      window.removeEventListener("signal:lost", onLost);
    };
  }, []);

  // Echtes Parallax: Hintergrund-Layer läuft mit Faktor ~0.3,
  // Text-Layer mit Faktor ~0.8 aus dem Viewport (deutlich >100px Versatz).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Wörter der H1 für den Wort-für-Wort-Stagger flach durchnummerieren
  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Hintergrund-Layer: 3D-Szene + Dot-Grid (Parallax-Faktor 0.3) */}
      <m.div
        className="pointer-events-none absolute inset-0"
        style={shouldReduceMotion ? undefined : { y: backgroundY }}
        aria-hidden
      >
        <HeroSceneLoader className="hero-scene absolute inset-0" />
        <div
          className="bg-dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_45%,black,transparent)]"
          aria-hidden
        />
      </m.div>

      {/* Text-Layer (Parallax-Faktor 0.8) */}
      <m.div
        className="relative z-10 mx-auto flex w-full max-w-7xl px-6"
        style={
          shouldReduceMotion ? undefined : { y: textY, opacity: textOpacity }
        }
      >
        {/* Asymmetrischer Editorial-Split: Text in der linken Spalte, der
            Partikel-Kern sitzt rechts (Welt-x≈1.8). Text bleibt garantiert lesbar. */}
        <div className="relative w-full text-center md:w-[54%] md:text-left">
          {/* Theme-aware Lesbarkeits-Scrim, links verankert, nach rechts auslaufend. */}
          <div
            aria-hidden
            className="hero-scrim-split pointer-events-none absolute -left-[20%] top-1/2 -z-10 h-[170%] w-[150%] -translate-y-1/2"
          />
          <h1 className="font-display font-semibold leading-[1.02] tracking-tight text-foreground [text-wrap:balance]">
          {hero.lines.map((line, lineIndex) => {
            const isAccentLine = lineIndex === hero.lines.length - 1;
            return (
              <span
                key={line}
                data-found={isAccentLine && found ? "true" : undefined}
                // Größenklasse NIE per Template-Literal direkt an `${` kleben:
                // `]${` zerstört Tailwinds Klassen-Extraktion und die Klasse
                // fehlt im Build-CSS (H1 rendert dann in Body-Größe).
                className={
                  "block text-[clamp(2.5rem,7vw,5.5rem)]" +
                  (isAccentLine ? " signal-line" : "")
                }
              >
                {line.split(" ").map((word, i) => {
                  const delay = wordIndex * WORD_STAGGER_SECONDS;
                  wordIndex += 1;
                  return (
                    // LCP-Vertrag: Die H1 ist das LCP-Element und muss ab dem
                    // ersten Frame gemalt sein. Wörter starten sichtbar
                    // (Opacity 1) mit reinem Transform-Versatz – keine
                    // Opacity-0-Maske, die den LCP um Sekunden verschiebt.
                    <React.Fragment key={`${lineIndex}-${i}`}>
                      <m.span
                        className="inline-block"
                        initial={shouldReduceMotion ? false : { y: "0.55em" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay,
                        }}
                      >
                        {word}
                      </m.span>{" "}
                    </React.Fragment>
                  );
                })}
              </span>
            );
          })}
        </h1>

        <m.p
          className="mx-auto mt-8 max-w-xl font-mono text-sm tracking-wide text-muted md:mx-0 md:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
        >
          {hero.subtitle}
        </m.p>

        <m.a
          href={hero.cta.href}
          className="group mt-10 inline-flex items-center gap-3 border border-violet-3 bg-violet px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-violet-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
        >
          {hero.cta.label}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </m.a>
        </div>
      </m.div>

      {/* Scroll-Hinweis */}
      <m.a
        href="#chapter-1"
        aria-label="Nach unten scrollen"
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-mono text-xs">
          {hero.scrollHint}
        </span>
        <m.span
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </m.span>
      </m.a>
    </section>
  );
}
