const skillGroups = [
  'React',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'REST APIs',
  'UI Design',
  'Git & GitHub',
]

const highlights = [
  {
    title: 'Frontend',
    text: 'Responsive interfaces with clear hierarchy, reusable components, and modern React structure.',
  },
  {
    title: 'Backend',
    text: 'Structured APIs, data handling, and server-side workflows designed for maintainability.',
  },
  {
    title: 'Process',
    text: 'Strong focus on readable code, practical architecture, and smooth handoff from idea to launch.',
  },
]

export default function About() {
  return (
    <section className="panel about-panel reveal-on-scroll" id="about">
      <div className="section-heading">
        <p className="section-label">About Me</p>
        <h2>Full-stack thinking with cleaner execution and better visual judgment.</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p className="panel-text">
            I&apos;m Ashutosh Raj, a full stack developer who enjoys building interfaces
            that look sharp and systems that remain easy to scale. I care about the
            complete flow: the way a screen feels, the way data moves, and the way code
            stays manageable after launch.
          </p>
          <p className="panel-text">
            This portfolio is structured to showcase both design sense and engineering
            capability through clear sections, interactive controls, and a theme-aware
            visual system.
          </p>
        </div>

        <div className="highlight-list">
          {highlights.map((item, index) => (
            <article className="highlight-card reveal-on-scroll reveal-delay-2" key={item.title}>
              <span className="card-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="skills-band">
        {skillGroups.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
