import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

import { site, siteConfig } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
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
    title: "Websites, die Kunden bringen – Fatih Güler",
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
    { media: "(prefers-color-scheme: dark)", color: "#04040a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Zum Inhalt springen
          </a>
          <ScrollProgress />
          <Cursor />
          <Header />
          <MotionProvider>
            <SmoothScroll>
              <main id="main">{children}</main>
              <Footer />
            </SmoothScroll>
            <ConsentBanner />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
