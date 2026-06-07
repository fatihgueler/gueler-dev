"use client";

import * as React from "react";

/** Dünne Fortschritts-Linie am oberen Rand (skaliert mit dem Scroll-Stand). */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let raf = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? scrollTop / height : 0;
      bar.style.transform = `scaleX(${progress})`;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden
    />
  );
}
