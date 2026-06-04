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
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Kontakt", href: "#kontakt" },
];

export const hero = {
  eyebrow: "Freelance Webentwickler · Hannover",
  // Das/die hervorgehobene(n) Wort(e) werden in Gold gesetzt.
  titleStart: "Websites & KI-Lösungen, die kleine Unternehmen ",
  titleHighlight: "groß",
  titleEnd: " aussehen lassen.",
  subtitle:
    "Ich baue schnelle, moderne Websites und intelligente Web-Tools mit Next.js – sauber umgesetzt, DSGVO-konform und auf echte Ergebnisse ausgelegt.",
  primaryCta: { label: "Projekt anfragen", href: "#kontakt" },
  secondaryCta: { label: "Projekte ansehen", href: "#projekte" },
  // Kleine Vertrauens-Kennzahlen unter dem Hero
  stats: [
    { value: "Next.js 15", label: "Moderner Stack" },
    { value: "90+", label: "Lighthouse-Score" },
    { value: "100 %", label: "DSGVO-fokussiert" },
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
        "Maßgeschneiderte Fullstack-Anwendungen: Buchungssysteme, Dashboards, interne Tools – sicher, wartbar und auf dich zugeschnitten.",
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
      // TODO: Kundenprojekt – Inhalte & Freigabe des Kunden prüfen, bevor es online geht.
      title: "Kundenprojekt",
      category: "Business-Website",
      description:
        "{{ KURZBESCHREIBUNG_KUNDENPROJEKT_EINSETZEN — z. B. Branche, Ziel der Website, Ergebnis }}",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      liveUrl: "",
      repoUrl: "",
      featured: false,
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
        "Ich entwerfe Struktur, Design-Richtung und einen klaren Festpreis. Du weißt vorher genau, was du bekommst.",
    },
    {
      number: "03",
      title: "Entwicklung",
      description:
        "Umsetzung mit modernem, sauberem Code. Du siehst regelmäßig Zwischenstände und kannst jederzeit Feedback geben.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Wir gehen live, ich richte alles ein – und bin auch danach für Wartung und Weiterentwicklung an deiner Seite.",
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
