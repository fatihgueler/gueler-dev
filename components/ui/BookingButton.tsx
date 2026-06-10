"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";

import { site } from "@/lib/content";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Calendly-Popup-Button. Lädt das Calendly-Widget erst im Browser-Leerlauf
 * bzw. bei Interaktion (Performance-Budget schonen) und übergibt die Farben
 * des aktuell aktiven Site-Themes an das Popup.
 * Fallback ohne JS / vor dem Laden: normaler Link in neuem Tab.
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

let calendlyLoading = false;

function loadCalendly() {
  if (calendlyLoading || typeof window === "undefined" || window.Calendly) return;
  calendlyLoading = true;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CALENDLY_CSS;
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = CALENDLY_SCRIPT;
  script.async = true;
  document.head.appendChild(script);
}

function themedCalendlyUrl(): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    background_color: "0d0d18",
    text_color: "f1f5f9",
    primary_color: "7c3aed",
  });
  return `${site.calendly}?${params.toString()}`;
}

interface BookingButtonProps extends Pick<ButtonProps, "variant" | "size" | "className"> {
  children: React.ReactNode;
}

export function BookingButton({ children, ...buttonProps }: BookingButtonProps) {
  React.useEffect(() => {
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idle = hasIdleCallback
      ? window.requestIdleCallback(loadCalendly, { timeout: 4000 })
      : window.setTimeout(loadCalendly, 3000);
    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.Calendly) return; // Fallback: Link öffnet Calendly im neuen Tab
    event.preventDefault();
    window.Calendly.initPopupWidget({ url: themedCalendlyUrl() });
  };

  return (
    <Button asChild {...buttonProps}>
      <a
        href={site.calendly}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={loadCalendly}
        onFocus={loadCalendly}
        onClick={handleClick}
      >
        <CalendarDays aria-hidden />
        {children}
      </a>
    </Button>
  );
}
