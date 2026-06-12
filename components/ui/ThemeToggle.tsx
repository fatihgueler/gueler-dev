"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Barrierefreier Light/Dark-Umschalter.
 *
 * Vor dem Mounten ist `resolvedTheme` unbekannt – wir rendern dann einen
 * neutralen Platzhalter gleicher Größe (kein Layout-Shift, keine
 * Hydration-Mismatch-Warnung).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
          : "Design umschalten"
      }
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-violet-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-2",
        className,
      )}
      data-cursor="hover"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" aria-hidden />
        ) : (
          <Moon className="size-[18px]" aria-hidden />
        )
      ) : (
        <span className="size-[18px]" aria-hidden />
      )}
    </button>
  );
}
