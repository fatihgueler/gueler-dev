"use client";

import * as React from "react";
import Link from "next/link";

import { nav, footerExtra, site } from "@/lib/content";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Index-Navigation (mobil): kein Hamburger-Icon, sondern ein beschrifteter
 * „Index"-Schalter. Öffnet ein Vollbild-Inhaltsverzeichnis mit riesigen,
 * nummerierten Zeilen. Radix Dialog liefert Focus-Trap, Esc und Rückgabe
 * des Fokus an den Auslöser.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Index öffnen – Navigation"
            className="flex min-w-[4.5rem] items-center justify-center gap-2 border-l-2 border-border px-4 font-mono text-[0.8125rem] font-bold uppercase tracking-[0.06em] hover:bg-foreground hover:text-background"
          >
            <span aria-hidden className="grid grid-cols-2 gap-[3px]">
              <span className="size-[5px] bg-current" />
              <span className="size-[5px] bg-signal sig-dot" />
              <span className="size-[5px] bg-current" />
              <span className="size-[5px] bg-current" />
            </span>
            Index
          </button>
        </SheetTrigger>

        <SheetContent
          side="top"
          showCloseButton={false}
          className="h-[100dvh] gap-0 overflow-y-auto border-b-0 bg-background p-0 shadow-none"
        >
          <div className="flex h-14 items-stretch border-b-2 border-border">
            <SheetTitle className="flex items-center px-4 font-mono text-[0.8125rem] font-bold uppercase tracking-[0.06em]">
              Index / {site.name}
            </SheetTitle>
            <SheetDescription className="sr-only">Navigation der Website</SheetDescription>
            <button
              type="button"
              onClick={close}
              aria-label="Index schließen"
              className="ml-auto flex min-w-[4.5rem] items-center justify-center border-l-2 border-border px-4 font-mono text-[0.8125rem] font-bold uppercase tracking-[0.06em] hover:bg-foreground hover:text-background"
            >
              Schließen ✕
            </button>
          </div>

          <ol className="border-b-2 border-border">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b-2 border-border last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline gap-4 px-4 py-4 hover:bg-signal hover:text-on-signal"
                >
                  <span className="label w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(2.75rem,15vw,5rem)]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>

          <ul className="px-4 py-5">
            {footerExtra.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="label link inline-block py-2">
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-4">
            <Link
              href="/#kontakt"
              onClick={close}
              className="flex min-h-14 items-center justify-between border-2 border-border bg-signal px-5 font-mono text-sm font-bold uppercase tracking-[0.06em] text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] rounded-full"
            >
              Kostenloses Erstgespräch anfragen
              <span aria-hidden>→</span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
