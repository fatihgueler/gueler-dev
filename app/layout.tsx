import type { Metadata, Viewport } from "next";
import { Syne, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

import { site, siteConfig } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    "Webdesign Hannover",
    "Website erstellen lassen Hannover",
    "Freelancer Webentwickler Hannover",
    "Website für kleine Unternehmen",
    "Next.js Entwickler Hannover",
    "KMU Website Hannover",
    "Webentwicklung Hannover",
    "One Pager Website",
  ],
  authors: [{ name: site.ownerName, url: siteUrl }],
  creator: site.ownerName,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: `${site.ownerName} – Webdesign Hannover`,
    title: "Websites die Kunden bringen – Fatih Güler",
    description:
      "Freelance Webentwickler aus Hannover. KMU-Websites ab 500€. Modern, schnell, conversion-optimiert.",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Fatih Güler – Webdesign Hannover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.ownerName} – Webdesign Hannover`,
    description: "Freelance Webentwickler. KMU-Websites ab 500€.",
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
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
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
        addressLocality: "Hannover",
        addressRegion: "Niedersachsen",
        addressCountry: "DE",
      },
      areaServed: "DE",
      priceRange: "ab 500 €",
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
            description: "Landing Page mit Kontaktformular und SEO-Basis – ab 500 €.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 500,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
          },
          {
            "@type": "Offer",
            name: "Business Website",
            description: "Bis zu 6 Seiten, Premium-Design, vollständige SEO – ab 1.500 €.",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 1500,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
          },
          {
            "@type": "Offer",
            name: "Premium / Custom",
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

/**
 * Setzt das Theme vor dem ersten Paint, damit kein Farb-Flackern (FOUC)
 * entsteht. Muss als Inline-Script ganz am Anfang von <body> stehen.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-theme="dark"
      suppressHydrationWarning
      className={`${syne.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="grain min-h-screen">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
        >
          Zum Inhalt springen
        </a>
        <ScrollProgress />
        <Cursor />
        <Header />
        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
