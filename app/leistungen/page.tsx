import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCards3D } from "@/components/sections/ServiceCards3D";
import { Process } from "@/components/sections/Process";
import { Pakete } from "@/components/sections/Pakete";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Leistungen",
  description: pages.leistungen.subtitle,
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow={pages.leistungen.eyebrow}
        title={pages.leistungen.title}
        subtitle={pages.leistungen.subtitle}
      />
      <ServiceCards3D />
      <Process />
      <Pakete />
      <CTA />
    </>
  );
}
