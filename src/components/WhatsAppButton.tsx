import { CONTACT } from '../content/copy'
import { useCopy } from '../i18n'
import { IconWhatsApp } from './icons'

export default function WhatsAppButton() {
  const copy = useCopy()

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.common.whatsappAria}
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-gold/60 bg-navy pl-4 text-white shadow-[0_10px_30px_-10px_rgba(13,27,42,0.8)] transition-all duration-400 ease-out hover:border-gold hover:bg-gold hover:text-navy md:right-8 md:bottom-8"
    >
      <IconWhatsApp className="my-4 h-6 w-6 shrink-0 text-gold transition-colors duration-400 group-hover:text-navy" />
      <span className="max-w-0 overflow-hidden text-[12px] font-semibold tracking-[0.09em] whitespace-nowrap uppercase transition-[max-width,padding] duration-400 ease-out group-hover:max-w-[220px] group-hover:pr-5 group-hover:pl-3">
        {copy.common.whatsapp}
      </span>
      <span className="w-4 shrink-0 group-hover:hidden" aria-hidden="true" />
    </a>
  )
}
