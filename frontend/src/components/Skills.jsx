import styles from './Skills.module.css'

const columns = [
  {
    label: 'Frontend',
    skills: ['React & Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Redux', 'Bootstrap & Material UI', 'WCAG / 508 Accessibility'],
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js & Express.js', 'REST API Design', 'Java & Spring Boot', 'PostgreSQL & MySQL', 'Redis & Couchbase', 'Elastic Stack (ELK)', 'Jest & Unit Testing'],
  },
  {
    label: 'DevOps & Tools',
    skills: ['Docker', 'GCP & Microsoft Azure', 'Jenkins & Spinnaker', 'Git & GitHub', 'Kibana & Monitoring', 'Agile & Scrum · Jira', 'Lighthouse & Perf'],
  },
]

const marqueeItems = ['React','TypeScript','Next.js','Node.js','Express.js','Docker','GCP','Azure','Redux','WCAG','Jest','Elastic']

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.header}>
        <h2 className={`${styles.heading} reveal`}>My toolkit,<br /><em>refined.</em></h2>
        <p className={`${styles.intro} reveal`} style={{ transitionDelay: '.1s' }}>
          Used in production across enterprise, SaaS, and marketplace products — not just tutorials.
        </p>
      </div>

      <div className={`${styles.grid} reveal`} style={{ transitionDelay: '.15s' }}>
        {columns.map((col) => (
          <div key={col.label} className={styles.col}>
            <div className={styles.colLabel}>{col.label}</div>
            {col.skills.map((s) => (
              <div key={s} className={`${styles.item} skill-item`}>
                <span>{s}</span>
                <span className={styles.dot} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={i % 2 === 0 ? styles.word : styles.dot2}>{i % 2 === 0 ? item : '·'}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
