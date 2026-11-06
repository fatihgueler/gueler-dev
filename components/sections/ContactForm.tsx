"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { contact } from "@/lib/content";
import { sendContactMessage } from "@/app/actions";
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
import { trackEvent } from "@/components/Analytics";

const formSchema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen ein."),
  company: z.string().max(100).optional(),
  email: z.string().email("Bitte gib eine gültige E-Mail ein."),
  phone: z.string().max(50).optional(),
  package: z.string().optional(),
  message: z.string().max(5000).optional(),
  privacy: z
    .boolean()
    .refine((v) => v === true, "Bitte akzeptiere die Datenschutzerklärung."),
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
      trackEvent("formular-gesendet", { paket: values.package || "keine Angabe" });
      reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-2 border-border bg-background p-8 shadow-[8px_8px_0_0_var(--color-signal)] md:p-10 rounded-[1.25rem]">
        <div className="mb-6 inline-flex size-14 items-center justify-center rounded-full border-2 border-border bg-signal text-on-signal sig-dot">
          <CheckCircle2 className="size-7" aria-hidden />
        </div>
        <h3 className="display text-[clamp(2.25rem,5vw,3.5rem)]">
          Nachricht gesendet
        </h3>
        <p className="mt-4 max-w-sm text-lg">{contact.successMessage}</p>
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
      className="relative space-y-6 border-2 border-border bg-background p-5 shadow-[8px_8px_0_0_var(--color-foreground)] sm:p-8 md:p-10 [&_label]:font-mono [&_label]:text-xs [&_label]:uppercase [&_label]:tracking-[0.06em] rounded-[1.25rem]"
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
            placeholder="Dein Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="cf-name-error" className="text-sm font-medium text-error" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-company">
            Firmenname <span className="text-muted">(optional)</span>
          </Label>
          <Input
            id="cf-company"
            placeholder="Dein Unternehmen"
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
            <p id="cf-email-error" className="text-sm font-medium text-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-phone">
            Telefon <span className="text-muted">(optional)</span>
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
        <Label htmlFor="cf-message">Nachricht (optional)</Label>
        <Textarea
          id="cf-message"
          placeholder="z. B. Branche, Ort, vorhandene Website"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="cf-message-error" className="text-sm font-medium text-error" role="alert">
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
          <Label htmlFor="cf-privacy" className="cursor-pointer !font-sans !text-sm !normal-case !tracking-normal leading-relaxed">
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
            verarbeitet werden. Details in der{" "}
            <a href="/datenschutz" className="link">
              Datenschutzerklärung
            </a>
            . *
          </Label>
        </div>
        {errors.privacy && (
          <p id="cf-privacy-error" className="pl-9 text-sm font-medium text-error" role="alert">
            {errors.privacy.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border-2 border-error p-4 text-error">
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="font-medium">{contact.errorMessage}</p>
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
            <Loader2 className="animate-spin" aria-hidden />
            Wird gesendet…
          </>
        ) : (
          <>
            Erstgespräch anfragen
            <Send aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
