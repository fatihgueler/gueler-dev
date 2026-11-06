"use client";

import * as React from "react";

let isFirstMount = true;

/**
 * Seitenwechsel, weich: Der neue Inhalt blendet von unten ein, oben läuft
 * ein dünner Ladebalken in Signalgrün einmal durch. Erster Aufruf: nichts.
 * Reduzierte Bewegung: nur Überblenden, kein Versatz (CSS).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    setAnimate(true);
    const t = window.setTimeout(() => setAnimate(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {animate && <div className="route-bar" aria-hidden />}
      <div className={animate ? "page-enter" : undefined}>{children}</div>
    </>
  );
}
