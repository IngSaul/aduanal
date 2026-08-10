import { useEffect, useRef, type ReactNode } from 'react'
import { useCopy } from '../i18n'
import { IconClose } from './icons'

export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  const copy = useCopy()
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={copy.common.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-navy/70 backdrop-blur-[1px]"
        style={{ animation: 'none' }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[18px] bg-white shadow-2xl outline-none sm:rounded-card"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.common.close}
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow-sm transition-colors hover:bg-navy hover:text-white"
        >
          <IconClose className="h-4.5 w-4.5" />
        </button>
        {children}
      </div>
    </div>
  )
}
