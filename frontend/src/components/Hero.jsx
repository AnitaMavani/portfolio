import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`${styles.left} reveal`}>
        <div className={styles.tag}>Software Engineer · Vancouver, BC · Open to Work</div>
        <h1 className={styles.name}>
          <span>Anita</span>
        </h1>
        <p className={styles.desc}>
          Full stack engineer with 5+ years building production React &amp; Node.js
          applications from enterprise legal tech platforms to commercial products
          with thousands of users.
        </p>
      </div>

      <div className={styles.right}>
        <div className={styles.rightBg} />
        <div className={styles.bigNumber} aria-hidden="true">5</div>
        <div className={`${styles.badge} reveal`} style={{ transitionDelay: '.2s' }}>
          <div className={styles.badgeTitle}>Modern stack experience</div>
          <div className={styles.badgeStat}>5<em>+</em></div>
          <div className={styles.badgeSub}>React · Node.js · TypeScript<br />Enterprise · SaaS · Legal tech</div>
        </div>
        <div className={styles.scrollLabel} aria-hidden="true">Scroll</div>
      </div>

      <div className={`${styles.bottom} reveal`} style={{ transitionDelay: '.35s' }}>
        <a href="#projects" className="btn-primary">View work ↓</a>
        <a href="#contact" className="btn-ghost">Get in touch</a>
      </div>
    </section>
  )
}
