"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const LIVE_URL = "https://stunning-vibrancy-production-df28.up.railway.app/";

export function BurobuckeFeature() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 gold-glow pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 items-center md:grid-cols-[1fr_1fr]">
          {/* Text 60% */}
          <Reveal className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2">
              <span className="text-xs font-semibold tracking-wider text-gold">
                FLAGGSCHIFF-PROJEKT
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-foreground">
              BüroBrücke{" "}
              <span className="text-gradient-gold">— KI die echten Menschen hilft</span>
            </h2>

            <p className="text-lg text-muted">
              Menschen mit Sprachbarrieren kommen bei deutschen Behördenbriefen oft nicht zurecht. BüroBrücke hilft: Mit KI-gestützter OCR, automatischer Spracherkennung und Antwort-Generierung in 5 Sprachen.
            </p>

            <div className="space-y-4">
              <p className="text-sm font-medium text-paper-3">Tech-Stack:</p>
              <div className="flex flex-wrap gap-2">
                {["FastAPI", "React", "Claude API", "OCR", "JWT"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-sm text-gold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="gap-2">
                <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-5" />
                  Live ansehen
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="https://github.com/fatihgueler/deBueroBruecke" target="_blank" rel="noopener noreferrer">
                  <Github className="size-5" />
                  Code ansehen
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Live-Vorschau 40% */}
          <Reveal className="relative" delay={150}>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[9/12] overflow-hidden rounded-2xl border-8 border-ink-3 bg-gradient-to-b from-ink-2 to-ink shadow-2xl transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Browser Frame */}
              <div className="absolute top-0 inset-x-0 z-10 h-10 bg-ink-2 border-b border-ink-3 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/20" />
                </div>
                <span className="font-mono text-[10px] text-paper-3/70">buerobruecke.up.railway.app</span>
              </div>

              {/* Screenshot der Live-App */}
              <Image
                src="/projects/buerobruecke-preview.png"
                alt="Startseite der BüroBrücke-App"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-top pt-10"
              />

              {/* Hover-Overlay */}
              <div className="absolute inset-0 top-10 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/60">
                <span className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-3 opacity-0 shadow-lg shadow-gold/30 transition-opacity duration-300 group-hover:opacity-100">
                  <ExternalLink className="size-4" />
                  Live-Demo öffnen
                </span>
              </div>
            </a>

            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 -z-10 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
