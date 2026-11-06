"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";

import { site } from "@/lib/content";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Calendly-Popup-Button. Lädt das Calendly-Widget erst beim Klick (keine
 * Daten an Calendly vorher) und übergibt die Markenfarben an das Popup.
 * Fallback ohne JS / wenn das Laden scheitert: normaler Link in neuem Tab.
 */
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";

let calendlyPromise: Promise<void> | null = null;

/** Lädt Calendly einmalig — erst nach einem Klick (keine Daten vorab an Calendly). */
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (calendlyPromise) return calendlyPromise;
  calendlyPromise = new Promise<void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      calendlyPromise = null;
      reject(new Error("Calendly konnte nicht geladen werden"));
    };
    document.head.appendChild(script);
  });
  return calendlyPromise;
}

function themedCalendlyUrl(): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    // Marken-Palette (app/globals.css): Surface, Foreground, Emerald
    background_color: "0e1512",
    text_color: "eaf1ec",
    primary_color: "2bbe83",
  });
  return `${site.calendly}?${params.toString()}`;
}

interface BookingButtonProps extends Pick<ButtonProps, "variant" | "size" | "className"> {
  children: React.ReactNode;
}

export function BookingButton({ children, ...buttonProps }: BookingButtonProps) {
  // Calendly setzt Third-Party-Cookies (__cf_bm) und bekommt die IP —
  // deshalb lädt das Widget erst beim Klick (nicht bei Hover/Fokus).
  // Lädt es nicht, öffnet sich Calendly als normaler Link im neuen Tab.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const url = themedCalendlyUrl();
    loadCalendly()
      .then(() => window.Calendly?.initPopupWidget({ url }))
      .catch(() => window.open(site.calendly, "_blank", "noopener,noreferrer"));
  };

  return (
    <Button asChild {...buttonProps}>
      <a
        href={site.calendly}
        data-umami-event="calendly"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <CalendarDays aria-hidden />
        {children}
      </a>
    </Button>
  );
}
