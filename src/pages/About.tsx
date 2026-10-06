import { CONTACT, unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import { ClientGrid, Timeline, ValueCard } from '../components/cards'
import { IconBriefcase, IconCompass, IconShield, IconTarget } from '../components/icons'
import { Button, Img, Reveal, Section, SectionTitle } from '../components/ui'

/** Order matches `copy.values`. */
const VALUE_ICONS = [IconBriefcase, IconShield, IconTarget, IconCompass]

export default function About() {
  const copy = useCopy()
  const about = copy.aboutPage

  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        image="1486406146926-c627a92ad1ab"
        imageAlt={about.heroImageAlt}
      />

      {/* ---------------------------------------------------------- Historia */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative lg:sticky lg:top-28">
              <Img
                src={unsplash('1454165804606-c3d57bc86b40', 900, 900)}
                alt={about.storyImageAlt}
                className="aspect-square w-full rounded-card"
              />
              <span className="absolute -top-4 -left-4 h-24 w-1 bg-gold" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionTitle eyebrow={about.storyEyebrow} title={about.storyTitle} />
            <div className="mt-8 flex flex-col gap-6">
              {about.storyBody.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-[15px] leading-[1.9] ${i === 0 ? 'text-navy' : 'text-steel'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- Compromiso */}
      <Section tone="navy" className="grid-etch">
        <Reveal>
          <SectionTitle dark eyebrow={about.valueBlockEyebrow} title={about.valueBlockTitle} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.values.map((value, i) => (
            <Reveal key={value.id} delay={i * 90} className="h-full">
              <ValueCard index={i + 1} icon={VALUE_ICONS[i]} title={value.title} text={value.text} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Clientes */}
      <Section tone="mist">
        <Reveal>
          <SectionTitle eyebrow={about.clientsEyebrow} title={copy.home.clientsTitle} />
        </Reveal>
        <Reveal delay={120} className="mt-14 block">
          <ClientGrid clients={copy.clients} />
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- Proceso */}
      <Section tone="white">
        <Reveal>
          <SectionTitle eyebrow={about.processEyebrow} title={copy.home.processTitle} />
        </Reveal>
        <Reveal delay={120} className="mt-16 block">
          <Timeline items={copy.process} />
        </Reveal>
        <Reveal delay={200} className="mt-16 block">
          <div className="flex flex-col gap-6 rounded-card bg-mist p-9 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[19px] font-bold tracking-[-0.02em] text-navy">{about.ctaTitle}</h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-steel">{about.ctaLead}</p>
            </div>
            <Button href={CONTACT.whatsapp} variant="accent">
              {copy.common.quote}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
