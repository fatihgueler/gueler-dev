# Audit: Performance (Phase 1) — 2026-07-02

> Source: performance audit agent (Lighthouse 13.4 + Playwright CDP, production
> build). Caveat: headless WebGL ran on SwiftShader (software raster) — WebGL
> absolutes are pessimistic; relative findings and non-WebGL metrics solid.
> Raw JSON in session scratchpad `lh/`.

## Scores (target ≥95 everywhere — no route meets it)

| Route | Preset | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 71 | 96 | 96 | 100 | 1.1s | **4.5s** | 530ms | 0 |
| / | desktop | 58 | 96 | 96 | 100 | 0.3s | 1.5s | **33.6s** | 0 |
| /ueber | mobile | 66 | 96 | 100 | 100 | 1.1s | 4.4s | 660ms | 0 |
| /projekte | mobile | 78 | 95 | 100 | 100 | 1.1s | 3.2s | 600ms | 0 |
| /kontakt | mobile | 89 | 95 | 100 | 100 | 0.9s | 3.5s | 160ms | 0 |

**#1 finding:** FCP ~1s but LCP 3.2–4.5s with CLS 0 and no images in trace —
the hero headline exists in HTML but paints late because entrance animations
start it invisible (Hero.tsx word-stagger, TextReveal, PageHero). One pattern
kills the mobile score on every route. Desktop TBT 33.6s = WebGL rAF loop on
SwiftShader (inflated, but a real main-thread signal).

TTFB 5–10ms; gzip on (no brotli); cold home transfer 503 kB mobile / 788 kB
desktop; images correctly AVIF/WebP via next/image; CLS perfect everywhere.
A11y misses: only `color-contrast` (all routes) + `heading-order`
(/kontakt, /projekte).

## Bundle breakdown (raw→gzip)

| Chunk | Size | Contents | Where |
|---|---|---|---|
| bd904a5c | 382→97 kB | three.js core half | lazy, desktop home |
| b536a0f1 | 359→84 kB | three.js renderer half | lazy, desktop home |
| framework | 182→56 kB | React | all |
| 255 | 174→45 kB | Next runtime | all |
| 4bd1b696 | 173→52 kB | react-dom | all |
| 847 | 156→41 kB | **radix-ui monolith (unused parts)** | /ueber + prefetched |
| 280 | 136→39 kB | framer-motion + lenis + sonner | all (layout) |
| 622 | 89→23 kB | zod + react-hook-form | /, /kontakt |
| 674+c15bf | 112→45 kB | gsap + ScrollTrigger | all (layout) |

- three.js correctly route-split & gated (good pattern — keep), but
  `await import("three")` namespace imports kill tree-shaking → 181 kB gz.
- BOTH animation systems ship on every page (~84 kB gz combined).
- /ueber bloat root cause: `components/ui/badge.tsx:3` imports from the
  `radix-ui` monolith instead of `@radix-ui/react-slot` → drags 152 kB unused.
- WebGL: raster-bound not CPU-bound (8.1 fps → 6.0 at 4x throttle on
  SwiftShader); 32–65k particles, no adaptive quality loop, DPR cap 1.75.

## Top 10 optimizations (ranked)

1. **Un-gate LCP from entrance animations** — SSR-paint the hero H1, animate
   from visible (transform/opacity or clip-reveal). Est. LCP 4.5→~1.5s,
   mobile perf 71→90+ everywhere. The single biggest lever.
2. Per-package radix imports (badge.tsx + siblings) — saves 41 kB gz on /ueber.
3. ONE animation library; merge the three Reveals — saves 39–45 kB gz per page.
4. Tree-shake three.js (named imports, statically analyzable) — ~90–110 kB gz saved.
5. Adaptive quality loop for particles (start 16k, scale up if frame <8ms;
   DPR ≤1.5; pause off-screen/hidden).
6. Trim fonts (149 kB → ≤80 kB; Bricolage opsz axis alone is 75 kB; subset/drop JetBrains Mono axes).
7. Fix a11y color-contrast + heading-order (the only two audits below 100).
8. Lazy-load zod+react-hook-form (23 kB gz) off home's initial JS.
9. Brotli for static chunks (~15–20% transfer cut).
10. Delete dead deps + unused ui/* (see code-health audit); fix home-desktop console error.

## Performance budget for the cinematic redesign

- Max first-load JS per route: **160 kB gz mobile** (current 212–252). One
  animation lib only (≤25 kB gz — gsap core+ScrollTrigger fits) + lenis.
- 3D contract: three.js + scenes load only AFTER LCP, on intersection
  approach. Tree-shaken budget ≤120 kB gz desktop tier / ≤90 kB mid-tier /
  **0 kB on reduced-motion, data-saver, or low-end**. Never in first-load manifest.
- LCP ≤2.0s on 4x-throttled mobile; LCP element paints in first frame — no
  entrance animation may delay it; LCP image (if any) ≤100 kB.
- TBT ≤200ms mobile; scene init sliced into <50ms tasks.
- FPS: 60 target, hard floor 30 at 4x CPU throttle, enforced by adaptive loop
  (particle count ↓, DPR ≤1.5, bloom off), designed static fallback as tier 0.
- Fonts ≤80 kB, max 2 families. Cold transfer ≤450 kB mobile / ≤700 kB desktop. CLS 0.
