import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { About, Ausblick, Skills, Timeline, Trust } from "@/components/ueber/UeberSections";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Über mich",
  description: pages.ueber.subtitle,
  // Selbstreferenzierender Canonical (relativ → gegen metadataBase aufgelöst);
  // sonst erbt die Seite den Startseiten-Canonical aus dem Root-Layout.
  alternates: { canonical: "/ueber" },
};

export default function UeberPage() {
  return (
    <>
      <PageHero
        eyebrow={pages.ueber.eyebrow}
        title={pages.ueber.title}
        subtitle={pages.ueber.subtitle}
        stamp="03"
      />
      <About />
      <Timeline />
      <Skills />
      <Trust />
      <Ausblick />
      <CTA />
    </>
  );
}
