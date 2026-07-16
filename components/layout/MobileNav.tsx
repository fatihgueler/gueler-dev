"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { nav, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Menü öffnen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-none text-foreground transition-colors hover:text-violet-3"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex w-[82%] max-w-sm flex-col border-l border-border bg-surface px-7 py-7"
          showCloseButton={false}
        >
          <SheetHeader className="flex flex-row items-center justify-between space-y-0">
            <SheetTitle asChild>
              <span className="font-display text-xl font-medium">
                {site.name.replace(".dev", "")}
                <span className="text-violet-3">.dev</span>
              </span>
            </SheetTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-none text-foreground transition-colors hover:text-violet-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </SheetHeader>

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
        </SheetContent>
      </Sheet>
    </div>
  );
}
