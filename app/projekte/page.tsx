import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Projekte",
  description: pages.projekte.subtitle,
  alternates: { canonical: "/projekte" },
};

export default function ProjektePage() {
  return (
    <>
      <BlueprintGrid className="pointer-events-none fixed inset-0 z-0 opacity-50" />
      <div className="relative z-10">
        <PageHero
          eyebrow={pages.projekte.eyebrow}
          title={pages.projekte.title}
          subtitle={pages.projekte.subtitle}
          stamp="01"
        />
        <ProjectsFilter />
        <CaseStudiesGrid />
        <CTA />
      </div>
    </>
  );
}
