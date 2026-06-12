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
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    // Leerzeichen muss AUSSERHALB des inline-block stehen – innerhalb
    // würde es als trailing whitespace vom Browser entfernt.
    <>
      <span className="relative inline-block">
        {/* Graue Basis-Ebene */}
        <span className="text-foreground/15">{word.text}</span>
        {/* Eingefärbte Ebene, scroll-linked */}
        <m.span
          className={cn(
            "absolute inset-0",
            word.accent ? "text-gradient-teal" : "text-foreground",
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
      ref={sectionRef}
      aria-label="Mein Anspruch"
      className="relative py-28 md:py-44"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="font-display text-3xl font-semibold leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {shouldReduceMotion
            ? WORDS.map((word) => (
                <span
                  key={`${word.text}-static`}
                  className={cn(
                    "inline",
                    word.accent ? "text-gradient-teal" : "text-foreground",
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
