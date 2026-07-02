"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { contact } from "@/lib/content";
import { sendContactMessage } from "@/app/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  company: z.string().max(100).optional(),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().max(50).optional(),
  package: z.string().optional(),
  message: z.string().min(10, "Bitte beschreiben Sie Ihr Anliegen kurz."),
  privacy: z
    .boolean()
    .refine((v) => v === true, "Bitte akzeptieren Sie die Datenschutzerklärung."),
  _trap: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { privacy: false },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const result = await sendContactMessage({
      name: values.name,
      email: values.email,
      message: values.message,
      company: values._trap, // pass honeypot as legacy honeypot field
      phone: values.phone,
      packageChoice: values.package,
      firmName: values.company,
    });
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
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center border border-cyan/30 bg-cyan/10 text-cyan">
          <CheckCircle2 className="size-8" aria-hidden />
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
      {/* Honeypot – komplett unsichtbar, kein verräterisches Label/Placeholder.
          Bots füllen das Feld aus → Submission wird serverseitig verworfen. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("_trap")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-name">Name *</Label>
          <Input
            id="cf-name"
            placeholder="Ihr Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="cf-name-error" className="text-sm text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-company">
            Firmenname <span className="text-muted-2">(optional)</span>
          </Label>
          <Input
            id="cf-company"
            placeholder="Ihr Unternehmen"
            {...register("company")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-email">E-Mail *</Label>
          <Input
            id="cf-email"
            type="email"
            placeholder="name@beispiel.de"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="cf-email-error" className="text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-phone">
            Telefon <span className="text-muted-2">(optional)</span>
          </Label>
          <Input
            id="cf-phone"
            type="tel"
            placeholder="+49 …"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cf-package">Paket auswählen</Label>
        <Controller
          name="package"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger id="cf-package" className="w-full">
                <SelectValue placeholder="Paket wählen…" />
              </SelectTrigger>
              <SelectContent>
                {contact.packageOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cf-message">Nachricht *</Label>
        <Textarea
          id="cf-message"
          placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihr aktuelles Website-Problem…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="cf-message-error" className="text-sm text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* DSGVO-Checkbox */}
      <div className="space-y-1">
        <div className="flex items-start gap-3">
          <Controller
            name="privacy"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="cf-privacy"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1 rounded-none"
                aria-describedby={errors.privacy ? "cf-privacy-error" : undefined}
              />
            )}
          />
          <Label htmlFor="cf-privacy" className="cursor-pointer text-sm leading-relaxed">
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
            verarbeitet werden. Details in der{" "}
            <a href="/datenschutz" className="text-cyan underline-offset-2 hover:underline">
              Datenschutzerklärung
            </a>
            . *
          </Label>
        </div>
        {errors.privacy && (
          <p id="cf-privacy-error" className="pl-7 text-sm text-red-400" role="alert">
            {errors.privacy.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" aria-hidden />
          <AlertDescription>{contact.errorMessage}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Wird gesendet…
          </>
        ) : (
          <>
            Erstgespräch anfragen →
            <Send aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
