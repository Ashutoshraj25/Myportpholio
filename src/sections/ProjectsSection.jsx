import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

export default function ProjectsSection({ projects }) {
  const GithubIcon = portfolioData.icons.github
  const ExternalIcon = portfolioData.icons.external

  return (
    <section id="projects" className="scroll-mt-28">
      <GlassCard className="relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),transparent_30%)]" />
        <div className="pointer-events-none absolute left-6 top-10 h-36 w-36 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="pointer-events-none absolute right-4 bottom-6 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <SectionHeading
            kicker="Projects"
            title="Projects that demonstrate real-world problem solving, full-stack development, and data-driven thinking."
            description="A focused selection of builds that highlight product thinking, implementation depth, and the ability to solve practical problems with clean execution."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => {
              const ProjectIcon = project.icon

              return (
                <Reveal key={project.title} delay={0.08 * index}>
                  <GlassCard
                    className="group relative h-full overflow-hidden border-white/12 bg-white/[0.055] p-5 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/25 hover:shadow-[0_24px_70px_rgba(14,165,233,0.14)]"
                    whileHover={{ y: -8 }}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90`} />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.9))]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-xl text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-xl">
                          <ProjectIcon />
                        </div>
                        <p className="pt-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">0{index + 1}</p>
                      </div>

                      <h3 className="mt-5 font-display text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>

                      <div className="mt-5 space-y-2.5">
                        {project.features.map((feature) => (
                          <div
                            key={feature}
                            className="rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 backdrop-blur-xl"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-100"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 rounded-[20px] border border-cyan-300/12 bg-slate-950/45 p-4 backdrop-blur-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">Impact</p>
                        <p className="mt-2 text-sm leading-7 text-slate-200">{project.impact}</p>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 pt-5">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.08]"
                        >
                          <GithubIcon />
                          GitHub
                        </motion.a>
                        <motion.a
                          href={project.live}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(59,130,246,0.28)] transition duration-300 hover:shadow-[0_20px_42px_rgba(99,102,241,0.34)]"
                        >
                          <ExternalIcon />
                          Live Demo
                        </motion.a>
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
