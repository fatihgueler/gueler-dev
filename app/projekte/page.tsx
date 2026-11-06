import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Projekte",
  description: pages.projekte.subtitle,
  alternates: { canonical: "/projekte" },
};

export default function ProjektePage() {
  return (
    <>
      <PageHero
        eyebrow={pages.projekte.eyebrow}
        title={pages.projekte.title}
        subtitle={pages.projekte.subtitle}
        stamp="01"
      />
      <ProjectsFilter />
      <CaseStudiesGrid />
      <CTA />
    </>
  );
}
