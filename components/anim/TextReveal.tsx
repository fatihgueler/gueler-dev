"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "@/lib/motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** true = beim Hineinscrollen, false = direkt beim Mount (Hero). */
  onScroll?: boolean;
}

/**
 * Wort-für-Wort-Reveal: jedes Wort wischt aus seiner Zeile nach oben ins Bild.
 * Erzeugt den typischen „Editorial"-Headline-Effekt.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  onScroll = false,
}: TextRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.95,
          ease: "power4.out",
          stagger: 0.05,
          delay,
          scrollTrigger: onScroll
            ? { trigger: el, start: "top 85%", once: true }
            : undefined,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, onScroll]);

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block" style={{ willChange: "transform" }}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
