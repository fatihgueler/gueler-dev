import * as React from "react";

/**
 * Preloader — kurzer, orchestrierter Load-Moment (Awwwards-Intro).
 *
 * WICHTIG (Hydration): Das Overlay-Element wird NIE per JS mutiert oder entfernt
 * — sonst bricht die Hydration (React erwartet den SSR-Knoten). Es blendet sich
 * REIN PER CSS aus (Animation mit `forwards`), also unabhängig von React/JS und
 * ohne jede Hänge-Gefahr, selbst wenn die Hydration scheitert.
 *
 * Das Skript läuft vor dem Overlay und toggelt nur eine Klasse am <html>
 * (`intro-seen`) — das <html> trägt `suppressHydrationWarning`, daher ist eine
 * Klassen-Mutation vor der Hydration sicher (gleiches Prinzip wie next-themes).
 * Es fasst den Overlay-Knoten selbst nicht an.
 *
 * - Wiederholter Besuch (Session): `intro-seen` → CSS blendet das Overlay aus.
 * - prefers-reduced-motion: CSS blendet das Overlay aus (kein Skript nötig).
 * Theme-aware über CSS-Tokens (var(--color-ink)/(--color-foreground)).
 */
const SKIP_SCRIPT = `(function(){try{
  if(sessionStorage.getItem('gd-intro')){document.documentElement.classList.add('intro-seen');}
  else{sessionStorage.setItem('gd-intro','1');}
}catch(e){}})();`;

export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <div
        id="gd-preloader"
        className="preloader"
        aria-hidden
        role="presentation"
      >
        <div className="preloader-inner">
          <span className="preloader-word">GÜLER.DEV</span>
          <span className="preloader-line" />
        </div>
      </div>
    </>
  );
}
