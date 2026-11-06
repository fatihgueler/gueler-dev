import * as React from "react";

/**
 * Auszug aus dem Code dieser Website (app/actions.ts) – wörtlich, gekürzt
 * auf den aussagekräftigen Teil. Zeilen laufen beim Hereinscrollen
 * gestaffelt ein (Reveal-System), ohne JS steht alles sofort da.
 */
const LINES: Array<{ code: string; tone?: "comment" | "key" }> = [
  { code: '"use server";', tone: "key" },
  { code: "" },
  { code: "const contactSchema = z.object({" },
  { code: "  name: z.string().min(2).max(100)," },
  { code: "  email: z.string().email()," },
  { code: '  message: z.string().max(5000).optional().default(""),' },
  { code: "  company: z.string().max(0).optional(), // honeypot – muss leer bleiben", tone: "comment" },
  { code: "  // …" , tone: "comment" },
  { code: "});" },
  { code: "" },
  { code: "export async function sendContactMessage(data) {", tone: "key" },
  { code: "  const parsed = contactSchema.safeParse(data);" },
  { code: "  // …", tone: "comment" },
  { code: "  // Honeypot ausgelöst → still als Erfolg behandeln", tone: "comment" },
  { code: "  if (parsed.data.company) {" },
  { code: '    return { status: "success" };' },
  { code: "  }" },
];

export function CodeExcerpt() {
  return (
    <figure className="overflow-hidden rounded-[1.25rem] border-2 border-border bg-ink text-paper shadow-[10px_10px_0_0_var(--color-signal)]">
      <figcaption className="flex items-center justify-between gap-3 border-b-2 border-paper/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full border-2 border-paper/60" />
          <span className="size-3 rounded-full border-2 border-paper/60" />
          <span className="size-3 rounded-full bg-signal" />
        </span>
        <span className="label truncate">app/actions.ts · Auszug</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed md:p-7 md:text-sm">
        <code data-rv-stagger="45" className="block">
          {LINES.map((line, i) => (
            <span
              key={i}
              data-rv="left"
              className={`block whitespace-pre ${
                line.tone === "comment" ? "text-[#a9a69c]" : line.tone === "key" ? "text-signal" : ""
              }`}
            >
              <span aria-hidden className="mr-4 inline-block w-6 select-none text-right text-[#a9a69c]">
                {i + 1}
              </span>
              {line.code || " "}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
