"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme-Provider auf Basis von next-themes.
 *
 * - `attribute="class"` → setzt `class="light"`/`class="dark"` am <html>
 * - `defaultTheme="system"` + `enableSystem` → folgt der OS-Einstellung,
 *   bis der Nutzer manuell umschaltet (Override wird in localStorage gemerkt)
 * - `disableTransitionOnChange` → unterdrückt Farb-Transitions exakt während
 *   des Theme-Wechsels (kein Flackern auf Hover-Elementen)
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
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
