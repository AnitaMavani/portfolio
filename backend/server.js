import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { globalLimiter } from './middleware/rateLimiter.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 4000

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet())

// ── CORS — only allow your frontend origins ───────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, curl, Render health checks)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }))   // cap request body size
app.use(express.urlencoded({ extended: false, limit: '16kb' }))

// ── Global rate limiter ───────────────────────────────────────────────────────
app.use(globalLimiter)

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter)

// Health check for Render
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// 404 — catch unknown routes
app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.message)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`)
})
