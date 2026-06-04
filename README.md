# Güler.dev

Premium-Website für **Fatih Güler** – Freelance Webentwickler aus Hannover.
Webentwicklung & KI-Lösungen für kleine Unternehmen.

Gebaut mit **Next.js 15**, **TypeScript**, **Tailwind CSS v4** und **shadcn/ui**-Komponenten.
Design: dunkles Premium-Theme in Schwarz / Weiß / Gold mit der Schrift *Fraunces* + *Hanken Grotesk*.

---

## Features

- ⚡️ Next.js 15 App Router, Server Components, `output: standalone`
- 🎨 Durchgehende One-Page-Struktur (Hero, Leistungen, Projekte, Ablauf, Über mich, Kontakt) + Rechtsseiten
- 📱 Mobile-first, responsiv, barrierearm (WCAG AA, Skip-Link, `prefers-reduced-motion`)
- 🔍 SEO: Metadata pro Seite, Open Graph, Sitemap, robots.txt, JSON-LD (ProfessionalService)
- ✉️ Funktionierendes Kontaktformular (react-hook-form + zod + Server Action via **Resend**) inkl. Spam-Honeypot
- 🐳 Docker-ready (kein Vercel-Zwang) – läuft auf Hetzner, Railway, Coolify, Fly.io, eigenem Server …

---

## Schnellstart (lokal)

Voraussetzung: **Node.js ≥ 20**

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen anlegen
cp .env.example .env.local
# (für reines Anschauen ohne Mailversand reicht es, die Datei leer/Default zu lassen)

# 3. Dev-Server starten
npm run dev
```

→ Seite läuft auf **http://localhost:3000**

```bash
# Production-Build testen
npm run build && npm start
```

> Hinweis: Beim Build lädt Next.js die Google-Fonts (Fraunces, Hanken Grotesk)
> einmalig herunter und hostet sie selbst. Dafür ist beim Build eine
> Internetverbindung nötig (Standard bei `next/font`).

---

## Inhalte ändern

**Alle Texte, Projekte und Daten** stehen zentral in einer Datei:

```
lib/content.ts
```

Dort änderst du Überschriften, Leistungen, Projekte, den „Über mich"-Text,
Kontaktdaten und die Impressums-/Datenschutz-Felder. Kein Suchen im Code nötig.

Stellen, an denen noch echte Inhalte fehlen, sind mit `// TODO` markiert und in
**CONTENT.md** aufgelistet.

Bilder gehören in den Ordner `public/`.

---

## Projektstruktur

```
guler-dev/
├── app/
│   ├── layout.tsx          # Fonts, Metadata, JSON-LD, Header/Footer
│   ├── page.tsx            # Startseite (komponiert alle Sections)
│   ├── globals.css         # Design-System (Farben, Fonts, Animationen)
│   ├── actions.ts          # Server Action: Kontaktformular → Resend
│   ├── sitemap.ts / robots.ts
│   ├── not-found.tsx       # 404-Seite
│   ├── impressum/          # Rechtsseite (Template)
│   └── datenschutz/        # Rechtsseite (Template)
├── components/
│   ├── ui/                 # Button, Input, Textarea, Label
│   ├── layout/             # Header, Footer, MobileNav
│   ├── sections/           # Hero, Services, Projects, Process, About, Contact …
│   ├── Reveal.tsx          # Scroll-Animationen
│   └── Section.tsx         # Section-Wrapper + Headings
├── lib/
│   ├── content.ts          # ← ALLE Inhalte hier
│   └── utils.ts            # cn()-Helper
├── Dockerfile / .dockerignore
├── DEPLOYMENT.md           # Deployment-Anleitung
└── CONTENT.md              # To-do-Liste deiner Inhalte
```

---

## Nächste Schritte

1. **CONTENT.md** durchgehen und echte Inhalte einsetzen (v. a. Impressum/Datenschutz!)
2. Eigenes Foto in `public/` legen und in `components/sections/About.tsx` einbinden
3. Deployment nach **DEPLOYMENT.md**

---

© Fatih Güler · Güler.dev
