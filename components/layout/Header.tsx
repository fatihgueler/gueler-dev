"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/MagneticButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
        <Link
          href="/"
          className="group font-display text-2xl font-semibold tracking-tight"
          aria-label="Güler.dev Startseite"
        >
          {site.name.replace(".dev", "")}
          <span className="text-teal transition-colors group-hover:text-teal-bright">
            .dev
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const isExternal = !item.href.startsWith("#") && !item.href.startsWith("/");
            const isActive =
              item.href === "/ueber" && pathname === "/ueber";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-teal transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
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
