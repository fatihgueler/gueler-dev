import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/home/Services";
import { ProcessStairs } from "@/components/home/ProcessStairs";
import { PaketeRows } from "@/components/home/PaketeRows";
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
        stamp="02"
      />
      <PaketeRows index="01" />
      <Services index="02" />
      <ProcessStairs index="03" />
      <CTA />
    </>
  );
}
