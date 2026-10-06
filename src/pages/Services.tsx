import { CONTACT, unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import {
  IconBriefcase,
  IconClipboardCheck,
  IconCompass,
  IconDocSeal,
  IconShield,
  IconTruck,
} from '../components/icons'
import { Button, Eyebrow, Img, Reveal, Section, SectionTitle } from '../components/ui'

/** Order matches `copy.services`, and the icons used on the home page. */
const ICONS = [IconCompass, IconBriefcase, IconClipboardCheck, IconShield, IconDocSeal, IconTruck]

export default function Services() {
  const copy = useCopy()

  return (
    <>
      <PageHero
        eyebrow={copy.servicesPage.eyebrow}
        title={copy.servicesPage.title}
        lead={copy.servicesPage.lead}
        image="1494412574643-ff11b0a5c1c3"
        imageAlt={copy.servicesPage.heroImageAlt}
      >
        <Button href={CONTACT.whatsapp} variant="accent">
          {copy.common.quote}
        </Button>
        <Button to="/contacto" variant="onDark">
          {copy.common.contactForm}
        </Button>
      </PageHero>

      {/* Índice de servicios — tabla de contenido de la página. */}
      <section className="border-b border-navy/8 bg-white py-12">
        <div className="container-page">
          <h2 className="sr-only">{copy.servicesPage.indexTitle}</h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.services.map((service, i) => {
              const Icon = ICONS[i]
              return (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="group flex items-center gap-4 border-b border-navy/8 py-3 transition-colors hover:border-gold"
                  >
                    <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-steel">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-5 w-5 shrink-0 text-blue transition-colors group-hover:text-gold-600" />
                    <span className="text-[14px] font-semibold text-navy transition-colors group-hover:text-gold-600">
                      {service.title}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {copy.services.map((service, i) => {
        const Icon = ICONS[i]
        const flip = i % 2 === 1
        return (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-24 py-20 md:py-28 ${flip ? 'bg-mist' : 'bg-white'}`}
          >
            <div className="container-page">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <Img
                      src={unsplash(service.image, 1100, 850)}
                      alt={service.imageAlt}
                      className="aspect-[5/4] w-full rounded-card"
                    />
                    <span
                      className="absolute -bottom-4 left-6 hidden h-8 w-24 bg-gold md:block"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>

                <Reveal delay={100} className={flip ? 'lg:order-1' : ''}>
                  <Eyebrow>{`${String(i + 1).padStart(2, '0')} — ${service.title}`}</Eyebrow>
                  <h2 className="mt-6 flex items-start gap-4 text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.12] font-bold tracking-[-0.028em] text-navy">
                    <Icon className="mt-1.5 h-8 w-8 shrink-0 text-gold" />
                    {service.title}
                  </h2>
                  <p className="mt-6 text-[15px] leading-[1.85] text-steel">{service.description}</p>

                  <h3 className="mt-9 font-mono text-[10.5px] font-semibold tracking-[0.2em] text-navy uppercase">
                    {copy.common.includes}
                  </h3>
                  <ul className="mt-4 grid gap-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-navy/85">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.appliesTo ? (
                    <>
                      <h3 className="mt-9 font-mono text-[10.5px] font-semibold tracking-[0.2em] text-navy uppercase">
                        {copy.common.appliesTo}
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {service.appliesTo.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-navy/15 px-4 py-1.5 text-[12px] font-medium tracking-[0.02em] text-steel"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <div className="mt-10">
                    <Button href={CONTACT.whatsapp}>{copy.common.quote}</Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )
      })}

      <Section tone="navy" className="grid-etch">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <SectionTitle dark title={copy.servicesPage.ctaTitle} lead={copy.servicesPage.ctaLead} />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={CONTACT.whatsapp} variant="accent" size="lg">
                {copy.common.quote}
              </Button>
              <Button to="/contacto" variant="onDark" size="lg">
                {copy.common.contactForm}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
