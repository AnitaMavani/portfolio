import { useState } from 'react'
import styles from './Contact.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 10) errors.message = 'Message is too short'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      {/* Left — dark panel */}
      <div className={styles.left}>
        <div>
          <div className={styles.sectionTag}>05 · Contact</div>
          <h2 className={`${styles.heading} reveal`}>
            Let's build<br />something<br /><em>remarkable.</em>
          </h2>
          <p className={`${styles.sub} reveal`} style={{ transitionDelay: '.1s' }}>
            Open to full stack and frontend roles in
            product-focused teams, SaaS, or legal/enterprise tech. Remote/Hybrid/On-site.
          </p>
        </div>

        <div className={`${styles.links} reveal`} style={{ transitionDelay: '.2s' }}>
          <a href="https://linkedin.com/in/anita-mavani" className={styles.clink} target="_blank" rel="noopener noreferrer">
            <span className={styles.clinkLabel}>LinkedIn</span>
            linkedin.com/in/anita-mavani
          </a>
          <a href="https://github.com/AnitaMavani" className={styles.clink} target="_blank" rel="noopener noreferrer">
            <span className={styles.clinkLabel}>GitHub</span>
            github.com/AnitaMavani
          </a>
        </div>
      </div>

      {/* Right — form */}
      <div className={styles.right}>
        <p className={`${styles.formHeading} reveal`}>Drop me a line.</p>

        {status === 'success' ? (
          <div className={`${styles.successMsg} reveal in`}>
            <div className={styles.successIcon}>✓</div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out, I'll get back to you soon.</p>
            <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className={`${styles.form} reveal`} style={{ transitionDelay: '.1s' }} onSubmit={handleSubmit} noValidate>
            <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
              <label htmlFor="name">Your name</label>
              <input
                id="name" name="name" type="text"
                placeholder="Jane Smith"
                value={form.name} onChange={handleChange}
                disabled={status === 'loading'}
                autoComplete="name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
              <label htmlFor="email">Email address</label>
              <input
                id="email" name="email" type="email"
                placeholder="jane@company.com"
                value={form.email} onChange={handleChange}
                disabled={status === 'loading'}
                autoComplete="email"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">What's this about?</label>
              <input
                id="subject" name="subject" type="text"
                placeholder="A role, a project, a collab..."
                value={form.subject} onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className={`${styles.field} ${errors.message ? styles.fieldError : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                rows={4}
                placeholder="Tell me more..."
                value={form.message} onChange={handleChange}
                disabled={status === 'loading'}
              />
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            {status === 'error' && (
              <div className={styles.errorBanner}>{errorMsg}</div>
            )}

            <button
              type="submit"
              className={styles.sendBtn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
