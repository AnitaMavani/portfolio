import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { Resend } from 'resend'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name is too long')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('subject')
    .trim()
    .isLength({ max: 200 }).withMessage('Subject is too long')
    .escape()
    .optional({ checkFalsy: true }),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
    .escape(),
]

// POST /api/contact
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    })
  }

  const { name, email, subject, message } = req.body

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Portfolio enquiry${subject ? `: ${subject}` : ''} — from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 2rem; color: #0e0e0d;">
          <h2 style="font-size: 1.4rem; font-weight: 400; margin-bottom: 1.5rem; border-bottom: 1px solid #d8d6cf; padding-bottom: 1rem;">
            New message from your portfolio
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: .5rem 0; font-size: .8rem; letter-spacing: .1em; text-transform: uppercase; color: #8a8a84; width: 80px;">From</td>
              <td style="padding: .5rem 0; font-size: 1rem;">${name}</td>
            </tr>
            <tr>
              <td style="padding: .5rem 0; font-size: .8rem; letter-spacing: .1em; text-transform: uppercase; color: #8a8a84;">Email</td>
              <td style="padding: .5rem 0; font-size: 1rem;"><a href="mailto:${email}" style="color: #c17d3c;">${email}</a></td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: .5rem 0; font-size: .8rem; letter-spacing: .1em; text-transform: uppercase; color: #8a8a84;">Subject</td>
              <td style="padding: .5rem 0; font-size: 1rem;">${subject}</td>
            </tr>` : ''}
          </table>

          <div style="background: #f7f5f0; border-left: 3px solid #c17d3c; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; font-size: 1rem; line-height: 1.8; color: #2a2a28;">
            ${message.replace(/\n/g, '<br />')}
          </div>

          <p style="margin-top: 2rem; font-size: .75rem; color: #8a8a84;">
            Sent via your portfolio contact form · ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' })} PT
          </p>
        </div>
      `,
    })

    return res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try emailing me directly.',
    })
  }
})

export default router
