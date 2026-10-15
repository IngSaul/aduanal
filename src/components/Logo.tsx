import { useCopy } from '../i18n'

/**
 * Official Andeus Group logo (gold swoosh + lettering) from `public/brand/`.
 * Both versions are stacked and cross-fade, so the navbar can switch tone on
 * scroll without a flash while the other file loads. `className` sets the height.
 */
export function Logo({ tone = 'navy', className = 'h-14' }: { tone?: 'navy' | 'white'; className?: string }) {
  const copy = useCopy()
  const { logo, legal } = copy.brand
  const versions = [
    { key: 'navy', src: logo.navy },
    { key: 'white', src: logo.white },
  ] as const

  return (
    <span className={`relative block aspect-[472/169] ${className}`}>
      {versions.map(({ key, src }) => {
        const shown = key === tone
        return (
          <img
            key={key}
            src={src}
            width={logo.width}
            height={logo.height}
            alt={shown ? legal : ''}
            aria-hidden={shown ? undefined : true}
            decoding="async"
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )
      })}
    </span>
  )
}
