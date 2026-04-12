import styles from './Projects.module.css'

const projects = [
  {
    num: '01',
    title: 'Hyper',
    desc: 'Production-grade React + TypeScript + Next.js admin dashboard. Advanced data tables with filtering, sorting & search, a real-time toast system, and a lightweight file storage module. WCAG 2.1 compliant, fully modular.',
    tags: ['React', 'TypeScript', 'Next.js', 'WCAG 2.1'],
    badge: '5K+ sales',
    href: 'https://wrapmarket.com/item/hyper-admin-dashboard-template-WB0P39K70',
  },
  {
    num: '02',
    title: 'FormSubmit.io',
    desc: 'A backend-free form-to-email SaaS developers point any HTML form at FormSubmit and submissions route to their inbox with zero server code. Includes spam protection, private email tokens, and a free contact manager.',
    tags: ['SaaS product', 'JavaScript', 'REST API', 'Email infra'],
    badge: null,
    href: 'https://formsubmit.io/',
  },
  {
    num: '03',
    title: 'Appzia',
    desc: 'A Bootstrap 5 admin dashboard template with dark/light/RTL modes, 5,000+ icons, and 5 chart libraries. Clean, modular.',
    tags: ['Bootstrap 5', 'HTML5 & CSS3', 'SASS', 'jQuery'],
    badge: 'ThemeForest',
    href: 'https://themesdesign.in/appzia/index.html',
  },
  // {
  //   num: '04',
  //   title: 'Managely + A/B Tool',
  //   desc: 'Two concurrent builds at Morpich: a multi-role company management SaaS (leaves, timesheets, tasks) and an A/B testing tool I owned from design to GCP deployment. Led the first major production release and designed the middleware architecture for scale.',
  //   tags: ['React', 'Node.js', 'Express.js', 'Docker', 'GCP'],
  //   badge: 'Current role',
  //   href: null,
  // },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.num}>03</div>
          <div className={styles.label}>Selected work</div>
          <h2 className={`${styles.heading} reveal`}>
            Shipped products.<br /><em>Real impact.</em>
          </h2>
        </div>
        <div className={styles.headerRight}>
          <div className={`${styles.count} reveal`}>05</div>
        </div>
      </div>

      {projects.map((p, i) => {
        const inner = (
          <>
            <div className={styles.projNum}>{p.num}</div>
            <div className={styles.projBody}>
              <div className={styles.projTitle}>{p.title}</div>
              <div className={styles.projMeta}>
                <p className={styles.projDesc}>{p.desc}</p>
                <div className={styles.projTags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                  {p.badge && <span className={styles.badge}>{p.badge}</span>}
                </div>
              </div>
            </div>
            <div className={styles.projArrow}>{p.href ? '↗' : '—'}</div>
          </>
        )

        return p.href ? (
          <a
            key={p.num}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.row} project-row reveal`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {inner}
          </a>
        ) : (
          <div
            key={p.num}
            className={`${styles.row} ${styles.rowNoLink} project-row reveal`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {inner}
          </div>
        )
      })}
    </section>
  )
}
