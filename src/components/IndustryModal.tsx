import { unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import type { IndustryLike } from './cards'
import Modal from './Modal'
import { Button, Img } from './ui'

export default function IndustryModal({
  industry,
  onClose,
}: {
  industry: IndustryLike | null
  onClose: () => void
}) {
  const copy = useCopy()
  if (!industry) return null

  return (
    <Modal open onClose={onClose} labelledBy={`industria-${industry.id}`}>
      <Img
        src={unsplash(industry.image, 1400, 800)}
        alt={industry.imageAlt}
        loading="eager"
        className="aspect-[16/9] w-full"
      />
      <div className="p-7 md:p-10">
        <p className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-steel uppercase">
          {copy.common.sector}
        </p>
        <h2
          id={`industria-${industry.id}`}
          className="mt-4 text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-bold tracking-[-0.025em] text-navy"
        >
          {industry.name}
        </h2>

        <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-steel">{industry.description}</p>

        <h3 className="mt-9 font-mono text-[10.5px] font-semibold tracking-[0.2em] text-navy uppercase">
          {copy.common.considerations}
        </h3>
        <ul className="mt-4 grid gap-2.5 border-t border-navy/10 pt-5">
          {industry.points.map((point) => (
            <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-navy/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/contacto" variant="accent">
            {copy.common.quote}
          </Button>
          <Button to="/servicios" variant="outline">
            {copy.common.services}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
