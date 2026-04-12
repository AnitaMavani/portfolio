import styles from './About.module.css'

const facts = [
  { n: '5+', label: 'Years modern stack' },
  { n: '5K+', label: 'ThemeForest sales' },
  { n: '3.85', label: "Master's GPA" },
  { n: '508', label: 'Accessibility certified' },
]

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.sidebar} reveal`}>
        <div>
          <div className={styles.num}>01</div>
          <div className={styles.label}>About</div>
        </div>
        <blockquote className={styles.quote}>
          "I care as much about how it feels as how it works — design and engineering
          are the same discipline to me."
        </blockquote>
      </div>

      <div className={styles.main}>
        <h2 className={`${styles.heading} reveal`}>
          Full stack by trade.<br /><em>Designer at heart.</em>
        </h2>
        <div className={`${styles.body} reveal`} style={{ transitionDelay: '.1s' }}>
          <p>
            I'm a software engineer who has spent the last 5+ years working across the
            full stack — building enterprise eDiscovery UIs at Casepoint, shipping a
            commercial React dashboard that hit 5,000+ sales, and currently leading
            product builds at Morpich Design from architecture through GCP deployment.
          </p>
          <p>
            I hold a Master's in Applied Computer Science from FDU Vancouver (GPA 3.85)
            and bring a rare blend of engineering rigour and design sensitivity. I write
            code that is fast, accessible, and genuinely pleasant to maintain.
          </p>
        </div>
        <div className={`${styles.facts} reveal`} style={{ transitionDelay: '.2s' }}>
          {facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <div className={styles.factN}>{f.n}</div>
              <div className={styles.factL}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
