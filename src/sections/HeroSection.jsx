import { motion } from 'framer-motion'
import { useTypewriter } from 'react-simple-typewriter'
import { FiArrowUpRight } from 'react-icons/fi'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'

export default function HeroSection({ data, profile, socials }) {
  const [text] = useTypewriter({
    words: data.typedRoles,
    loop: true,
    typeSpeed: 85,
    deleteSpeed: 45,
    delaySpeed: 1600,
  })

  return (
    <section id="home" className="relative scroll-mt-28 py-20 sm:py-24 lg:py-28">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-stretch">
        <GlassCard className="premium-ring overflow-visible px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="relative z-10 flex flex-col gap-8">
            <Reveal>
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
                {data.availability}
              </div>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={0.08}>
                <p className="max-w-xl text-sm uppercase tracking-[0.35em] text-slate-400">Premium Full-Stack Portfolio</p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="max-w-3xl pt-1 pb-2">
                  <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    <span className="inline-block whitespace-nowrap bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                      {text}
                    </span>
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {data.description}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={data.primaryCta.href}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(14,165,233,0.35)] transition duration-300 hover:shadow-[0_22px_48px_rgba(37,99,235,0.42)]"
                >
                  {data.primaryCta.label}
                  <data.primaryCta.icon className="text-base" />
                </motion.a>
                <motion.a
                  href={data.secondaryCta.href}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-gradient-to-r from-slate-900/85 via-sky-950/60 to-slate-900/85 px-6 py-3 text-sm font-semibold text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.28)] transition duration-300 hover:shadow-[0_20px_42px_rgba(14,165,233,0.2)]"
                >
                  {data.secondaryCta.label}
                  <FiArrowUpRight className="text-base" />
                </motion.a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <GlassCard className="grid gap-4 border-white/8 bg-slate-950/45 p-5 transition duration-300" whileHover={{ y: -4 }}>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Current Focus</p>
                <p className="text-sm leading-7 text-slate-300 sm:text-base">{data.focus}</p>
              </GlassCard>
            </Reveal>
          </div>
        </GlassCard>

        <div className="grid gap-6">
          <Reveal delay={0.14}>
            <GlassCard className="group relative overflow-hidden px-6 py-8 transition duration-300 sm:px-8" whileHover={{ y: -8 }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.16),transparent_32%)] opacity-90" />
              <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle at 50% 30%, rgba(103, 232, 249, 0.18), transparent 32%)' }}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-cyan-400/40 via-sky-500/30 to-blue-500/35 blur-2xl" />
                  <div className="animated-border relative rounded-full p-[2px] shadow-[0_18px_48px_rgba(14,165,233,0.18)]">
                    <div className="rounded-full bg-slate-950/95 p-2.5">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        loading="lazy"
                        className="h-44 w-44 rounded-full object-cover object-top shadow-[0_20px_40px_rgba(8,15,33,0.45)] transition duration-300 group-hover:scale-[1.02] sm:h-52 sm:w-52"
                      />
                    </div>
                  </div>
                </motion.div>

                <p className="mb-2 text-sm uppercase tracking-[0.32em] text-cyan-300">Profile Card</p>
                <h2 className="font-display text-3xl font-semibold text-white">{profile.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{profile.role}</p>
                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{profile.description}</p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {socials.map((item) => {
                    const Icon = item.icon

                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition duration-300 hover:shadow-[0_12px_28px_rgba(14,165,233,0.15)]"
                      >
                        <Icon className="text-base text-cyan-300" />
                        {item.label}
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {data.floatingBadges.map((item, index) => (
              <Reveal key={item.label} delay={0.2 + index * 0.08}>
                <GlassCard className="h-full p-5 transition duration-300" whileHover={{ y: -6, scale: 1.02 }}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className="mt-3 font-display text-xl font-semibold text-white">{item.value}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
