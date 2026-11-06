"use client";

import * as React from "react";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Gepinnter Horizontal-Scroll ab md: Der Pin-Container bekommt die Höhe
 * 100svh + Horizontalweg, die Leiste wird per transform verschoben.
 * Liefert Fortschritt (0…1) und ob gepinnt wird. Mobil: vertikaler
 * Fortschritt durch den Block. Ohne JS/reduzierte Bewegung: kein Pin.
 */
export function usePinnedHorizontal(
  pinRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLElement | null>,
) {
  const [progress, setProgress] = React.useState(1);
  const [pinned, setPinned] = React.useState(false);

  React.useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track || prefersReducedMotion()) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    let distance = 0;

    const update = () => {
      raf = 0;
      const r = pin.getBoundingClientRect();
      if (mq.matches) {
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
        setProgress(p);
      } else {
        const vh = window.innerHeight;
        setProgress(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.9))));
      }
    };
    const layout = () => {
      if (mq.matches) {
        distance = Math.max(0, track.scrollWidth - window.innerWidth);
        pin.style.height = `calc(100svh + ${distance}px)`;
        setPinned(true);
      } else {
        pin.style.height = "";
        track.style.transform = "";
        setPinned(false);
      }
      update();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
      if (raf) cancelAnimationFrame(raf);
      pin.style.height = "";
    };
  }, [pinRef, trackRef]);

  return { progress, pinned };
}
