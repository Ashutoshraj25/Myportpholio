const projects = [
  {
    title: 'Portfolio Experience',
    summary: 'A visually rich React portfolio with theme switching, animation, and reusable sections.',
    stack: 'React / State / Responsive UI',
  },
  {
    title: 'Admin Dashboard Concept',
    summary: 'A data-focused interface built for fast navigation, modular cards, and practical layout decisions.',
    stack: 'React / API Integration / UX',
  },
  {
    title: 'Full Stack App Foundation',
    summary: 'An application starter covering frontend structure, backend integration patterns, and scalable code organization.',
    stack: 'Node.js / Express / MongoDB',
  },
]

export default function Projects() {
  return (
    <section className="panel projects-panel reveal-on-scroll" id="projects">
      <div className="section-heading">
        <p className="section-label">Projects</p>
        <h2>Selected work and build direction.</h2>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card reveal-on-scroll reveal-delay-2" key={project.title}>
            <span className="card-index">0{index + 1}</span>
            <p className="project-stack">{project.stack}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <span className="project-link">Case study ready</span>
          </article>
        ))}
      </div>
    </section>
  )
}
