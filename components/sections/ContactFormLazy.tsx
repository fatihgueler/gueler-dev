"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("./ContactForm").then((mod) => mod.ContactForm),
  { ssr: false },
);

/**
 * Lädt das Kontaktformular (react-hook-form + zod + Radix Select) erst,
 * wenn der Besucher in die Nähe scrollt — hält das Startseiten-Bundle
 * schlank. min-h verhindert Layout-Shift beim Nachladen.
 */
export function ContactFormLazy() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[36rem]">
      {show ? <ContactForm /> : null}
    </div>
  );
}
