import type { Metadata } from "next";
import { Syne, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

import { site } from "@/lib/content";
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
    default: `${site.name} – ${site.tagline} aus Hannover`,
    template: `%s · ${site.name}`,
  },
  description:
    "Freelance Webentwickler aus Hannover. Schnelle, moderne Websites und KI-gestützte Web-Tools mit Next.js – für kleine Unternehmen und Selbstständige.",
  keywords: [
    "Webentwicklung Hannover",
    "Freelance Webentwickler",
    "Next.js Entwickler",
    "Website für kleine Unternehmen",
    "KI Integration",
    "Webdesign Hannover",
  ],
  authors: [{ name: site.ownerName }],
  creator: site.ownerName,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description:
      "Moderne Websites und KI-Lösungen mit Next.js für kleine Unternehmen aus Hannover.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.tagline}`,
    description:
      "Moderne Websites und KI-Lösungen mit Next.js für kleine Unternehmen.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: `${site.tagline} – Freelance Webentwicklung aus Hannover.`,
  url: siteUrl,
  email: site.email,
  founder: { "@type": "Person", name: site.ownerName },
  areaServed: "DE",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hannover",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Webentwicklung",
    "Next.js",
    "React",
    "TypeScript",
    "KI-Integration",
    "IT-Security",
  ],
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
