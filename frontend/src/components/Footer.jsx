import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Anita Mavani · Software Engineer · Vancouver, BC</p>
      <p>Open to remote &amp; hybrid opportunities</p>
    </footer>
  )
}
