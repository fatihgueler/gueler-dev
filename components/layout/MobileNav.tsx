"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { nav, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-gold"
      >
        <Menu className="size-6" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/85 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <nav
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface px-7 py-7 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-medium">
              {site.name.replace(".dev", "")}
              <span className="text-gold">.dev</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-gold"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="mt-12 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl text-foreground transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="w-full">
              <Link href="#kontakt" onClick={() => setOpen(false)}>
                Projekt anfragen
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
