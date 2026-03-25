import { useEffect, useState } from 'react'
import SocialIcon from './SocialIcon'

const rotatingTitles = ['Ashutosh Raj', 'Full Stack Developer']

const heroStats = [
  { value: 'React', label: 'Frontend systems' },
  { value: 'Node.js', label: 'Backend workflows' },
  { value: 'UI + API', label: 'End-to-end delivery' },
]

const socialLinks = [
  {
    label: 'GitHub',
    type: 'github',
    symbol: 'GH',
    href: 'https://github.com/Ashutoshraj25',
  },
  {
    label: 'LinkedIn',
    type: 'linkedin',
    symbol: 'in',
    href: 'https://www.linkedin.com/in/ashutosh-raj01/',
  },
  {
    label: 'LeetCode',
    type: 'leetcode',
    symbol: 'LC',
    href: 'https://leetcode.com/u/rajashutosh324a/',
  },
]

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [parallaxStyle, setParallaxStyle] = useState({
    '--parallax-x': '0px',
    '--parallax-y': '0px',
  })

  useEffect(() => {
    const currentText = rotatingTitles[textIndex]
    const typingSpeed = isDeleting ? 45 : 95
    const pauseDuration = isDeleting ? 220 : 1200

    const timer = window.setTimeout(() => {
      if (!isDeleting && typedText === currentText) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setTextIndex((currentIndex) => (currentIndex + 1) % rotatingTitles.length)
        return
      }

      const nextText = isDeleting
        ? currentText.slice(0, typedText.length - 1)
        : currentText.slice(0, typedText.length + 1)

      setTypedText(nextText)
    }, typedText === currentText || typedText === '' ? pauseDuration : typingSpeed)

    return () => window.clearTimeout(timer)
  }, [isDeleting, textIndex, typedText])

  function handleShowcaseMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18

    setParallaxStyle({
      '--parallax-x': `${offsetX.toFixed(2)}px`,
      '--parallax-y': `${offsetY.toFixed(2)}px`,
    })
  }

  function resetShowcaseMove() {
    setParallaxStyle({
      '--parallax-x': '0px',
      '--parallax-y': '0px',
    })
  }

  return (
    <header className="hero" id="home">
      <div className="hero-grid">
        <div className="hero-copy reveal-on-scroll reveal-delay-1">
          <p className="eyebrow">Portfolio 2026</p>
          <div className="hero-intro-row">
            <span className="status-dot" />
            <p className="hero-kicker">Crafting sleek web products from interface to backend logic.</p>
          </div>

          <h1 className="type-title">
            {typedText}
          </h1>

          <p className="hero-text">
            I design and build portfolio sites, dashboards, and full-stack applications
            that feel refined on the surface and remain practical underneath.
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href="#projects">
              Explore Projects
            </a>
            <a className="ghost-btn" href="#contact">
              Let&apos;s Connect
            </a>
          </div>

          <div className="social-row">
            {socialLinks.map((link) => (
              <a
                className="social-pill"
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <span className="social-symbol">
                  <SocialIcon type={link.type} fallback={link.symbol} />
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="hero-note-card reveal-on-scroll reveal-delay-2">
            <p className="section-label">Current Focus</p>
            <p>
              Building responsive React interfaces, API-driven flows, and polished user
              experiences with a sharper visual standard.
            </p>
          </div>
        </div>

        <aside className="hero-spotlight">
          <div
            className="hero-showcase reveal-on-scroll reveal-delay-2"
            onMouseLeave={resetShowcaseMove}
            onMouseMove={handleShowcaseMove}
            style={parallaxStyle}
          >
            <div className="showcase-orbit">
              <span className="orbit-ring orbit-ring-one" />
              <span className="orbit-ring orbit-ring-two" />
              <span className="orbit-star orbit-star-one" />
              <span className="orbit-star orbit-star-two" />
              <div className="photo-shell">
                <div className="photo-glow" />
                <img
                  className="photo-image"
                  src="/profile-photo.jpeg"
                  alt="Ashutosh Raj portrait"
                />
              </div>
            </div>

            <div className="showcase-copy">
              <p className="section-label">Profile Frame</p>
              <h2>Ashutosh Raj</h2>
              <p>
                Full stack developer focused on polished interfaces, practical backend
                systems, and portfolio experiences with stronger visual identity.
              </p>
            </div>
          </div>

          <div className="stat-grid">
            {heroStats.map((stat) => (
              <article className="stat-card reveal-on-scroll reveal-delay-3" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </header>
  )
}
