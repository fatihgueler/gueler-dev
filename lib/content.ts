/**
 * ─────────────────────────────────────────────────────────────
 *  Güler.dev – Zentrale Inhalte
 *
 *  ALLE Texte, Daten und Links der Seite stehen hier.
 *  Zum Ändern von Inhalten muss NUR diese Datei bearbeitet werden.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Güler.dev",
  tagline: "Webdesign Hannover",
  ownerName: "Fatih Güler",
  email: "fatih.gueler75@gmail.com",
  phone: "+4915777688060",
  // wa.me verlangt internationales Format ohne führende Null
  whatsapp: "https://wa.me/4915777688060",
  calendly: "https://calendly.com/fatih-gueler75",
  availability: "Frei für neue Projekte",
  location: "Hannover, Deutschland",
  url: "https://guelerdev.de",
  github: "https://github.com/fatihgueler",
  linkedin: "https://www.linkedin.com/in/fatih-g%C3%BCler-0206a639a/",
};

export const siteConfig = {
  name: site.ownerName,
  title: "Webdesign Hannover & deutschlandweit | Fatih Güler",
  description:
    "Freelance Webentwickler aus Hannover – Websites für KMU in ganz Deutschland. Modern, schnell, gebaut, um aus Besuchern Anfragen zu machen. One-Pager ab 500 €.",
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
  { label: "Projekte", href: "/projekte" },
  { label: "Pakete", href: "/leistungen#pakete" },
  { label: "Über mich", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
];

/**
 * Ratgeber-/Content-Seiten (GEO). Footer und Sitemap iterieren hierüber –
 * eine neue Seite hier eintragen reicht für Verlinkung + Indexierung.
 */
export const guides = [
  { slug: "was-kostet-eine-website", label: "Was kostet eine Website?" },
  { slug: "webentwickler-vs-agentur", label: "Webentwickler oder Agentur?" },
  { slug: "wie-lange-dauert-eine-website", label: "Wie lange dauert eine Website?" },
  { slug: "website-fuer-lokale-unternehmen", label: "Website für lokale Unternehmen" },
];

export const hero = {
  lines: ["Kunden suchen Sie.", "Werden Sie auch gefunden?"],
  subtitle:
    "Aus Hannover für ganz Deutschland: moderne Websites zum Festpreis, in wenigen Wochen – ein fester Ansprechpartner statt Agentur.",
  cta: { label: "Kostenloses Erstgespräch", href: "#kontakt" },
  scrollHint: "nach unten scrollen",
};

export const techStack = [
  "Lieferzeit unter 4 Wochen",
  "Festpreis – keine versteckten Kosten",
  "Mobile-first & blitzschnell",
  "SEO von Anfang an",
  "Direkte Kommunikation, kein Agentur-Umweg",
  "Persönlicher Ansprechpartner",
];

export const services = {
  eyebrow: "Leistungen",
  title: "Was ich für Sie baue",
  subtitle:
    "Von der schnellen Business-Website bis zur KI-Integration – sauber gebaut und darauf ausgelegt, aus Besuchern Anfragen zu machen.",
  items: [
    {
      icon: "Globe",
      title: "Business-Websites",
      description:
        "Schnelle, suchmaschinenoptimierte Websites mit Next.js. Mobile-first, barrierearm und so gebaut, dass aus Besuchern Anfragen werden.",
      points: ["SEO & lokale Sichtbarkeit", "Durchdachtes, responsives Design", "Blitzschnelle Ladezeiten"],
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
        "Maßgeschneiderte Fullstack-Anwendungen: Buchungssysteme, Dashboards, interne Tools – sicher, wartbar und auf Ihren Betrieb zugeschnitten.",
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
      title: "Weitblick",
      category: "Konzept-Showcase",
      description:
        "Konzept-Website für eine Energieberatung rund um energetische Sanierung, Förderung und Sanierungsplanung – mit geführtem Fördercheck-Funnel zur Lead-Generierung und durchdachter Kontaktstrecke.",
      tags: ["Next.js 14", "TypeScript", "Tailwind", "Lead-Funnel"],
      liveUrl: "https://weitblick-rv4x.vercel.app/",
      repoUrl: "https://github.com/fatihgueler/Weitblick",
      featured: false,
    },
    {
      title: "VoxNote",
      category: "KI-SaaS",
      description:
        "KI-Dokumentationstool für Therapie- und Arztpraxen: gesprochene oder getippte Notizen nach der Sitzung werden automatisch in strukturierte SOAP-Notizen überführt – datenschutzfreundlich mit Feldverschlüsselung, pseudonymen Kürzeln und ohne Audio-Speicherung.",
      tags: ["KI-Strukturierung", "Spracheingabe", "SOAP", "DSGVO"],
      liveUrl: "https://voxnote-production.up.railway.app/",
      repoUrl: "https://github.com/fatihgueler/Voxnote",
      featured: true,
    },
    {
      title: "Lead-Finder",
      category: "Web-App",
      description:
        "Web-App zur B2B-Lead-Recherche: findet kleine und mittlere Betriebe ohne eigene Website – filterbar nach Stadt, Umkreis und Branche, mit Telefonnummern-Abgleich, Kartenansicht und CSV-Export. Datenbasis: OpenStreetMap.",
      tags: ["FastAPI", "Python", "React", "OpenStreetMap"],
      liveUrl: "https://fatihgueler-production.up.railway.app/",
      repoUrl: "https://github.com/fatihgueler/fatihgueler-",
      featured: false,
    },
  ],
};

export const process = {
  eyebrow: "Ablauf",
  title: "So kommen Sie ans Ziel",
  subtitle: "Transparent, planbar und ohne böse Überraschungen.",
  steps: [
    {
      number: "01",
      title: "Kennenlernen",
      description:
        "Ein kurzes Gespräch über Ihr Vorhaben, Ihre Ziele und Ihr Budget. Sie bekommen eine ehrliche Einschätzung — kostenlos und unverbindlich.",
    },
    {
      number: "02",
      title: "Konzept & Festpreis",
      description:
        "Ich entwerfe Struktur, Design-Richtung und einen klaren Festpreis. Sie wissen vorher genau, was Sie bekommen — keine versteckten Kosten.",
    },
    {
      number: "03",
      title: "Entwicklung",
      description:
        "Umsetzung mit modernem, sauberem Code. Next.js 15, TypeScript, Tailwind. Sie sehen regelmäßig Zwischenstände und können jederzeit Feedback geben.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Wir gehen live, ich richte alles ein — Domain, Hosting, Statistik. Und bin auch danach für Wartung und Weiterentwicklung an Ihrer Seite.",
    },
  ],
};

export const features = {
  title: "Gebaut für Ergebnisse — nicht für Ästhetik allein.",
  items: [
    {
      icon: "Zap",
      title: "Schnelle Lieferzeit",
      description:
        "One-Pager in 5–7 Tagen. Business-Website in 2–3 Wochen. Weil Ihr Geschäft nicht auf mich warten soll.",
    },
    {
      icon: "Shield",
      title: "DSGVO & Sicherheit",
      description:
        "Datenschutzkonforme Umsetzung nach deutschem Recht. SSL, sichere Formulare, Impressum — alles inklusive.",
    },
    {
      icon: "Brain",
      title: "KI-Integration",
      description:
        "Chatbots und Automatisierungen, die wirklich funktionieren — kein Gimmick, sondern echter Mehrwert.",
    },
    {
      icon: "TrendingUp",
      title: "Gebaut für Anfragen",
      description:
        "Jedes Element hat einen Zweck: Besucher in Anfragen verwandeln. Mobile-first, schnell, SEO-optimiert.",
    },
  ],
};

export const projectHighlight = {
  title: "Sauberer Code. Echte Projekte.",
  description:
    "Vom KI-Tool bis zur Fullstack-App: Jedes Projekt wird mit demselben Anspruch gebaut — technisch sauber, visuell stark, auf Conversions ausgerichtet. Live und auf GitHub einsehbar.",
  cta: { label: "Projekte ansehen", href: "/projekte" },
  highlights: [
    { name: "BüroBrücke", tag: "KI-Tool" },
    { name: "VoxNote", tag: "KI-SaaS" },
  ],
};

/**
 * EINE kanonische Paket-Definition für alle Oberflächen (/leistungen,
 * /was-kostet-eine-website, llms.txt, JSON-LD, Kontaktformular).
 * Früher existierten zwei widersprüchliche Systeme (5 vs. 6 Seiten,
 * unterschiedliche Tier-Namen) — nie wieder zwei Quellen pflegen.
 */
export type Paket = {
  id: "one-pager" | "business" | "ki";
  name: string;
  price: string;
  description: string;
  /** Lieferzeit — auf jeder Oberfläche anzeigen (Kaufentscheidung!). */
  delivery: string;
  features: string[];
  featured: boolean;
  /** Neutrale Empfehlung, KEINE Beliebtheits-Behauptung (§ 5 UWG). */
  badge?: string;
  cta: string;
};

export const paketeItems: Paket[] = [
  {
    id: "one-pager",
    name: "One-Pager",
    price: "ab 500 €",
    description: "Eine starke Seite, die Ihr Angebot auf den Punkt bringt.",
    delivery: "5–7 Tage",
    features: [
      "Eine Seite mit allen wichtigen Infos",
      "Responsives Design für alle Geräte",
      "Kontaktformular inklusive",
      "Grundlegende SEO-Einrichtung",
      "Impressum & Datenschutz",
    ],
    featured: false,
    cta: "Jetzt anfragen",
  },
  {
    id: "business",
    name: "Business-Website",
    price: "ab 1.500 €",
    description: "Mehrseitiger Auftritt für Unternehmen, die online überzeugen wollen.",
    delivery: "2–3 Wochen",
    features: [
      "Bis zu 5 Unterseiten",
      "Individuelles Design nach Maß",
      "SEO-Optimierung für lokale Sichtbarkeit",
      "Kontaktformular & Anbindung an Google Maps",
      "Cookielose Basis-Statistik auf Wunsch",
      "Impressum & Datenschutz",
    ],
    featured: true,
    badge: "Empfohlen für die meisten KMU",
    cta: "Jetzt anfragen",
  },
  {
    id: "ki",
    name: "KI & Automatisierung",
    // TODO(Fatih): Preisanker bestätigen — Platzhalter aus dem Discovery-Brief.
    price: "Projekte ab 3.000 €",
    description: "Maßgeschneiderte Anwendungen mit KI-Funktionen oder eigener Logik.",
    delivery: "nach Absprache",
    features: [
      "Individuelle Konzeption & Architektur",
      "KI-Integration (Chatbots, Automatisierung, OCR)",
      "Datenbank- & Backend-Anbindung",
      "Laufende Betreuung nach dem Launch",
    ],
    featured: false,
    cta: "Projekt besprechen",
  },
];

export const pakete = {
  eyebrow: "Pakete",
  title: "Klare Pakete, faire Preise",
  subtitle:
    "Festpreise statt Stundenzettel – damit Sie von Anfang an wissen, woran Sie sind.",
  items: paketeItems,
  note: "Alle Preise verstehen sich als Richtwerte – das genaue Angebot richtet sich nach Ihrem Projekt und wird vorab gemeinsam festgelegt.",
};

export const trust = {
  eyebrow: "Warum ich",
  title: "Worauf Sie sich verlassen können",
  items: [
    {
      icon: "Zap",
      title: "Direkt erreichbar",
      description: "Kein Callcenter, keine Warteschleifen – Sie sprechen direkt mit mir.",
    },
    {
      icon: "FileCheck",
      title: "Festpreis vorab",
      description: "Sie kennen die Kosten, bevor das Projekt startet – keine bösen Überraschungen.",
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
    "Ich bin Webentwickler aus Hannover und entwickle als Freelancer Websites und Web-Anwendungen für kleine Unternehmen und Selbstständige.",
    "Mein Fokus liegt auf moderner Webentwicklung mit Next.js und auf dem Einsatz von KI, um echte Probleme zu lösen – wie bei meinem Projekt BüroBrücke, das Menschen mit Sprachbarrieren bei deutschen Behördenbriefen hilft.",
    "Mir ist wichtig, dass Technik einen Zweck erfüllt: schnelle Seiten, ehrliche Beratung und Lösungen, die Sie verstehen und die Ihnen wirklich Anfragen bringen.",
  ],
  highlights: [
    "Freelance-Webentwickler aus Hannover – persönlich erreichbar",
    "Schwerpunkt Webentwicklung & IT-Security",
    "Spezialisiert auf Next.js, TypeScript & KI-Integration",
    "Persönlich, direkt erreichbar, ohne Agentur-Overhead",
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  title: "Kostenloses Erstgespräch anfragen",
  subtitle:
    "Erzählen Sie mir kurz von Ihrem Vorhaben – egal ob Sie schon eine Website haben oder bei null starten. Sie bekommen eine ehrliche Einschätzung, kostenlos und unverbindlich.",
  successMessage: "Nachricht gesendet! Ich melde mich innerhalb von 24 Stunden.",
  errorMessage:
    "Etwas hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie direkt an: fatih.gueler75@gmail.com",
  packageOptions: [
    { value: "one-pager", label: "One-Pager (ab 500 €)" },
    { value: "business", label: "Business-Website (ab 1.500 €)" },
    { value: "ki", label: "KI & Automatisierung (ab 3.000 €)" },
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
    "Buchen Sie ein kostenloses Erstgespräch – 30 Minuten, unverbindlich, ohne Verkaufsdruck.",
  ctaLabel: "Kostenloses Erstgespräch buchen",
};

export const faq = {
  eyebrow: "FAQ",
  title: "Häufige Fragen",
  subtitle:
    "Die wichtigsten Antworten vorab – alles Weitere klären wir im kostenlosen Erstgespräch.",
  items: [
    {
      question: "Was kostet eine Website beim Freelancer?",
      answer:
        "One-Pager ab 500 €, Business-Website ab 1.500 €, KI- und Automatisierungs-Projekte ab 3.000 €. Immer zum Festpreis – keine versteckten Kosten, keine Überraschungen.",
    },
    {
      question: "Wie lange dauert die Entwicklung?",
      answer:
        "One-Pager: 5–7 Tage. Business-Website: 2–3 Wochen. KI- und Web-App-Projekte: nach Absprache. Der genaue Zeitplan hängt davon ab, wie schnell Texte und Bilder vorliegen – dabei unterstütze ich Sie gern.",
    },
    {
      question: "Ich habe keine technischen Kenntnisse — ist das ein Problem?",
      answer:
        "Nein. Ich übernehme alles: Konzept, Design, Entwicklung, Launch, Hosting. Sie geben Feedback, ich setze um – Sie brauchen kein technisches Vorwissen.",
    },
    {
      question: "Was unterscheidet Sie von einer Agentur?",
      answer:
        "Kein Agentur-Aufschlag. Direkte Kommunikation. Ein Ansprechpartner. Schnellere Umsetzung und ein persönlicheres Ergebnis – Sie sprechen immer mit der Person, die Ihre Website tatsächlich baut.",
    },
    {
      question: "Bieten Sie auch KI-Funktionen an?",
      answer:
        "Ja — KI-Chatbots, Dokumenten-Analyse, Automatisierungen. Datenschutzfreundlich umgesetzt und auf Ihr Geschäft zugeschnitten. Im Erstgespräch sage ich Ihnen ehrlich, ob sich KI für Ihren Fall lohnt.",
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
    title: "Alles für Ihren digitalen Auftritt",
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
    title: "Lassen Sie uns Ihr Projekt besprechen",
    subtitle:
      "Erzählen Sie mir kurz, was Sie vorhaben – ich melde mich in der Regel innerhalb von 24 Stunden zurück.",
  },
};

/**
 * Storytelling-Pitch: wird beim Scrollen Wort für Wort von grau
 * zu weiß bzw. Akzentfarbe eingefärbt (StoryPitch-Section).
 */
export const storyPitch = {
  segments: [
    { text: "Sie haben eine Website." },
    { text: "Aber sie bringt Ihnen" },
    { text: "keine Anfragen.", accent: true },
    { text: "Nicht weil Ihr Angebot schlecht ist." },
    { text: "Sondern weil Ihre Website" },
    { text: "nicht für Sie arbeitet.", accent: true },
  ] as Array<{ text: string; accent?: boolean }>,
};

export const cta = {
  title: "Bereit, online zu überzeugen?",
  subtitle: "Erstgespräch kostenlos und unverbindlich.",
  primary: { label: "Kostenloses Erstgespräch anfragen", href: "/#kontakt" },
  secondary: { label: "Projekte ansehen", href: "/projekte" },
};

// ── Portfolio-Upgrade v2.0 ─────────────────────────────────────

/** Alias auf die EINE kanonische Paket-Quelle (siehe paketeItems oben). */
export const packages = paketeItems;

export type CaseStudyColor = "indigo" | "amber" | "violet" | "cyan";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  /**
   * Ehrliche Projekt-Einordnung (Eigenprojekt/Konzept-Showcase) — Pflichtfeld.
   * Discovery-Brief: Showcase-Arbeit wird NIE als Kundenauftrag dargestellt.
   */
  status: string;
  tagline: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  metrics: CaseStudyMetric[];
  color: CaseStudyColor;
  liveUrl: string;
  /** Echter Screenshot unter /public; fehlt er, greift der Platzhalter. */
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "buerobuerke",
    title: "BüroBrücke",
    category: "KI-Tool / SaaS",
    status: "Eigenprojekt · live nutzbar",
    tagline: "Bürokratie einfach erklärt – für alle.",
    challenge:
      "Migranten in Deutschland scheitern oft an unverständlichen Behördenbriefen. Das kostet Zeit, Nerven und manchmal wichtige Fristen.",
    solution:
      "KI-gestütztes Tool, das Behördenbriefe in verständliches Deutsch übersetzt, erklärt was zu tun ist, und die nächsten Schritte aufzeigt.",
    result:
      "Barrierefreier Zugang zu deutschen Behördenprozessen. Einfaches, intuitives UI – für Menschen ohne IT-Kenntnisse.",
    tags: ["Next.js", "TypeScript", "KI-Integration", "UX Design", "Accessibility"],
    metrics: [
      { value: "5", label: "unterstützte Sprachen" },
      { value: "Fristen", label: "werden automatisch erkannt" },
      { value: "OCR + KI", label: "Analyse in einem Schritt" },
    ],
    color: "indigo",
    liveUrl: "https://stunning-vibrancy-production-df28.up.railway.app/",
    image: "/projects/buerobruecke-preview.png",
  },
  {
    id: "voxnote",
    title: "VoxNote",
    category: "KI-SaaS / Praxis-Dokumentation",
    status: "Eigenprojekt · live nutzbar",
    tagline: "Diktieren statt tippen – strukturierte SOAP-Notizen in Sekunden.",
    challenge:
      "Dokumentation kostet Therapeut:innen und Ärzt:innen täglich Zeit: Nach jeder Sitzung müssen Beobachtungen, Befunde und Behandlungsplan sauber festgehalten werden – meist manuell, oft erst am Abend. Dabei gelten für Gesundheitsdaten strenge Datenschutzanforderungen.",
    solution:
      "SaaS-Tool, das gesprochene oder getippte Notizen direkt nach der Sitzung automatisch in das SOAP-Format (Subjektiv, Objektiv, Assessment, Plan) strukturiert. Datenschutz ist eingebaut: Feldverschlüsselung, pseudonyme Patientenkürzel und keine Speicherung von Audiodateien.",
    result:
      "Aus einem kurzen Diktat wird eine fertige, strukturierte Notiz – weniger Abendarbeit, konsistente Dokumentation und ein datenschutzfreundlicher Umgang mit sensiblen Gesundheitsdaten.",
    tags: ["KI-Strukturierung", "Spracheingabe", "SOAP", "DSGVO", "Feldverschlüsselung"],
    metrics: [
      { value: "SOAP", label: "automatisch strukturiert" },
      { value: "0", label: "Audiodateien auf dem Server" },
      { value: "Verschlüsselt", label: "Feldverschlüsselung für sensible Daten" },
    ],
    color: "violet",
    liveUrl: "https://voxnote-production.up.railway.app/",
    image: "/projects/voxnote-preview.png",
  },
  {
    id: "lead-finder",
    title: "Lead-Finder",
    category: "Web-App / Lead-Recherche",
    status: "Eigenes Werkzeug · im täglichen Einsatz",
    tagline: "Betriebe ohne Website finden – die ideale Zielgruppe für Webentwickler.",
    challenge:
      "Wer Websites baut, sucht genau die Betriebe, die noch keine haben. Diese manuell zu finden – Branche für Branche, Ort für Ort – ist mühsam und kaum systematisch machbar.",
    solution:
      "Web-App, die kleine und mittlere Betriebe ohne eigene Website aufspürt: Suche nach Stadt und Umkreis, Filter nach Branche, Telefonnummern-Abgleich, Kartenansicht und CSV-Export. Die Datenbasis stammt aus OpenStreetMap, ergänzt um eine Web-Verifikation.",
    result:
      "Eine strukturierte, exportierbare Liste qualifizierter Leads statt stundenlanger Handarbeit – mit klarem Hinweis auf die rechtlichen Rahmenbedingungen (UWG §7, DSGVO) für die B2B-Ansprache.",
    tags: ["FastAPI", "Python", "React", "OpenStreetMap", "CSV-Export"],
    metrics: [
      { value: "0 €", label: "kostenlos nutzbar" },
      { value: "CSV", label: "Export der Treffer" },
      { value: "OSM", label: "offene Datenbasis" },
    ],
    color: "amber",
    liveUrl: "https://fatihgueler-production.up.railway.app/",
    image: "/projects/lead-finder-preview.png",
  },
  {
    id: "weitblick",
    title: "Weitblick",
    category: "Marketing-Website / Lead-Funnel",
    status: "Konzept-Showcase · frei erkundbar",
    tagline: "Energetische Sanierung verständlich machen – und Anfragen, die ankommen.",
    challenge:
      "Energieberatung ist erklärungsbedürftig: Eigentümer, Vermieter und Käufer wissen oft nicht, welche Förderung und welche Maßnahme zu ihrem Wohngebäude passt. Diese Unsicherheit hält viele davon ab, überhaupt anzufragen.",
    solution:
      "Marketing-Website mit einem geführten Fördercheck-Funnel: In drei Schritten – Gebäude auswählen, Maßnahme angeben, Rückmeldung erhalten – qualifiziert sich der Interessent in rund zwei Minuten selbst, mit klarer Leistungsdarstellung und durchdachter Kontaktstrecke.",
    result:
      "Ein niedrigschwelliger Einstieg statt einer abschreckenden Kontaktanfrage: Besucher werden strukturiert von der ersten Frage bis zur qualifizierten Anfrage geführt.",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Lead-Funnel"],
    metrics: [
      { value: "~2 Min", label: "geführter Fördercheck" },
      { value: "3 Schritte", label: "bis zur qualifizierten Anfrage" },
    ],
    color: "cyan",
    liveUrl: "https://weitblick-rv4x.vercel.app/",
    image: "/projects/weitblick-preview.png",
  },
];

/**
 * Kapitel 04 — "Ihr Erfolg" / Transformation.
 * Ehrliche Outcome-Projektion (was sich für SIE ändert), keine fremden
 * Erfolgszahlen. Beschreibt Fähigkeiten der gelieferten Website, nicht
 * Ergebnisse erfundener Kunden.
 */
export const outcomes = {
  eyebrow: "Was Sie bekommen",
  title: "So verändert sich Ihr Geschäft",
  items: [
    {
      title: "Anfragen rund um die Uhr",
      description:
        "Ihre Website nimmt Kontaktanfragen auch dann entgegen, wenn niemand ans Telefon geht — abends, am Wochenende, im Urlaub.",
    },
    {
      title: "Lokal gefunden werden",
      description:
        "Mit sauberer technischer SEO taucht Ihr Betrieb dort auf, wo Ihre Kunden suchen — in Ihrer Stadt, in Ihrer Branche.",
    },
    {
      title: "Schnell auf jedem Gerät",
      description:
        "Ladezeiten im Sekundenbruchteil, besonders auf dem Handy — dort, wo die meisten Ihrer Besucher herkommen.",
    },
    {
      title: "Sie besitzen Ihren Auftritt",
      description:
        "Eigener Code, eigene Domain, kein Baukasten-Abo. Die Seite gehört Ihnen — heute und in fünf Jahren.",
    },
  ],
};

// Kundenstimmen: erst wieder einführen, wenn echte, schriftlich freigegebene
// Zitate vorliegen. NIEMALS erfundene Namen/Firmen (irreführende Werbung, § 5 UWG).
