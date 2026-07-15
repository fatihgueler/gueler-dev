import * as React from "react";

/**
 * Preloader — funktionaler Load-Moment mit echtem Fortschrittsbalken.
 *
 * HYDRATION-SICHER: Der Overlay-Knoten (#gd-preloader) wird NIE per JS mutiert.
 * Das Skript fasst ausschließlich das <html> an — die CSS-Variable
 * `--gd-progress` (Balkenfüllung) und die Klasse `intro-done` (Abschluss). Da
 * <html> `suppressHydrationWarning` trägt (wie bei next-themes), gibt es keinen
 * Mismatch. Der Balken liest den Fortschritt via CSS (`scaleX(var(--gd-progress))`).
 *
 * KANN NICHT HÄNGEN: Abschluss bei `window.load`, zusätzlich ein JS-Safety-Cap
 * (3,5 s) UND ein reiner CSS-Fallback-Wipe (4,5 s) — selbst wenn das Skript
 * komplett ausfällt, verschwindet das Overlay. prefers-reduced-motion: sofort
 * fertig, kein Overlay.
 *
 * Der Balken zeigt echten Ladefortschritt: startet bei ~8 %, „trickled" während
 * des Ladens Richtung 90 % und springt bei vollständigem Load auf 100 %.
 */
const INTRO_SCRIPT = `(function(){
  var root=document.documentElement;
  var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  if(reduce){root.classList.add('intro-done');return;}
  var p=0.08,done=false;
  function set(v){root.style.setProperty('--gd-progress',String(v));}
  set(p);
  function finish(){if(done)return;done=true;set(1);setTimeout(function(){root.classList.add('intro-done');},280);}
  (function tick(){if(done)return;p+=(0.9-p)*0.05;set(p<0.9?p:0.9);requestAnimationFrame(tick);})();
  if(document.readyState==='complete'){finish();}
  else{window.addEventListener('load',finish,{once:true});}
  setTimeout(finish,3500);
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
