import { es, type Copy } from './content/copy'

/**
 * The site is published in Spanish only. Every component reads its strings
 * from here, so the copy layer stays swappable without touching the views.
 */
export function useCopy(): Copy {
  return es
}
