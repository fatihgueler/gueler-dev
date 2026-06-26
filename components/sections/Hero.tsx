"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { hero } from "@/lib/content";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";

const WORD_STAGGER_SECONDS = 0.08;

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

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
        <HeroSceneLoader className="absolute inset-0" />
        <div
          className="bg-dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_45%,black,transparent)]"
          aria-hidden
        />
      </m.div>

      {/* Text-Layer (Parallax-Faktor 0.8) */}
      <m.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center"
        style={
          shouldReduceMotion ? undefined : { y: textY, opacity: textOpacity }
        }
      >
        <h1 className="font-display font-semibold leading-[1.02] tracking-tight text-foreground [text-wrap:balance]">
          {hero.lines.map((line, lineIndex) => {
            const isAccentLine = lineIndex === hero.lines.length - 1;
            return (
              <span
                key={line}
                className="block text-[clamp(2.75rem,9vw,6rem)]"
              >
                {line.split(" ").map((word) => {
                  const delay = wordIndex * WORD_STAGGER_SECONDS;
                  wordIndex += 1;
                  return (
                    <span
                      key={`${line}-${word}`}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <m.span
                        className={
                          isAccentLine
                            ? "text-gradient-teal inline-block"
                            : "inline-block"
                        }
                        initial={{ opacity: 0, y: 70 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay,
                        }}
                      >
                        {word}
                      </m.span>
                      {/* Leerzeichen hält den zusammengesetzten H1-Text für
                          Screenreader und SEO korrekt getrennt */}{" "}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        <m.p
          className="mx-auto mt-8 max-w-xl font-mono text-sm tracking-wide text-muted md:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
        >
          {hero.subtitle}
        </m.p>
      </m.div>

      {/* Scroll-Hinweis */}
      <m.a
        href="#prozess"
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
