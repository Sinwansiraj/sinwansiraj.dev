import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { timeline, certifications } from '../data'
import { ExternalLink } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

// ── Certification Card ────────────────────────────────────────────────────────
function CertCard({ cert, index, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="glass rounded-2xl overflow-hidden group hover:border-white/15 transition-all duration-300"
      whileHover={{ y: -4 }}
      style={{ boxShadow: `0 0 0 1px ${cert.color}15` }}
    >
      {/* Certificate image strip */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={e => {
            e.target.parentElement.style.background = `linear-gradient(135deg, ${cert.color}18, ${cert.color}06)`
            e.target.style.display = 'none'
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,12,31,0.97) 100%)' }}
        />
        {/* Issuer badge */}
        <div className="absolute bottom-3 left-4">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background: `${cert.color}22`,
              border: `1px solid ${cert.color}40`,
              color: cert.color,
            }}
          >
            {cert.badge} {cert.issuerLogo}
          </span>
        </div>
        {/* Date badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {cert.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-sm font-display font-semibold text-white leading-snug mb-1">
          {cert.title}
        </h4>
        <p className="text-xs font-mono mb-3" style={{ color: cert.color }}>
          {cert.issuer}
        </p>
        <p className="text-xs text-white/50 leading-relaxed mb-4">
          {cert.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.map(s => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: `${cert.color}10`,
                border: `1px solid ${cert.color}20`,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Experience() {
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [certRef, certInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <>
      {/* ── Journey Timeline ── */}
      <section id="experience" ref={timelineRef} className="relative py-28 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <span className="section-tag mb-4 inline-flex">Journey</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
              Learning &amp; <span className="gradient-text">Growth</span>
            </h2>
            <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
              A self-driven journey from curiosity to building real-world AI products.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line opacity-30" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeLeft}
                  custom={i + 1}
                  initial="hidden"
                  animate={timelineInView ? 'visible' : 'hidden'}
                  className={`relative flex gap-8 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'} pl-16 sm:pl-0`}>
                    <motion.div
                      className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-3"
                        style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
                        {item.year}
                      </span>
                      <h3 className="text-lg font-display font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-cyan-400/80 font-medium mb-3">{item.subtitle}</p>
                      <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                      <div className={`flex flex-wrap gap-2 mt-4 ${i % 2 === 0 ? 'sm:justify-end' : ''}`}>
                        {item.tags.map(tag => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-8 sm:left-1/2 sm:-translate-x-1/2 flex items-start pt-6">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                        border: '2px solid rgba(0,212,255,0.3)',
                        boxShadow: '0 0 20px rgba(0,212,255,0.15)',
                      }}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" ref={certRef} className="relative py-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.02) 50%, transparent 100%)' }} />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={certInView ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <span className="section-tag mb-4 inline-flex">🏅 Credentials</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
              Certifications &amp; <span className="gradient-text">Training</span>
            </h2>
            <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
              Industry-recognised credentials from AWS, British Airways, Tata, and GUVI / IIT Pravartak.
            </p>
          </motion.div>

          {/* Cert grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} inView={certInView} />
            ))}
          </div>

          {/* Issuer strip */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate={certInView ? 'visible' : 'hidden'}
            className="mt-12 glass rounded-2xl px-8 py-5 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { name: 'GUVI · HCL', color: '#10b981' },
              { name: 'Amazon Web Services', color: '#f59e0b' },
              { name: 'British Airways', color: '#1d4ed8' },
              { name: 'Tata Group', color: '#0ea5e9' },
              { name: 'IIT Pravartak', color: '#7c3aed' },
              { name: 'Forage', color: '#ec4899' },
            ].map(org => (
              <span key={org.name} className="text-sm font-medium" style={{ color: org.color }}>
                {org.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
