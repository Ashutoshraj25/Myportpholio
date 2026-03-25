import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCheckCircle, FiSend } from 'react-icons/fi'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactSection({ socials, contact }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a recruiter'}`)
    const body = encodeURIComponent(form.message || 'Hello Ashutosh, I would like to connect regarding an opportunity.')
    return `mailto:${contact.email}?subject=${subject}&body=${body}`
  }, [contact.email, form.message, form.name])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please add a short message.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitState('idle')
      return
    }

    setErrors({})
    setSubmitState('success')
    window.location.href = mailtoHref
    setForm(initialForm)
  }

  return (
    <section id="contact" className="scroll-mt-28 pb-4">
      <GlassCard className="relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),transparent_32%)]" />
        <div className="pointer-events-none absolute left-6 top-10 h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="pointer-events-none absolute right-2 bottom-6 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div>
              <SectionHeading kicker="Contact" title={contact.heading} description={contact.description} />

              <Reveal delay={0.08}>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
                  {contact.badge}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-6 rounded-[26px] border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Available For</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {contact.availability.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-4 rounded-[26px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Why Contact Me</p>
                  <div className="mt-3 grid gap-2.5">
                    {contact.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="rounded-[18px] border border-white/8 bg-slate-950/40 px-4 py-3 text-sm leading-7 text-slate-200"
                      >
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-5 flex flex-wrap gap-3">
                  {contact.quickActions.map((action) => {
                    const Icon = action.icon

                    return (
                      <motion.a
                        key={action.label}
                        href={action.href}
                        target={action.href.startsWith('http') ? '_blank' : undefined}
                        rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.07]"
                      >
                        <Icon />
                        {action.label}
                      </motion.a>
                    )
                  })}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <GlassCard className="relative overflow-hidden border-white/12 bg-white/[0.055] p-5 sm:p-6" whileHover={{ y: -4 }}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),transparent_32%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Send Message</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">Reach out directly</h3>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/18 bg-cyan-400/10 text-cyan-200">
                      <FiSend className="text-lg" />
                    </div>
                  </div>

                  <form className="mt-5 grid gap-3.5" onSubmit={handleSubmit} noValidate>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-[18px] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                      />
                      {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name}</p> : null}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-[18px] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                      />
                      {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email}</p> : null}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about the role, project, or collaboration opportunity."
                        className="w-full rounded-[22px] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                      />
                      {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message}</p> : null}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(59,130,246,0.4)]"
                      >
                        Send Message
                        <FiArrowUpRight className="text-base" />
                      </button>

                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                      >
                        Or email directly: {contact.email}
                      </a>
                    </div>

                    {submitState === 'success' ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                        <FiCheckCircle />
                        Message prepared successfully. Your mail app should open now.
                      </div>
                    ) : null}
                  </form>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {socials.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.label} delay={0.08 * index}>
                  <GlassCard
                    className="group h-full border-white/12 bg-white/[0.05] p-4 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/25 hover:shadow-[0_20px_52px_rgba(14,165,233,0.12)]"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                        <h3 className="mt-2 break-all font-display text-sm font-semibold leading-6 text-white sm:text-base">
                          {item.value}
                        </h3>
                      </div>
                      <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan-300/18 bg-gradient-to-br from-cyan-400/18 to-blue-500/12 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.1)]">
                        <Icon className="text-[1rem]" />
                      </div>
                    </div>
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 4 }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                    >
                      Visit Profile
                      <FiArrowUpRight className="text-base" />
                    </motion.a>
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
