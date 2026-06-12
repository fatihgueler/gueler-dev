import type { Metadata } from "next";

import { pages } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { ParticleLoader } from "@/components/three/ParticleLoader";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Projekte",
  description: pages.projekte.subtitle,
};

export default function ProjektePage() {
  return (
    <>
      <ParticleLoader className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60" />
      <div className="relative z-10">
        <PageHero
          eyebrow={pages.projekte.eyebrow}
          title={pages.projekte.title}
          subtitle={pages.projekte.subtitle}
        />
        <ProjectsFilter />
        <CaseStudiesGrid />
        <CTA />
      </div>
    </>
  );
}
