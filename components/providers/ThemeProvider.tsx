"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme-Provider auf Basis von next-themes.
 *
 * - `attribute="class"` → setzt `class="light"` bzw. `class="dark"` am <html>.
 *   Das helle Theme hängt an `html.light` (globals.css), dark ist Default.
 * - `defaultTheme="light"` + `enableSystem={false}` → Besucher betreten die
 *   Seite zuerst im hellen Modus; kein Auto-Dark für Dunkel-OS.
 *   Über den ThemeToggle kann jede:r bewusst auf Dark wechseln.
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
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
