# Offene Platzhalter – bitte ausfüllen

Alle Inhalte werden zentral in `lib/content.ts` verwaltet.
Suche nach `{{ ... }}` für alle noch offenen Stellen.

---

## Kontaktdaten (`lib/content.ts` → `site`)

- [x] `email` – `fatih.gueler75@gmail.com` (bereits eingetragen)
- [x] `phone` – `015777688060` (bereits eingetragen)
- [ ] Bitte Richtigkeit prüfen und ggf. aktualisieren

---

## Testimonials (`lib/content.ts` → `testimonials` Array)

- [ ] `{{ KUNDENZITAT_1_EINSETZEN }}` – echtes Kundenzitat
- [ ] `{{ NAME_1_EINSETZEN }}` – Name des Kunden
- [ ] `{{ FIRMA_1_EINSETZEN }}` – Firmenname
- [ ] `{{ KUNDENZITAT_2_EINSETZEN }}`
- [ ] `{{ NAME_2_EINSETZEN }}`
- [ ] `{{ FIRMA_2_EINSETZEN }}`
- [ ] `{{ KUNDENZITAT_3_EINSETZEN }}`
- [ ] `{{ NAME_3_EINSETZEN }}`
- [ ] `{{ FIRMA_3_EINSETZEN }}`

**Tipp:** Solange keine echten Testimonials vorliegen, kann die
`Testimonials`-Section in `app/page.tsx` temporär auskommentiert werden.

---

## SEO / Bilder

- [ ] `/public/og-image.jpg` erstellen (1200×630 px)
  - Zeige Name, Tagline und einen Screenshot oder Mockup
  - Tools: Figma, Canva, oder [og-image.vercel.app](https://og-image.vercel.app)
- [ ] Favicon prüfen (`/public/favicon.ico` und `/public/icon.png`)

---

## Rechtliches (`lib/content.ts` → `legal.impressum`)

- [ ] `{{ STRASSE_HAUSNUMMER }}` – vollständige Adresse
- [ ] `{{ PLZ_ORT }}` – Postleitzahl + Ort
- [ ] `{{ TELEFONNUMMER }}` – Telefon für Impressum
- [ ] `{{ UST_IDNR_ODER_KLEINUNTERNEHMER_HINWEIS }}` – Steuernummer oder Hinweis auf § 19 UStG

**Empfohlene Tools:**
- Impressum: [e-recht24.de/impressum-generator.html](https://www.e-recht24.de/impressum-generator.html)
- Datenschutz: [e-recht24.de/datenschutz-generator.html](https://www.e-recht24.de/datenschutz-generator.html)

---

## E-Mail-Versand (Resend)

- [ ] `RESEND_API_KEY` in `.env.local` setzen (kostenloser Account auf [resend.com](https://resend.com))
- [ ] `CONTACT_EMAIL` in `.env.local` setzen (Ziel-Adresse für Kontaktformular)
- [ ] Optional: `RESEND_FROM` setzen (z. B. `Güler.dev <kontakt@guelerdev.de>`)
- [ ] Domain auf Resend verifizieren (für professionelle Absenderadresse)

Beispiel `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=fatih.gueler75@gmail.com
RESEND_FROM=Güler.dev <kontakt@guelerdev.de>
NEXT_PUBLIC_SITE_URL=https://guelerdev.de
```

---

## OG-Image

Sobald `/public/og-image.jpg` vorhanden ist, wird es automatisch für
Facebook, LinkedIn und Twitter-Shares genutzt (konfiguriert in `app/layout.tsx`).
