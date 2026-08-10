import { useState } from 'react'
import { CONTACT } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import IndustryModal from '../components/IndustryModal'
import { IndustryCard, type IndustryLike } from '../components/cards'
import { Button, Highlight, Reveal, Section, SectionTitle } from '../components/ui'

/** Masonry rhythm for the sector grid — deliberately uneven. */
const ASPECTS = [
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[4/5]',
]

export default function Industries() {
  const copy = useCopy()
  const [active, setActive] = useState<IndustryLike | null>(null)

  return (
    <>
      <PageHero
        eyebrow={copy.industriesPage.eyebrow}
        title={copy.industriesPage.title}
        lead={copy.industriesPage.lead}
        image="1567789884554-0b844b597180"
        imageAlt={copy.industriesPage.heroImageAlt}
      >
        <Button to="/contacto" variant="accent">
          {copy.common.quote}
        </Button>
        <Button href={CONTACT.whatsapp} variant="onDark">
          {copy.common.whatsapp}
        </Button>
      </PageHero>

      <Section tone="white">
        <Reveal>
          <SectionTitle
            eyebrow={copy.home.industriesEyebrow}
            title={copy.home.industriesTitle}
            lead={copy.home.industriesLead}
          />
        </Reveal>

        <div className="mt-14 gap-6 sm:columns-2 lg:columns-3">
          {copy.industries.map((industry, i) => (
            <div key={industry.id} className="mb-6 break-inside-avoid">
              <Reveal delay={(i % 3) * 80}>
                <IndustryCard
                  industry={industry}
                  aspect={ASPECTS[i]}
                  onOpen={() => setActive(industry)}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Cobertura */}
      <Section tone="navy" className="grid-etch">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <SectionTitle
              dark
              eyebrow={copy.home.coverageEyebrow}
              title={<Highlight parts={copy.home.coverageTitle} />}
              lead={copy.home.coverageLead}
            />
            <p className="mt-8 max-w-md border-l border-gold/50 pl-5 text-[13.5px] leading-[1.8] text-light/60">
              {copy.home.coverageNote}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-px overflow-hidden rounded-card bg-white/12 sm:grid-cols-2">
              {copy.customs.map((point, i) => (
                <li
                  key={point.name}
                  /* An odd count would leave a hole in the last row — the tail spans it. */
                  className={`flex flex-col gap-2 bg-navy p-7 ${
                    i === copy.customs.length - 1 && copy.customs.length % 2 === 1
                      ? 'sm:col-span-2'
                      : ''
                  }`}
                >
                  <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-[18px] font-bold tracking-[-0.02em] text-white">
                    {point.name}
                  </h3>
                  <span className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-steel-300 uppercase">
                    {point.type}
                  </span>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-light/60">{point.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <SectionTitle title={copy.industriesPage.ctaTitle} lead={copy.industriesPage.ctaLead} />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button to="/contacto" variant="accent" size="lg">
                {copy.common.quote}
              </Button>
              <Button to="/servicios" variant="outline" size="lg">
                {copy.common.services}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <IndustryModal industry={active} onClose={() => setActive(null)} />
    </>
  )
}
