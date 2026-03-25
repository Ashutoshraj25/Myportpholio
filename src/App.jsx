import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import TechStackSection from './sections/TechStackSection'
import StatsSection from './sections/StatsSection'
import LeetCodeSection from './sections/LeetCodeSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import { portfolioData, sectionOrder } from './data/portfolioData'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrolled } from './hooks/useScrolled'

const backgroundStars = [
  { left: '6%', top: '10%', size: 'sm', delay: '0s', duration: '9s' },
  { left: '14%', top: '24%', size: 'md', delay: '1.2s', duration: '11s' },
  { left: '22%', top: '16%', size: 'sm', delay: '2.1s', duration: '8.5s' },
  { left: '28%', top: '34%', size: 'lg', delay: '0.6s', duration: '13s' },
  { left: '38%', top: '12%', size: 'sm', delay: '3.4s', duration: '9.5s' },
  { left: '44%', top: '26%', size: 'md', delay: '2.4s', duration: '10.5s' },
  { left: '52%', top: '8%', size: 'sm', delay: '4s', duration: '8s' },
  { left: '58%', top: '22%', size: 'lg', delay: '1.5s', duration: '12.5s' },
  { left: '66%', top: '14%', size: 'sm', delay: '2.7s', duration: '8.8s' },
  { left: '72%', top: '30%', size: 'md', delay: '0.8s', duration: '11.3s' },
  { left: '80%', top: '18%', size: 'sm', delay: '3.1s', duration: '9.8s' },
  { left: '88%', top: '12%', size: 'lg', delay: '1.9s', duration: '12.8s' },
  { left: '10%', top: '46%', size: 'sm', delay: '2.2s', duration: '9.4s' },
  { left: '18%', top: '58%', size: 'md', delay: '0.3s', duration: '10.7s' },
  { left: '26%', top: '72%', size: 'sm', delay: '4.1s', duration: '8.7s' },
  { left: '34%', top: '52%', size: 'lg', delay: '1.1s', duration: '13.2s' },
  { left: '42%', top: '66%', size: 'sm', delay: '2.9s', duration: '9.1s' },
  { left: '50%', top: '82%', size: 'md', delay: '0.7s', duration: '11.1s' },
  { left: '60%', top: '56%', size: 'sm', delay: '3.8s', duration: '8.9s' },
  { left: '68%', top: '74%', size: 'lg', delay: '1.4s', duration: '12.4s' },
  { left: '76%', top: '62%', size: 'sm', delay: '2.5s', duration: '9.6s' },
  { left: '84%', top: '80%', size: 'md', delay: '0.9s', duration: '10.9s' },
  { left: '92%', top: '54%', size: 'sm', delay: '3.3s', duration: '8.4s' },
  { left: '12%', top: '88%', size: 'lg', delay: '1.8s', duration: '13.4s' },
]

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
    >
      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="absolute h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <motion.div
          className="relative h-20 w-20 rounded-[28px] border border-white/10 bg-white/5 shadow-[0_0_45px_rgba(59,130,246,0.35)] backdrop-blur-xl"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 2.8, ease: 'linear', repeat: Infinity }}
        >
          <div className="absolute inset-[7px] rounded-[22px] border border-cyan-300/30" />
          <div className="absolute inset-0 grid place-items-center font-display text-xl font-semibold text-white">
            CC
          </div>
        </motion.div>
        <div>
          <p className="font-display text-lg font-semibold text-white">CodeCanvas</p>
          <p className="text-sm text-slate-400">Loading premium full-stack portfolio...</p>
        </div>
      </div>
    </motion.div>
  )
}

function StarField() {
  const stars = useMemo(() => backgroundStars, [])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={`${star.left}-${star.top}-${index}`}
          className={`star-dot star-${star.size}`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const activeSection = useActiveSection(sectionOrder)
  const isScrolled = useScrolled(24)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1350)
    return () => window.clearTimeout(timer)
  }, [])

  const sections = useMemo(
    () => [
      <HeroSection key="hero" data={portfolioData.hero} profile={portfolioData.profile} socials={portfolioData.socials} />,
      <AboutSection key="about" data={portfolioData.about} />,
      <TechStackSection key="stack" items={portfolioData.stack} />,
      <StatsSection key="stats" items={portfolioData.stats} />,
      <LeetCodeSection key="leetcode" />,
      <ProjectsSection key="projects" projects={portfolioData.projects} />,
      <ContactSection key="contact" socials={portfolioData.socials} contact={portfolioData.contact} />,
    ],
    [],
  )

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--color-bg)] text-slate-100">
      <AnimatePresence>{showLoader ? <Loader /> : null}</AnimatePresence>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.14),transparent_38%),linear-gradient(180deg,_#030712_0%,_#061120_48%,_#020617_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
        <StarField />
      </div>

      <Navbar activeSection={activeSection} isScrolled={isScrolled} />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-14 pt-24 sm:px-6 md:gap-6 md:pb-16 lg:gap-7 lg:px-8">
        {sections}
      </main>
    </div>
  )
}
