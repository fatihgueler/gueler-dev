"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal-System (alle Browser): Elemente mit [data-rv] werden beim Eintritt in
 * den Viewport per Klasse .is-in eingeblendet. Varianten über den Attributwert
 * (up | left | wipe | rise | stamp | line), Staffelung über [data-rv-stagger].
 *
 * Sicherheitsnetze:
 * - Versteckt wird erst, wenn html.anim-ready gesetzt ist (also JS läuft).
 *   Ohne JS bleibt alles sichtbar.
 * - Was beim Start schon im Viewport ist, bekommt sofort .is-in (kein Blinken).
 * - prefers-reduced-motion: CSS blendet die Zustände komplett aus.
 */
export function RevealObserver() {
  const pathname = usePathname();

  React.useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]:not(.is-in)"));

    // Staffel-Verzögerung je Gruppe
    els.forEach((el) => {
      const group = el.closest<HTMLElement>("[data-rv-stagger]");
      if (!group) return;
      const step = Number(group.dataset.rvStagger) || 80;
      const siblings = Array.from(group.querySelectorAll<HTMLElement>("[data-rv]"));
      const i = siblings.indexOf(el);
      el.style.setProperty("--rv-delay", `${Math.min(i, 8) * step}ms`);
    });

    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("is-in");
    });

    root.classList.add("anim-ready");

    // Per clip-path komplett ausgeblendete Elemente (wipe/rise) meldet der
    // IntersectionObserver nie als sichtbar – dort wird das Elternelement
    // beobachtet und schaltet seine Kinder frei.
    const targets = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      if (el.classList.contains("is-in")) return;
      const clipped = el.dataset.rv === "wipe" || el.dataset.rv === "rise";
      const target = clipped && el.parentElement ? el.parentElement : el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.get(entry.target)?.forEach((el) => el.classList.add("is-in"));
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    targets.forEach((_, target) => io.observe(target));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
