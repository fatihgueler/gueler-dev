"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";

import { site } from "@/lib/content";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Cal.com-Embed-Loader – typisierte Umsetzung des offiziellen Snippets,
 * ohne Zusatz-Dependency. Lädt embed.js asynchron und stellt window.Cal
 * als Command-Queue bereit. Elemente mit data-cal-link öffnen beim Klick
 * automatisch das Buchungs-Popup.
 */
type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[][];
  ns?: Record<string, CalFn>;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

let calInitialized = false;

function initCal() {
  if (calInitialized || typeof window === "undefined") return;
  calInitialized = true;

  if (!window.Cal) {
    const cal: CalFn = (...args: unknown[]) => {
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q ?? [];
        const script = document.createElement("script");
        script.src = "https://app.cal.com/embed/embed.js";
        document.head.appendChild(script);
        cal.loaded = true;
      }
      cal.q = cal.q ?? [];
      if (args[0] === "init") {
        const namespace = args[1];
        if (typeof namespace === "string") {
          cal.ns = cal.ns ?? {};
          const api: CalFn = (...apiArgs: unknown[]) => {
            api.q = api.q ?? [];
            api.q.push(apiArgs);
          };
          api.q = api.q ?? [];
          cal.ns[namespace] = cal.ns[namespace] ?? api;
          cal.ns[namespace].q?.push(args);
          cal.q.push(["initNamespace", namespace]);
          return;
        }
      }
      cal.q.push(args);
    };
    window.Cal = cal;
  }

  window.Cal("init", { origin: "https://cal.com" });
}

interface CalButtonProps extends Pick<ButtonProps, "variant" | "size" | "className"> {
  children: React.ReactNode;
}

export function CalButton({ children, ...buttonProps }: CalButtonProps) {
  React.useEffect(() => {
    // Embed erst nach dem kritischen Rendering laden (Performance-Budget schonen)
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idle = hasIdleCallback
      ? window.requestIdleCallback(initCal, { timeout: 4000 })
      : window.setTimeout(initCal, 3000);
    return () => {
      if (hasIdleCallback) {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  const handleInteract = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    initCal();
    // Popup-Theme an das aktuell aktive Site-Theme angleichen
    const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    event.currentTarget.dataset.calConfig = JSON.stringify({ theme });
  };

  return (
    <Button
      type="button"
      data-cal-link={site.cal}
      onPointerEnter={handleInteract}
      onFocus={handleInteract}
      onClick={handleInteract}
      {...buttonProps}
    >
      <CalendarDays aria-hidden />
      {children}
    </Button>
  );
}
