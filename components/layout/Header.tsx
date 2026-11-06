"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/lib/content";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

/**
 * Kopfleiste als Raster-Zeile: jede Zelle durch eine 2px-Linie getrennt.
 * Navigation als nummerierter Index (01–04), aktive Seite = invertierte Zelle.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-[96rem] items-stretch md:h-16">
        <Link
          href="/"
          aria-label="Güler.dev Startseite"
          className="flex items-center px-[var(--spacing-gutter)] hover:bg-foreground hover:text-background"
        >
          <Logo />
        </Link>

        <nav
          className="ml-auto hidden items-stretch border-l-2 border-border md:flex"
          aria-label="Hauptnavigation"
        >
          <ol className="flex items-stretch">
            {nav.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className="flex border-r-2 border-border">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 px-4 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.06em] transition-colors duration-[90ms] lg:px-6",
                      isActive
                        ? "bg-foreground text-background"
                        : "hover:bg-signal hover:text-on-signal",
                    )}
                  >
                    <span aria-hidden className={isActive ? "text-signal" : "text-muted"}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="ml-auto flex items-stretch border-l-2 border-border md:ml-0">
          <ThemeToggle />
          <Link
            href="/#kontakt"
            className="hidden items-center border-l-2 border-border bg-signal px-5 font-mono text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-on-signal transition-colors duration-[90ms] hover:bg-foreground hover:text-background lg:flex"
          >
            Erstgespräch →
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
