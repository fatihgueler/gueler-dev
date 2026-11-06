"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

let isFirstMount = true;

/**
 * Seitenwechsel: eine Signal-Fläche mit dem Zielpfad deckt kurz ab und wird
 * in sechs harten Stufen weggeschnitten. Erster Seitenaufruf: nichts.
 * Reduced-Motion: per CSS ausgeblendet.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {show && (
        <div className="route-wipe" aria-hidden>
          <span className="label text-base">→ {pathname === "/" ? "/start" : pathname}</span>
        </div>
      )}
      {children}
    </>
  );
}
