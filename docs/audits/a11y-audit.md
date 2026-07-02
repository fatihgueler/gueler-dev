# Audit: Accessibility (Phase 1) — 2026-07-02

> Source: a11y audit agent (axe-core on 6 routes × 2 themes, live keyboard
> walkthrough with screenshots, live invalid-form test; ARIA-tree dump was
> code-verified after a server recycle).

## Headline: dark mode is AAA-clean; LIGHT MODE (the default) breaks AA systematically

| Pair | Ratio | Verdict |
|---|---|---|
| Dark muted #94a3b8 / #04040a | 7.98:1 | AA + AAA ✓ |
| Dark muted-2, violet-3, cyan-2 as text | 6.02–11.32 | AA ✓ |
| Light muted #5a5a6e / #fafaf8 | 6.44:1 | AA ✓ |
| **Light muted-2 #8a8a9a** (footer legal, ©, h3s, hints) | **3.25–3.40** | **FAIL** |
| **Light violet-3 #a78bfa as text** (Kapitel eyebrows, links) | **2.60** | **FAIL** |
| **Light cyan-2 #22d3ee on white** (/projekte labels) | **1.81** | **FAIL** |
| **Light cyan-300 eyebrow on /ueber** | **1.21** | **FAIL (invisible)** |
| StoryPitch base layer fg/15 (both themes) | 1.40 | FAIL until scrolled through |

## Verified TRUE (keyboard/semantics — with evidence)
- Skip link: first stop, visible, functional.
- Focus order logical; focus ring visible both themes (ring 4.83:1 dark / 4.05:1 light — passes 3:1).
- Mobile nav: focus trap TRUE, Escape closes, focus restored to trigger.
- Contact form: 100% keyboard-operable; invalid submit produces 4 role="alert"
  messages, aria-invalid + aria-describedby, focus moves to first invalid field.
- One h1 per route, real SSR text; WebGL canvas properly aria-hidden with the
  message in HTML; landmarks correct and labeled.
- Reduced motion: five independent correct layers (CSS kill-switch, Lenis/GSAP
  skip, MotionConfig user, scene gate + static fallback, StoryPitch static
  branch) + scripting:none fallback.

## Issues
- **ChapterProgress rail: 5 keyboard stops on invisible 6px dots** — labels are
  opacity-0 revealed only on hover, NOT focus (`ChapterProgress.tsx:105–108`).
  Mystery stops before the primary CTA.
- Repeated identical link names "Live ansehen"/"Code" with different
  destinations (2.4.4) — needs per-project aria-labels.
- Heading skips: h1→h3 on /projekte (`CaseStudiesGrid.tsx:43`); /kontakt has
  no h2 before footer h3s (demote footer h3s to styled p).
- `aria-label` on plain divs ×4 (`ProjectHighlight.tsx:84`) — move to ul.
- /kontakt Datenschutz link: color-only distinction + 2.43:1 in light.

## README claims: TRUE/FALSE
Skip-Link TRUE · Fokus-Ring TRUE (ChapterProgress gap) · Focus-Trap TRUE ·
Reduced-motion TRUE · Consent role=region TRUE · "Kontraste AA getrimmt"
**HALF-FALSE** (dark yes/AAA, light fails on muted-2 + accents + StoryPitch base).

## Top 5 fixes (ranked)
1. Light `--color-muted-2` → ≥4.5:1 (e.g. #5a5a6e) in `globals.css:121` block.
2. Light-mode text-accent overrides (cyan→#0e7490, violet-3→#7c3aed for text),
   as already done for `.signal-line`.
3. StoryPitch base `text-foreground/15` → ≥/45 (readable mid-scroll).
4. ChapterProgress labels on `group-focus-visible`.
5. Unique link names; heading-order fixes; ul for tech lists.
