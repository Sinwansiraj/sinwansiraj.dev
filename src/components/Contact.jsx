import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, Download, AlertCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const socials = [
  {
    icon: Mail,
    label: 'Email',
    value: 'admin@sinwansiraj.com',
    href: 'mailto:admin@sinwansiraj.com',
    color: '#00d4ff',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Sinwansiraj',
    href: 'https://github.com/Sinwansiraj',
    color: '#7c3aed',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mohammed-sinwan',
    href: 'https://www.linkedin.com/in/mohammed-sinwan-07b410162',
    color: '#0ea5e9',
  },
]

// Formspree form ID — set VITE_FORMSPREE_ID in your env (see .env.example).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', purpose: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!FORMSPREE_ID) {
      setError('The contact form isn’t set up yet. Please email me directly at admin@sinwansiraj.com.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Portfolio contact${form.purpose ? ` [${form.purpose}]` : ''}${
            form.subject ? `: ${form.subject}` : ''
          }`,
        }),
      })

      if (res.ok) {
        setSent(true)
      } else {
        // Surface Formspree's own validation message when it sends one.
        const data = await res.json().catch(() => null)
        const msg = data?.errors?.map(err => err.message).filter(Boolean).join(', ')
        setError(msg || 'Something went wrong sending your message. Please try again, or email me directly.')
      }
    } catch {
      setError('Couldn’t reach the server. Check your connection and try again, or email me directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">09 / Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Open to AI/ML roles, freelance projects, and collaboration. Let's build something intelligent together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Location */}
            <div className="flex items-center gap-3 text-white/50">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">India &nbsp;·&nbsp; Open to Remote / Relocation</span>
            </div>

            {/* Social cards */}
            <div className="space-y-3">
              {socials.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    custom={1.5 + i * 0.1}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="flex items-center gap-4 glass rounded-2xl p-4 group hover:border-white/15 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-wider">{s.label}</p>
                      <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                        {s.value}
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Availability banner */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,212,255,0.06))',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Available for opportunities</span>
              </div>
              <p className="text-xs text-white/40 mt-2 ml-5">
                Currently open to AI/ML Engineer, Data Analyst, Data Scientist, Customer Success, and Python Developer roles.
              </p>
            </div>

            {/* Download resume (public/resume.pdf) */}
            <a href="/resume.pdf" download="Mohammed_Sinwan_Resume.pdf" className="btn-outline w-full justify-center">
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass rounded-2xl p-8"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-4 text-center py-8"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Message Sent!</h3>
                <p className="text-sm text-white/50">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', purpose: '', subject: '', message: '' }) }}
                  className="text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
                    What brings you here?
                  </label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                    className="contact-input"
                  >
                    <option value="" disabled>Select one…</option>
                    <option value="Freelance / product build">Freelance / product build</option>
                    <option value="Hiring / a role">Hiring / a role</option>
                    <option value="Collaboration / partnership">Collaboration / partnership</option>
                    <option value="Just exploring">Just exploring</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project collaboration, job opportunity..."
                    className="contact-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="contact-input resize-none"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl p-3 text-xs leading-relaxed"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#fca5a5',
                    }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  <span className="flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>

                <p className="text-xs text-center text-white/25">
                  Or email directly:{' '}
                  <a href="mailto:admin@sinwansiraj.com" className="text-cyan-400/60 hover:text-cyan-400 transition-colors">
                    admin@sinwansiraj.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
