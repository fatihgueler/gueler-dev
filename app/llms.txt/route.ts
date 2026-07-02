import { site, services, packages, projects, faq, guides, caseStudies } from "@/lib/content";

/**
 * /llms.txt — Generative Engine Optimization (GEO).
 *
 * Saubere, extrahierbare Markdown-Zusammenfassung der Seite für KI-Antwort-
 * maschinen (ChatGPT Search, Perplexity, Google AI Overviews, Gemini, Copilot).
 * Konvention: https://llmstxt.org. Wird statisch generiert und liest direkt
 * aus content.ts → bleibt automatisch synchron mit der Seite.
 */
export const dynamic = "force-static";

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  const lines: string[] = [
    `# ${site.ownerName} – Webdesign & Webentwicklung`,
    "",
    "> Freelance Webentwickler aus Hannover. Entwickelt moderne, schnelle " +
      "Websites sowie Web-Apps für kleine und mittlere Unternehmen (KMU) und " +
      "Selbstständige – deutschlandweit, gebaut, um aus Besuchern Anfragen zu " +
      "machen. Festpreis, ein fester Ansprechpartner, keine Agentur.",
    "",
    "## Eckdaten",
    `- Name: ${site.ownerName}`,
    "- Leistungen: Webdesign, Webentwicklung, KI-Integration, Web-Apps & Tools",
    `- Standort: ${site.location}`,
    "- Service-Gebiet: ganz Deutschland (Remote-Zusammenarbeit, deutschlandweit)",
    `- E-Mail: ${site.email}`,
    `- Telefon: ${site.phone}`,
    `- Website: ${baseUrl}`,
    `- GitHub: ${site.github}`,
    `- LinkedIn: ${site.linkedin}`,
    "",
    "## Leistungen",
    ...services.items.map((s) => `- **${s.title}**: ${s.description}`),
    "",
    "## Pakete & Preise",
    ...packages.map((p) => `- **${p.name}** (${p.price}): ${p.description}`),
    "",
    "## Projekte",
    ...projects.items.map((p) => `- **${p.title}** (${p.category}): ${p.description}`),
    "",
    "## Häufige Fragen (FAQ)",
  ];

  for (const item of faq.items) {
    lines.push("", `### ${item.question}`, item.answer);
  }

  lines.push(
    "",
    "## Wichtige Seiten",
    `- Startseite: ${baseUrl}`,
    `- Leistungen & Pakete: ${baseUrl}/leistungen`,
    `- Projekte: ${baseUrl}/projekte`,
    `- Über mich: ${baseUrl}/ueber`,
    `- Kontakt: ${baseUrl}/kontakt`,
    "",
    "## Case Studies",
    ...caseStudies.map(
      (c) => `- ${c.title} (${c.category}; ${c.status}): ${baseUrl}/projekte/${c.id}`,
    ),
    "",
    "## Ratgeber",
    ...guides.map((g) => `- ${g.label}: ${baseUrl}/${g.slug}`),
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
