# Progress Log — guelerdev.de Redesign

> Running status. Newest entry first. Any session (human or agent) should be able
> to pick up cold from here. Companion docs: `discovery-brief.md` (why),
> `plan.md` (what, once Phase 2 completes).

## 2026-07-02 — Session 1

### Done
- Phase 1 COMPLETE: all six audits persisted in `docs/audits/` (copy-seo,
  code-health, performance, motion, design, a11y). Convergent verdicts:
  hero H1 renders at body size (Tailwind extraction bug), LCP gated by
  entrance animations, light default is the weak+non-AA theme, no visual
  proof of work anywhere, subpages are the banned template lane, canonical
  bug de-indexes 8 pages.
- Phase 2 COMPLETE: `docs/plan.md` — creative direction „Das Signal"
  (persistent WebGL scroll spine over the existing 5-chapter narrative,
  dark default, evolved violet/cyan), six workstreams WS0–WS5, decisions
  record (GSAP dropped, one Reveal, Cal.com/analytics behind env).
- Phase 1 Copy/SEO audit COMPLETE → `docs/audits/copy-seo-audit.md`. Two
  critical findings: (1) root-layout canonical bug de-indexes 8 pages,
  (2) domain conflict guler.dev vs guelerdev.de in env vs content. Full
  Du→Sie scope (~170 edits/14 files), proof-cleanup inventory, dual
  contradictory package systems found, missing KI landing page identified.
- Phase 1: other five audits (design, motion, perf, a11y, code health) were
  interrupted by a session limit at ~11:00 UTC with artifacts saved
  (screenshots, axe/keyboard JSON, Lighthouse output in scratchpad); all five
  resumed from transcript at 11:56 UTC and are running.
- Phase 0 kickoff interview completed (4 rounds). All answers + implications in
  `docs/discovery-brief.md`. Headline decisions: full cinematic 3D direction,
  radical rethink allowed, palette fully open, Sie-form rewrite, placeholder
  testimonials must be removed (legal), booking + analytics + lead-capture
  integrations wanted, near-zero traffic makes SEO a first-class workstream.
- (Pre-kickoff) Hero WebGL fix shipped: brand-colored particles + faceted gem
  core in `components/three/SignalField.tsx` (commit 560d8f2).

### Done (Phase 3 / WS0 — foundation)
- P0 fixes shipped & verified (commit c2d1d7e): hero H1 clamp class restored
  (renders at display scale, screenshot-verified both themes), LCP un-gated
  (words paint frame 1, transform-only entrance), per-page canonicals live on
  all routes (curl-verified), domain corrected to guelerdev.de.
- Dead-code purge (db9b6fa): 42 files, −4,387 lines, 9 deps removed; live
  wa.me URL fixed; testimonials/EASE_OUT_EXPO exports removed. Build+lint+tsc clean.
- Radix per-package imports (4fcb0d6): /ueber 252→179 kB First Load JS.
  Sheet/accordion/select/checkbox browser-verified working.
- Ops note: after any rebuild, kill the old next-server before `npm start` —
  a stale server on :3000 serves 400s for all static assets of the new build.

### Done (Phase 3 / WS0 remainder + WS3 + WS1)
- Motion consolidation (0f48b04): one Reveal system, GSAP dropped, LCP-safe
  WordReveal for subpage H1s. First-Load JS: /ueber 252→133 kB.
- WS3 COMPLETE (fa8e15a): full Sie-form, proof cleanup (§5 UWG), ONE
  canonical package source (paketeItems) with delivery times + KI price
  anchor (owner to confirm 3.000 €), voice pass, llms.txt/OG/geo SEO.
- WS1 COMPLETE (7fcc007): persistent „Das Signal" spine — five-chapter
  scroll choreography (orbit→dispersal→lattice→clusters→calm+crystal at
  CTA), adaptive quality via drawRange, DPR 1.5, useSceneEnabled() device
  gating, mobile 2D-canvas variant (0 kB three.js on phones), DARK default,
  light crystal env fixed, Sie chapter labels. All chapter positions
  screenshot-verified against the production build.

### Next (per docs/plan.md)
- WS2: subpages join the chapter design language (/leistungen template
  kill, product frames on home+projekte, /ueber restaging, one header CTA,
  page transitions).
- WS4: booking (Cal.com env), cookieless analytics slot, contact-pipeline
  hardening (rate limit, server errors rendered, German zod messages).
- WS5: a11y light-token fixes (muted-2 contrast, ChapterProgress focus
  labels, StoryPitch base /45), font axis trim, Phase 4 full verification.

### Blocked / owner input needed
- Cal.com (or similar) account + event link for the booking embed.
- Analytics account choice (Plausible/Umami) or approval to self-host.
- Portrait photo (slot will be designed first; direction to follow).
