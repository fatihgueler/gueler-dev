import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Trust } from "@/components/sections/Trust";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Über mich",
  description: pages.ueber.subtitle,
  alternates: { canonical: "/ueber" },
};

export default function UeberPage() {
  return (
    <>
      <PageHero
        eyebrow={pages.ueber.eyebrow}
        title={pages.ueber.title}
        subtitle={pages.ueber.subtitle}
      />
      <About />
      <Timeline />
      <Skills />
      <Trust />
      <CTA />
    </>
  );
}
