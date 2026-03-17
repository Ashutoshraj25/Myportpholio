import SocialIcon from './SocialIcon'

const contactItems = [
  {
    label: 'GitHub',
    type: 'github',
    symbol: 'GH',
    value: 'github.com/Ashutoshraj25',
    href: 'https://github.com/Ashutoshraj25',
  },
  {
    label: 'LinkedIn',
    type: 'linkedin',
    symbol: 'in',
    value: 'linkedin.com/in/ashutosh-raj01',
    href: 'https://www.linkedin.com/in/ashutosh-raj01/',
  },
  {
    label: 'LeetCode',
    type: 'leetcode',
    symbol: 'LC',
    value: 'leetcode.com/u/rajashutosh324a',
    href: 'https://leetcode.com/u/rajashutosh324a/',
  },
]

export default function Contact() {
  return (
    <section className="panel contact-panel reveal-on-scroll" id="contact">
      <div className="contact-copy">
        <p className="section-label">Contact</p>
        <h2>Have a project, role, or collaboration in mind?</h2>
        <p className="panel-text">
          Use these profiles to review my code, professional background, and problem
          solving work. A resume or email link can be added here next.
        </p>
        <div className="hero-actions">
          <a
            className="primary-btn"
            href="https://www.linkedin.com/in/ashutosh-raj01/"
            target="_blank"
            rel="noreferrer"
          >
            Open LinkedIn
          </a>
          <a className="ghost-btn" href="#home">
            Back to Top
          </a>
        </div>
      </div>

      <div className="contact-grid">
        {contactItems.map((item, index) => (
          <article className="contact-card reveal-on-scroll reveal-delay-2" key={item.label}>
            <span className="card-index">0{index + 1}</span>
            <p className="section-label">{item.label}</p>
            <h3>
              <a className="contact-link" href={item.href} target="_blank" rel="noreferrer">
                <span className="social-symbol">
                  <SocialIcon type={item.type} fallback={item.symbol} />
                </span>
                {item.value}
              </a>
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}
