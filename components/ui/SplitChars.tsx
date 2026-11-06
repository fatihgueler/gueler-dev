import * as React from "react";

/**
 * Zerlegt Text in einzelne Buchstaben (für gestaffelte Auftritte und
 * Hover pro Buchstabe). Screenreader lesen den Klartext aus .sr-only,
 * die Buchstaben-Spans sind aria-hidden. Wörter bleiben unzertrennlich.
 */
export function SplitChars({ text, offset = 0, className }: { text: string; offset?: number; className?: string }) {
  let i = offset;
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={className}>
        {words.map((word, w) => (
          <React.Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, c) => (
                <span key={c} className="char" style={{ "--i": i++ } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </>
  );
}
