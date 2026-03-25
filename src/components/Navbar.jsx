const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, isScrolled }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={[
          'mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6',
          isScrolled
            ? 'border-white/12 bg-slate-950/70 shadow-[0_20px_60px_rgba(2,6,23,0.5)] backdrop-blur-2xl'
            : 'border-white/8 bg-white/[0.04] backdrop-blur-xl',
        ].join(' ')}
      >
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 font-display text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)]">
            CC
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-sm font-semibold text-white">CodeCanvas</span>
            <span className="block text-xs text-slate-400">Ashutosh Raj</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={[
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-200',
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200',
                ].join(' ')}
              >
                <span className={isActive ? 'absolute inset-0 rounded-full bg-white/10' : ''} />
                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}
        </div>

        <a
          href="#contact"
          className="inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-cyan-300/15"
        >
          Let&apos;s Talk
        </a>
      </nav>
    </header>
  )
}
