import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Code2, Database, Zap } from 'lucide-react'
import { stats } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const highlights = [
  {
    icon: Brain,
    color: '#00d4ff',
    title: 'AI & Machine Learning',
    desc: 'Designing intelligent systems with classical ML and deep learning models across regression, classification, and NLP domains.',
  },
  {
    icon: Code2,
    color: '#7c3aed',
    title: 'Python & Backend',
    desc: 'Building production-grade APIs with FastAPI and data apps with Streamlit — from prototype to deployment.',
  },
  {
    icon: Database,
    color: '#ec4899',
    title: 'Data Engineering',
    desc: 'Crafting end-to-end data pipelines — scraping, cleaning, transforming, and storing structured data for downstream ML.',
  },
  {
    icon: Zap,
    color: '#f59e0b',
    title: 'Cloud & Deployment',
    desc: 'Leveraging AWS services (S3, Lambda, Comprehend) to deploy scalable, serverless AI solutions in the cloud.',
  },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">About Me</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Turning <span className="gradient-text">Data into Intelligence</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            I'm an AI/ML Engineer passionate about building systems that learn, predict, and automate — bridging the gap between raw data and actionable intelligence.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Profile + bio */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Profile image */}
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="/assets/profile.jpg"
                    alt="Sinwan Siraj"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-4xl"
                    style={{ background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)' }}>
                    🤖
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-900" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-white">Sinwan Siraj</h3>
                <p className="text-xs text-white/30 font-mono -mt-0.5 mb-1">Mohammed Sinwan</p>
                <p className="text-sm text-cyan-400 font-mono">AI / ML Engineer</p>
                <p className="text-sm text-white/40 mt-1">📍 India &nbsp;·&nbsp; Open to Remote</p>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-4 text-white/60 leading-relaxed text-sm sm:text-base">
              <p>
                I'm a <span className="text-white/90 font-medium">former hospitality entrepreneur turned AI/ML Engineer</span> — 8 years running hotel operations gave me a front-row seat to the inefficiencies data science can solve.
              </p>
              <p>
                After running a 40-pax restaurant as Head of Operations and managing a team of 8, I transitioned into Data Science in 2024 — and I've been building ever since. That domain depth is why my{' '}
                <span className="text-white/90 font-medium">Hotel ML Platform</span> solves real problems, not textbook ones.
              </p>
              <p>
                Today I build <span className="text-white/90 font-medium">end-to-end AI systems</span> — from data pipelines to cloud-deployed APIs — across hospitality, NLP, and business intelligence.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {[
                { label: 'GitHub', href: 'https://github.com/Sinwansiraj', icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )},
                { label: 'Email', href: 'mailto:sinwanmohammed022@gmail.com', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                )},
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammed-sinwan-07b410162', icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )},
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white/90 transition-all border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  custom={2 + i * 0.2}
                  className="glass rounded-2xl p-5 group hover:border-white/15 transition-all duration-300 cursor-default"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${h.color}18`, border: `1px solid ${h.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: h.color }} />
                  </div>
                  <h4 className="text-sm font-semibold text-white/90 mb-2">{h.title}</h4>
                  <p className="text-xs text-white/45 leading-relaxed">{h.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={3 + i * 0.15}
              className="glass rounded-2xl p-6 text-center group hover:border-cyan-400/20 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-display font-bold gradient-text-cyan">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1 font-medium tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
