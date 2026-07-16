import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { nav, site, guides } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Güler.dev Startseite" className="tap inline-block">
              <Logo className="text-2xl" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Freelance Webentwickler aus {site.location.split(",")[0]} — moderne
              Websites &amp; KI-Tools für kleine Unternehmen.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-muted-2">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-sm text-muted transition-colors hover:text-violet-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold text-muted-2">Ratgeber</h3>
            <ul className="mt-5 space-y-3">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/${guide.slug}`}
                    className="block py-3 text-sm text-muted transition-colors hover:text-violet-3"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-xs font-semibold text-muted-2">
              Kontakt
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-violet" />
                <a
                  href={`mailto:${site.email}`}
                  className="tap transition-colors hover:text-violet-3"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-violet" />
                {site.location}
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="tap inline-flex h-11 w-11 items-center justify-center rounded-none border border-border text-muted transition-all hover:border-violet-2 hover:text-violet-3"
              >
                <Github className="size-4" />
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="tap inline-flex h-11 w-11 items-center justify-center rounded-none border border-border text-muted transition-all hover:border-violet-2 hover:text-violet-3"
                >
                  <Linkedin className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Riesige Outline-Wortmarke als unterster Abschluss — füllt sich
            beim Hover und grinst (per-Letter-Kurve wie im Hero) */}
        <div aria-hidden className="mt-16 select-none overflow-hidden">
          <p
            className="footer-wordmark whitespace-nowrap text-center font-display font-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(3.5rem, 14.5vw, 12rem)", letterSpacing: "-0.03em" }}
          >
            {Array.from("GÜLER.DEV").map((ch, i) => (
              <span key={i} className="wm-l">
                {ch}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-2 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
            <span>
              © {year} {site.ownerName}. Alle Rechte vorbehalten.
            </span>
            {/* Build-Stempel: echter Commit-Hash, zur Build-Zeit injiziert */}
            <span className="font-mono text-xs text-muted-2/70" title="Build">
              {process.env.NEXT_PUBLIC_BUILD_HASH} · {process.env.NEXT_PUBLIC_BUILD_DATE}
            </span>
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="tap transition-colors hover:text-violet-3">
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="tap transition-colors hover:text-violet-3"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
