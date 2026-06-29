"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { nav, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLElement>(null);
  const wasOpen = React.useRef(false);

  // Body-Scroll-Lock, solange das Panel offen ist.
  React.useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fokus-Management: beim Öffnen in das Panel (Schließen-Button), beim
  // Schließen zurück auf den Auslöser (a11y — kein Fokus-Verlust ins Nichts).
  React.useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Escape schließt; Tab bleibt im Panel gefangen (Fokus-Falle, WCAG 2.1.2/2.4.3).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-10 w-10 items-center justify-center rounded-none text-foreground transition-colors hover:text-violet-3"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[70] overflow-hidden transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <nav
          ref={panelRef}
          id="mobile-nav-panel"
          aria-label="Mobile Navigation"
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface px-7 py-7 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-medium">
              {site.name.replace(".dev", "")}
              <span className="text-violet-3">.dev</span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-none text-foreground transition-colors hover:text-violet-3"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <div className="mt-12 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl text-foreground transition-colors hover:text-violet-3"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="w-full">
              <Link href="/#kontakt" onClick={() => setOpen(false)}>
                Kostenloses Erstgespräch anfragen
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
