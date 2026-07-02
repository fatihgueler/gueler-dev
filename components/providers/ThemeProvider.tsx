"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme-Provider auf Basis von next-themes.
 *
 * - `attribute="class"` → setzt `class="light"` bzw. `class="dark"` am <html>.
 *   Das helle Theme hängt an `html.light` (globals.css).
 * - `defaultTheme="dark"` + `enableSystem={false}` → Besucher betreten die
 *   Seite im dunklen Modus (die Marken-Szene); über den ThemeToggle kann
 *   jede:r bewusst auf Light wechseln.
 * - `disableTransitionOnChange` → unterdrückt Farb-Transitions (kein Flackern).
 *
 * Das Anti-FOUC-Script injiziert next-themes selbst vor der Hydration;
 * dafür trägt das <html> `suppressHydrationWarning`.
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      // Dark ist der Standard: drei unabhängige Audits (Design, Motion, A11y)
      // kamen zum selben Schluss — die dunkle Szene ist die starke, und die
      // Kontraste sind dort AAA-sauber. Light bleibt als bewusste Option.
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
