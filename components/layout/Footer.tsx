import * as React from "react";
import Link from "next/link";

import { nav, footerExtra, site, guides } from "@/lib/content";

/**
 * Footer als Raster-Blatt: drei Spalten mit 2px-Linien, darunter die
 * Wortmarke, die vom unteren Rand abgeschnitten wird. Build-Stempel bleibt.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-x-clip border-t-2 border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-[96rem]">
        <div className="grid md:grid-cols-12">
          {/* Spalte A: Aussage + Kontakt */}
          <div className="border-b-2 border-background/80 p-[var(--spacing-gutter)] py-10 md:col-span-5 md:border-r-2 md:py-12">
            <p className="label flex items-center gap-2"><span aria-hidden className="size-2.5 bg-signal" />Güler.dev / {site.location}</p>
            <p className="mt-5 max-w-sm text-lg leading-snug">
              Freelance Webentwickler aus {site.location.split(",")[0]} — moderne
              Websites &amp; KI-Tools für kleine Unternehmen.
            </p>
            <ul className="mt-8 space-y-1 font-mono text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="link inline-block py-2 hover:bg-signal hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone}`} className="link inline-block py-2 hover:bg-signal hover:text-ink">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-6 pt-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-block py-2 hover:bg-signal hover:text-ink"
                >
                  GitHub ↗
                </a>
                {site.linkedin && (
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-block py-2 hover:bg-signal hover:text-ink"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Spalte B: Index */}
          <nav
            aria-label="Footer-Navigation"
            className="border-b-2 border-background/80 p-[var(--spacing-gutter)] py-10 md:col-span-3 md:border-r-2 md:py-12"
          >
            <h2 className="label opacity-80">Index</h2>
            <ol className="mt-4">
              {[...nav, ...footerExtra].map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 py-2 text-base hover:bg-signal hover:text-ink"
                  >
                    <span className="label w-6 opacity-70">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {/* Spalte C: Ratgeber */}
          <div className="border-b-2 border-background/80 p-[var(--spacing-gutter)] py-10 md:col-span-4 md:py-12">
            <h2 className="label opacity-80">Ratgeber</h2>
            <ul className="mt-4">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/${guide.slug}`}
                    className="block py-2 text-base hover:bg-signal hover:text-ink"
                  >
                    {guide.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wortmarke, unten abgeschnitten */}
        <div aria-hidden data-sp className="h-[21vw] max-h-[19rem] select-none overflow-hidden pt-[3vw] md:pt-[min(3vw,2.5rem)]">
          <p
            className="display wm-wave px-y whitespace-nowrap text-center text-signal"
            style={{ fontSize: "min(25vw, 22rem)", lineHeight: 0.8 }}
          >
            {Array.from("Güler.dev").map((ch, i) => (
              <span key={i} className="wm-l">
                {ch}
              </span>
            ))}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-background/80 p-[var(--spacing-gutter)] py-5 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {year} {site.ownerName}. Alle Rechte vorbehalten.
            </span>
            {/* Build-Stempel: echter Commit-Hash, zur Build-Zeit injiziert */}
            <span title="Build" className="opacity-80">
              Build {process.env.NEXT_PUBLIC_BUILD_HASH} · {process.env.NEXT_PUBLIC_BUILD_DATE}
            </span>
          </p>
          <div className="flex gap-6 uppercase tracking-[0.06em]">
            <Link href="/impressum" className="link inline-block py-2 hover:bg-signal hover:text-ink">
              Impressum
            </Link>
            <Link href="/datenschutz" className="link inline-block py-2 hover:bg-signal hover:text-ink">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
