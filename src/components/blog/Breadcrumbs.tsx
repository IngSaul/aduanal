import { Link } from 'react-router'

/** Visible trail matching the page's BreadcrumbList schema. The last item is the current page. */
export function Breadcrumbs({ label, items }: { label: string; items: { name: string; path: string }[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-medium tracking-[0.18em] text-steel-300 uppercase">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex min-w-0 items-center gap-3">
              {last ? (
                <span aria-current="page" className="line-clamp-1 text-light/85">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="link-underline transition-colors hover:text-white">
                    {item.name}
                  </Link>
                  <span className="text-gold" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
