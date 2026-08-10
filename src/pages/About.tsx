import { unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import { Timeline, ValueCard } from '../components/cards'
import { IconBriefcase, IconChat, IconEye, IconShield, IconTarget } from '../components/icons'
import { Button, Img, Reveal, Section, SectionTitle } from '../components/ui'

const VALUE_ICONS = [IconBriefcase, IconTarget, IconShield, IconChat]

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
                src={unsplash('1454165804606-c3d57bc86b40', 900, 1150)}
                alt={about.storyImageAlt}
                className="aspect-[3/4] w-full rounded-card"
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

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {[
                { icon: IconTarget, title: about.missionTitle, body: about.missionBody },
                { icon: IconEye, title: about.visionTitle, body: about.visionBody },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-card border-l-2 border-gold bg-mist p-7">
                  <Icon className="h-6 w-6 text-blue" />
                  <h3 className="mt-5 text-[15px] font-bold tracking-[0.04em] text-navy uppercase">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-steel">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Valores */}
      <Section tone="mist">
        <Reveal>
          <SectionTitle eyebrow={about.valuesEyebrow} title={about.valuesTitle} />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-card bg-navy/10 sm:grid-cols-2 lg:grid-cols-5">
          {about.values.map((value, i) => (
            <div
              key={value.title}
              className="group flex flex-col bg-white p-7 transition-colors duration-400 hover:bg-navy"
            >
              <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-steel transition-colors group-hover:text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-[16px] font-bold tracking-[-0.015em] text-navy transition-colors group-hover:text-white">
                {value.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.75] text-steel transition-colors group-hover:text-light/70">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------- Enfoque */}
      <Section tone="white">
        <Reveal>
          <SectionTitle eyebrow={about.focusEyebrow} title={about.focusTitle} />
        </Reveal>
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <ol className="flex flex-col gap-10">
              {about.focus.map((item, i) => (
                <li key={item.step} className="group relative flex gap-6 pl-1">
                  <div className="flex flex-col items-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-navy/15 font-mono text-[11px] font-semibold text-navy transition-colors duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      {item.step}
                    </span>
                    {i < about.focus.length - 1 ? (
                      <span className="mt-2 w-px flex-1 bg-navy/12" aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-[17px] font-bold tracking-[-0.015em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-[14px] leading-[1.8] text-steel">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Img
                src={unsplash('1578575437130-527eed3abbec', 700, 900)}
                alt={about.focusImageAlts[0]}
                className="aspect-[3/4] w-full rounded-card sm:mt-10"
              />
              <Img
                src={unsplash('1553413077-190dd305871c', 700, 900)}
                alt={about.focusImageAlts[1]}
                className="aspect-[3/4] w-full rounded-card"
              />
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
            <Button to="/contacto" variant="accent">
              {copy.common.quote}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
