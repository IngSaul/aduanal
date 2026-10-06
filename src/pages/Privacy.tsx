import { useCopy } from '../i18n'
import PageHero from '../components/PageHero'
import { Reveal, Section } from '../components/ui'

export default function Privacy() {
  const copy = useCopy()
  const page = copy.privacyPage

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="1450101499163-c8848c66ca85"
        imageAlt={page.heroImageAlt}
      />

      <Section tone="white">
        <Reveal>
          <article className="mx-auto max-w-3xl">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-steel uppercase">
              {page.updated}
            </p>

            {page.sections.map((section, i) => (
              <section key={section.title} className="mt-12 border-t border-navy/10 pt-10 first-of-type:mt-10">
                <h2 className="flex items-baseline gap-4 text-[clamp(1.2rem,2.4vw,1.5rem)] leading-snug font-bold tracking-[-0.02em] text-navy">
                  <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-[15px] leading-[1.85] text-steel">
                    {paragraph}
                  </p>
                ))}

                {section.items ? (
                  <ul className="mt-5 grid gap-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-navy/85">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.after?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-[15px] leading-[1.85] text-steel">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </Reveal>
      </Section>
    </>
  )
}
