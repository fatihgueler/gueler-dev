"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Zahl, die hochzählt, sobald sie in den Viewport kommt. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    let raf = 0;
    let startTs = 0;
    let started = false;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${prefix}${Math.round(eased * to)}${suffix}`;
      if (progress < 1) raf = window.requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          raf = window.requestAnimationFrame(animate);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
