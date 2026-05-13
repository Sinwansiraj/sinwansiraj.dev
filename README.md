# ✦ AI/ML Engineer Portfolio — React + Vite

> A modern, premium portfolio template built for developers, data scientists, and AI engineers.  
> Designed to look like a high-end AI startup landing page — not a generic template.

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/Sinwansiraj/portfolio/generate)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-00d4ff?style=for-the-badge&logo=vercel&logoColor=black)](https://sinwansiraj.vercel.app)
[![React](https://img.shields.io/badge/React%2018-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite%205-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com)

---

## ✨ Features

- 🎨 **Dark glassmorphism** design — cyan/purple gradient accents, premium card layouts
- ⚡ **Framer Motion** animations — scroll reveals, typing effect, section transitions
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🧭 **Floating navbar** that turns glass on scroll with active section tracking
- 🚀 **Loading screen** with animated progress bar
- 🔢 **Scroll progress indicator** + custom cursor glow effect
- 🗂️ **Filterable projects section** with expandable detail cards
- 📊 **Live GitHub stats** — fetches real data from the GitHub API (no broken images)
- 🏅 **Certifications section** with image cards and skill tags
- ⏳ **Career timeline** — alternating layout with animated icons
- 💬 **WhatsApp contact button** + contact form + social links
- 🌐 **SEO optimised** — Open Graph meta tags, page title, description

---

## 🖥️ Preview

| Section | Description |
|---|---|
| Hero | Animated typing tagline, CTA buttons, floating particles |
| About | Bio, career highlights, animated stat counters |
| Skills | Categorised skill cards with icons |
| Projects | Filterable grid, expandable details, model metrics table |
| Experience | Alternating career timeline + certifications grid |
| GitHub | Live API stats, top languages bar, featured repos |
| Contact | Social cards, WhatsApp, contact form |

---

## 🚀 Quick Start

> Requires **Node.js 18+** — [download here](https://nodejs.org)

**Option A — Use as template (recommended)**

Click the green **"Use this template"** button above to create your own copy, then:

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
npm run dev
```

**Option B — Clone directly**

```bash
git clone https://github.com/Sinwansiraj/portfolio.git
cd portfolio
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🏗️ Project Structure

```
portfolio/
├── public/
│   └── assets/              ← Project thumbnails, cert images, profile photo
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx   ← Timeline + Certifications (combined)
│   │   ├── GitHubStats.jsx
│   │   ├── Contact.jsx      ← WhatsApp + form + social links
│   │   └── Footer.jsx
│   ├── data/
│   │   └── index.js         ← ⭐ All content lives here — projects, skills, timeline, certs
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ✏️ Personalisation Checklist

All content is centralised — most changes only require editing **two files**.

### 1. `src/data/index.js` — Your content
| Export | What to update |
|---|---|
| `projects` | Title, description, tech stack, GitHub links, demo URLs, thumbnails |
| `skills` | Skill names, icons, categories |
| `timeline` | Career history entries |
| `certifications` | Cert title, issuer, image, skills |
| `stats` | About section stat cards |

### 2. `src/components/` — Your identity

| File | What to update |
|---|---|
| `About.jsx` | Bio text, profile photo path |
| `Hero.jsx` | Name, tagline strings |
| `Contact.jsx` | Email, GitHub, LinkedIn, WhatsApp number (`wa.me/...`) |
| `GitHubStats.jsx` | `GITHUB_USER` constant (line 14) |
| `Navbar.jsx` | GitHub URL in the CTA button |

### 3. `index.html` — SEO
```html
<title>Your Name | AI/ML Engineer</title>
<meta name="description" content="Your tagline here" />
```

### 4. `public/assets/` — Images
Replace the images with your own:
- `profile.jpg` — your profile photo
- Project thumbnails — referenced in `data/index.js`
- Certification images — referenced in `data/index.js`

---

## 🌐 Deploy to Vercel (Free — ~2 minutes)

### Option A: Vercel Dashboard (easiest)
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy**

Your site goes live at `https://your-username.vercel.app`

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📬 Connect a Real Contact Form

The form currently simulates submission. To make it live, replace the handler in `Contact.jsx` with [Formspree](https://formspree.io) (free tier available):

```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

Sign up at formspree.io → create a form → paste your form ID.

---

## 🎨 Color Palette

| Token | Hex | Used for |
|---|---|---|
| Cyan | `#00d4ff` | Primary glow, active links, headings |
| Purple | `#7c3aed` | Gradients, category tags |
| Pink | `#ec4899` | Highlights, featured badges |
| Dark BG | `#020410` | Page background |
| Glass | `rgba(255,255,255,0.04)` | Card backgrounds |

To change the accent color, search for `#00d4ff` in `index.css` and `src/` and replace globally.

---

## 📦 Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations |
| Lucide React | latest | Icons |
| react-type-animation | latest | Typing effect in Hero |
| react-intersection-observer | latest | Scroll-triggered reveals |
| Google Fonts | — | Inter, Syne, JetBrains Mono |

---

## 🙌 Credits & License

Built by **[Sinwan Siraj](https://github.com/Sinwansiraj)** — AI/ML Engineer.

Free to use as a template. If you build something with it, a ⭐ on the repo is appreciated!

---

<p align="center">
  <a href="https://sinwansiraj.vercel.app">Live Site</a> · 
  <a href="https://github.com/Sinwansiraj/portfolio/generate">Use Template</a> · 
  <a href="https://www.linkedin.com/in/mohammed-sinwan-07b410162">LinkedIn</a>
</p>
