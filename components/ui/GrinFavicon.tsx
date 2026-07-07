"use client";

import * as React from "react";

const GRIN_ICON = "/icon-grin.svg";

/**
 * Tab-Blur-Easter-Egg: verlässt der Besucher den Tab, grinst das Favicon
 * (güler — der/die lacht). Beim Zurückkommen ist alles wieder normal.
 */
export function GrinFavicon() {
  React.useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'),
    );
    if (links.length === 0) return;
    const originals = links.map((l) => l.href);

    const onVisibility = () => {
      const hidden = document.visibilityState === "hidden";
      links.forEach((l, i) => {
        l.href = hidden ? GRIN_ICON : originals[i];
      });
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      links.forEach((l, i) => (l.href = originals[i]));
    };
  }, []);

  return null;
}
