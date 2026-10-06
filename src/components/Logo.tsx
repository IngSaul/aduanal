import { useCopy } from '../i18n'

/**
 * Andeus Group wordmark, set in type the way the brand presentation does it:
 * a bold "ANDEUS" and a light, wide-tracked "GROUP". Stands in until the
 * official logo file (gold swoosh) is supplied and placed under `public/brand/`.
 */
export function Logo({ tone = 'navy', className = '' }: { tone?: 'navy' | 'white'; className?: string }) {
  const copy = useCopy()
  const text = tone === 'navy' ? 'text-navy' : 'text-white'
  const sub = tone === 'navy' ? 'text-steel' : 'text-light/75'

  return (
    <span className={`flex items-baseline gap-2.5 leading-none ${className}`}>
      <span className={`text-[19px] font-extrabold tracking-[0.2em] ${text}`}>{copy.brand.name}</span>
      <span className={`text-[15px] font-light tracking-[0.24em] uppercase ${sub}`}>
        {copy.brand.descriptor}
      </span>
    </span>
  )
}
