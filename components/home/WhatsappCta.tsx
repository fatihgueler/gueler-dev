"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export function WhatsappCta() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Subtle gold gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-gold/10 to-gold-2/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Lieber kurz schreiben?
          </h2>

          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Schreib mir direkt auf WhatsApp – Antwort meist innerhalb einer Stunde.
          </p>

          <Button
            asChild
            size="lg"
            variant="primary"
            className="gap-3 mx-auto"
          >
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" />
              WhatsApp öffnen
            </a>
          </Button>

          <p className="text-sm text-muted-2 mt-6">
            {site.phone}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
