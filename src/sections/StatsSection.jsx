import CountUp from 'react-countup'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function StatsSection({ items }) {
  return (
    <section id="stats" className="scroll-mt-28">
      <GlassCard className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),transparent_28%)]" />
        <div className="pointer-events-none absolute left-10 top-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-4 bottom-6 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <SectionHeading
            kicker="Impact"
            title="Impact through consistent problem solving, real projects, and continuous learning."
            align="center"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => {
              const Icon = item.icon
              const hasTextDisplay = Boolean(item.display)

              return (
                <Reveal key={item.label} delay={0.08 * index}>
                  <GlassCard
                    className="group relative h-full overflow-hidden border-white/12 bg-white/[0.055] p-6 transition duration-300 hover:scale-[1.02] hover:border-cyan-300/28 hover:shadow-[0_24px_70px_rgba(14,165,233,0.16)]"
                    whileHover={{ y: -8 }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan-300/18 bg-gradient-to-br from-cyan-400/18 to-blue-500/12 text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.14)]">
                          <Icon className="text-[1.35rem]" />
                        </div>
                        <p className="pt-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">0{index + 1}</p>
                      </div>

                      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{item.label}</p>

                      <div className={[
                        'mt-5 min-h-[4.5rem] font-display font-semibold leading-tight',
                        hasTextDisplay ? 'text-[2rem] sm:text-[2.1rem]' : 'text-4xl sm:text-[2.7rem]',
                      ].join(' ')}>
                        <span className={[
                          'bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500 bg-clip-text text-transparent',
                          hasTextDisplay ? 'block max-w-full break-words leading-[1.15]' : '',
                        ].join(' ')}>
                          {item.display ? (
                            item.display
                          ) : (
                            <CountUp end={item.value} duration={2.2} enableScrollSpy scrollSpyOnce suffix={item.suffix} />
                          )}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                    </div>
                  </GlassCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
