"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen an.").max(100),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse an."),
  message: z.string().min(10, "Bitte schreib eine etwas längere Nachricht.").max(5000),
  // Honeypot gegen Spam – muss leer bleiben
  company: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function sendContactMessage(
  data: z.infer<typeof contactSchema>,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  // Honeypot ausgelöst → still als Erfolg behandeln (Bot abweisen)
  if (parsed.data.company) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Güler.dev <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL ?? "fatih.gueler75@gmail.com";

  // Ohne API-Key (z. B. lokal ohne Setup) sauberer Hinweis statt Crash
  if (!apiKey) {
    console.warn("[Kontaktformular] RESEND_API_KEY fehlt – E-Mail nicht versendet.");
    return {
      status: "error",
      message:
        "Der E-Mail-Versand ist noch nicht konfiguriert (RESEND_API_KEY fehlt).",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage über guler.dev – ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error("[Kontaktformular] Resend-Fehler:", error);
      return { status: "error" };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[Kontaktformular] Unerwarteter Fehler:", err);
    return { status: "error" };
  }
}
