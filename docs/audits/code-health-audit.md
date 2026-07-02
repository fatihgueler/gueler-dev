# Audit: Code Health (Phase 1) — 2026-07-02

> Source: code health audit agent (import graph over app/, components/, lib/;
> tsc; next lint; npm outdated). Verified at commit 9bc6284.

## Dead code — SAFE TO DELETE IMMEDIATELY (zero importers, verified incl. dynamic imports)

**Dead three.js chains:**
- `components/three/OrbLoader.tsx` + `components/three/OrbScene.tsx` (only importer is the loader)
- `components/sections/HeroSceneLoader.tsx` + `components/sections/HeroScene.tsx` (previous-generation GOLD-palette scene)
- Live hero chain for reference: `app/page.tsx` → `sections/Hero.tsx` → `components/three/HeroSceneLoader.tsx` → `components/three/HeroScene.tsx` (wrapper) → `components/three/SignalField.tsx`. `three/ParticleField.tsx`+`ParticleLoader.tsx` are ALIVE (projekte page).

**Entire dead dir:** `components/home/` (BurobuckeFeature, ProjectsTeaser, ServicesTeaser, WhatsappCta).

**Superseded sections (0 importers):** `sections/CaseStudies.tsx` (→CaseStudiesGrid), `sections/Packages.tsx` (→Pakete), `sections/Projects.tsx` (→ProjectsFilter), `sections/Services.tsx` (→StickyStory/ServiceCards3D), `sections/TechMarquee.tsx` (→TechStrip).

**Dead anim/ members:** `Counter.tsx`, `MotionReveal.tsx`, `ParallaxText.tsx`, `TiltCard.tsx` (ui/TiltCard.tsx is the live one). Alive: `Reveal.tsx`, `TextReveal.tsx`, `DrawnAccent.tsx`.

**25 unused shadcn ui files:** aspect-ratio, avatar, breadcrumb, card, collapsible, context-menu, dialog, drawer, dropdown-menu, hover-card, input-otp, menubar, navigation-menu, popover, progress, radio-group, resizable, scroll-area, skeleton, slider, switch, table, tabs, toggle, tooltip.

**Dead lib exports:** `lib/content.ts:684` testimonials (empty), `lib/motion.ts:6` EASE_OUT_EXPO.

**Droppable deps:** @splinetool/runtime, recharts, date-fns, embla-carousel-react, cmdk, react-day-picker; after ui deletions also input-otp, vaul, react-resizable-panels. Move @types/three to devDependencies.

Total: 41 files.

## Duplication

1. GLSL simplex noise byte-identical in OrbScene + SignalField (resolved by deleting OrbScene).
2. **THREE live Reveal implementations, three engines**: `components/Reveal.tsx` (CSS+IO; 3 importers), `components/anim/Reveal.tsx` (GSAP ScrollTrigger; 5 importers), `components/animation/Reveal.tsx` (framer-motion; 12 importers — the modern one). Standardize on animation/Reveal.tsx, port 8 call sites.
3. Name collisions: HeroScene ×2, HeroSceneLoader ×2, TiltCard ×2 (dead vs live).
4. **Scene gating logic hand-rolled 4×** (desktop+reduced-motion matchMedia in every loader) → one `useSceneEnabled()` hook; critical for the degrade-by-device-class thesis.
5. anim/ vs animation/ dirs = GSAP era vs framer era; merge.
6. Ratgeber boilerplate: 4 pages hand-roll identical JSON-LD (877 lines) → shared helper.
7. ~13 sections hand-roll eyebrow markup despite `components/Section.tsx` exporting Eyebrow/SectionHeading.

## Type safety: GREEN
strict on, tsc 0 errors, lint clean, zero `any`. Minor: `content.ts:500,518,535` `badge: undefined as string | undefined` → declare a Paket type.

## Dependency decisions
- **gsap**: used in only 3 files (SmoothScroll Lenis↔ScrollTrigger bridge, anim/Reveal, anim/TextReveal). DECIDE: adopt ScrollTrigger as the cinematic scroll spine, or port 3 files and drop ~70KB. → Decide in Phase 2.
- **framer-motion**: KEEP; LazyMotion(domMax,strict) correctly set up; all consumers use `m`.
- **lenis** KEEP (core to cinematic direction). **three** KEEP (well code-split).
- radix-ui + @radix-ui/react-slot both installed — consolidate.
- sonner: Toaster mounted, zero toast() calls — wire into contact form feedback or drop.
- Outdated majors (batch after purge): zod 3→4 + resolvers 5 together, resend 4→6, framer-motion 11→12 (motion rebrand), next 15.5→16, tailwind-merge 2→3.

## Top 5 architecture risks for the redesign
1. Three parallel animation systems / three same-named Reveals — consolidate BEFORE building.
2. Two coexisting component generations with name collisions — delete dead generation FIRST.
3. Content ~90% centralized; stragglers will sabotage the Sie-rewrite: hardcoded OG copy in `app/layout.tsx:67–75`, all ContactForm labels/placeholders, 4 Ratgeber article bodies.
4. **Contact pipeline under-built** for the "first real inquiry" goal: no rate limiting on `app/actions.ts` (spam → Resend quota burn), server field errors computed (:29–36) but never rendered by client (ContactForm.tsx:65–70), server zod messages are English defaults, honeypot mapping confusing (`_trap`→company vs firmName). Also `site.calendly` in content vs Cal.com decision.
5. No shared perf infrastructure: no IO-on-approach scene init (scenes mount as soon as gate passes), gating copy-pasted per loader → build one device-class/lazy-init primitive before new scenes.

Bonus: Header, Cursor, ScrollProgress render OUTSIDE MotionProvider (layout.tsx:202–204) — any future m. usage there silently breaks.

## Hygiene
- console.log: 3, all intentional server-side (actions.ts). TODO/FIXME: none. Commented-out code: none.
- `.impeccable/critique/2026-06-26-guelerdev.md` scores live site 21/40 — useful audit input, keep. Delete/gitignore `.impeccable/live/`.
- README wrong: claims `site/` root, advertises dead Orb scene, documents anim/animation split as intended.
- `.env.example` has WRONG DOMAIN (guler.dev) — matches Copy/SEO audit critical bug 2.
- Data bug: `lib/content.ts:16` whatsapp URL invalid format (`wa.me/015777688060` → needs `4915777688060`).
