"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * ThemeToggle — wechselt zwischen dark (Default) und light.
 * Mounted-Guard verhindert Hydration-Mismatch (next-themes kennt das
 * aufgelöste Theme erst clientseitig).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
