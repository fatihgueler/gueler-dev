"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { contact } from "@/lib/content";
import { sendContactMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen an."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse an."),
  budget: z.string().optional(),
  message: z.string().min(10, "Bitte schreib eine etwas längere Nachricht."),
  company: z.string().optional(), // Honeypot
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const result = await sendContactMessage(values);
    if (result.status === "success") {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-surface flex flex-col items-center rounded-[var(--radius-lg)] p-10 text-center">
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="font-display text-2xl font-medium text-foreground">
          Nachricht gesendet
        </h3>
        <p className="mt-3 max-w-sm text-muted">{contact.successMessage}</p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Weitere Nachricht senden
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-surface space-y-5 rounded-[var(--radius-lg)] p-8 md:p-10"
      noValidate
    >
      {/* Honeypot – für Menschen unsichtbar */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Firma (bitte leer lassen)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Dein Name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@beispiel.de"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget (optional)</Label>
        <select
          id="budget"
          className="h-11 w-full rounded-full border border-border-strong bg-surface px-4 text-sm text-foreground placeholder:text-muted-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          {...register("budget")}
        >
          <option value="">Wähle einen Budget-Bereich…</option>
          {contact.budgetRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          placeholder="Worum geht es bei deinem Projekt?"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-[var(--radius)] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="size-4 shrink-0" />
          {contact.errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            Nachricht senden
            <Send />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-2">
        Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur
        Bearbeitung deiner Anfrage zu. Details in der{" "}
        <a href="/datenschutz" className="text-gold hover:underline">
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}
