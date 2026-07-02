# Audit: Copy & SEO (Phase 1) — 2026-07-02

> Source: Copy/SEO audit agent, production build. Condensed for execution; all
> file:line references verified against the working tree at commit 9643496.

## Critical bugs (fix before anything else matters)

1. **Canonical inheritance bug.** `app/layout.tsx:83–85` sets
   `alternates.canonical: siteUrl` in the ROOT layout; only the 4 Ratgeber pages
   override it. Result: /leistungen, /projekte, /ueber, /kontakt and all 4 case
   studies declare the HOMEPAGE as their canonical — explicitly telling Google
   not to index them. For a near-zero-traffic site this is the single most
   damaging technical issue.
2. **Domain identity conflict.** `.env.example` sets
   `NEXT_PUBLIC_SITE_URL=https://guler.dev` while `lib/content.ts:20` says
   `https://guelerdev.de`. Every canonical, sitemap URL, robots sitemap line and
   OG url follows the env var. If production runs with guler.dev, the entire
   site canonicalizes to the wrong domain. **Owner must confirm the production
   env value** — code should be made consistent with guelerdev.de.

## Du→Sie scope

~132 pronoun occurrences + ~40 verb conjugations across ~100 strings in 14
files. Practically a full rewrite of every visible string.
- `lib/content.ts`: 61 (hero, services, process, features, pakete, trust,
  about, contact, booking, faq, pages, storyPitch, packages, outcomes)
- 4 Ratgeber pages: 26 (incl. meta descriptions and FAQ text that feeds
  FAQPage schema)
- `app/not-found.tsx`, components (`ContactForm`, `ChapterProgress`,
  `FeaturesGrid`, `StoryPitch`, `ProcessSteps`, `FinalCta`, `Outcomes`,
  `ConsentBanner`): ~28
- `app/datenschutz/page.tsx`: 14 — CONFLICT with "legal pages untouched"
  constraint; needs owner decision (Du-form privacy policy on a Sie-form site
  is jarring).
- Dead code shortcut: `components/home/*` (WhatsappCta, BurobuckeFeature,
  ServicesTeaser, ProjectsTeaser) imported by NO page — delete instead of
  rewriting.

## Proof inventory

Good news: `lib/content.ts:684–690` testimonials array is already EMPTY with a
correct §5-UWG warning comment. No fabricated quotes render anywhere.

Must-remove/reframe:
- `content.ts:578` "0,9s durchschnittliche Analysezeit" — implies unmeasured usage data
- `content.ts:579` "96/100 Lighthouse Accessibility" — keep only with a live receipt
- `content.ts:262,518` "Beliebt"/"Beliebteste Wahl" badges — fabricated social proof with near-zero clients
- `content.ts:129–135,627–646` Weitblick framed as client work — must be labeled Eigenprojekt/Konzept (no such label exists in `app/projekte/[slug]/page.tsx`)
- `app/webentwickler-vs-agentur/page.tsx:29,40` "oft 30–50 % günstiger" — unsourced comparative claim, soften
- `content.ts:600` "DSGVO konform" — legal conclusion; soften to "datenschutzfreundlich konzipiert"

Safe: all prices/timelines, tech stack, process steps, feature facts,
"Antwort in 24h" (a promise), "Lieferzeit unter 4 Wochen".

## Voice violations

- BANNED "professionell" ×3: `content.ts:361` (in FAQPage schema too!), `content.ts:507`, `app/was-kostet-eine-website/page.tsx:146`
- "Premium" inflation ×8: `content.ts:86,257,335,363,368,510,523`, `app/layout.tsx:142` (in JSON-LD)
- Jargon: "Smarte Chatbots" (211), "skalierbar" (383), "conversion-optimiert" (29 + OG), "Lead-optimierte Formulare" (511)
- "kompakt, modern, wirkungsvoll" triple-vague (490); ✅/❌ emojis in form messages (329–331)
- Spelling: Onepager/One Pager/One-Pager all three used; "massgeschneiderten" typo (439)
- CTAs are strong overall; "Bereit, online zu überzeugen?" is generic and repeated as h2 on all 13 pages

## Pakete verdict: not launch-ready — TWO contradictory package systems

`pakete` (content.ts:233–279 → /leistungen) vs `packages` (content.ts:485–538 →
/was-kostet-eine-website + llms.txt + JSON-LD):
- "Bis zu 5 Unterseiten" vs "Bis zu 6 Seiten" for the same €1.500
- Tier-3 named "KI & Web-App" vs "Premium / Custom" vs a third variant in the contact form (335)
- Delivery times only exist in `packages`; /leistungen shows none
- `packages` promises "Google Analytics Einrichtung" — contradicts the
  Datenschutz page ("keine Tracking-Technologien") AND the cookieless-analytics decision
- KI tier has zero price anchor ("auf Anfrage") — the €20k-AI-buyer segment gets no signal
→ Unify into ONE source of truth; add Lieferzeit everywhere; price-anchor the KI tier.

## SEO findings

- Ratgeber pages: excellent titles/descriptions/schema BUT og:image missing
  (page-level openGraph drops the inherited image) and they are footer-only
  ORPHANS — no contextual links from homepage FAQ/leistungen/case studies.
- Case studies: meta description is just the tagline; no CreativeWork schema;
  canonical/OG wrong (bug 1).
- /leistungen (money page): zero body inlinks, generic title, no keywords.
- Homepage H1 carries zero keywords (brand tradeoff, acceptable only because
  the title tag targets "Webdesign Hannover").
- `/llms.txt` omits all Ratgeber pages and case studies (`app/llms.txt/route.ts:53–58`).
- sitemap/robots/og endpoints: all working correctly.
- JSON-LD: valid; `areaServed` only "Deutschland" — no Hannover geo emphasis.

## Missing content (mixed-audience gaps)

1. KI/Automatisierung landing page — the AI-buyer segment has one card and
   "auf Anfrage"; no page targets "KI Automatisierung KMU", "Chatbot für Unternehmen"
2. "Webdesign Hannover" local landing content + LocalBusiness geo
3. "Website für Handwerker" branchen page (highest-intent trades query)
4. "Was kostet ein Chatbot?" Ratgeber (replicate the proven cost-page pattern)

## Top 10 actions (ranked)

1. Resolve domain + align NEXT_PUBLIC_SITE_URL and content.ts site.url
2. Fix per-page canonicals (remove root-layout canonical, self-canonical helper)
3. Sie-rewrite (~170 edits, 14 files) incl. meta/schema/form strings; delete dead components/home/*
4. Unify package systems (5-vs-6 pages, tier names, Lieferzeit, drop GA promise, drop "Beliebt" badges, KI price anchor)
5. Proof cleanup (0,9s, Lighthouse claim, Eigenprojekt labels, 30–50% claim, DSGVO wording)
6. Internal-linking sprint (FAQ→Ratgeber, home/cases→leistungen, Ratgeber cross-links, home Ratgeber teaser)
7. Build KI/Automatisierung landing page
8. Keyword-align money pages (titles, H1s, real case-study descriptions)
9. OG/schema gaps (Ratgeber og:image, case-study canonical+OG+CreativeWork, llms.txt completeness)
10. Local SEO package (Hannover content, LocalBusiness geo, GBP = owner task)
