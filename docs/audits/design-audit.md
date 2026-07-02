# Audit: Design Critique (Phase 1) — 2026-07-02

> Source: design critic agent, 28 full-page captures (7 routes × desktop/mobile
> × light/dark), all visually reviewed. Verdict: **~3/10 vs Awwwards-SOTD bar.**

## Blockers

1. **Inverted hero hierarchy (home).** Headline renders ~nav-link size while
   the orb takes ~70% of the viewport. The 60-second claim is typographically
   the least important element on screen. Brand claim "Websites, die Kunden
   bringen" appears nowhere. (Root cause confirmed by motion audit: Tailwind
   clamp class never generated — Hero.tsx:84.)
2. **Zero visual proof on the entire homepage.** All four project cards are
   text + tech chips + 1px border; wide cards ~40% empty. The portfolio
   section contains no pixels of actual work.
3. **Two clashing design systems.** Home = editorial-typographic monoculture
   (banned lane #5); /leistungen = shadcn/SaaS gradient template with BELIEBT
   badge and blob CTA (banned lanes #1+#3). The site hits BOTH anti-reference
   lanes simultaneously; home and subpages read as different websites.
4. **Du-form everywhere** (kickoff mandates Sie).

## Majors

- **Light theme (the DEFAULT) reads as dirt**: muddy gray-blue particle smear
  + dusty sphere; dark theme is genuinely attractive (glowing ionization
  field). Most visitors get the bad version. Confetti particles read as
  screen grime in light on /projekte too.
- **Dead scroll runways**: ~1,400px and ~950px blank stretches on desktop
  home; mobile page is 15,614px with long voids.
- **Mobile hero loses the 3D entirely** — orb cropped to a faint blur; the
  wow-strategy doesn't exist on the device class KMU owners actually use.
- **"0" stats scan as broken data** on /projekte ("0 € / 0 Audiodateien" as
  big violet zeros).
- **Case study is one screen deep** — the only page with real product visuals
  exhausts them in one image; no process/story; no honest Showcase/Konzept
  label; raw railway.app URL visible in the mock browser chrome.
- **/ueber is the literal anti-reference**: portrait rectangle + checkmark
  skill bullets; and the 3-entry timeline (Seit 2024/2024/Laufend) formatted
  like a 15-year career ADVERTISES inexperience.
- **Content duplication**: services/process repeated home vs /leistungen in
  different styles; pricing in three hand-synced places with contradicting
  facts (5 vs 6 pages — trust leak).

## Minors
- Cyan-filled button white-text probable AA fail (/leistungen); weak cyan
  price numerals on white.
- Stray empty-circle ornament floats at the same spot on every subpage hero.
- Two competing header CTAs ("Kontakt anfragen" + "Erstgespräch").
- Background seam mid-page on /kontakt (both themes).
- Statement text near-invisible if word-reveal doesn't complete.
- Nav label "Pakete" routes to /leistungen.

## Reads-as-templated list
/leistungen entirely; home process (ghost numbers + ruled rows); numbered
feature list; FAQ accordion; 2×2 outcome grid; the identical gradient-blob
CTA band on 5 pages; /ueber portrait+checkmarks, chip cards, 4-up icon grid;
footer; kontakt form styling; text-only project cards.

## Keep — genuinely strong
- **Dark-theme particle scene** — already points at the cinematic mandate.
- **The 5-chapter narrative skeleton** (Kapitel 01 Dein Problem … 05 Dein
  Moment) + mobile progress rail — a real storytelling armature no template
  has; currently labels without payoff.
- Copy voice at its best ("Kunden suchen dich…", "eine Person, kein
  Callcenter", honest Festpreis framing).
- The real portrait asset (wrong staging).
- BüroBrücke framed-browser product shot — the one working proof pattern; multiply it.
- DSGVO click-to-load map; privacy-first form consent.
- Ratgeber IA (kurze-Antwort box, Preistreiber table, FAQ).

## Three highest-leverage moves (per critic)
1. **WebGL as the spine, not an ornament** — one continuous scene transforming
   across the five Kapitel on scroll (signal particles → structure →
   crystallized project artifacts …), designed static fallbacks, and it MUST
   exist on mobile. Converts chapter labels into the story and fills the dead
   runways.
2. **Real work on screen everywhere** — extend the framed-screenshot pattern
   into staged product frames on home + /projekte; grow case studies into
   multi-scene scroll stories with honest Showcase labels.
3. **Collapse to one committed system** — rebuild subpages in the (extended)
   chapter language, kill the gradient-blob template, resolve the light/dark
   gap (fix light or default dark), unify pricing facts, Sie-form in the same
   pass.
