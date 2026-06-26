import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { nav, site } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Güler.dev Startseite">
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
                    className="text-sm text-muted transition-colors hover:text-teal"
                  >
                    {item.label}
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
                <Mail className="size-4 text-teal-deep" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-teal"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-teal-deep" />
                {site.location}
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-teal hover:text-teal"
              >
                <Github className="size-4" />
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-teal hover:text-teal"
                >
                  <Linkedin className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-2 sm:flex-row">
          <p>
            © {year} {site.ownerName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-teal">
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="transition-colors hover:text-teal"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
