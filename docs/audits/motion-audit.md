# Audit: Motion & Interaction (Phase 1) — 2026-07-02

> Source: motion audit agent (code pass + browser verification, 26 screenshots
> reviewed). FPS measured on SwiftShader software WebGL — treat as floor.

## CRITICAL BUG — hero H1 renders at body size

`components/sections/Hero.tsx:84` builds the className in a template literal:
`` `block text-[clamp(2.5rem,7vw,5.5rem)]${isAccentLine ? " signal-line" : ""}` ``
The `]${` adjacency defeats Tailwind's class extractor → the clamp class is
NOT in the built CSS (verified against built stylesheet; PageHero's clamp IS
present). The H1 renders smaller than its own subtitle. Every screenshot in
every theme confirms it. Fix: space before `${` or move the size class out of
the literal. **P0 — nothing else about the hero matters until this lands.**

## Second major finding — the default first impression never shows the good scene

`ThemeProvider.tsx:27` defaults to LIGHT. In light theme the "glass crystal"
reads as a matte dark sphere (env-map is a dark violet→ink gradient → muddy
planet on paper-white). The spectacular dark variant (additive bloom, void)
is only seen by visitors who manually toggle. Either art-direct the
light-theme crystal (bright env, visible iridescence) or default to dark.

## Motion inventory verdict

Global architecture is sound: LazyMotion domMax + `reducedMotion="user"`,
Lenis+ScrollTrigger bridge RM-gated, global CSS RM kill-switch + no-JS guard.
Nearly every element has a correct reduced-motion path. RM browser pass:
CLEAN — no canvas, static aura fallback, zero elements stuck below opacity
0.05 at any scroll depth.

Notable per-element:
- `SignalField.tsx` — brand centerpiece; correct gating, IO+visibility pause, dispose. OK.
- `StoryPitch` scroll scrub, `StickyStory` 320vh pin, whileInView reveals — all fire correctly, static fallbacks exist.
- `anim/DrawnAccent.tsx:19–22` — MINOR: pathLength self-draw not disabled under RM.
- `ParticleField.tsx` (/projekte) — no IO pause (renders forever off-screen), resize-only gate. Fix when touched.
- Hover polish uneven: FinalCta offset-shadow is the best state on the site; hero CTA is a plain color swap; TiltCard ±5° invisible; TechStrip drag undiscoverable.
- Consent banner overlays lower-center on every viewport until dismissed (covers mobile chapter bar).

## Dead code (agrees with code-health audit)
OrbScene+OrbLoader (OrbLoader references a `.orb-fallback` class that doesn't
exist in globals.css), sections/HeroScene+HeroSceneLoader (gold palette),
anim/{MotionReveal,ParallaxText,Counter,TiltCard}, sections/{CaseStudies,
Packages,Projects,Services,TechMarquee}, components/home/*, plus unused
`@keyframes marquee` in globals.css (:176,:538). Four parallel Reveal
implementations across three runtimes → keep `components/animation/Reveal.tsx`.

## Performance signal
- Full-page auto-scroll: 48 fps avg on SOFTWARE rendering (real GPUs will hold 60). No reveal/Lenis jank.
- Console: 1× React error #418 (hydration mismatch on <html>) in RM context —
  likely next-themes racing suppressHydrationWarning; investigate. 2× unattributed
  net::ERR_CONNECTION_CLOSED; recheck with request logging.
- Device gating is width-only (768px): a weak old desktop gets 65k particles,
  DPR 1.75, MeshPhysicalMaterial. No capability probe. Contradicts the
  degrade-by-device-class thesis.

## Upgrades needed for cinematic tier (ranked)
1. Fix the hero H1 class bug (P0).
2. **Make the WebGL scene the scroll spine, not a splash** — one persistent
   canvas driven by a ScrollTrigger timeline across the existing 5-chapter
   architecture (particles disperse into StoryPitch, re-order for "Dein Weg",
   crystal returns at "Dein Moment"). This is the decoration→storytelling gap.
3. Page transitions (View Transitions API or AnimatePresence) + shared-element
   continuity from project card → project page. Route changes hard-cut today.
4. Consolidate to one motion system; delete ~2,500 dead lines (bundle headroom for #2).
5. Real device-class gating (capability probe, dynamic particle count/DPR,
   FPS sampling) + a designed mobile scene (cheap 2D-canvas/CSS signal morph)
   — most KMU owners arrive on phones and currently get a flat gradient.
