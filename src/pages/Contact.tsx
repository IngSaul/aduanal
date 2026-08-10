import { useState, type FormEvent } from 'react'
import { CONTACT } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import { InfoCard } from '../components/cards'
import { IconClock, IconGlobe, IconMail, IconPin, IconWhatsApp } from '../components/icons'
import { Button, Reveal, Section } from '../components/ui'

const CARD_ICONS = [IconGlobe, IconWhatsApp, IconMail, IconClock]

const fieldClass =
  'h-12 w-full rounded-[10px] border border-navy/15 bg-white px-4 text-[14px] text-navy transition-colors duration-300 placeholder:text-steel-300 focus:border-navy focus:outline-none'

const labelClass = 'font-mono text-[10.5px] font-medium tracking-[0.18em] text-steel uppercase'

export default function Contact() {
  const copy = useCopy()
  const page = copy.contactPage
  const [sent, setSent] = useState(false)

  // Frontend only: no request is made, the form just acknowledges the input.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

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
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* ---------------------------------------------------- Formulario */}
          <Reveal>
            <div className="rounded-card border border-navy/10 p-7 md:p-10">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-bold tracking-[-0.025em] text-navy">
                {page.formTitle}
              </h2>
              <p className="mt-3 text-[14px] text-steel">{page.formLead}</p>

              <form onSubmit={onSubmit} className="mt-9 grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={labelClass}>
                    {page.fields.name} *
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={fieldClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className={labelClass}>
                    {page.fields.company} *
                  </label>
                  <input
                    id="company"
                    name="company"
                    required
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>
                    {page.fields.email} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className={labelClass}>
                    {page.fields.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="service" className={labelClass}>
                    {page.fields.service}
                  </label>
                  <select id="service" name="service" defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      {page.fields.servicePlaceholder}
                    </option>
                    {copy.services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {page.fields.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={page.fields.messagePlaceholder}
                    className={`${fieldClass} h-auto resize-y py-3.5 leading-relaxed`}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-[12px] leading-relaxed text-steel">{page.privacy}</p>
                  <Button type="submit" variant="accent" size="lg">
                    {page.submit}
                  </Button>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-[10px] border border-navy/10 bg-mist px-4 py-3 text-[13.5px] font-medium text-navy transition-opacity duration-500 sm:col-span-2 ${
                    sent ? 'opacity-100' : 'sr-only opacity-0'
                  }`}
                >
                  {sent ? page.submitted : ''}
                </p>
              </form>
            </div>
          </Reveal>

          {/* -------------------------------------------------------- Aside */}
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

            {/* Placa esquemática de ubicación — no es un mapa embebido. */}
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-card border border-navy/10 bg-mist">
                <div
                  className="dot-etch aspect-[16/10] w-full opacity-70"
                  role="img"
                  aria-label={page.mapLabel}
                />
                <div className="absolute inset-0" aria-hidden="true">
                  <span className="absolute top-1/2 left-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-navy/15" />
                  <span className="absolute top-1/2 left-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-navy/15" />
                  <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-lg">
                    <IconPin className="h-5 w-5" />
                  </span>
                </div>
                <div className="relative flex items-center justify-between gap-4 border-t border-navy/10 bg-white px-6 py-5">
                  <div>
                    <p className="text-[15px] font-bold tracking-[-0.015em] text-navy">
                      {page.mapTitle}
                    </p>
                    <p className="mt-1 text-[12.5px] text-steel">{page.mapNote}</p>
                  </div>
                  <IconGlobe className="h-5 w-5 shrink-0 text-steel-300" />
                </div>
              </div>
            </Reveal>

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
        </div>
      </Section>
    </>
  )
}
