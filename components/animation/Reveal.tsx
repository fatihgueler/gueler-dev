"use client";

import * as React from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Wiederverwendbares Scroll-Reveal-System (Framer Motion, whileInView).
 *
 * - <Reveal variant="fadeUp|fadeIn|scaleIn"> für einzelne Blöcke
 * - <RevealGroup> + <RevealItem> für gestaffelte Listen/Grids
 * - <WordReveal> für Headlines mit Wort-für-Wort-Stagger (0.08s/Wort)
 *
 * Reduced Motion wird global über MotionConfig reducedMotion="user"
 * (MotionProvider) respektiert.
 */

export type RevealVariant = "fadeUp" | "fadeIn" | "scaleIn";

const VIEWPORT = { once: true, margin: "-100px" } as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const WORD_STAGGER_SECONDS = 0.08;

const VARIANTS: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut", delay },
    }),
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
    }),
  },
};

type RevealProps = {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
};

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={VARIANTS[variant]}
      custom={delay}
    >
      {children}
    </m.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Abstand zwischen den Kind-Animationen in Sekunden. */
  stagger?: number;
};

/** Container, der seine <RevealItem>-Kinder gestaffelt einblendet. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  variant = "fadeUp",
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div className={className} variants={VARIANTS[variant]}>
      {children}
    </m.div>
  );
}

type WordRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Zusätzliche Start-Verzögerung in Sekunden. */
  delay?: number;
};

/**
 * Headline, deren Wörter einzeln (0.08s Versatz) nach oben einblenden.
 *
 * Der zugängliche Name kommt aus `aria-label` am Heading-Element – die
 * sichtbaren Wort-Spans sind `aria-hidden`. Dadurch steht der Text als
 * DOM-Textinhalt GENAU EINMAL da (keine zusätzliche sr-only-Kopie), was
 * doppelten Vorlesetext und doppelten Crawl-Text verhindert.
 */
export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  if (shouldReduceMotion) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }
  return (
    <Tag className={cn(className)} aria-label={text}>
      <m.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: WORD_STAGGER_SECONDS,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <m.span
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "100%" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                },
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
