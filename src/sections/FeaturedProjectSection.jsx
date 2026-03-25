import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

export default function FeaturedProjectSection({ project }) {
  const GithubIcon = portfolioData.icons.github

  return (
    <section id="featured" className="scroll-mt-28">
      <GlassCard className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

        <SectionHeading
          kicker="Featured Project"
          title={project.title}
          description={project.description}
        />

        <div className="mt-10 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <GlassCard className="relative overflow-hidden p-6 sm:p-8" whileHover={{ y: -6 }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(2,6,23,0.6))]" />
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Problem</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Solution</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Impact</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.impact}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.08}>
              <GlassCard className="p-6 sm:p-8" whileHover={{ y: -6 }}>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Tech Stack</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-slate-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.14}>
              <GlassCard className="p-6 sm:p-8" whileHover={{ y: -6 }}>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Project Actions</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white"
                  >
                    <GithubIcon />
                    View Source
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Explore Related Work
                    <FiArrowUpRight />
                  </motion.a>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
