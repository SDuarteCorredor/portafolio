import { ticker } from '../data'

export function Marquee() {
  const items = [...ticker, ...ticker]
  return (
    <section className="border-y border-white/10 bg-ink2/50 py-6">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-grotesk text-2xl font-medium md:text-3xl">
              <span className={i % 3 === 1 ? 'text-santi' : 'text-paper/80'}>{t}</span>
              <span className="text-santi">✦</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-grotesk text-2xl font-medium md:text-3xl">
              <span className={i % 3 === 1 ? 'text-santi' : 'text-paper/80'}>{t}</span>
              <span className="text-santi">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
