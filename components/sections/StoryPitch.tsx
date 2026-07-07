"use client";

import * as React from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { storyPitch } from "@/lib/content";
import { cn } from "@/lib/utils";

type Word = { text: string; accent: boolean };

const WORDS: Word[] = storyPitch.segments.flatMap((segment) =>
  segment.text
    .split(" ")
    .filter(Boolean)
    .map((text) => ({ text, accent: Boolean(segment.accent) })),
);

function PitchWord({
  word,
  index,
  total,
  progress,
}: {
  word: Word;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  // Harter Stempel statt Fade: das Wort rastet in einem Frame ein,
  // sobald der Scroll-Fortschritt seine Schwelle passiert.
  const opacity = useTransform(
    progress,
    [start, Math.min(start + 0.002, 1)],
    [0, 1],
  );

  return (
    // Leerzeichen muss AUSSERHALB des inline-block stehen – innerhalb
    // würde es als trailing whitespace vom Browser entfernt.
    <>
      <span className="relative inline-block">
        {/* Graue Basis-Ebene */}
        <span className="text-foreground/15">{word.text}</span>
        {/* Gestempelte Ebene: Akzentwörter als invertierter Block */}
        <m.span
          className={cn(
            "absolute inset-0",
            word.accent
              ? "-mx-[0.06em] bg-violet px-[0.06em] text-white"
              : "text-foreground",
          )}
          style={{ opacity }}
          aria-hidden
        >
          {word.text}
        </m.span>
      </span>{" "}
    </>
  );
}

/**
 * Großes typografisches Statement zwischen zwei Sections:
 * Beim Durchscrollen färben sich die Wörter nacheinander von
 * grau zu weiß bzw. zur Akzentfarbe (scroll-linked Highlight).
 */
export function StoryPitch() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section
      id="chapter-1"
      ref={sectionRef}
      aria-label="Mein Anspruch"
      className="relative py-28 md:py-44"
    >
      {/* Kapitel-Label steht jetzt im HardCut-Balken direkt über der Sektion */}
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="font-display text-3xl font-semibold leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {shouldReduceMotion
            ? WORDS.map((word) => (
                <span
                  key={`${word.text}-static`}
                  className={cn(
                    "inline",
                    word.accent
                      ? "bg-violet px-[0.06em] text-white"
                      : "text-foreground",
                  )}
                >
                  {word.text}{" "}
                </span>
              ))
            : WORDS.map((word, i) => (
                <PitchWord
                  key={`${word.text}-${i}`}
                  word={word}
                  index={i}
                  total={WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
        </p>
      </div>
    </section>
  );
}
