"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
        <Link href="/" aria-label="Güler.dev Startseite">
          <Logo className="text-xl md:text-2xl" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const isActive = pathname === item.href.split("#")[0] && item.href.startsWith("/") && !item.href.startsWith("/#");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-violet-2 transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="outline" size="sm">
              <Link href="/kontakt">Kontakt anfragen</Link>
            </Button>
            <Magnetic strength={0.4}>
              <Button asChild size="sm">
                <Link href="/#kontakt">Kostenlose Analyse</Link>
              </Button>
            </Magnetic>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
