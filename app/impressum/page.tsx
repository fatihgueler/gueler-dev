import type { Metadata } from 'next'

import { Section, Eyebrow } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum von Güler.dev – Anbieterkennzeichnung nach § 5 DDG: Fatih Güler, Webentwickler aus Hannover.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <div className="bg-background">
      <Section className="!pt-10 md:!pt-14">
        <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>Rechtliches</Eyebrow>
        </div>
        <div className="min-w-0 md:col-span-9">
          <h1 className="display break-words text-[clamp(3rem,1.5rem+7vw,9rem)]" lang="de" style={{ hyphens: "auto" }}>
            Impressum
          </h1>

          <div className="prose-brut mt-14 space-y-10">
            <section>
              <h2 className="border-t-2 border-border pt-4">Angaben gemäß § 5 DDG</h2>
              <p>
                Fatih Güler<br />
                Fuchsgarten 10<br />
                30823 Garbsen<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="border-t-2 border-border pt-4">Kontakt</h2>
              <p>
                Telefon: <a href="tel:015777688060" className="link">015777688060</a><br />
                E-Mail: <a href="mailto:fatih.gueler75@gmail.com" className="link">fatih.gueler75@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="border-t-2 border-border pt-4">Berufsbezeichnung und Kammerzugehörigkeit</h2>
              <p>
                Ausbildung zur Fachkraft für Anwendungsentwicklung (Fachinformatiker)
              </p>
            </section>

            <section>
              <h2 className="border-t-2 border-border pt-4">Haftung für Inhalte</h2>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="border-t-2 border-border pt-4">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="border-t-2 border-border pt-4">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
        </div>
      </Section>
    </div>
  )
}