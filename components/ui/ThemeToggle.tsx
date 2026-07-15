"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * ThemeToggle — wechselt zwischen dark (Default) und light.
 * Mounted-Guard verhindert Hydration-Mismatch (next-themes kennt das
 * aufgelöste Theme erst clientseitig).
 *
 * Der Wechsel wird per View-Transitions-API sanft übergeblendet (statt hart
 * umzuspringen). Fällt sauber auf einen Direktwechsel zurück, wo die API fehlt
 * oder „Bewegung reduzieren" aktiv ist.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = React.useCallback(() => {
    const next = isDark ? "light" : "dark";
    const applyClass = () => {
      const root = document.documentElement;
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (!doc.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }
    // Klasse innerhalb der Transition setzen, damit der „nachher"-Snapshot
    // das neue Theme zeigt; setTheme hält next-themes/localStorage synchron.
    doc.startViewTransition(() => {
      applyClass();
      setTheme(next);
    });
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? "Zu hellem Design wechseln"
            : "Zu dunklem Design wechseln"
          : "Design wechseln"
      }
      className="inline-flex h-11 w-11 items-center justify-center rounded-none text-muted transition-colors hover:text-violet-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Beide Icons gerendert; nur das passende ist sichtbar — verhindert
          Layout-Shift und SSR/Client-Flacker vor dem Mount. */}
      <Sun
        className={mounted && !isDark ? "size-5" : "hidden"}
        aria-hidden
      />
      <Moon
        className={!mounted || isDark ? "size-5" : "hidden"}
        aria-hidden
      />
    </button>
  );
}
