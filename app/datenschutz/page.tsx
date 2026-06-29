import type { Metadata } from 'next'

import { Section, SectionHeading } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Datenschutz | Güler.dev',
  robots: { index: false, follow: false },
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grain" />
      <Section className="py-32">
        <div className="max-w-2xl">
          <SectionHeading eyebrow="Rechtliches" title="Datenschutzerklärung" />

          <div className="mt-12 space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Datenschutz auf einen Blick</h2>
              <p>
                Diese Website wird betrieben von Fatih Güler. Der Schutz deiner Daten ist uns wichtig. Diese Datenschutzerklärung erklärt, wie wir deine personenbezogenen Daten verarbeiten.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Verantwortlicher</h2>
              <p>
                Fatih Güler<br />
                Fuchsgarten 10<br />
                30823 Garbsen<br />
                E-Mail: <a href="mailto:fatih.gueler75@gmail.com" className="text-gold hover:text-gold-bright transition">fatih.gueler75@gmail.com</a><br />
                Telefon: <a href="tel:015777688060" className="text-gold hover:text-gold-bright transition">015777688060</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Allgemeine Informationen zur Datenverarbeitung</h2>
              <p>
                Diese Website nutzt nur technisch notwendige Daten. Wir speichern keine persönlichen Informationen durch Cookies oder Tracking-Technologien. Deine IP-Adresse wird nicht protokolliert.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Kontaktformular</h2>
              <p className="mb-3">
                Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen Daten (Name, E-Mail, Nachricht) zur Verarbeitung deiner Anfrage verwendet.
              </p>
              <div className="pl-4 border-l-2 border-gold/30">
                <p className="mb-2"><strong>Rechtsgrundlage:</strong> Artikel 6 Abs. 1 f) DSGVO (berechtigtes Interesse an der Beantwortung deiner Anfrage)</p>
                <p className="mb-2"><strong>Speicherdauer:</strong> Deine Daten werden bis zur Beantwortung der Anfrage gespeichert, danach gelöscht. Geschäftliche Korrespondenz wird ggf. archiviert.</p>
                <p><strong>Empfänger:</strong> Die Daten werden über Resend (Email-Service) verarbeitet. Resend speichert Emails zur Zustellung.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Externe Links</h2>
              <p>
                Diese Website enthält Links zu externen Websites. Für deren Datenschutzpraktiken sind wir nicht verantwortlich. Bitte lies die Datenschutzerklärungen der verlinkten Seiten.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Deine Rechte</h2>
              <p>
                Du hast das Recht auf:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Auskunft:</strong> Welche Daten wir über dich speichern</li>
                <li><strong>Berichtigung:</strong> Korrektur falscher Daten</li>
                <li><strong>Löschung:</strong> Entfernung deiner Daten (&quot;Recht auf Vergessenwerden&quot;)</li>
                <li><strong>Einschränkung:</strong> Einschränkung der Verarbeitung</li>
                <li><strong>Beschwerde:</strong> Bei der zuständigen Datenschutzbehörde (Niedersächsischer Landesbeamte für Datenschutz)</li>
              </ul>
              <p className="mt-4">
                Kontaktiere uns unter <a href="mailto:fatih.gueler75@gmail.com" className="text-gold hover:text-gold-bright transition">fatih.gueler75@gmail.com</a>, um diese Rechte auszuüben.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Sicherheit</h2>
              <p>
                Wir setzen technische und organisatorische Maßnahmen ein, um deine Daten zu schützen. Das Kontaktformular wird über HTTPS verschlüsselt übertragen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir können diese Datenschutzerklärung jederzeit aktualisieren. Die aktuelle Version findest du auf dieser Seite.
              </p>
            </section>

            <section className="pt-8 border-t border-foreground/10">
              <p className="text-sm">
                <strong>Letzte Aktualisierung:</strong> Juni 2026
              </p>
            </section>
          </div>
        </div>
      </Section>
    </div>
  )
}