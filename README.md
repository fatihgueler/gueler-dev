# Güler.dev

Website von **Fatih Güler** – Freelance-Webentwickler aus Hannover, tätig für ganz
Deutschland. Moderne Websites zum Festpreis und KI-Lösungen für kleine und
mittlere Unternehmen – ein fester Ansprechpartner statt Agentur.

**Live:** [guelerdev.de](https://guelerdev.de)

---

## Tech-Stack

| Bereich          | Eingesetzt                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, React 19, Server Components, `output: standalone`) |
| Sprache          | **TypeScript 5**                                                            |
| Styling          | **Tailwind CSS v4** (`@theme` in `globals.css`, kein Config-File)           |
| UI-Primitives    | shadcn-Stil (Radix Slot, `class-variance-authority`, `tailwind-merge`)      |
| Motion           | **Framer Motion 11**, **GSAP**, **Lenis** (Smooth Scroll)                  |
| 3D               | **three.js** (Hero-Orb-Szene, lazy geladen)                                 |
| Theming          | **next-themes** (Dark als Default, Light umschaltbar)                       |
| Icons            | **lucide-react**                                                            |
| Formular & Mail  | **react-hook-form** + **zod** → Server Action → **Resend**                  |

---

## Design-System

Eckig-editoriale „Präzisionswerkstatt" – scharfe Kanten, klare Hierarchie,
disziplinierte Motion (kein Effekt-Spam).

- **Theme:** Dark als Standard auf Near-Black „Void-Ink" `#04040a`; Light-Mode über
  `next-themes` (Token-Overrides via `html.light`).
- **Akzente:** Violett `#7c3aed` / `#8b5cf6` / `#a78bfa` (primär) + Cyan `#06b6d4` /
  `#22d3ee` (sekundär).
- **Schriften (via `next/font`):** *Bricolage Grotesque* (Display), *Hanken Grotesk*
  (Body), *JetBrains Mono* (Mono/Labels).
- **Radius:** global `0rem` – ein zentraler Hebel macht alle Flächen eckig.
- Design-Tokens (Farben, Schrift, Spacing, Schatten) leben zentral in
  [`app/globals.css`](app/globals.css). Die Aliasse `teal → Violett` und
  `gold → Cyan` halten ältere Komponenten ohne Umbenennung auf dem aktuellen Branding.

---

## Seiten

Mehrseitige App-Router-Struktur:

| Route | Inhalt |
| ----- | ------ |
| `/` | Startseite (Hero, Leistungen, Projekte, Ablauf, FAQ, Kontakt-CTA) |
| `/leistungen` | Leistungsübersicht |
| `/projekte` · `/projekte/[slug]` | Projektübersicht + Case Studies (klickbares Live-Vorschaufenster) |
| `/ueber` | Über mich |
| `/kontakt` | Kontaktformular |
| `/impressum` · `/datenschutz` | Rechtsseiten |
| **Ratgeber (SEO/GEO):** `/was-kostet-eine-website`, `/webentwickler-vs-agentur`, `/wie-lange-dauert-eine-website`, `/website-fuer-lokale-unternehmen` | Content-Seiten mit Article-/FAQ-Schema |

---

## SEO & GEO

- **Metadata** pro Seite (Title-Template, Description, Canonical, Open Graph).
- **Dynamisches OG-Bild** über Route Handler [`app/og/route.tsx`](app/og/route.tsx).
- **Strukturierte Daten (JSON-LD):** `ProfessionalService`, `Person`, `WebSite`,
  serverseitig gerenderte `FAQPage` (Startseite + Ratgeber) sowie `Article` +
  `BreadcrumbList` auf den Ratgeber-Seiten.
- **Sitemap & robots:** [`app/sitemap.ts`](app/sitemap.ts) iteriert über Case Studies
  und Ratgeber, [`app/robots.ts`](app/robots.ts) erlaubt auch KI-Crawler.
- **GEO (Generative Engine Optimization):** [`/llms.txt`](app/llms.txt/route.ts) nach
  llmstxt.org-Konvention, generiert aus den zentralen Inhalten.

---

## Barrierefreiheit

- Kontraste auf WCAG AA getrimmt (Body-Text ≥ 4.5:1 auf dem dunklen Grund).
- Skip-Link, sichtbarer Fokus-Ring, Focus-Trap in der Mobile-Navigation.
- Smooth-Scroll und Reveal-Animationen respektieren `prefers-reduced-motion`;
  Reveals haben einen `scripting: none`-Fallback (Inhalt bleibt sichtbar).
- Consent-Banner mit `role="region"`.

---

## Schnellstart (lokal)

Voraussetzung: **Node.js ≥ 20**

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen anlegen
cp .env.example .env.local
# Zum reinen Anschauen ohne Mailversand reichen die Defaults.

# 3. Dev-Server starten
npm run dev          # → http://localhost:3000
```

```bash
# Production-Build testen
npm run build && npm start
```

> Beim Build lädt `next/font` die Google-Schriften (Bricolage Grotesque,
> Hanken Grotesk, JetBrains Mono) einmalig herunter und hostet sie selbst –
> dafür ist beim Build eine Internetverbindung nötig.

### Umgebungsvariablen

| Variable | Zweck |
| -------- | ----- |
| `RESEND_API_KEY` | API-Key für den Mailversand des Kontaktformulars |
| `RESEND_FROM` | Absenderadresse (Domain muss bei Resend verifiziert sein) |
| `CONTACT_EMAIL` | Empfängeradresse der Kontaktanfragen |
| `NEXT_PUBLIC_SITE_URL` | Öffentliche Basis-URL (SEO, Sitemap, Open Graph) |

Siehe [`.env.example`](.env.example).

---

## Inhalte ändern

**Alle Texte, Projekte und Daten** stehen zentral in einer Datei:

```
lib/content.ts
```

Überschriften, Leistungen, Pakete, Projekte/Case Studies, der „Über mich"-Text,
Kontaktdaten sowie die Ratgeber-Registry – kein Suchen im Code nötig. Bilder
gehören in den Ordner `public/` (Projekt-Screenshots unter `public/projects/`).

---

## Projektstruktur

```
site/
├── app/
│   ├── layout.tsx              # Fonts, Metadata, JSON-LD, Header/Footer, Provider
│   ├── page.tsx                # Startseite (komponiert alle Sections + FAQ-Schema)
│   ├── globals.css             # Design-System (Tokens, Fonts, Animationen)
│   ├── actions.ts              # Server Action: Kontaktformular → Resend
│   ├── sitemap.ts / robots.ts
│   ├── og/route.tsx            # Dynamisches Open-Graph-Bild
│   ├── llms.txt/route.ts       # GEO-Artefakt (llmstxt.org)
│   ├── not-found.tsx
│   ├── leistungen/ ueber/ kontakt/
│   ├── projekte/               # Übersicht + [slug]/ Case Studies
│   ├── impressum/ datenschutz/ # Rechtsseiten
│   └── <ratgeber>/             # 4 SEO/GEO-Content-Seiten
├── components/
│   ├── ui/                     # Button, Input, Textarea, ThemeToggle …
│   ├── layout/                 # Header, Footer, MobileNav
│   ├── sections/               # Hero, Services, Projects, Process, Contact …
│   ├── three/                  # three.js-Szenen (Hero-Orb, lazy)
│   ├── anim/ · animation/      # Reveal- & Motion-Helfer
│   └── providers/              # Theme, SmoothScroll, Motion
├── lib/
│   └── content.ts              # ← ALLE Inhalte hier
├── public/                     # Bilder, Projekt-Screenshots, statische Assets
├── Dockerfile / .dockerignore
└── DEPLOYMENT.md               # Deployment-Anleitung
```

---

## Deployment

Der Build ist über `output: "standalone"` self-contained und läuft per
**Dockerfile** ohne Vercel-Zwang (aktuell auf **Railway**, ebenso geeignet für
Hetzner, Coolify, Fly.io oder eigenen Server). Details in
[`DEPLOYMENT.md`](DEPLOYMENT.md).

---

© Fatih Güler · guelerdev.de
```