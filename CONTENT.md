# Inhalte-Checkliste – Güler.dev

Diese Stellen solltest du noch mit echten Inhalten füllen, bevor die Seite online
geht. Fast alles steht zentral in **`lib/content.ts`**.

---

## 🔴 Pflicht (rechtlich!)

### Impressum (`lib/content.ts` → `legal.impressum`)
- [ ] `street` – Straße + Hausnummer
- [ ] `city` – PLZ + Ort
- [ ] `phone` – Telefonnummer
- [ ] `vatId` – USt-IdNr. **oder** Kleinunternehmer-Hinweis (§ 19 UStG)
- [ ] Pflichtangaben final über [e-recht24.de](https://www.e-recht24.de/impressum-generator.html) prüfen
- [ ] Hinweis-Box auf der Impressum-Seite entfernen (`app/impressum/page.tsx`)

### Datenschutzerklärung (`app/datenschutz/page.tsx`)
- [ ] Finalen Text mit [e-recht24.de](https://www.e-recht24.de/muster-datenschutzerklaerung.html) erstellen
- [ ] Hosting-Anbieter eintragen (Abschnitt 3)
- [ ] Hinweis-Box entfernen

---

## 🟡 Wichtig (Wirkung & Vertrauen)

### Über mich (`lib/content.ts` → `about`)
- [ ] Text gegenlesen und nach deinem Geschmack anpassen (ist ein Entwurf)
- [ ] Echtes Foto in `public/` legen (z. B. `public/fatih.jpg`)
- [ ] In `components/sections/About.tsx` das „FG"-Monogramm durch `next/image` ersetzen

### Projekte (`lib/content.ts` → `projects.items`)
- [ ] BüroBrücke: Live-URL ergänzen, falls die App online ist (`liveUrl`)
- [ ] Drittes Projekt („Kundenprojekt"): echte Beschreibung einsetzen **und Freigabe des Kunden einholen**, bevor es öffentlich gezeigt wird – oder den Eintrag entfernen
- [ ] Optional: weitere Projekte ergänzen

### Kontakt / Social (`lib/content.ts` → `site`)
- [ ] `linkedin` – LinkedIn-URL eintragen (sonst wird das Icon ausgeblendet)

---

## 🟢 Optional (Feinschliff)

- [ ] Open-Graph-Bild: `app/opengraph-image.png` (1200×630) hinzufügen für schöne Social-Vorschauen
- [ ] Favicon ersetzen: `app/icon.png` oder `app/favicon.ico`
- [ ] Hero-Headline / Claim final justieren (`lib/content.ts` → `hero`)
- [ ] Stats im Hero anpassen, falls gewünscht
- [ ] Echte Kundenstimmen ergänzen (neue Section) – sobald vorhanden

---

## Technisches Setup (vor Live)

- [ ] `.env.local` aus `.env.example` erstellen
- [ ] Resend-Account + verifizierte Absender-Domain (siehe DEPLOYMENT.md)
- [ ] `npm run build` erfolgreich getestet
