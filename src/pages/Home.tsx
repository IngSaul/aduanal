import { useEffect, useState } from 'react'
import { CONTACT, unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import { ClientGrid, FeatureCard, Timeline } from '../components/cards'
import {
  IconBriefcase,
  IconClipboardCheck,
  IconCompass,
  IconDocSeal,
  IconShield,
  IconTarget,
  IconTruck,
} from '../components/icons'
import { Button, Eyebrow, Highlight, Img, Reveal, Section, SectionTitle } from '../components/ui'

const HERO_IMAGE = '1578575437130-527eed3abbec'

/** Icons for the trust block. Order matches `copy.values`. */
const VALUE_ICONS = [IconBriefcase, IconShield, IconTarget, IconCompass]

/** Icons for the service teasers. Order matches `copy.services`. */
const SERVICE_ICONS = [
  IconCompass,
  IconBriefcase,
  IconClipboardCheck,
  IconShield,
  IconDocSeal,
  IconTruck,
]

export default function Home() {
  const copy = useCopy()
  const [offset, setOffset] = useState(0)

  // Subtle parallax: the hero photograph drifts at 30% of scroll speed.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, 900) * 0.3))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-navy">
        <div
          className="absolute inset-0 -top-24 -bottom-24"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <Img
            src={unsplash(HERO_IMAGE, 2000, 1300)}
            alt={copy.home.heroImageAlt}
            loading="eager"
            className="h-full w-full"
            imgClassName="opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/88 to-navy/30"
          aria-hidden="true"
        />
        <div className="grid-etch absolute inset-0" aria-hidden="true" />

        <div className="container-page relative w-full pt-40 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow dark>{copy.home.heroEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-7 text-[clamp(2.1rem,6vw,4.6rem)] leading-[1.05] font-bold tracking-[-0.035em] text-white">
                <Highlight parts={copy.home.heroTitle} />
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-7 max-w-2xl border-l-2 border-gold pl-5 text-[15px] leading-[1.85] text-light/80 md:text-[17px]">
                {copy.home.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={CONTACT.whatsapp} variant="accent" size="lg">
                  {copy.common.quoteLong}
                </Button>
                <Button to="/servicios" variant="onDark" size="lg">
                  {copy.common.services}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 border-t border-white/12 pt-8 sm:grid-cols-3 md:mt-24">
            {copy.home.heroFacts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-gold uppercase">
                  {label}
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Valores */}
      <Section tone="white">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="flex-1">
            <SectionTitle
              eyebrow={copy.home.valuesEyebrow}
              title={copy.home.valuesTitle}
              lead={copy.home.valuesLead}
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-navy sm:grid-cols-2 lg:grid-cols-4">
          {copy.values.map((value, i) => {
            const Icon = VALUE_ICONS[i]
            return (
              <Reveal key={value.id} delay={i * 80} className="h-full">
                <div className="group relative isolate flex h-full min-h-[300px] flex-col overflow-hidden bg-navy p-7">
                  {/* Decorative backdrop: blurred so it reads as texture, sharpening on hover. */}
                  <Img
                    src={unsplash(value.image, 700, 800)}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full"
                    imgClassName="scale-110 blur-[3px] transition duration-700 ease-out group-hover:scale-105 group-hover:blur-[1px]"
                  />
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/80 to-navy/55"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-white/20 bg-navy/40 text-gold backdrop-blur-sm transition-colors duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-light/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-auto pt-14 text-[16px] font-bold tracking-[-0.015em] text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.75] text-light/80">{value.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* -------------------------------------------------------- Servicios */}
      <Section tone="mist">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="flex-1">
            <SectionTitle
              eyebrow={copy.home.servicesEyebrow}
              title={copy.home.servicesTitle}
              lead={copy.home.servicesLead}
            />
          </Reveal>
          <Reveal delay={120}>
            <Button to="/servicios" variant="outline">
              {copy.home.servicesCta}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 70} className="h-full">
              <FeatureCard
                index={i + 1}
                icon={SERVICE_ICONS[i]}
                title={service.title}
                text={service.short}
                to={`/servicios#${service.id}`}
                image={unsplash(service.image, 800, 900)}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Proceso */}
      <Section tone="white">
        <Reveal>
          <SectionTitle
            eyebrow={copy.home.processEyebrow}
            title={copy.home.processTitle}
            lead={copy.home.processLead}
          />
        </Reveal>
        <Reveal delay={120} className="mt-16 block">
          <Timeline items={copy.process} />
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- Clientes */}
      <Section tone="mist">
        <Reveal>
          <SectionTitle eyebrow={copy.home.clientsEyebrow} title={copy.home.clientsTitle} />
        </Reveal>
        <Reveal delay={120} className="mt-14 block">
          <ClientGrid clients={copy.clients} />
        </Reveal>
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
            <ul className="grid border-t border-white/12 sm:grid-cols-2 sm:gap-x-10">
              {copy.customs.map((point, i) => (
                <li
                  key={point.name}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1.5 border-b border-white/12 py-5 transition-colors duration-400 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[17px] font-bold tracking-[-0.02em] text-white">{point.name}</h3>
                  <span className="col-start-2 font-mono text-[10.5px] font-medium tracking-[0.18em] text-steel-300 uppercase">
                    {point.type}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------ Diferenciador */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <Eyebrow>{copy.home.statementEyebrow}</Eyebrow>
            <h2 className="mt-7 max-w-2xl text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.032em] text-navy">
              <Highlight parts={copy.home.statementTitle} />
            </h2>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-steel md:text-[16.5px]">
              {copy.home.statementLead}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="flex flex-col">
              {copy.home.statementPillars.map((pillar) => (
                <li key={pillar.title} className="border-t border-navy/10 py-6 last:border-b">
                  <h3 className="flex items-center gap-3 text-[15px] font-bold tracking-[0.03em] text-navy uppercase">
                    <span className="h-px w-6 bg-gold" aria-hidden="true" />
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.8] text-steel">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------- CTA */}
      <FinalCta />

    </>
  )
}

function FinalCta() {
  const copy = useCopy()
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div className="grid-etch absolute inset-0" aria-hidden="true" />
      <span className="absolute top-0 left-0 h-1 w-40 bg-gold" aria-hidden="true" />
      <div className="container-page relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {copy.home.ctaTitle}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-light/70">
              {copy.home.ctaLead}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={CONTACT.whatsapp} variant="accent" size="lg">
                {copy.home.ctaPrimary}
              </Button>
              <Button to="/contacto" variant="onDark" size="lg">
                {copy.common.contactForm}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
