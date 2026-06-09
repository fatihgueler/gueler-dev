"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Privater Modus o. Ä. – Theme gilt dann nur für diese Sitzung.
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Zwischen hellem und dunklem Design wechseln"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-teal hover:text-teal",
        className,
      )}
    >
      {/* Sichtbarkeit rein per CSS über data-theme – kein Hydration-Mismatch */}
      <Sun className="size-[18px] [[data-theme=light]_&]:hidden" aria-hidden />
      <Moon className="hidden size-[18px] [[data-theme=light]_&]:block" aria-hidden />
    </button>
  );
}
