import styles from './Experience.module.css'

const jobs = [
  {
    date: 'May 2024 — Present',
    role: 'Software Engineer',
    company: 'Morpich Design · Remote',
    desc: 'Owning the full lifecycle of an A/B testing tool, from feature design through GCP deployment. Building Managely, a multi-role SaaS management platform. Architecting reusable Express.js middleware and streamlined Docker deployments for scale.',
    pill: 'Current',
    hot: true,
  },
  {
    date: 'Sep 2022 — Apr 2024',
    role: 'MSc Applied Computer Science',
    company: 'Fairleigh Dickinson University · Vancouver · GPA 3.85',
    desc: 'Capstone: Home Cloud Transformation — a distributed home storage system using Vue.js, Java Spring Boot, MySQL, and Redis, enabling secure, low-cost personal cloud access across devices.',
    pill: 'GPA 3.85',
    hot: false,
  },
  {
    date: 'Feb 2020 — Aug 2022',
    role: 'Senior Web Developer',
    company: 'Coderthemes',
    desc: 'Part of Hyper, a commercial React/TypeScript/Next.js admin dashboard that reached 5,000+ sales on ThemeForest. Optimised SPA performance with memoization, lazy loading, and Lighthouse profiling, cutting load times by 15%.',
    pill: '5K+ sales',
    hot: false,
  },
  {
    date: 'Apr 2019 — Jan 2020',
    role: 'Frontend Web Developer',
    company: 'Casepoint Pvt Ltd · Legal Tech',
    desc: 'Contributed to ARA — Casepoint\'s next-gen eDiscovery platform and part of maintainance of LYRA during its migration. Implemented 508 accessibility compliance with ARIA improvements and colour contrast tooling. Shipped one month ahead of schedule.',
    pill: 'Early delivery',
    hot: false,
  }
]

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <h2 className={`${styles.heading} reveal`}>
        Where I've<br /><em>done the work.</em>
      </h2>

      {jobs.map((j, i) => (
        <div
          key={j.role + j.date}
          className={`${styles.row} exp-row reveal`}
          style={{ transitionDelay: `${i * 0.07}s` }}
        >
          <div className={styles.date}>{j.date}</div>
          <div className={styles.info}>
            <div className={styles.role}>{j.role}</div>
            <div className={styles.company}>{j.company}</div>
            <p className={styles.desc}>{j.desc}</p>
          </div>
          <span className={`${styles.pill} ${j.hot ? styles.hot : ''}`}>{j.pill}</span>
        </div>
      ))}
    </section>
  )
}
