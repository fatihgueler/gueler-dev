"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  company: z.string().max(0).optional(), // honeypot – muss leer bleiben
  phone: z.string().max(50).optional(),
  packageChoice: z.string().max(50).optional(),
  firmName: z.string().max(100).optional(),
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

  // Honeypot ausgelöst → still als Erfolg behandeln
  if (parsed.data.company) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Güler.dev <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL ?? "fatih.gueler75@gmail.com";

  if (!apiKey) {
    console.warn("[Kontaktformular] RESEND_API_KEY fehlt – E-Mail nicht versendet.");
    return {
      status: "error",
      message: "Der E-Mail-Versand ist noch nicht konfiguriert (RESEND_API_KEY fehlt).",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, message, phone, packageChoice, firmName } = parsed.data;

    const lines = [
      `Name: ${name}`,
      firmName ? `Firma: ${firmName}` : null,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      packageChoice ? `Paket: ${packageChoice}` : null,
      ``,
      `Nachricht:`,
      message,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage über guelerdev.de – ${name}`,
      text: lines,
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
