# Plan — guelerdev.de Redesign (Phase 2 synthesis)

> Synthesized from six audits in `docs/audits/` + `discovery-brief.md`.
> Ranking: visitor impact × craft signal, weighted by the kickoff decisions
> (full cinematic, proof without testimonials, SEO first-class, Sie-form).

## The root-cause chain (why the site produces no inquiries)

1. **Nobody arrives**: 8 pages (incl. /leistungen and all case studies)
   canonicalize to the homepage; the configured domain may be wrong
   (guler.dev vs guelerdev.de); the money pages are internal-link orphans.
2. **Arrivals see a broken thesis**: the hero headline renders at body size
   (Tailwind extraction bug), LCP is delayed 3.4s by entrance animations,
   and the default light theme shows the muddy version of the only strong
   visual while failing AA contrast.
3. **No proof**: the portfolio never shows a pixel of real work; subpages
   collapse into the exact template lanes PRODUCT.md bans; /ueber advertises
   inexperience.
4. **No frictionless action**: no booking path, no analytics to even see
   drop-off, contact pipeline can't render its own server errors.

Every workstream below traces to one of these four.

## Creative direction: „Das Signal" (locked for execution)

The site already contains its own best idea, unexploited: SignalField, the
`signal:found` event, and the five-chapter narrative (Kapitel 01 Dein Problem
… 05 Dein Moment). The redesign commits to this as THE concept:

- **Signature element**: one persistent WebGL scene as the homepage scroll
  spine. The signal story mirrors the visitor's own story: customer-search
  noise (Ch1) → the signal takes shape (Ch2 Weg) → it crystallizes into real
  work — staged product frames (Ch3 Beweis) → order/process (Ch4) → the
  bright, calm "moment" with the booking CTA (Ch5). Scroll-driven uniforms,
  no autonomous splash that dies after the first viewport.
- **Theme**: DARK ("Void-Ink" #04040a) becomes the default — three audits
  independently point here (design: dark scene is the keeper; a11y: dark is
  AAA-clean while light fails AA; motion: light default hides the good
  variant). Light stays as a fully fixed, polished "Papier" alternative.
- **Palette**: interview said "fully open" — decision: evolve, don't replace.
  Cherenkov Violet + Ionization Cyan on void-ink is already distinctive
  (notably NOT one of the three AI-default looks) and now earns its keep as
  the physics of the signal metaphor. Deepen with spectral highlights;
  repair all light-mode token contrast.
- **Typography**: keep Bricolage Grotesque (display) + Hanken Grotesk — the
  pairing is characterful; discipline the scale, trim font axes to ≤80 kB.
  The chapter numbering stays: it encodes a true sequence (skill rule:
  structure must encode truth — this is the rare case where 01–05 is honest).
- **Proof language**: framed product shots (the BüroBrücke pattern,
  multiplied) staged in CSS/DOM frames; case studies become scroll stories
  with honest „Eigenprojekt/Showcase" labels. Honesty is the trust signal.
- **Mobile is not exempt from cinema**: a designed lightweight signal scene
  (cheap 2D canvas variant, capability-gated), not a cropped blur.
- **Page transitions**: signal-motif wipe (View Transitions API with
  AnimatePresence fallback) so route changes stop hard-cutting.

## Workstreams

### WS0 — Foundation: P0 fixes + purge (FIRST; everything depends on it)
1. Fix hero H1 clamp bug (`Hero.tsx:84` — space before `${`). P0.
2. Fix canonical bug: remove root-layout canonical; per-page self-canonicals.
3. Align domain: `.env.example`/env guidance → guelerdev.de everywhere.
4. Un-gate LCP: hero H1 paints immediately; animate from visible.
5. Delete 41 dead files + 9 dead deps (code-health list); fix whatsapp URL;
   `.impeccable/live/` gitignored.
6. Consolidate to ONE Reveal (`components/animation/Reveal.tsx`); port 8 call
   sites; **drop GSAP** (port SmoothScroll bridge to Lenis-only + framer
   `useScroll` for scene scrubbing) — keeps first-load within the 160 kB
   budget with framer as the single animation lib.
7. `useSceneEnabled()` shared hook: reduced-motion + device-class capability
   probe (deviceMemory/FPS sample), not width-only.
8. Radix per-package imports (badge.tsx + siblings) — kills /ueber bloat.

### WS1 — The cinematic spine (the centerpiece; largest workstream)
- Persistent canvas across the homepage chapters, scroll-driven state
  machine; adaptive quality loop (particle count ↓, DPR ≤1.5) with 30fps
  floor at 4× throttle; designed static fallbacks per chapter.
- Dark default + light-theme art direction fix for the crystal (bright env).
- Fill the dead scroll runways: the scene IS the content between sections.
- Mobile 2D-canvas signal variant.
- Hero recomposed: H1 as the thesis at display scale (the clamp bug fix makes
  room to actually design it), single CTA, „Websites, die Kunden bringen"
  restored as the claim.

### WS2 — Design-system unification (subpages join the concept)
- Kill the /leistungen gradient-blob template; rebuild all subpages in the
  chapter language (PageHero variants driven by the same token system).
- Real work on screen: staged product frames on home + /projekte; case
  studies → multi-scene scroll stories with honest labels; kill the "0" stat
  framing.
- /ueber: restage the portrait (real asset, better staging), REMOVE the
  3-entry timeline, replace checkmark-bullets with a working-principles
  treatment; reserve the new-portrait slot (owner action).
- One header CTA; fix stray ornament, /kontakt background seam, TechStrip
  affordance; hero-CTA hover brought up to FinalCta quality.

### WS3 — Content & copy (parallel with WS1)
- Sie-rewrite: ~170 edits/14 files incl. meta, OG, FAQ schema, form strings;
  Datenschutz Du/Sie needs owner sign-off (legal page).
- Proof cleanup: 0,9s + Lighthouse claims out/receipted; „Beliebt" badges
  out; 30–50% claim softened; „DSGVO konform" reworded; Eigenprojekt labels.
- Unify the two package systems into ONE (5-vs-6 fixed, tier names, delivery
  times everywhere, GA promise dropped, KI tier gets „Projekte ab X €" —
  owner to confirm X).
- Voice pass: banned words (professionell ×3, Premium ×8), jargon, emoji,
  Onepager spelling, unique per-page CTAs instead of the repeated band.
- SEO: internal-linking sprint (FAQ→Ratgeber, cases→/leistungen, home
  Ratgeber teaser); keyword-align money pages; case-study metadata +
  CreativeWork; Ratgeber og:image restored; llms.txt completeness; Hannover
  geo in JSON-LD. NEW: KI/Automatisierung landing page; „Website für
  Handwerker" page; „Was kostet ein Chatbot?" Ratgeber.

### WS4 — Conversion infrastructure
- Booking: Cal.com embed behind env config (`NEXT_PUBLIC_CAL_LINK`), DSGVO
  click-to-load like the map, graceful fallback to form. Owner supplies link.
- Analytics: privacy-first, cookieless (Plausible-compatible script slot via
  env; no consent burden). Owner supplies account or approves self-host.
- Contact pipeline: rate limiting on the server action, render server field
  errors in the client, German zod messages, honeypot mapping cleanup,
  sonner toasts wired (or sonner dropped).

### WS5 — Hardening (woven through, verified in Phase 4)
- A11y: light muted-2 + accent-as-text tokens, StoryPitch base /45,
  ChapterProgress focus labels, unique link names, heading order, ul lists.
- Perf: tree-shaken three imports, font axis trim, zod/rhf lazy-load,
  brotli (infra note), hydration-mismatch investigation (React #418).
- Budget gates from `audits/performance-audit.md` enforced per change.

## Execution order

WS0 → (WS1 ∥ WS3) → WS2 → WS4 → WS5 continuously + Phase 4 full verification.
Commit granularity: one logical change per commit, verified before commit.

## Decisions record
- Dark default; light retained and repaired. (3 audits convergent)
- GSAP dropped; framer-motion + Lenis is the single motion stack.
- `components/animation/Reveal.tsx` is the one Reveal.
- Palette evolves (violet/cyan/void kept as signal physics), not replaced.
- Chapter numbering kept (true sequence). Gradient-blob template dies.
- Cal.com + Plausible-style analytics behind env config (owner supplies).
- sonner: wire into form feedback (decision: keep).

## Owner actions (unchanged, none blocking)
Cal link · analytics account · portrait (slot reserved) · confirm Railway
`NEXT_PUBLIC_SITE_URL` · KI-tier price anchor · Datenschutz Sie-form ok?
