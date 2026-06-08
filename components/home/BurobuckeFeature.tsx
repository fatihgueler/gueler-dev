"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

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
                <a href="https://github.com/fatihgueler/deBueroBruecke" target="_blank" rel="noopener noreferrer">
                  <Github className="size-5" />
                  Code ansehen
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Animated Mockup 40% */}
          <Reveal className="relative" delay={150}>
            <div className="relative aspect-[9/12] rounded-2xl border-8 border-ink-3 bg-gradient-to-b from-ink-2 to-ink overflow-hidden shadow-2xl">
              {/* Browser Frame */}
              <div className="absolute top-0 inset-x-0 h-10 bg-ink-2 border-b border-ink-3 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-gold/20" />
              </div>

              {/* Content */}
              <div className="pt-14 px-6 pb-6 h-full flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="h-3 w-3/4 bg-gradient-to-r from-gold/50 to-transparent rounded" />
                  <div className="h-3 w-full bg-gradient-to-r from-paper/20 to-transparent rounded" />
                  <div className="h-3 w-5/6 bg-gradient-to-r from-paper/20 to-transparent rounded" />

                  <div className="py-4 space-y-3">
                    <div className="h-2 w-full bg-gold/30 rounded" />
                    <div className="h-2 w-5/6 bg-gold/20 rounded" />
                    <div className="h-2 w-3/4 bg-gold/10 rounded" />
                  </div>

                  <button className="w-full h-9 bg-gradient-to-r from-gold to-gold-2 rounded-lg text-ink-3 font-semibold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all" />
                </div>

                {/* Animated glow */}
                <div
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
                  style={{ animation: "float 7s ease-in-out infinite" }}
                />
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
