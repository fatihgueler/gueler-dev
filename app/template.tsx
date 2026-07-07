"use client";

import * as React from "react";

let isFirstMount = true;

/**
 * Harter Seitenwechsel: bei jeder Navigation legt sich für einen Moment
 * ein invertierter Balken über die Seite und wischt in Stufen weg —
 * dieselbe Schnitt-Sprache wie die HardCut-Kapitelwechsel.
 * Beim allerersten Laden (und bei Reduced-Motion via CSS) passiert nichts.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [wipe, setWipe] = React.useState(false);

  React.useEffect(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    setWipe(true);
    const t = window.setTimeout(() => setWipe(false), 500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {wipe && <div className="route-wipe" aria-hidden />}
      {children}
    </>
  );
}
