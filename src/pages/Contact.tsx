import { CONTACT } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import { InfoCard } from '../components/cards'
import { IconGlobe, IconMail, IconPin, IconWhatsApp } from '../components/icons'
import { Button, Reveal, Section } from '../components/ui'

const CARD_ICONS = [IconPin, IconWhatsApp, IconMail, IconGlobe]

export default function Contact() {
  const copy = useCopy()
  const page = copy.contactPage

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="1587293852726-70cdb56c2866"
        imageAlt={page.heroImageAlt}
      />

      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* ------------------------------------------------------- Datos */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="font-mono text-[10.5px] font-medium tracking-[0.22em] text-steel uppercase">
                {page.infoTitle}
              </h2>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {page.cards.map((card, i) => (
                <Reveal key={card.title} delay={i * 80} className="h-full">
                  <InfoCard icon={CARD_ICONS[i]} title={card.title}>
                    {card.lines.map((line) => (
                      <p key={line} className="break-words">
                        {line}
                      </p>
                    ))}
                  </InfoCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <div className="rounded-card bg-navy p-8">
                <h3 className="text-[18px] font-bold tracking-[-0.02em] text-white">
                  {page.whatsappTitle}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-light/70">{page.whatsappLead}</p>
                <div className="mt-7">
                  <Button href={CONTACT.whatsapp} variant="onDark">
                    {copy.common.whatsapp}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* --------------------------------------------------------- Mapa */}
          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-card border border-navy/10 bg-mist">
              <iframe
                src={CONTACT.mapEmbed}
                title={page.mapLabel}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="aspect-[4/3] w-full flex-1 border-0 lg:aspect-auto lg:min-h-[420px]"
              />
              <div className="flex items-center justify-between gap-4 border-t border-navy/10 bg-white px-6 py-5">
                <div>
                  <p className="text-[15px] font-bold tracking-[-0.015em] text-navy">
                    {page.mapTitle}
                  </p>
                  <p className="mt-1 text-[12.5px] text-steel">{page.mapNote}</p>
                </div>
                <IconPin className="h-5 w-5 shrink-0 text-gold" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
