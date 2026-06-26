# $impeccable critique — guelerdev.de
**Date:** 2026-06-26  
**Target:** https://www.guelerdev.de  
**Register:** brand (portfolio/marketing — design IS the product)  
**Stack:** Next.js 15, React 19, TypeScript, Tailwind v4 CSS, Bricolage Grotesque

---

## Assessment A — Heuristic Scoring

### Nielsen's 10 Heuristics (0–4 each)

| # | Heuristic | Score | Finding |
|---|-----------|-------|---------|
| 1 | Visibility of system status | 2/4 | LEISTUNGEN progress bar helps. But ABLAUF steps are blank until ScrollTrigger fires — visitor sees a black void and has no signal whether something is loading or broken. |
| 2 | Match between system and real world | 1/4 | Hero subtitle "Next.js · TypeScript · KI-Integration" is developer jargon delivered to a 55-year-old Bäckermeister. The canonical visitor does not know what Next.js is. This is the single biggest strategic miss on the page. |
| 3 | User control and freedom | 3/4 | Single-page scroll, nav anchors provide escape. Accordion in FAQ. No trapping popups. Solid. |
| 4 | Consistency and standards | 2/4 | Uppercase eyebrow applied to every section (ABLAUF, LEISTUNGEN, FAQ, KONTAKT, footer NAVIGATION/KONTAKT) creates monotony, not system. Numbered markers 01/02/03/04 in ABLAUF but nowhere else — inconsistent logic. |
| 5 | Error prevention | 2/4 | DSGVO checkbox on form is correct. Can't evaluate form validation from screenshots. Tech ticker may clip on narrow viewports. |
| 6 | Recognition rather than recall | 3/4 | Nav labels clear, CTA "Kostenlose Analyse anfragen" repeated consistently, pricing stated in FAQ. Good. |
| 7 | Flexibility and efficiency | 2/4 | "SCROLL TO DISCOVER" is the only page-exploration affordance. No skip-to-content. Calendar link ("Lieber direkt sprechen?") is a strong expert path. |
| 8 | Aesthetic and minimalist design | 1/4 | Core failure. Uppercase eyebrow on 7+ locations. Three identical card grid instances. Ghost-card pattern. Animation-gated voids. Five consecutive sections follow the identical eyebrow→heading→card-grid formula. The Cherenkov Violet / Ionization Cyan palette has personality but is applied to a structure so formulaic it overrides the palette. |
| 9 | Help users recover from errors | 3/4 | FAQ answers the first question a visitor has (pricing). Would need to test form error states. |
| 10 | Help and documentation | 2/4 | FAQ section is present. Process (ABLAUF) is explained. But "Über mich" is nav-only, not surfaced in the main scroll. |

**Total: 21/40 (53%)**

---

### Cognitive Load Assessment

**HIGH** — contributing factors:

- Developer jargon in hero demands translation effort from non-technical audience
- Animation-gated voids create confusion: "is this broken or intentional?"
- Five consecutive sections with identical eyebrow→heading→cards structure causes pattern fatigue — the visitor must work to find what's different
- Tech ticker (10 technologies) is pure noise for a KMU owner evaluating craft, not stack
- "rund um die Uhr" colored inline in value prop text creates fragmented emphasis — no single clear message
- "SCROLL TO DISCOVER" is English in an otherwise German page

---

### Emotional Journey

| Moment | State | Signal |
|--------|-------|--------|
| Hero: OrbScene + "Websites, die Kunden bringen" | ✓ Impact | Distinctive. The 3D shader is the one moment the site is not template. |
| Hero subtitle: "Next.js · TypeScript · KI-Integration" | ✗ Disconnect | Immediate jargon barrier for the audience. |
| Value prop section | ↔ Okay | Copy is good in intent but fragmented emphasis dilutes it. |
| ABLAUF section | ✗ Frustration | Large black void, partial content, numbers floating in space. "Is this loading?" |
| LEISTUNGEN scrolly | ↔ Recovers | Scrollytelling adds some interest but identical card structure is familiar in the bad way. |
| Projekte | ↔ Neutral | Portfolio cards present but visually identical — no featured project, no visual hook. |
| Testimonials | ↔ Neutral | Avatar initials + ghost cards read generically. |
| KONTAKT | ✓ Functional | Comprehensive form + clear pricing in FAQ. Strong. |

**Actual arc:** High → Disconnected → Confused → Frustrated → OK → Neutral → Neutral → Functional  
**Target arc:** High → Excited → Trust → Convinced → Convert

---

## Assessment B — Ban Detector

### Confirmed violations

**1. Tiny uppercase tracked eyebrow above every section — CONFIRMED × 7+**  
ABLAUF · LEISTUNGEN · FAQ · KONTAKT · footer:NAVIGATION · footer:KONTAKT · hero:"SCROLL TO DISCOVER"  
This is the signature AI grammar tell of 2023–2026 freelancer portfolios. An eyebrow on every section is not a brand system; it is scaffolding that was never removed. The OrbScene earns a first-impression pass; the eyebrows immediately mark the structure as generated.

**2. Numbered section markers as default scaffolding — CONFIRMED**  
ABLAUF: 01 / 02 / 03 / 04 in large cyan type. The steps ARE a real sequence (a genuine process flow) so numbering is contextually defensible — but paired with the uppercase "ABLAUF" eyebrow above them, the combined effect is double scaffolding. Numbers can stay if the eyebrow is removed; they cannot coexist with it.

**3. Identical card grids — CONFIRMED × 3**  
- LEISTUNGEN: 3 service cards (violet icon + title + description + cyan bullet list)
- Projekte: 3 project cards (dark rectangle + uppercase category + title + description + tech tags + links)
- Testimonials: 3 testimonial cards (★★★★★ + large quote + avatar initials + name/role/company)

Three consecutive sections all resolving to "a row of three identical rectangles" destroys hierarchy. The visitor pattern-matches by the second instance and stops reading.

**4. Ghost-card pattern (1px border + large box-shadow) — CONFIRMED**  
Testimonial cards and project cards use the 1px-border + soft-shadow combination that is the Codex-specific card tell. Pick one: solid border at brand color OR defined shadow at ≤8px blur. Never both as decoration.

**5. Reveal animations gating content visibility — CONFIRMED**  
ABLAUF steps are invisible until ScrollTrigger fires. On slower machines, background tabs, or headless renderers, the reveal never fires and the section ships blank. Content must be visible in default DOM state; animations enhance, they do not gate.

### Clear passes

- Hero-metric template: NOT present. The OrbScene + large headline is legitimately distinctive.
- Gradient text: NOT present. Colored text uses solid brand colors, not `background-clip: text` gradients.
- Glassmorphism: NOT present.
- Side-stripe borders: NOT present.
- Sketchy SVG illustrations: NOT present.
- Stripe backgrounds: NOT present.

### AI slop test verdict

**PARTIAL FAIL**  
First impression (hero): PASS — the 3D OrbScene is not a training-data reflex.  
Structure (scroll past hero): FAIL — uppercase eyebrow on every section is the defining AI grammar tell.  
Pattern (full page): FAIL — five consecutive eyebrow→heading→card-grid sections is a template wearing a distinctive palette.

The site fails the second-order category-reflex check from PRODUCT.md's own anti-references: "Generic Tailwind/shadcn freelancer templates: hero with centered headline + CTA button, three card-grid services." That is exactly what exists below the fold. The hero is different. The rest is the anti-reference.

---

## P0–P3 Priority Report

### P0 — Conversion-critical. Fix before next visitor.

**P0.1 — Hero subtitle: speak outcomes, not technologies**  
Current: `Next.js · TypeScript · KI-Integration – für KMU in Hannover und deutschlandweit`  
Problem: The canonical visitor is a 45-year-old Sanitärinstallateur who does not know what Next.js is. Listing a tech stack in the hero is the developer-portfolio register, not the business-owner-conversion register. It creates an immediate relevance gap at the moment of maximum attention.  
Fix: Replace with a benefit or audience statement. Options:
- "Für Handwerker, Berater und lokale Unternehmen — Websites, die wirklich verkaufen."
- "Ich baue für KMU, die mehr Anfragen wollen — nicht für Entwickler, die Code lesen."
- Or remove entirely and let the OrbScene + headline breathe without a subtitle.

**P0.2 — Fix animation-gated content in ABLAUF**  
All content must be visible in default DOM state. Steps 01–04 must render with `opacity: 1` initially. The ScrollTrigger animation may *enhance* visible content (slide, fade, scale) but may never be the mechanism by which content becomes visible. Add a CSS fallback or check `prefers-reduced-motion` to ensure visibility without JS.

---

### P1 — Experience-breaking. Fix before next deploy.

**P1.1 — Remove all uppercase tracked eyebrows**  
Every section (ABLAUF, LEISTUNGEN, FAQ, KONTAKT, footer, hero "SCROLL TO DISCOVER") uses the same uppercase tracked kicker label. This must be eliminated entirely or replaced with a deliberate alternative.  
Alternative options that fit the Präzisionswerkstatt / Futuristisch brand:
- A thin horizontal violet line above headings (brand line, not eyebrow)
- Section number in the background at large size and low opacity (texture, not scaffold)
- No section label at all — strong headings + visual hierarchy do the job
- One single eyebrow style used only on one specific section for deliberate contrast

**P1.2 — Break the identical card grid across services, projects, testimonials**  
Three sections using dark rounded rectangle card grids must be differentiated structurally:

*LEISTUNGEN (services):*  
Replace 3 equal cards with a large interactive layout. One service occupies full width at a time — headline large, description in a column beside it, a preview/visual on the other side. The visitor scrolls or clicks to switch services. No grid.

*Projekte (projects):*  
Asymmetric bento. One featured project at 2/3 width with a real screenshot or mockup on the card. Two smaller projects beside/below. Each card has a distinct color accent or crop. Category labels should be lowercase, not uppercase eyebrows.

*Testimonials:*  
Single large testimonial at a time with a horizontal scroll/navigation. Big quote, name large, company name smaller. Real photos (or illustrated avatars) instead of initials in circles. The 3-column equal grid is the most generic possible testimonial layout.

**P1.3 — Apply fluid type tokens to components (deferred from prior session)**  
Tokens `--text-display`, `--tracking-display`, `--leading-tight` defined in `globals.css` (commit `dfd222b`) but not applied anywhere.  
- `app/components/Hero.tsx`: replace `text-[clamp(2.75rem,9vw,6.5rem)]` with token; max must be ≤ 6rem
- `app/not-found.tsx`: remove `text-[8rem]`/`md:text-[12rem]` — both violate the 6rem ceiling
- Apply `text-wrap: balance` to h1–h3 across components

---

### P2 — Quality issues. Fix in next sprint.

**P2.1 — ABLAUF: choose numbers OR eyebrow, not both**  
The "ABLAUF" uppercase label above + 01/02/03/04 large cyan numbers is double scaffolding. If the sequence numbers stay (they ARE a real ordered process), remove the "ABLAUF" eyebrow above. The section heading "So arbeiten wir zusammen" + the numbers are sufficient context.

**P2.2 — Tech ticker: replace technologies with outcomes**  
Current ticker: `Next.js · React · TypeScript · Tailwind CSS · FastAPI · Python · Claude API · Docker · PostgreSQL · .NET`  
This is meaningful to developers and meaningless to KMU owners. Replace with outcome/trust signals:
- `Kostenlose Erstberatung · Lieferung in 6 Wochen · DSGVO-konform · Hannover & deutschlandweit · Wartung inklusive`

**P2.3 — Ghost-card pattern on project and testimonial cards**  
Replace `border: 1px solid` + large `box-shadow` combination with a single treatment:  
Option A: Solid slightly-elevated surface color (e.g. `--color-surface-1` vs `--color-surface-2`), no border, no shadow  
Option B: Bold violet or cyan left accent or top accent line on selected/hovered card, no shadow

**P2.4 — "SCROLL TO DISCOVER" → remove or Germanize**  
The hero bottom label is English in a German page and uses the uppercase tracked pattern that's banned. Either remove (the OrbScene pulls the eye down without instruction) or replace with a German alternative that matches the brand voice: simply an arrow with no label, or "↓" styled at scale.

**P2.5 — Value prop inline emphasis: phrase, not word**  
"digitale" alone is highlighted violet in "Ich baue digitale Vertriebsmitarbeiter." The unit to emphasize is the full concept "digitale Vertriebsmitarbeiter" (or even the full sentence). Emphasizing only the adjective creates fragmented reading rhythm.

---

### P3 — Polish.

**P3.1 — Mystery circle element between value prop and ABLAUF**  
A thin-outline circle with what reads as a progress/loading animation sits center-screen in a large dark void between sections. Its intent is unclear. If decorative, it reads as a lost loading spinner. If it's an ambient background element, it needs either more visual weight or removal.

**P3.2 — Display heading letter-spacing**  
Per impeccable rules: display letter-spacing floor is −0.04em. Verify `--tracking-display` value in globals.css is not tighter than −0.04em for Bricolage Grotesque at display size (−0.02 to −0.03em is the correct range for a condensed grotesque).

**P3.3 — Kontakt info block: uppercase pill labels**  
E-MAIL / TELEFON / STANDORT / ANTWORTZEIT / GITHUB labels in uppercase dark pills in the left column of the contact section continue the eyebrow ban at micro scale. Replace with icon-first: `icon · lowercase label · value`.

**P3.4 — Footer section labels**  
"NAVIGATION" and "KONTAKT" in the footer are the eyebrow pattern's last refuge. Replace with no label (the content is self-evident) or use lowercase weight-contrast headings.

**P3.5 — Testimonial avatar initials**  
Avatar circles with initials are the lowest-trust testimonial format. Request real photos from clients. If not available, an illustrated portrait silhouette in brand color is better than "FG" in a circle.

---

## Summary

**Nielsen Score: 21/40 (53%)**

**What works:**
- The OrbScene 3D hero — genuinely distinctive, not a template reflex
- "Websites, die Kunden bringen" — correct copy register, blunt and benefit-first
- Cherenkov Violet / Ionization Cyan palette — has personality and potential
- Contact form + FAQ pricing — functional conversion mechanism
- ABLAUF concept (process explanation) — right section to have

**What doesn't:**
- Everything below the hero follows a five-section template: eyebrow → heading → card grid. The palette sits on top of a generic structure and cannot overcome it.
- The subtitle undercuts the headline by speaking to developers instead of clients.
- Three identical card grid instances in three consecutive sections erase any hierarchy.
- Animation-gated content voids actively damage the perception of quality.

**The core diagnosis:** The site passes the first-impression test and fails the second-scroll test. The OrbScene is the one moment of genuine design intention; the remaining sections are category-reflex with colored accents. The path forward is structural — fixing the eyebrows and card grids requires rethinking what each section *is*, not how it looks. More animations and more polish applied to the current structure will not change this.

The user's instinct that nothing has genuinely changed is correct. Font changes and token additions are invisible without structural changes that break the template pattern. The P1 items are the threshold where the site stops reading as AI-generated.
