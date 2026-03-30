import { useEffect, useMemo, useState } from 'react'
import CountUp from 'react-countup'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiBarChart2, FiClock, FiExternalLink } from 'react-icons/fi'
import { FaBrain, FaFireAlt } from 'react-icons/fa'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const LEETCODE_USERNAME = 'rajashutosh324a'
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`
const LEETCODE_API_URL = `/api/leetcode?username=${LEETCODE_USERNAME}`
const STATS_CACHE_KEY = `leetcode-stats:${LEETCODE_USERNAME}`
const STATS_CACHE_TTL = 1000 * 60 * 30
const fallbackStats = {
  totalSolved: 250,
  totalSuffix: '+',
  easySolved: '--',
  mediumSolved: '--',
  hardSolved: '--',
  submissionCalendar: null,
  recentSubmissions: [],
}

const statDefinitions = [
  { key: 'totalSolved', label: 'Total Solved', accent: 'from-cyan-300 via-sky-300 to-blue-500' },
  { key: 'easySolved', label: 'Easy', accent: 'from-emerald-300 via-teal-300 to-cyan-400' },
  { key: 'mediumSolved', label: 'Medium', accent: 'from-amber-200 via-yellow-300 to-orange-400' },
  { key: 'hardSolved', label: 'Hard', accent: 'from-rose-300 via-fuchsia-300 to-violet-500' },
]

function parseSubmissionCalendar(submissionCalendar) {
  if (!submissionCalendar || typeof submissionCalendar !== 'object') {
    return {
      activeDays: 0,
      totalSubmissions: 0,
      lastPracticeLabel: 'Calendar unavailable',
      recentActiveDays: 0,
    }
  }

  const now = Date.now()
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000

  const allEntries = Object.entries(submissionCalendar)
    .map(([timestamp, count]) => ({
      timestamp: Number(timestamp) * 1000,
      count: Number(count),
    }))
    .filter((entry) => Number.isFinite(entry.timestamp) && Number.isFinite(entry.count))
    .sort((a, b) => a.timestamp - b.timestamp)

  const recentEntries = allEntries.filter((entry) => entry.timestamp >= thirtyDaysAgo)
  const activeEntries = allEntries.filter((entry) => entry.count > 0)
  const lastEntry = [...activeEntries].reverse()[0]

  return {
    activeDays: activeEntries.length,
    totalSubmissions: activeEntries.reduce((sum, entry) => sum + entry.count, 0),
    lastPracticeLabel: lastEntry
      ? new Date(lastEntry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'No submissions yet',
    recentActiveDays: recentEntries.filter((entry) => entry.count > 0).length,
  }
}

function getConsistencySummary(calendarMeta) {
  if (calendarMeta.recentActiveDays >= 20) {
    return 'Very consistent daily practice rhythm over the last 30 days.'
  }

  if (calendarMeta.recentActiveDays >= 10) {
    return 'Active practice cadence with regular problem-solving sessions.'
  }

  if (calendarMeta.recentActiveDays >= 1) {
    return 'Recent LeetCode activity shows steady problem-solving momentum.'
  }

  if (calendarMeta.activeDays >= 1) {
    return 'Overall profile history shows meaningful problem-solving activity.'
  }

  return 'Live submission consistency data is limited right now, but the coding profile remains active.'
}

function normalizeStats(payload) {
  const data = payload?.data ?? payload
  const submissionCalendar =
    typeof data?.submissionCalendar === 'string'
      ? JSON.parse(data.submissionCalendar || '{}')
      : data?.submissionCalendar

  return {
    totalSolved: Number.isFinite(Number(data?.totalSolved)) ? Number(data.totalSolved) : fallbackStats.totalSolved,
    totalSuffix: '+',
    easySolved: Number.isFinite(Number(data?.easySolved)) ? Number(data.easySolved) : fallbackStats.easySolved,
    mediumSolved: Number.isFinite(Number(data?.mediumSolved)) ? Number(data.mediumSolved) : fallbackStats.mediumSolved,
    hardSolved: Number.isFinite(Number(data?.hardSolved)) ? Number(data.hardSolved) : fallbackStats.hardSolved,
    submissionCalendar: submissionCalendar && typeof submissionCalendar === 'object' ? submissionCalendar : null,
    recentSubmissions: Array.isArray(data?.recentSubmissions) ? data.recentSubmissions.slice(0, 3) : [],
  }
}

function readStatsCache() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STATS_CACHE_KEY)

    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw)

    if (!parsed?.savedAt || Date.now() - parsed.savedAt > STATS_CACHE_TTL) {
      window.localStorage.removeItem(STATS_CACHE_KEY)
      return null
    }

    return normalizeStats(parsed.data)
  } catch {
    return null
  }
}

function writeStatsCache(data) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      STATS_CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        data,
      }),
    )
  } catch {
    return
  }
}

function DifficultyBadge({ difficulty }) {
  const tone = {
    Easy: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
    Medium: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    Hard: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  }

  return (
    <span
      className={[
        'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]',
        tone[difficulty] ?? 'border-slate-400/20 bg-slate-400/10 text-slate-200',
      ].join(' ')}
    >
      {difficulty}
    </span>
  )
}

function StatValue({ statKey, value, suffix = '' }) {
  if (typeof value === 'number') {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key={`${statKey}-${value}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <CountUp end={value} duration={1.4} enableScrollSpy scrollSpyOnce suffix={suffix} />
        </motion.span>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={`${statKey}-${String(value)}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}

function formatSubmissionTime(timestamp) {
  if (!timestamp) {
    return 'Recent'
  }

  const date = new Date(Number(timestamp) * 1000)

  if (Number.isNaN(date.getTime())) {
    return 'Recent'
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function LeetCodeSection() {
  const [statsState, setStatsState] = useState(() => {
    const cached = readStatsCache()

    if (cached) {
      return { status: 'success', data: cached, error: false, notice: '' }
    }

    return { status: 'loading', data: fallbackStats, error: false, notice: '' }
  })
  const [dailyState, setDailyState] = useState({ status: 'loading', data: null, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeetCodeData() {
      try {
        setStatsState((current) => ({
          ...current,
          status: current.status === 'success' ? 'success' : 'loading',
          error: false,
          notice: '',
        }))

        const response = await fetch(LEETCODE_API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`LeetCode request failed with ${response.status}`)
        }

        const payload = await response.json()
        const normalized = payload?.stats ? normalizeStats(payload.stats) : fallbackStats

        writeStatsCache(normalized)
        setStatsState({ status: 'success', data: normalized, error: false, notice: '' })

        if (payload?.dailyQuestion?.question?.title) {
          setDailyState({ status: 'success', data: payload.dailyQuestion, error: '' })
        } else {
          setDailyState({ status: 'error', data: null, error: 'Daily question data is unavailable' })
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          const cached = readStatsCache()
          const hasCache = Boolean(cached)

          setStatsState({
            status: hasCache ? 'success' : 'fallback',
            data: cached ?? fallbackStats,
            error: true,
            notice: 'Live data unavailable. Showing latest known stats.',
          })
          setDailyState({ status: 'error', data: null, error: error.message })
        }
      }
    }

    loadLeetCodeData()

    return () => controller.abort()
  }, [])

  const calendarMeta = useMemo(
    () => parseSubmissionCalendar(statsState.data?.submissionCalendar),
    [statsState.data?.submissionCalendar],
  )

  const consistencySummary = useMemo(() => getConsistencySummary(calendarMeta), [calendarMeta])
  const recentSubmissions = statsState.data?.recentSubmissions ?? []

  return (
    <section id="leetcode" className="scroll-mt-28">
      <GlassCard className="relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_32%)]" />
        <div className="pointer-events-none absolute -left-8 top-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-2 bottom-4 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <SectionHeading
            kicker="LeetCode Live Stats"
            title="Consistency in problem solving, backed by real coding activity"
            description="Live data from the deployed portfolio API, keeping LeetCode stats and daily challenge data reliable in production."
          />

          {statsState.error ? (
            <Reveal delay={0.04}>
              <div className="mt-4 inline-flex items-center rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
                {statsState.notice}
              </div>
            </Reveal>
          ) : null}

          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {statDefinitions.map((stat, index) => {
              const value = statsState.data?.[stat.key] ?? fallbackStats[stat.key]
              const suffix = stat.key === 'totalSolved' ? statsState.data?.totalSuffix ?? fallbackStats.totalSuffix : ''

              return (
                <Reveal key={stat.key} delay={0.05 * index}>
                  <GlassCard
                    className="group relative h-full overflow-hidden border-white/12 bg-white/[0.055] p-4 transition duration-300 hover:scale-[1.01] hover:border-cyan-300/28 hover:shadow-[0_20px_58px_rgba(14,165,233,0.14)]"
                    whileHover={{ y: -4 }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">{stat.label}</span>
                        <FiBarChart2 className="text-base text-cyan-300" />
                      </div>

                      <div className="mt-3 min-h-[3rem] font-display text-4xl font-semibold leading-tight sm:text-[2.35rem]">
                        {statsState.status === 'loading' ? (
                          <div className="flex items-center gap-3 text-slate-200">
                            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
                            <span className="text-xl">Loading...</span>
                          </div>
                        ) : (
                          <span className={`bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                            <StatValue statKey={stat.key} value={value} suffix={suffix} />
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {statsState.error
                          ? 'Showing a reliable fallback so the section stays polished even when the live endpoint is temporarily unavailable.'
                          : stat.key === 'totalSolved'
                            ? 'Overall solved count pulled through the deployed portfolio API.'
                            : 'Difficulty-wise solved counts sourced through the deployed portfolio API.'}
                      </p>
                    </div>
                  </GlassCard>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Reveal delay={0.12} className="lg:col-span-2">
              <GlassCard className="relative overflow-hidden border-white/12 bg-white/[0.055] p-5 transition duration-300" whileHover={{ y: -4 }}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),transparent_34%)]" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Daily Question</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">Today&apos;s coding challenge</h3>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/18 bg-cyan-400/10 text-cyan-200">
                      <FaBrain className="text-lg" />
                    </div>
                  </div>

                  {dailyState.status === 'loading' ? (
                    <div className="mt-4 space-y-3">
                      <div className="h-7 w-2/3 animate-pulse rounded-2xl bg-white/8" />
                      <div className="h-5 w-32 animate-pulse rounded-full bg-white/8" />
                      <div className="h-16 animate-pulse rounded-[24px] bg-white/6" />
                    </div>
                  ) : dailyState.status === 'success' ? (
                    <>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <DifficultyBadge difficulty={dailyState.data.question.difficulty} />
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                          #{dailyState.data.question.questionFrontendId}
                        </span>
                        <span className="text-sm text-slate-400">Updated for {dailyState.data.date}</span>
                      </div>

                      <h4 className="mt-4 font-display text-3xl font-semibold text-white">
                        {dailyState.data.question.title}
                      </h4>

                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        A fresh daily challenge to keep problem-solving sharp and interview preparation consistent.
                      </p>

                      <div className="mt-4">
                        <a
                          href={`https://leetcode.com${dailyState.data.link}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(59,130,246,0.4)]"
                        >
                          Solve Today&apos;s Question
                          <FiArrowUpRight className="text-base" />
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="mt-4 rounded-[22px] border border-white/10 bg-slate-950/45 p-4 text-sm leading-7 text-slate-300">
                      <p className="font-semibold text-white">Today&apos;s challenge is not available right now.</p>
                      <p className="mt-2">
                        You can still explore my latest activity and problem-solving progress below.
                      </p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.18}>
              <GlassCard className="relative h-full overflow-hidden border-white/12 bg-white/[0.055] p-5 transition duration-300" whileHover={{ y: -4 }}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),transparent_34%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Daily Coding Status</p>
                      <h3 className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-semibold text-white">
                        <FaFireAlt className="text-orange-300" />
                        Live Practice Snapshot
                      </h3>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-orange-300/18 bg-orange-400/10 text-orange-200">
                      <FaFireAlt className="text-lg" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2.5">
                    {recentSubmissions.length > 0 ? (
                      recentSubmissions.map((submission) => (
                        <a
                          key={`${submission.titleSlug}-${submission.timestamp}`}
                          href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-white/[0.06]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-white">{submission.title}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                                {submission.lang} • {formatSubmissionTime(submission.timestamp)}
                              </p>
                            </div>
                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                              {submission.statusDisplay}
                            </span>
                          </div>
                        </a>
                      ))
                    ) : (
                      <>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">Practicing DSA regularly</div>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">Focused on consistency and problem solving</div>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">Active LeetCode learner</div>
                      </>
                    )}
                  </div>

                  <div className="mt-4 rounded-[22px] border border-cyan-300/12 bg-slate-950/45 p-4 text-sm leading-7 text-slate-300">
                    <p className="font-semibold text-white">Consistency indicator</p>
                    <p className="mt-2">{consistencySummary}</p>
                    <div className="mt-3 flex flex-wrap gap-2.5 text-xs uppercase tracking-[0.22em] text-slate-400">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Overall active days: {calendarMeta.activeDays}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Overall submissions: {calendarMeta.totalSubmissions}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Last practice: {calendarMeta.lastPracticeLabel}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.22}>
              <GlassCard className="h-full border-white/12 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-cyan-950/40 p-5 transition duration-300" whileHover={{ y: -4 }}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Profile</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">rajashutosh324a</h3>
                  </div>
                  <FiClock className="text-lg text-cyan-300" />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Regularly solving LeetCode problems to strengthen data structures and algorithmic thinking.
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Focused on consistency, clean logic, and improving problem-solving skills through daily practice.
                </p>
                <a
                  href={LEETCODE_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                >
                  View Live LeetCode Profile
                  <FiExternalLink className="text-base" />
                </a>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
