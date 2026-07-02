import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6">
      <div className="gold-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative text-center">
        <p className="font-display text-[6rem] font-medium leading-none text-cyan">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-foreground">
          Seite nicht gefunden
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Diese Seite existiert nicht (mehr). Vielleicht finden Sie auf der
          Startseite, was Sie suchen.
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
