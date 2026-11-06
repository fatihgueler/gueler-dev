import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { site, siteConfig } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Toaster } from "@/components/ui/sonner";
import { GrinFavicon } from "@/components/ui/GrinFavicon";
import { ConsoleSignature } from "@/components/ui/ConsoleSignature";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollEngine } from "@/components/ui/ScrollEngine";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

// Eine variable Familie für Display (wdth 62) UND Fließtext (wdth 100) –
// selbst gehostet über next/font, keine externen Hosts (CSP).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | Fatih Güler – Webdesign Hannover`,
  },
  description: siteConfig.description,
  keywords: [
    // Lokaler Anker (Standort Hannover)
    "Webdesign Hannover",
    "Webentwickler Hannover",
    "Website erstellen lassen Hannover",
    // Deutschlandweiter Service
    "Webdesign Deutschland",
    "Webentwickler Deutschland",
    "Website erstellen lassen",
    "Freelance Webentwickler",
    "Website für kleine Unternehmen",
    "Webdesign für Selbstständige",
    "KMU Website",
    "Next.js Entwickler",
    "One Pager Website",
  ],
  authors: [{ name: site.ownerName, url: siteUrl }],
  creator: site.ownerName,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: `${site.ownerName} – Webdesign Hannover`,
    title: "Websites, die Kunden bringen – Fatih Güler",
    description:
      "Freelance Webentwickler aus Hannover. KMU-Websites ab 1.000 €. Modern, schnell, conversion-optimiert.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Fatih Güler – Webdesign Hannover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.ownerName} – Webdesign Hannover`,
    description: "Freelance Webentwickler. KMU-Websites ab 1.000 €.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
    { media: "(prefers-color-scheme: light)", color: "#f3f2ed" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: `${site.ownerName} – Webdesign Hannover`,
      description:
        "Freelance Webentwickler für KMU in Hannover. Next.js Websites und KI-Lösungen.",
      url: siteUrl,
      email: site.email,
      telephone: site.phone,
      image: `${siteUrl}/og`,
      founder: { "@id": `${siteUrl}/#person` },
      address: {
        "@type": "PostalAddress",
        // Identisch mit dem Impressum (NAP-Konsistenz für die lokale Suche)
        postalCode: "30823",
        addressLocality: "Garbsen",
        addressRegion: "Niedersachsen",
        addressCountry: "DE",
      },
      areaServed: [
        { "@type": "City", name: "Hannover" },
        { "@type": "Country", name: "Deutschland" },
      ],
      priceRange: "ab 1.000 €",
      serviceType: ["Webentwicklung", "Webdesign", "KI-Integration", "Web-Apps"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website-Pakete",
        itemListElement: [
          {
            "@type": "Offer",
            name: "One Pager",
            description: "Eine Seite mit allen wichtigen Infos, Kontaktformular und SEO-Grundeinrichtung – ab 1.000 €, 5–7 Tage.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 1000,
              priceCurrency: "EUR",
            },
          },
          {
            "@type": "Offer",
            name: "Business-Website",
            description: "Bis zu 5 Unterseiten, individuelles Design, SEO für lokale Sichtbarkeit – ab 2.500 €, 2–3 Wochen.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 2500,
              priceCurrency: "EUR",
            },
          },
          {
            "@type": "Offer",
            name: "KI & Web-App",
            description: "Individuelle Web-Apps und KI-Integrationen – Preis auf Anfrage.",
          },
        ],
      },
      sameAs: [site.linkedin, site.github],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.ownerName,
      jobTitle: "Webentwickler",
      url: `${siteUrl}/ueber`,
      email: site.email,
      worksFor: { "@id": `${siteUrl}/#business` },
      knowsAbout: ["Next.js", "React", "TypeScript", "KI-Integration", "Webdesign"],
      sameAs: [site.linkedin, site.github],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: site.name,
      url: siteUrl,
      inLanguage: "de-DE",
      publisher: { "@id": `${siteUrl}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-signal focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:font-bold focus:uppercase focus:text-ink"
          >
            Zum Inhalt springen
          </a>
          <ScrollProgress />
          <Cursor />
          <GrinFavicon />
          <ConsoleSignature />
          <Header />
          <MotionProvider>
            <main id="main" className="overflow-x-clip">{children}</main>
            <RevealObserver />
            <ScrollEngine />
            <Footer />
            <ConsentBanner />
            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
