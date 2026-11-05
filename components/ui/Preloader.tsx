import * as React from "react";

/**
 * Preloader — funktionaler Load-Moment mit echtem Fortschrittsbalken.
 *
 * HYDRATION-SICHER: Der Overlay-Knoten (#gd-preloader) wird NIE per JS mutiert.
 * Das Skript fasst ausschließlich das <html> an —
 * die Klassen `intro-full` (Balken voll) und `intro-done` (Abschluss). Da
 * <html> `suppressHydrationWarning` trägt (wie bei next-themes), gibt es keinen
 * Mismatch. Der Balken animiert rein per CSS.
 *
 * KANN NICHT HÄNGEN: Abschluss bei `window.load`, zusätzlich ein JS-Safety-Cap
 * (3,5 s) UND ein reiner CSS-Fallback-Wipe (4,5 s) — selbst wenn das Skript
 * komplett ausfällt, verschwindet das Overlay. prefers-reduced-motion: sofort
 * fertig, kein Overlay.
 *
 * Der Balken „trickled" per reiner CSS-Animation Richtung 90 % und springt
 * beim Abschluss auf 100 %. Früher setzte ein rAF-Loop pro Frame eine
 * CSS-Variable am <html> — das erzwang bei jedem Frame eine Style-Neuberechnung
 * der ganzen Seite (Lighthouse: ~2,5 s „Style & Layout"). Jetzt fasst das Skript
 * <html> nur noch zweimal an (Klassen), und das Overlay steht höchstens 1,2 s.
 */
const INTRO_SCRIPT = `(function(){
  var root=document.documentElement;
  var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  if(reduce){root.classList.add('intro-done');return;}
  var done=false;
  function finish(){if(done)return;done=true;root.classList.add('intro-full');setTimeout(function(){root.classList.add('intro-done');},200);}
  if(document.readyState==='complete'){finish();}
  else{window.addEventListener('load',finish,{once:true});}
  setTimeout(finish,1200);
})();`;

export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <div
        id="gd-preloader"
        className="preloader"
        aria-hidden
        role="presentation"
      >
        <div className="preloader-inner">
          <span className="preloader-word">GÜLER.DEV</span>
          <span className="preloader-track">
            <span className="preloader-line" />
          </span>
        </div>
      </div>
    </>
  );
}
