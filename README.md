# Anita Mavani — Portfolio

Personal portfolio website built with **React + Vite** (frontend) and **Node.js + Express** (backend), deployed on **Netlify** (frontend) and **Render** (backend).

---

## Project Structure

```
portfolio/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/   # One file + CSS module per section
│   │   ├── hooks/        # useReveal (scroll animations)
│   │   └── index.css     # Global tokens & base styles
│   ├── .env.example
│   ├── netlify.toml
│   └── vite.config.js    # Terser minification + chunk splitting
│
└── backend/           # Node.js + Express
    ├── routes/
    │   └── contact.js    # Validation → Resend email
    ├── middleware/
    │   └── rateLimiter.js
    ├── server.js
    ├── .env.example
    └── render.yaml
```

---

## Local Development

### 1. Clone & install

```bash
git clone https://github.com/AnitaMavani/portfolio.git
cd portfolio

# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 2. Set up environment variables

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:4000
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Fill in RESEND_API_KEY, TO_EMAIL, FROM_EMAIL, ALLOWED_ORIGINS
```

### 3. Run both servers

In two separate terminals:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Frontend → http://localhost:5173  
Backend  → http://localhost:4000

---

## Getting a Resend API Key

1. Sign up free at [resend.com](https://resend.com)
2. Go to **API Keys** → Create a new key
3. Paste into `backend/.env` as `RESEND_API_KEY`
4. For `FROM_EMAIL`: use `onboarding@resend.dev` for testing, or verify your own domain in Resend settings for production
5. Set `TO_EMAIL` to your Gmail address

---

## Deployment

### Frontend → Netlify

1. Push `frontend/` to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variable in Netlify dashboard:
   - `VITE_API_URL` = your Render backend URL (e.g. `https://anita-portfolio-backend.onrender.com`)
5. Deploy — `netlify.toml` handles SPA routing automatically

### Backend → Render

1. Push `backend/` to GitHub (separate repo or monorepo)
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, Render will detect `render.yaml`
4. Add environment variables in Render dashboard:
   - `RESEND_API_KEY`
   - `TO_EMAIL`
   - `FROM_EMAIL`
   - `ALLOWED_ORIGINS` = `https://your-portfolio.netlify.app`
5. Deploy

> **After deploying:** Update `VITE_API_URL` in Netlify with your live Render URL, and update `ALLOWED_ORIGINS` in Render with your live Netlify URL.

---

## Security measures

| Layer | What's in place |
|---|---|
| Secrets | All API keys in `.env`, never in frontend code |
| CORS | Strict origin whitelist — only your Netlify URL |
| Helmet | Secure HTTP headers on every response |
| Rate limiting | 5 contact form submissions per IP per hour |
| Global rate limit | 100 requests per IP per 15 minutes |
| Input validation | `express-validator` — sanitises & validates all fields |
| Body size cap | JSON requests capped at 16kb |
| JS minification | Terser in production — variable names mangled, comments stripped |
| No source maps | Source maps disabled in production build |

---

## Customisation

- **Content:** Edit data arrays in each component (e.g. `projects` in `Projects.jsx`)
- **Colors:** Change CSS variables in `src/index.css` under `:root`
- **Email template:** Edit the HTML string in `backend/routes/contact.js`
