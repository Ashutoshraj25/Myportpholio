import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className="footer reveal-on-scroll">
      <p>&copy; 2026 Ashutosh Raj. Built with React.</p>
      <div className="footer-links">
        <a href="https://github.com/Ashutoshraj25" target="_blank" rel="noreferrer">
          <span className="social-symbol">
            <SocialIcon type="github" fallback="GH" />
          </span>
          <span>GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ashutosh-raj01/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-symbol">
            <SocialIcon type="linkedin" fallback="in" />
          </span>
          <span>LinkedIn</span>
        </a>
        <a
          href="https://leetcode.com/u/rajashutosh324a/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-symbol">
            <SocialIcon type="leetcode" fallback="LC" />
          </span>
          <span>LeetCode</span>
        </a>
      </div>
    </footer>
  )
}
