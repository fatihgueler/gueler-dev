/**
 * ─────────────────────────────────────────────────────────────
 *  Güler.dev – Zentrale Inhalte
 *
 *  ALLE Texte, Daten und Links der Seite stehen hier.
 *  Zum Ändern von Inhalten musst du NUR diese Datei bearbeiten.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Güler.dev",
  tagline: "Webdesign Hannover",
  ownerName: "Fatih Güler",
  email: "fatih.gueler75@gmail.com",
  phone: "015777688060",
  whatsapp: "https://wa.me/015777688060",
  calendly: "https://calendly.com/fatih-gueler75",
  // Cal.com-Slug für die Terminbuchung (z.B. "fatih-gueler" oder "fatih-gueler/erstgespraech").
  // TODO: Nach dem Anlegen des Cal.com-Accounts hier den echten Slug eintragen.
  cal: "fatih-gueler",
  availability: "Juni 2026",
  location: "Hannover, Deutschland",
  url: "https://guelerdev.de",
  github: "https://github.com/fatihgueler",
  linkedin: "https://www.linkedin.com/in/fatih-g%C3%BCler-0206a639a/",
};

export const siteConfig = {
  name: site.ownerName,
  title: "Webdesign Hannover | Fatih Güler – Websites die Kunden bringen",
  description:
    "Professionelle Websites für KMU in Hannover und deutschlandweit. Modern, schnell, conversion-optimiert. One Pager ab 500€.",
  url: site.url,
  email: site.email,
  phone: site.phone,
  location: site.location,
  social: {
    linkedin: site.linkedin,
    github: site.github,
  },
};

export const nav = [
  { label: "Projekte", href: "/#projekte" },
  { label: "Pakete", href: "/#pakete" },
  { label: "FAQ", href: "/#faq" },
  { label: "Über mich", href: "/ueber" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const hero = {
  eyebrow: "Webentwickler für KMU · Hannover",
  titleStart: "Websites die ",
  titleHighlight: "Kunden bringen",
  titleEnd: ".",
  subtitle:
    "Ich baue professionelle Websites für KMU in Hannover und deutschlandweit. Modern, schnell – und auf Conversions optimiert.",
  primaryCta: { label: "Kostenlose Website-Analyse anfragen", href: "#kontakt" },
  secondaryCta: { label: "Projekte ansehen", href: "#projekte" },
  socialProof: "One Pager ab 500€ · Business Website ab 1.500€",
  stats: [
    { value: "Next.js 15", label: "Moderner Stack" },
    { value: "90+", label: "Lighthouse-Score", count: 90, suffix: "+" },
    { value: "100 %", label: "DSGVO-fokussiert", count: 100, suffix: " %" },
  ],
};

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
      liveUrl: "https://stunning-vibrancy-production-df28.up.railway.app/",
      repoUrl: "https://github.com/fatihgueler/deBueroBruecke",
      featured: true,
    },
    {
      title: "ENOX",
      category: "Mehrsprachige Website",
      description:
        "Marketing-Website für internationale Energieberatung mit 5 Sprachen (DE, EN, ZH, ES, RU), animiertem Fördercheck-Funnel zur Lead-Generierung und integrierten Kontaktformularen.",
      tags: ["Next.js 14", "TypeScript", "Tailwind", "i18n"],
      liveUrl: "https://enox-rv4x.vercel.app/de",
      repoUrl: "https://github.com/fatihgueler/Enox",
      featured: false,
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
  title: "Kostenlose Website-Analyse anfragen",
  subtitle:
    "Ich analysiere Ihre aktuelle Online-Präsenz kostenlos und zeige Ihnen, wie Sie mehr Kunden über Ihre Website gewinnen können.",
  successMessage: "✅ Nachricht gesendet! Ich melde mich innerhalb von 24 Stunden.",
  errorMessage:
    "❌ Etwas hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie direkt an: fatih.gueler75@gmail.com",
  packageOptions: [
    { value: "one-pager", label: "One Pager (ab 500€)" },
    { value: "business", label: "Business Website (ab 1.500€)" },
    { value: "premium", label: "Premium / Custom" },
    { value: "unsicher", label: "Bin noch unsicher" },
  ],
  budgetRanges: [
    { value: "500-1500", label: "500 € – 1.500 €" },
    { value: "1500-5000", label: "1.500 € – 5.000 €" },
    { value: "5000-10000", label: "5.000 € – 10.000 €" },
    { value: "10000+", label: "10.000 € und mehr" },
    { value: "unsure", label: "Bin mir unsicher" },
  ],
};

export const booking = {
  title: "Lieber direkt sprechen?",
  subtitle:
    "Buch dir ein kostenloses Erstgespräch – 30 Minuten, unverbindlich, ohne Verkaufsdruck.",
  ctaLabel: "Kostenloses Erstgespräch buchen",
};

export const faq = {
  eyebrow: "FAQ",
  title: "Häufige Fragen",
  subtitle:
    "Die wichtigsten Antworten vorab – alles Weitere klären wir im kostenlosen Erstgespräch.",
  items: [
    {
      question: "Was kostet eine Website bei dir?",
      answer:
        "Ein One Pager startet ab 500 €, eine mehrseitige Business-Website ab 1.500 €. Web-Apps und KI-Lösungen kalkuliere ich individuell. Du bekommst immer einen Festpreis vor Projektstart – keine versteckten Kosten, keine Stundenzettel.",
    },
    {
      question: "Wie lange dauert es, bis meine Website online ist?",
      answer:
        "Ein One Pager ist in der Regel in 5–7 Tagen fertig, eine Business-Website in 2–3 Wochen. Der genaue Zeitplan hängt davon ab, wie schnell Inhalte wie Texte und Bilder vorliegen – dabei unterstütze ich dich auch gern.",
    },
    {
      question: "Was brauchst du von mir, um zu starten?",
      answer:
        "Im Erstgespräch klären wir Ziele, Zielgruppe und Stil. Danach reichen Logo, Texte und Bilder – falls vorhanden. Wenn nicht, helfe ich bei Texten und nutze professionelles Bildmaterial. Du brauchst kein technisches Vorwissen.",
    },
    {
      question: "Wem gehören Code und Website nach dem Projekt?",
      answer:
        "Dir. Nach vollständiger Bezahlung gehören Design, Inhalte und Code komplett dir – inklusive Zugang zum Code-Repository. Du bist nicht an mich gebunden und kannst die Website jederzeit von jemand anderem weiterpflegen lassen.",
    },
    {
      question: "Was kostet Hosting und laufender Betrieb?",
      answer:
        "Moderne Next.js-Websites lassen sich oft schon ab 0–20 € im Monat hosten (z.B. Vercel oder Hetzner). Ich richte alles ein und berate dich zur günstigsten Variante für deinen Fall. Eine optionale Wartungspauschale für Updates und kleine Änderungen biete ich ebenfalls an.",
    },
    {
      question: "Ist meine Website DSGVO-konform?",
      answer:
        "Ja – Datenschutz wird von Anfang an mitgedacht: datensparsame Tools, Server-Standort EU wo möglich, Impressum und Datenschutzerklärung inklusive. Hinweis: Eine Rechtsberatung ersetze ich nicht, aber die technische Umsetzung folgt deutschem Recht.",
    },
    {
      question: "Lohnt sich KI für mein kleines Unternehmen überhaupt?",
      answer:
        "Oft ja – aber nicht immer. Sinnvolle Beispiele: ein Chatbot, der Kundenanfragen vorqualifiziert, automatische Dokumenten-Auswertung oder FAQ-Assistenten. Im Erstgespräch sage ich dir ehrlich, ob sich KI für deinen Fall rechnet – oder ob eine gute Website erstmal wichtiger ist.",
    },
    {
      question: "Was passiert nach dem Launch, wenn ich Änderungen brauche?",
      answer:
        "Kleinere Anpassungen in den ersten zwei Wochen nach Launch sind inklusive. Danach kannst du Änderungen einzeln beauftragen oder eine monatliche Betreuung buchen – du erreichst mich direkt, ohne Ticketsystem und Warteschleife.",
    },
  ],
};

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

export const cta = {
  title: "Bereit, online zu überzeugen?",
  subtitle:
    "Ob neue Website, KI-Tool oder Relaunch – erzähl mir von deinem Vorhaben. Erstgespräch kostenlos und unverbindlich.",
  primary: { label: "Projekt anfragen", href: "/#kontakt" },
  secondary: { label: "Projekte ansehen", href: "/#projekte" },
};

// ── Portfolio-Upgrade v2.0 ─────────────────────────────────────

export const packages = [
  {
    id: "one-pager",
    name: "One Pager",
    price: "ab 500€",
    description: "Alles auf einer Seite – kompakt, modern, wirkungsvoll.",
    features: [
      "1 Landing Page",
      "Responsive Design (Mobile First)",
      "Kontaktformular",
      "SEO Basis-Optimierung",
      "Google Analytics Einrichtung",
      "Lieferzeit: 5–7 Tage",
    ],
    highlighted: false,
    badge: undefined as string | undefined,
    cta: "Jetzt anfragen",
  },
  {
    id: "business",
    name: "Business Website",
    price: "ab 1.500€",
    description: "Der komplette professionelle Auftritt für Ihr Unternehmen.",
    features: [
      "Bis zu 6 Seiten",
      "Premium Custom Design",
      "Lead-optimierte Formulare",
      "SEO vollständig optimiert",
      "Google Analytics & Search Console",
      "Impressum & Datenschutz",
      "Lieferzeit: 2–3 Wochen",
    ],
    highlighted: true,
    badge: "Beliebteste Wahl" as string | undefined,
    cta: "Jetzt anfragen",
  },
  {
    id: "premium",
    name: "Premium / Custom",
    price: "Auf Anfrage",
    description: "Individuelle Lösungen ohne Kompromisse.",
    features: [
      "Unbegrenzte Seiten",
      "Custom Animationen (Three.js, GSAP)",
      "E-Commerce Integration",
      "CMS für eigene Inhalte",
      "Individuelle Features",
      "Lieferzeit: nach Absprache",
    ],
    highlighted: false,
    badge: undefined as string | undefined,
    cta: "Projekt besprechen",
  },
];

export type CaseStudyColor = "indigo" | "amber";

export const caseStudies = [
  {
    id: "buerobuerke",
    title: "BüroBrücke",
    category: "KI-Tool / SaaS",
    tagline: "Bürokratie einfach erklärt – für alle.",
    challenge:
      "Migranten in Deutschland scheitern oft an unverständlichen Behördenbriefen. Das kostet Zeit, Nerven und manchmal wichtige Fristen.",
    solution:
      "KI-gestütztes Tool, das Behördenbriefe in verständliches Deutsch übersetzt, erklärt was zu tun ist, und die nächsten Schritte aufzeigt.",
    result:
      "Barrierefreier Zugang zu deutschen Behördenprozessen. Einfaches, intuitives UI – für Menschen ohne IT-Kenntnisse.",
    tags: ["Next.js", "TypeScript", "KI-Integration", "UX Design", "Accessibility"],
    color: "indigo" as CaseStudyColor,
    liveUrl: "https://stunning-vibrancy-production-df28.up.railway.app/",
  },
  {
    id: "smartkitchen",
    title: "SmartKitchen",
    category: "Fullstack-App / .NET",
    tagline: "Küchenverwaltung – digital, effizient, übersichtlich.",
    challenge:
      "Rezepte, Lagerbestand, Bestellungen und Wochenplanung wurden manuell und verteilt auf Zettel und Excel geführt – zeitaufwändig und fehleranfällig.",
    solution:
      "Vollständige Fullstack-Anwendung in .NET 8 mit Blazor-Frontend: Rezeptverwaltung, Echtzeit-Inventar, Bestellwesen und automatisch generierte Einkaufslisten aus dem Wochenplan.",
    result:
      "Alle Küchenprozesse an einem Ort. Weniger manueller Aufwand, weniger Fehler – der gesamte Workflow digital abgebildet.",
    tags: [".NET 8", "Blazor", "ASP.NET Core", "EF Core", "SQLite"],
    color: "amber" as CaseStudyColor,
    liveUrl: "",
  },
];

export const testimonials = [
  {
    quote: "{{ KUNDENZITAT_1_EINSETZEN }}",
    name: "{{ NAME_1_EINSETZEN }}",
    company: "{{ FIRMA_1_EINSETZEN }}",
    rating: 5,
  },
  {
    quote: "{{ KUNDENZITAT_2_EINSETZEN }}",
    name: "{{ NAME_2_EINSETZEN }}",
    company: "{{ FIRMA_2_EINSETZEN }}",
    rating: 5,
  },
  {
    quote: "{{ KUNDENZITAT_3_EINSETZEN }}",
    name: "{{ NAME_3_EINSETZEN }}",
    company: "{{ FIRMA_3_EINSETZEN }}",
    rating: 5,
  },
];
