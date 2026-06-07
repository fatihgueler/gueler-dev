/**
 * ─────────────────────────────────────────────────────────────
 *  Güler.dev – Zentrale Inhalte
 *
 *  ALLE Texte, Daten und Links der Seite stehen hier.
 *  Zum Ändern von Inhalten musst du NUR diese Datei bearbeiten.
 *  Stellen, die du noch prüfen/ergänzen solltest, sind mit
 *  // TODO markiert (siehe auch CONTENT.md).
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Güler.dev",
  // Kurzer Claim für Logo/Untertitel
  tagline: "Webentwicklung & KI-Lösungen",
  // Vollständiger Name (Impressum, SEO, JSON-LD)
  ownerName: "Fatih Güler",
  email: "fatih.gueler75@gmail.com",
  location: "Hannover, Deutschland",
  url: "https://guler.dev",
  github: "https://github.com/fatihgueler",
  linkedin: "https://www.linkedin.com/in/fatih-g%C3%BCler-0206a639a/",
};

export const nav = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Über mich", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
];

export const hero = {
  eyebrow: "Freelance Webentwickler · Hannover",
  // Das/die hervorgehobene(n) Wort(e) werden in Gold gesetzt.
  titleStart: "Websites & KI-Lösungen, die kleine Unternehmen ",
  titleHighlight: "gross",
  titleEnd: " aussehen lassen.",
  subtitle:
    "Ich baue schnelle, moderne Websites und intelligente Web-Tools mit Next.js – sauber umgesetzt, DSGVO-konform und auf echte Ergebnisse ausgelegt.",
  primaryCta: { label: "Projekt anfragen", href: "/kontakt" },
  secondaryCta: { label: "Projekte ansehen", href: "/projekte" },
  // Kleine Vertrauens-Kennzahlen unter dem Hero.
  // `count`/`suffix` sind optional und steuern animierte Zähler (z. B. "90" + "+").
  // Fehlen sie (Next.js 15), wird `value` einfach statisch angezeigt.
  stats: [
    { value: "Next.js 15", label: "Moderner Stack" },
    { value: "90+", label: "Lighthouse-Score", count: 90, suffix: "+" },
    { value: "100 %", label: "DSGVO-fokussiert", count: 100, suffix: " %" },
  ],
};

// Technologien für das Logo-Band ("Tech Marquee")
export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "Python",
  "Claude API",
  "Docker",
  "PostgreSQL",
  ".NET",
];

export const services = {
  eyebrow: "Leistungen",
  title: "Was ich für dich baue",
  subtitle:
    "Vom ersten Konzept bis zum Launch – alles aus einer Hand, ohne Agentur-Aufschlag.",
  items: [
    {
      icon: "Globe",
      title: "Business-Websites",
      description:
        "Schnelle, suchmaschinenoptimierte Websites mit Next.js. Mobile-first, barrierearm und so gebaut, dass aus Besuchern Anfragen werden.",
      points: ["SEO & lokale Sichtbarkeit", "Responsives Premium-Design", "Blitzschnelle Ladezeiten"],
    },
    {
      icon: "Sparkles",
      title: "KI-Integration",
      description:
        "Intelligente Chatbots, Dokumenten-Analyse und Automatisierungen auf Basis moderner Sprachmodelle – praktisch eingesetzt, nicht als Spielerei.",
      points: ["Chatbots & Assistenten", "Dokumenten-KI (OCR + LLM)", "Prozess-Automatisierung"],
    },
    {
      icon: "Layers",
      title: "Web-Apps & Tools",
      description:
        "Massgeschneiderte Fullstack-Anwendungen: Buchungssysteme, Dashboards, interne Tools – sicher, wartbar und auf dich zugeschnitten.",
      points: ["Fullstack-Entwicklung", "APIs & Datenbanken", "Auth & Sicherheit"],
    },
    {
      icon: "LifeBuoy",
      title: "Betreuung & DSGVO",
      description:
        "Auch nach dem Launch da: Updates, Performance-Monitoring und datenschutzkonforme Umsetzung nach deutschem Recht.",
      points: ["Wartung & Updates", "Hosting-Beratung", "Datenschutz-Umsetzung"],
    },
  ],
};

export const projects = {
  eyebrow: "Projekte",
  title: "Ausgewählte Arbeiten",
  subtitle: "Echte Projekte, echter Code – live auf GitHub einsehbar.",
  items: [
    {
      title: "BüroBrücke",
      category: "KI-Web-App",
      description:
        "KI-gestützte App, die deutsche Behördenbriefe analysiert und in der Muttersprache erklärt – mit OCR, Fristerkennung und Antwort-Generator in fünf Sprachen.",
      tags: ["FastAPI", "React", "Claude API", "OCR", "JWT"],
      // TODO: Falls die App live ist, hier die Live-URL eintragen
      liveUrl: "",
      repoUrl: "https://github.com/fatihgueler/deBueroBruecke",
      featured: true,
    },
    {
      title: "SmartKitchen",
      category: "Fullstack-Anwendung",
      description:
        "Komplette Küchenverwaltung in .NET 8: Rezepte, Inventar, Wochenplanung und automatisch generierte Einkaufslisten – mit Blazor-Frontend und Web-API.",
      tags: [".NET 8", "Blazor", "ASP.NET Core", "EF Core", "SQLite"],
      liveUrl: "",
      repoUrl: "https://github.com/fatihgueler/smartKitchen",
      featured: false,
    },
  {
      title: "ENOX",
      category: "Mehrsprachige Website",
      description:
        "Marketing-Website für internationale Energieberatung mit 5 Sprachen (DE, EN, ZH, ES, RU), animiertem Fördercheck-Funnel zur Lead-Generierung und integrierten Kontaktformularen.",
      tags: ["Next.js 14", "TypeScript", "Tailwind", "i18n"],
      liveUrl: "https://enox-rv4x.vercel.app/de",
      repoUrl: "https://github.com/fatihgueler/Enox",
      featured: true,
    },
  ],
};

export const process = {
  eyebrow: "Ablauf",
  title: "So arbeiten wir zusammen",
  subtitle: "Transparent, planbar und ohne böse Überraschungen.",
  steps: [
    {
      number: "01",
      title: "Kennenlernen",
      description:
        "Wir sprechen über dein Vorhaben, deine Ziele und dein Budget. Du bekommst eine ehrliche Einschätzung – kostenlos und unverbindlich.",
    },
    {
      number: "02",
      title: "Konzept & Angebot",
      description:
        "Ich entwerfe Struktur, Design-Richtung und einen klaren Festpreis. Du weisst vorher genau, was du bekommst.",
    },
    {
      number: "03",
      title: "Entwicklung",
      description:
        "Umsetzung mit modernem, sauberem Code. Du siehst regelmässig Zwischenstände und kannst jederzeit Feedback geben.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Wir gehen live, ich richte alles ein – und bin auch danach für Wartung und Weiterentwicklung an deiner Seite.",
    },
  ],
};

export const pakete = {
  eyebrow: "Pakete",
  title: "Klare Pakete, faire Preise",
  subtitle:
    "Festpreise statt Stundenzettel – damit du von Anfang an weisst, woran du bist.",
  items: [
    {
      title: "Onepager",
      price: "ab 500 €",
      description: "Eine starke Seite, die dein Angebot auf den Punkt bringt.",
      features: [
        "Eine Seite mit allen wichtigen Infos",
        "Responsives Design für alle Geräte",
        "Kontaktformular inklusive",
        "Grundlegende SEO-Einrichtung",
      ],
      featured: false,
    },
    {
      title: "Business-Website",
      price: "ab 1.500 €",
      description: "Mehrseitiger Auftritt für Unternehmen, die online überzeugen wollen.",
      features: [
        "Bis zu 5 Unterseiten",
        "Individuelles Premium-Design",
        "SEO-Optimierung für lokale Sichtbarkeit",
        "Kontaktformular & Anbindung an Google Maps",
        "Performance-Check & Lighthouse-Report",
      ],
      badge: "Beliebt",
      featured: true,
    },
    {
      title: "KI & Web-App",
      price: "auf Anfrage",
      description: "Massgeschneiderte Anwendungen mit KI-Funktionen oder eigener Logik.",
      features: [
        "Individuelle Konzeption & Architektur",
        "KI-Integration (Chatbots, Automatisierung, OCR)",
        "Datenbank- & Backend-Anbindung",
        "Laufende Betreuung nach dem Launch",
      ],
      featured: false,
    },
  ],
  note: "Alle Preise verstehen sich als Richtwerte – das genaue Angebot richtet sich nach deinem Projekt und wird vorab gemeinsam festgelegt.",
};

export const trust = {
  eyebrow: "Warum ich",
  title: "Worauf du dich verlassen kannst",
  items: [
    {
      icon: "Zap",
      title: "Direkt erreichbar",
      description: "Kein Callcenter, keine Warteschleifen – du sprichst direkt mit mir.",
    },
    {
      icon: "FileCheck",
      title: "Festpreis vorab",
      description: "Du kennst die Kosten, bevor das Projekt startet – keine bösen Überraschungen.",
    },
    {
      icon: "ShieldCheck",
      title: "DSGVO nach deutschem Recht",
      description: "Datenschutz wird von Anfang an mitgedacht, nicht nachträglich aufgesetzt.",
    },
    {
      icon: "Rocket",
      title: "Auf Ergebnisse gebaut",
      description: "Schnelle, saubere Websites, die wirklich Anfragen bringen sollen.",
    },
  ],
};

export const about = {
  eyebrow: "Über mich",
  // TODO: Diesen Text bitte gegenlesen und nach deinem Geschmack anpassen.
  title: "Hallo, ich bin Fatih.",
  paragraphs: [
    "Ich bin angehender Fachinformatiker für Anwendungsentwicklung aus Hannover und entwickle als Freelancer Websites und Web-Anwendungen für kleine Unternehmen und Selbstständige.",
    "Mein Fokus liegt auf moderner Webentwicklung mit Next.js und auf dem Einsatz von KI, um echte Probleme zu lösen – wie bei meinem Projekt BüroBrücke, das Menschen mit Sprachbarrieren bei deutschen Behördenbriefen hilft.",
    "Mir ist wichtig, dass Technik einen Zweck erfüllt: schnelle Seiten, ehrliche Beratung und Lösungen, die du verstehst und die dir wirklich Anfragen bringen.",
  ],
  highlights: [
    "Fachinformatiker für Anwendungsentwicklung (in Ausbildung, DAA Hannover)",
    "Schwerpunkt Webentwicklung & IT-Security",
    "Spezialisiert auf Next.js, TypeScript & KI-Integration",
    "Persönlich, direkt erreichbar, ohne Agentur-Overhead",
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  title: "Lass uns dein Projekt besprechen",
  subtitle:
    "Erzähl mir kurz, was du vorhast – ich melde mich in der Regel innerhalb von 24 Stunden zurück.",
  successMessage:
    "Vielen Dank! Deine Nachricht ist angekommen. Ich melde mich schnellstmöglich bei dir.",
  errorMessage:
    "Da ist leider etwas schiefgelaufen. Bitte versuch es erneut oder schreib mir direkt per E-Mail.",
};

// ── Skills (Über-mich-Seite) ──────────────────────────────────
export const skills = {
  eyebrow: "Stack",
  title: "Womit ich arbeite",
  subtitle:
    "Ein moderner, fokussierter Stack – ausgewählt nach Ergebnis, nicht nach Hype.",
  groups: [
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP & Three.js"],
    },
    {
      label: "Backend",
      items: ["FastAPI", "Python", "Node.js", ".NET 8", "PostgreSQL"],
    },
    {
      label: "KI & Infrastruktur",
      items: ["Claude API", "OCR-Pipelines", "Docker", "Git & CI/CD", "Vercel / Hetzner"],
    },
  ],
};

// ── Werdegang / Timeline (Über-mich-Seite) ────────────────────
export const timeline = {
  eyebrow: "Werdegang",
  title: "Der Weg bis hierher",
  steps: [
    {
      period: "Seit 2024",
      title: "Freelance Webentwickler",
      description:
        "Websites, Web-Apps und KI-Tools für kleine Unternehmen und Selbstständige – von der Idee bis zum Launch.",
    },
    {
      period: "2023 – heute",
      title: "Ausbildung zum Fachinformatiker (AE)",
      description:
        "Anwendungsentwicklung an der DAA Hannover mit Schwerpunkt auf moderner Webentwicklung und IT-Security.",
    },
    {
      period: "2024",
      title: "BüroBrücke",
      description:
        "Eigenes KI-Projekt, das deutsche Behördenbriefe analysiert und mehrsprachig erklärt – mit OCR, Fristerkennung und Antwort-Generator.",
    },
    {
      period: "Laufend",
      title: "Lernen & Weiterentwicklung",
      description:
        "Kontinuierlich neue Technologien rund um Next.js, KI-Integration und sauberen, wartbaren Code.",
    },
  ],
};

// ── Seiten-Intros (Hero-Köpfe der Unterseiten) ────────────────
export const pages = {
  leistungen: {
    eyebrow: "Leistungen",
    title: "Alles für deinen digitalen Auftritt",
    subtitle:
      "Von der schnellen Business-Website bis zur massgeschneiderten KI-Anwendung – durchdacht, sauber umgesetzt und auf Ergebnisse ausgelegt.",
  },
  projekte: {
    eyebrow: "Projekte",
    title: "Ausgewählte Arbeiten",
    subtitle:
      "Echte Projekte, echter Code. Ein Einblick in das, was ich baue – live und auf GitHub einsehbar.",
  },
  ueber: {
    eyebrow: "Über mich",
    title: "Hinter Güler.dev steckt eine Person, kein Callcenter.",
    subtitle:
      "Ich bin Fatih – Webentwickler aus Hannover, der Technik nutzt, um echte Probleme zu lösen.",
  },
  kontakt: {
    eyebrow: "Kontakt",
    title: "Lass uns dein Projekt besprechen",
    subtitle:
      "Erzähl mir kurz, was du vorhast – ich melde mich in der Regel innerhalb von 24 Stunden zurück.",
  },
};

// ── Wiederverwendbarer Call-to-Action-Block ───────────────────
export const cta = {
  title: "Bereit, online zu überzeugen?",
  subtitle:
    "Ob neue Website, KI-Tool oder Relaunch – erzähl mir von deinem Vorhaben. Erstgespräch kostenlos und unverbindlich.",
  primary: { label: "Projekt anfragen", href: "/kontakt" },
  secondary: { label: "Projekte ansehen", href: "/projekte" },
};

export const legal = {
  // TODO: Diese Felder mit deinen echten Daten füllen (siehe CONTENT.md).
  impressum: {
    name: "Fatih Güler",
    street: "{{ STRASSE_HAUSNUMMER }}",
    city: "{{ PLZ_ORT }}",
    phone: "{{ TELEFONNUMMER }}",
    email: "fatih.gueler75@gmail.com",
    // Falls umsatzsteuerpflichtig: USt-IdNr. eintragen, sonst Hinweis auf Kleinunternehmer
    vatId: "{{ UST_IDNR_ODER_KLEINUNTERNEHMER_HINWEIS }}",
  },
};
