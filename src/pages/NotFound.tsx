import { useCopy } from '../i18n'
import { Button } from '../components/ui'

export default function NotFound() {
  const copy = useCopy()
  return (
    <section className="grid-etch flex min-h-[70vh] items-center bg-navy">
      <div className="container-page py-32">
        <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
          {copy.notFound.eyebrow}
        </p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-tight font-bold tracking-[-0.03em] text-white">
          {copy.notFound.title}
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-light/70">
          {copy.notFound.lead}
        </p>
        <div className="mt-9">
          <Button to="/" variant="accent" size="lg">
            {copy.notFound.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
