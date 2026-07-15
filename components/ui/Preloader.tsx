import * as React from "react";

/**
 * Preloader — kurzer, orchestrierter Load-Moment (Awwwards-Intro).
 *
 * Bewusst als SSR-Markup + winziges Inline-Script (kein React-State): So ist der
 * Balken schon im ersten Frame da (nicht erst nach der Hydration) und verschwindet
 * garantiert wieder — unabhängig davon, wie schnell das JS lädt.
 *
 * Das Inline-Script läuft direkt hinter dem Element:
 * - prefers-reduced-motion ODER bereits gesehen (Session) → sofort entfernen
 *   (vor dem Paint), kein Overlay, kein Delay.
 * - sonst: Wortmarke + Akzent-Hairline, dann harter Steps-Wipe nach oben,
 *   danach entfernt sich der Balken selbst; Session-Flag wird gesetzt.
 *
 * Theme-aware über CSS-Tokens (var(--color-ink)/(--color-foreground)).
 */
const INTRO_SCRIPT = `(function(){
  var p=document.getElementById('gd-preloader');
  if(!p)return;
  var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var seen=null;try{seen=sessionStorage.getItem('gd-intro')}catch(e){}
  if(reduce||seen){p.remove();return;}
  setTimeout(function(){p.classList.add('is-leaving')},720);
  setTimeout(function(){if(p&&p.remove)p.remove();try{sessionStorage.setItem('gd-intro','1')}catch(e){}},1120);
})();`;

export function Preloader() {
  return (
    <>
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
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
    </>
  );
}
