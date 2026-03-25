import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'

function Label({ children }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-white/[0.04] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cyan-200/90 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-xl">
      <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
      {children}
    </div>
  )
}

export default function AboutSection({ data }) {
  return (
    <section id="about" className="scroll-mt-28">
      <GlassCard className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute -left-10 top-16 h-40 w-40 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-10">
          <div>
            <Reveal>
              <Label>{data.kicker}</Label>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="relative mt-6 max-w-3xl">
                <div className="pointer-events-none absolute -left-6 top-2 h-28 w-28 rounded-full bg-cyan-400/14 blur-3xl" />
                <h2 className="relative font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[3rem] lg:leading-[1.08]">
                  {data.heading}
                </h2>
              </div>
            </Reveal>

            <div className="mt-6 space-y-4 text-base leading-8 text-slate-300 sm:text-[1.05rem]">
              {data.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.12 + index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-cyan-300/35 hover:text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {data.achievements.map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-cyan-300/12 bg-gradient-to-br from-white/[0.07] to-white/[0.03] px-4 py-4 shadow-[0_20px_40px_rgba(8,15,35,0.35)] backdrop-blur-xl"
                  >
                    <p className="text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/45 p-5 shadow-[0_24px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Currently</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {data.current.map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.48}>
              <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-white sm:text-xl">
                <span className="bg-gradient-to-r from-cyan-200 via-white to-slate-300 bg-clip-text text-transparent">
                  {data.highlightLine}
                </span>
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 pt-1">
            {data.pillars.map((pillar, index) => {
              const Icon = pillar.icon

              return (
                <Reveal key={pillar.title} delay={0.16 + index * 0.1}>
                  <GlassCard
                    className="group relative overflow-hidden border-white/12 bg-white/[0.055] p-6 transition duration-300 hover:scale-[1.02] hover:border-cyan-300/30 hover:shadow-[0_26px_80px_rgba(14,165,233,0.16)]"
                    whileHover={{ y: -10 }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.12),transparent_30%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/18 bg-gradient-to-br from-cyan-400/18 to-blue-500/12 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                        <Icon className="text-[1.55rem]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">0{index + 1}</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-white">{pillar.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-[0.96rem]">{pillar.text}</p>
                      </div>
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
