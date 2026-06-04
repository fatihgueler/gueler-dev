# Deployment-Guide – Güler.dev

Das Projekt ist **hosting-flexibel** und nutzt `output: "standalone"`, damit du
es überall betreiben kannst – ohne Bindung an einen bestimmten Anbieter.

Wähle einen der folgenden Wege.

---

## Variante A: Docker (eigener Server / VPS, z. B. Hetzner)

Empfohlen, wenn du volle Kontrolle willst.

```bash
# 1. Image bauen
docker build -t guler-dev .

# 2. Container starten (mit Umgebungsvariablen)
docker run -d \
  --name guler-dev \
  -p 3000:3000 \
  -e RESEND_API_KEY="re_xxx" \
  -e RESEND_FROM="Güler.dev <kontakt@guler.dev>" \
  -e CONTACT_EMAIL="fatih.gueler75@gmail.com" \
  -e NEXT_PUBLIC_SITE_URL="https://guler.dev" \
  guler-dev
```

Davor: einen Reverse-Proxy (Nginx, Caddy oder Traefik) für HTTPS einrichten.
**Caddy** ist am einfachsten – es holt das SSL-Zertifikat automatisch:

```
guler.dev {
    reverse_proxy localhost:3000
}
```

---

## Variante B: Coolify (self-hosted PaaS – „eigenes Vercel")

Sehr komfortabel auf einem Hetzner-Server:

1. Coolify auf dem Server installieren (`https://coolify.io`)
2. Neues Projekt → „Public Repository" → dein GitHub-Repo eintragen
3. Build Pack: **Dockerfile** (wird automatisch erkannt)
4. Environment Variables setzen (siehe unten)
5. Domain `guler.dev` zuweisen – SSL kommt automatisch via Let's Encrypt
6. Deploy. Jeder Push auf `main` deployt neu.

---

## Variante C: Railway (gehostet, schnellster Start)

1. Account auf `https://railway.app` (GitHub-Login)
2. „New Project" → „Deploy from GitHub repo" → Repo wählen
3. Railway erkennt das Dockerfile automatisch
4. Unter **Variables** die Env-Variablen setzen
5. Unter **Settings → Networking** Domain generieren oder `guler.dev` verbinden

---

## GitHub-Repo anlegen (für alle Varianten)

```bash
cd guler-dev
git init
git add .
git commit -m "Initial commit: Güler.dev"
git branch -M main
git remote add origin https://github.com/fatihgueler/guler-dev.git
git push -u origin main
```

---

## Umgebungsvariablen (überall gleich)

| Variable               | Beschreibung                                  | Beispiel                                |
| ---------------------- | --------------------------------------------- | --------------------------------------- |
| `RESEND_API_KEY`       | API-Key von resend.com                        | `re_123...`                             |
| `RESEND_FROM`          | Absender (verifizierte Domain bei Resend!)    | `Güler.dev <kontakt@guler.dev>`         |
| `CONTACT_EMAIL`        | Empfänger der Anfragen                        | `fatih.gueler75@gmail.com`              |
| `NEXT_PUBLIC_SITE_URL` | Öffentliche URL (für SEO/Sitemap/OG)          | `https://guler.dev`                     |

### Resend einrichten (für das Kontaktformular)

1. Account auf [resend.com](https://resend.com) erstellen
2. **API Key** generieren → als `RESEND_API_KEY` setzen
3. Unter **Domains** deine Domain hinzufügen und die angezeigten **DNS-Einträge**
   (TXT/MX) bei deinem Domain-Anbieter eintragen → danach `RESEND_FROM` auf eine
   Adresse dieser Domain setzen (z. B. `kontakt@guler.dev`).
4. Zum Testen funktioniert vorerst `onboarding@resend.dev` als Absender.

---

## Domain verbinden (DNS)

Beim Domain-Anbieter (z. B. INWX, Porkbun, IONOS):

- **A-Record**: `@` → IP deines Servers (bei Docker/Hetzner)
  _oder_ den Anweisungen von Coolify/Railway folgen (oft CNAME).
- **CNAME**: `www` → `guler.dev`

DNS-Änderungen brauchen bis zu 24 h, meist nur wenige Minuten.

---

## Checkliste vor dem Go-Live

- [ ] `npm run build` läuft lokal fehlerfrei durch
- [ ] Echte Inhalte aus **CONTENT.md** eingesetzt
- [ ] Impressum & Datenschutz rechtssicher befüllt (Hinweis-Boxen entfernt)
- [ ] Resend-Domain verifiziert, Test-Mail über das Formular erhalten
- [ ] `NEXT_PUBLIC_SITE_URL` auf die echte Domain gesetzt
- [ ] Eigenes Foto eingebunden (statt „FG"-Monogramm)
