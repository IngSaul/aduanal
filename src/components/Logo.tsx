import { useCopy } from '../i18n'

/**
 * ADUANEX mark: a gold-framed plate holding an "A" cut by a meridian line —
 * the customs plate and the globe, reduced to two strokes.
 */
export function LogoMark({
  className = 'h-9 w-9',
  tone = 'navy',
}: {
  className?: string
  tone?: 'navy' | 'white'
}) {
  const letter = tone === 'navy' ? '#0D1B2A' : '#FFFFFF'
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="1.6" y="1.6" width="36.8" height="36.8" rx="7.5" fill="none" stroke="#C89D3C" strokeWidth="1.8" />
      <path
        d="M12 28.4 20 10.6l8 17.8"
        fill="none"
        stroke={letter}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.6 22.6h10.8" fill="none" stroke="#C89D3C" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ tone = 'navy', className = '' }: { tone?: 'navy' | 'white'; className?: string }) {
  const copy = useCopy()
  const text = tone === 'navy' ? 'text-navy' : 'text-white'
  const sub = tone === 'navy' ? 'text-steel' : 'text-light/70'

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[19px] font-extrabold tracking-[0.16em] ${text}`}>{copy.brand.name}</span>
        <span className={`mt-1.5 font-mono text-[8.5px] font-medium tracking-[0.22em] uppercase ${sub}`}>
          {copy.brand.descriptor}
        </span>
      </span>
    </span>
  )
}
