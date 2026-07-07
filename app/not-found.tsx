import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/ui/ScrambleText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6">
      <div
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        aria-hidden
      />
      <div className="relative text-center">
        {/* 404 mit Grin-Baseline (Ecken hoch, Mitte runter) + Scramble je Ziffer */}
        <p
          aria-label="404"
          className="cursor-default font-mono font-black leading-none text-foreground"
          style={{ fontSize: "clamp(8rem, 26vw, 16rem)", letterSpacing: "-0.04em" }}
        >
          <span className="inline-block" style={{ transform: "translateY(-0.05em) rotate(-7deg)" }}>
            <ScrambleText text="4" />
          </span>
          <span className="inline-block" style={{ transform: "translateY(0.06em)" }}>
            <ScrambleText text="0" />
          </span>
          <span className="inline-block" style={{ transform: "translateY(-0.05em) rotate(7deg)" }}>
            <ScrambleText text="4" />
          </span>
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-foreground">
          Seite nicht gefunden
        </h1>
        <p className="mx-auto mt-4 max-w-md font-mono text-sm text-muted">
          Diese Seite existiert nicht (mehr). Vielleicht findest du auf der
          Startseite, was du suchst.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <ArrowLeft />
            Zur Startseite
          </Link>
        </Button>
      </div>
    </div>
  );
}
