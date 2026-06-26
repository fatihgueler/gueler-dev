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
  availability: "Juni 2026",
  location: "Hannover, Deutschland",
  url: "https://guelerdev.de",
  github: "https://github.com/fatihgueler",
  linkedin: "https://www.linkedin.com/in/fatih-g%C3%BCler-0206a639a/",
};

export const siteConfig = {
  name: site.ownerName,
  title: "Webdesign Hannover | Fatih Güler – Websites, die Kunden bringen",
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
  { label: "Projekte", href: "/projekte" },
  { label: "Pakete", href: "/leistungen#pakete" },
  { label: "Über mich", href: "/ueber" },
];

export const hero = {
  lines: ["Websites, die", "Kunden bringen."],
  subtitle:
    "Mehr Anfragen. Mehr Kunden. Eine Website, die rund um die Uhr für dein Unternehmen arbeitet.",
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
        "Ein kurzes Gespräch über dein Vorhaben, deine Ziele und dein Budget. Du bekommst eine ehrliche Einschätzung — kostenlos und unverbindlich.",
    },
    {
      number: "02",
      title: "Konzept & Festpreis",
      description:
        "Ich entwerfe Struktur, Design-Richtung und einen klaren Festpreis. Du weißt vorher genau, was du bekommst — keine versteckten Kosten.",
    },
    {
      number: "03",
      title: "Entwicklung",
      description:
        "Umsetzung mit modernem, sauberem Code. Next.js 15, TypeScript, Tailwind. Du siehst regelmäßig Zwischenstände und kannst jederzeit Feedback geben.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Wir gehen live, ich richte alles ein — Domain, Hosting, Analytics. Und bin auch danach für Wartung und Weiterentwicklung an deiner Seite.",
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
        "One Pager in 5–7 Tagen. Business-Site in 2–3 Wochen. Weil dein Business nicht auf mich warten soll.",
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
        "Smarte Chatbots und Automatisierungen die wirklich funktionieren — kein Gimmick, sondern echter Mehrwert.",
    },
    {
      icon: "TrendingUp",
      title: "Conversion-Optimiert",
      description:
        "Jedes Element hat einen Zweck: Besucher in Anfragen verwandeln. Mobile-first, schnell, SEO-optimiert.",
    },
  ],
};

export const projectHighlight = {
  title: "Award-Level Code. Messbare Ergebnisse.",
  description:
    "Von der Fahrschule bis zum KI-Tool: Jedes Projekt wird mit demselben Anspruch gebaut — technisch sauber, visuell stark, auf Conversions ausgerichtet.",
  cta: { label: "Projekte ansehen", href: "/projekte" },
  highlights: [
    { name: "BüroBrücke", tag: "KI-Tool" },
    { name: "SmartKitchen", tag: "Fullstack .NET" },
  ],
};

export const pakete = {
  eyebrow: "Pakete",
  title: "Klare Pakete, faire Preise",
  subtitle:
    "Festpreise statt Stundenzettel – damit du von Anfang an weißt, woran du bist.",
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
      description: "Maßgeschneiderte Anwendungen mit KI-Funktionen oder eigener Logik.",
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
      question: "Was kostet eine professionelle Website?",
      answer:
        "One Pager ab 500 €, Business-Site ab 1.500 €, Premium auf Anfrage. Immer zum Festpreis – keine versteckten Kosten, keine Überraschungen.",
    },
    {
      question: "Wie lange dauert die Entwicklung?",
      answer:
        "One Pager: 5–7 Tage. Business-Site: 2–3 Wochen. Premium-Projekte: nach Absprache. Der genaue Zeitplan hängt davon ab, wie schnell Texte und Bilder vorliegen – dabei unterstütze ich dich gern.",
    },
    {
      question: "Ich habe keine technischen Kenntnisse — ist das ein Problem?",
      answer:
        "Nein. Ich übernehme alles: Konzept, Design, Entwicklung, Launch, Hosting. Du gibst Feedback, ich setze um – du brauchst kein technisches Vorwissen.",
    },
    {
      question: "Was unterscheidet dich von einer Agentur?",
      answer:
        "Kein Agentur-Aufschlag. Direkte Kommunikation. Ein Ansprechpartner. Schnellere Umsetzung und ein persönlicheres Ergebnis – du sprichst immer mit der Person, die deine Website tatsächlich baut.",
    },
    {
      question: "Bietest du auch KI-Funktionen an?",
      answer:
        "Ja — KI-Chatbots, Dokumenten-Analyse, Automatisierungen. Skalierbar, datenschutzkonform und auf dein Business zugeschnitten. Im Erstgespräch sage ich dir ehrlich, ob sich KI für deinen Fall lohnt.",
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

/**
 * Storytelling-Pitch: wird beim Scrollen Wort für Wort von grau
 * zu weiß bzw. Akzentfarbe eingefärbt (StoryPitch-Section).
 */
export const storyPitch = {
  segments: [
    { text: "Ich baue keine Websites, die nur gut aussehen." },
    { text: "Ich baue", },
    { text: "digitale Vertriebsmitarbeiter", accent: true },
    { text: "— schnell, präzise und" },
    { text: "rund um die Uhr", accent: true },
    { text: "im Einsatz für dein Unternehmen." },
  ] as Array<{ text: string; accent?: boolean }>,
};

export const cta = {
  title: "Bereit, online zu überzeugen?",
  subtitle: "Erstgespräch kostenlos und unverbindlich.",
  primary: { label: "Kostenlose Analyse anfragen", href: "/#kontakt" },
  secondary: { label: "Projekte ansehen", href: "/projekte" },
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

export type CaseStudyColor = "indigo" | "amber" | "violet" | "cyan";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  metrics: CaseStudyMetric[];
  color: CaseStudyColor;
  liveUrl: string;
};

export const caseStudies: CaseStudy[] = [
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
    metrics: [
      { value: "5", label: "unterstützte Sprachen" },
      { value: "0,9s", label: "durchschnittliche Analysezeit" },
      { value: "96/100", label: "Lighthouse Accessibility" },
    ],
    color: "indigo",
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
    metrics: [
      { value: "−70%", label: "weniger manuelle Planungszeit" },
      { value: "1 Ort", label: "statt Zettel & Excel" },
    ],
    color: "amber",
    liveUrl: "",
  },
  // TODO: durch echte Kundendaten ersetzen
  {
    id: "fahrschule-startklar",
    title: "Fahrschule Startklar",
    category: "Local Business / Lead-Funnel",
    tagline: "Vom ersten Klick zur Probestunde – in unter zwei Minuten.",
    challenge:
      "Die Fahrschule erhielt Anfragen fast nur per Telefon und verlor abends und am Wochenende potenzielle Fahrschüler. Die alte Website war nicht mobil bedienbar und nannte weder Preise noch freie Termine.",
    solution:
      "Editorialer One-Pager in Schwarz mit violettem Akzent und mehrstufigem Anfrage-Funnel: Führerscheinklasse wählen, Wunschtermin angeben, Kontaktdaten hinterlassen. Jede Anfrage landet automatisch strukturiert im Postfach der Fahrschule.",
    result:
      "Anfragen kommen jetzt rund um die Uhr und vorqualifiziert herein. Das Team ruft gezielt zurück, statt am Telefon Standardfragen zu beantworten.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Lead-Funnel", "Local SEO"],
    metrics: [
      { value: "+40%", label: "mehr Anfragen in 3 Monaten" },
      { value: "0,8s", label: "Ladezeit (vorher 4,2s)" },
      { value: "98/100", label: "Lighthouse Performance" },
    ],
    color: "violet",
    liveUrl: "",
  },
  // TODO: durch echte Kundendaten ersetzen
  {
    id: "barbershop-nachtschnitt",
    title: "Barbershop Nachtschnitt",
    category: "Local Business / Terminanfrage",
    tagline: "Dunkles Editorial-Design für einen Premium-Barbershop.",
    challenge:
      "Der Barbershop wollte sich vom Wettbewerb abheben und buchte Termine bislang nur über Instagram-DMs – unübersichtlich, leicht zu übersehen und schwer zu planen.",
    solution:
      "Atmosphärische Website im dunklen Editorial-Stil mit großflächiger Typografie und einem schlanken Online-Terminanfrage-Formular: Service, Barber und Wunschzeitraum auswählen, Bestätigung folgt per Nachricht.",
    result:
      "Klare Außenwirkung als Premium-Anbieter und ein zentraler Kanal für Terminanfragen statt verstreuter DMs. Weniger Leerlauf, planbarere Auslastung.",
    tags: ["Next.js", "Tailwind", "Editorial Design", "Terminanfrage", "DSGVO"],
    metrics: [
      { value: "+55%", label: "Online-Terminanfragen" },
      { value: "−30%", label: "weniger No-Shows" },
      { value: "1,1s", label: "Ladezeit auf Mobil" },
    ],
    color: "violet",
    liveUrl: "",
  },
  // TODO: durch echte Kundendaten ersetzen
  {
    id: "elektro-leinequell",
    title: "Elektro Leinequell",
    category: "Handwerk / Local SEO",
    tagline: "Lokal gefunden werden – und Angebote per Klick anfragen.",
    challenge:
      "Der Elektrobetrieb tauchte bei lokalen Suchen kaum auf und hatte keine Möglichkeit, Angebotsanfragen strukturiert entgegenzunehmen. Aufträge kamen fast nur über Empfehlungen.",
    solution:
      "Suchmaschinenoptimierte Business-Website mit Leistungsseiten je Gewerk, lokalen Landingpages für umliegende Stadtteile und einem geführten Angebotsanfrage-Formular inklusive Foto-Upload für den Schadensfall.",
    result:
      "Deutlich bessere lokale Sichtbarkeit und planbarer Anfragen-Eingang. Die Foto-Uploads ermöglichen schnellere, präzisere Kostenvoranschläge.",
    tags: ["Next.js", "Local SEO", "Tailwind", "Angebots-Funnel", "DSGVO"],
    metrics: [
      { value: "+120%", label: "mehr Sichtbarkeit lokal" },
      { value: "Top 3", label: "bei lokalen Suchbegriffen" },
      { value: "+35%", label: "qualifizierte Anfragen" },
    ],
    color: "cyan",
    liveUrl: "",
  },
  // TODO: durch echte Kundendaten ersetzen
  {
    id: "cafe-leinekind-chatbot",
    title: "Café Leinekind",
    category: "Gastronomie / KI-Chatbot",
    tagline: "Reservierungen rund um die Uhr – beantwortet von der KI.",
    challenge:
      "Das Café konnte Reservierungsanfragen während des Tagesgeschäfts kaum zeitnah beantworten. Gäste sprangen ab, wenn niemand ans Telefon ging oder Nachrichten unbeantwortet blieben.",
    solution:
      "Website mit integriertem KI-Chatbot auf Basis der Claude API: Der Assistent beantwortet Fragen zu Öffnungszeiten, Karte und Allergenen, nimmt Reservierungswünsche entgegen und leitet sie strukturiert ans Team weiter.",
    result:
      "Gäste erhalten sofort Antwort, auch außerhalb der Stoßzeiten. Reservierungswünsche werden vollständig erfasst und das Team wird im Tagesgeschäft entlastet.",
    tags: ["Next.js", "Claude API", "KI-Chatbot", "Tailwind", "DSGVO"],
    metrics: [
      { value: "24/7", label: "automatische Antworten" },
      { value: "+60%", label: "mehr Reservierungsanfragen" },
      { value: "<3s", label: "Antwortzeit des Chatbots" },
    ],
    color: "violet",
    liveUrl: "",
  },
];

// TODO: durch echte Testimonials ersetzen
export const testimonials = [
  {
    quote:
      "Nach dem Relaunch kamen die ersten Online-Anfragen schon in der ersten Woche rein – und zwar abends, wenn bei uns niemand mehr ans Telefon geht. Genau das hatte vorher gefehlt.",
    name: "Markus Hellwig",
    role: "Inhaber",
    company: "Fahrschule Startklar",
    rating: 5,
  },
  {
    quote:
      "Die Seite lädt spürbar schneller als unsere alte und sieht auf dem Handy einfach gut aus. Unsere Stammkunden haben das von sich aus angesprochen.",
    name: "Deniz Yıldırım",
    role: "Geschäftsführer",
    company: "Barbershop Nachtschnitt",
    rating: 5,
  },
  {
    quote:
      "Wir werden jetzt bei Google in unserer Region tatsächlich gefunden. Die Angebotsanfragen mit Fotos sparen uns bei jedem Auftrag eine Vor-Ort-Besichtigung.",
    name: "Andrea Petersen",
    role: "Büroleitung",
    company: "Elektro Leinequell",
    rating: 5,
  },
  {
    quote:
      "Der Chatbot beantwortet die immer gleichen Fragen nach Öffnungszeiten und Allergenen, während wir im Service stehen. Reservierungen kommen vollständig und sauber bei uns an.",
    name: "Sophie Brandt",
    role: "Inhaberin",
    company: "Café Leinekind",
    rating: 5,
  },
  {
    quote:
      "Fatih hat von Anfang an mitgedacht und ehrlich gesagt, was sich für uns lohnt und was nicht. Festpreis, klare Absprachen, pünktlicher Launch – genau so soll es sein.",
    name: "Thomas Krüger",
    role: "Selbstständiger Sanitärmeister",
    company: "Krüger Haustechnik",
    rating: 5,
  },
];
