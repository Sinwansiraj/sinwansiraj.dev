import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageSquare, Bot, BarChart3, Target, ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

// Freelance offerings aimed at hotels, restaurants, and SMBs
const services = [
  {
    icon: MessageSquare,
    color: '#00d4ff',
    title: 'Review & Feedback Analysis',
    desc: 'Turn guest reviews and survey responses into clear themes, sentiment, and action points — so you know what to fix first.',
  },
  {
    icon: Bot,
    color: '#7c3aed',
    title: 'WhatsApp Booking & FAQ Bots',
    desc: 'Automated WhatsApp assistants that answer common questions and take booking or enquiry details, around the clock.',
  },
  {
    icon: BarChart3,
    color: '#10b981',
    title: 'KPI & Sales-Pipeline Reports',
    desc: 'Automated insight reports on your sales pipeline and operational KPIs — the numbers that matter, explained in plain language.',
  },
  {
    icon: Target,
    color: '#f59e0b',
    title: 'Lead Scoring & Prioritisation',
    desc: 'Score and rank inbound leads by how likely they are to convert, so your team spends time on the enquiries that pay off.',
  },
]

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">07 / Work With Me</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            AI &amp; Automation for <span className="gradient-text">Small Teams</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Practical, small-scope AI and automation projects for hotels, restaurants, and SMBs — built and shipped by someone who ran operations before building software.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                custom={1 + i * 0.2}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-2xl p-5 group hover:border-white/15 transition-all duration-300 cursor-default"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h4 className="text-sm font-semibold text-white/90 mb-2">{s.title}</h4>
                <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-12"
        >
          <button onClick={scrollToContact} className="btn-primary">
            <span className="flex items-center gap-2">
              Start a project <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
