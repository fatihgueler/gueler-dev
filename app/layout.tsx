import type { Metadata } from "next";
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Fatih Güler – Webdesign Hannover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.ownerName} – Webdesign Hannover`,
    description: "Freelance Webentwickler. KMU-Websites ab 500€.",
    images: ["/og-image.jpg"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `${site.ownerName} – Webdesign Hannover`,
  description:
    "Freelance Webentwickler für KMU in Hannover. Next.js Websites und KI-Lösungen.",
  url: siteUrl,
  email: site.email,
  telephone: site.phone,
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
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${syne.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="grain min-h-screen">
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
