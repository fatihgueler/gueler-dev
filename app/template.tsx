"use client";

import * as React from "react";

let isFirstMount = true;

/**
 * Seitenwechsel-Übergang: bei jeder Client-Navigation legt sich der Ladebalken-
 * Look über die Seite (Wortmarke + Akzent-Balken, der einmal durchläuft) und
 * wischt dann in Stufen weg — dieselbe Sprache wie der Initial-Preloader.
 *
 * Läuft komplett nach der Hydration (Client-Navigation), daher React-gesteuert
 * unkritisch. Beim allerersten Laden übernimmt der Initial-Preloader; hier wird
 * der erste Mount übersprungen. Reduced-Motion blendet das Overlay per CSS aus.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = React.useState<"idle" | "in" | "leaving">("idle");

  React.useEffect(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    setPhase("in");
    const t1 = window.setTimeout(() => setPhase("leaving"), 480);
    const t2 = window.setTimeout(() => setPhase("idle"), 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {phase !== "idle" && (
        <div
          className={"route-loader" + (phase === "leaving" ? " is-leaving" : "")}
          aria-hidden
          role="presentation"
        >
          <div className="rl-inner">
            <span className="rl-word">GÜLER.DEV</span>
            <span className="rl-track">
              <span className="rl-line" />
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
