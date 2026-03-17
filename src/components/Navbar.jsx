const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar({ activeSection, theme, onToggleTheme }) {
  return (
    <nav className="topbar">
      <a className="brand-lockup" href="#home">
        <span className="brand-mark">AR</span>
        <span>
          <strong>Ashutosh Raj</strong>
          <small>Full Stack Developer</small>
        </span>
      </a>

      <div className="nav-links">
        {navItems.map((item) => (
          <a
            className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button className="theme-toggle" type="button" onClick={onToggleTheme}>
        <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </nav>
  )
}
