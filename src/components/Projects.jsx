import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { projects } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

function ProjectCard({ project, index, inView }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`project-card glass rounded-2xl overflow-hidden flex flex-col ${
        project.featured ? 'ring-1 ring-white/10' : ''
      }`}
      style={project.featured ? { boxShadow: `0 0 0 1px ${project.color}20` } : {}}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => {
            e.target.parentElement.style.background = `linear-gradient(135deg, ${project.color}20, ${project.color}08)`
            e.target.style.display = 'none'
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,12,31,0.95) 100%)' }} />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{
              background: `${project.color}25`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Hover overlay with links */}
        <div className="project-overlay absolute inset-0 flex items-center justify-center gap-3"
          style={{ background: 'rgba(2,4,16,0.85)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              transition: 'all 0.2s',
            }}
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                background: `${project.color}25`,
                border: `1px solid ${project.color}50`,
                color: project.color,
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex-1">
          <h3 className="text-base font-display font-semibold text-white mb-1 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs font-mono mb-3" style={{ color: project.color }}>
            {project.tagline}
          </p>
          <p className="text-sm text-white/50 leading-relaxed">{project.description}</p>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/08 mt-4 space-y-3">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-mono mb-2">Problem</p>
                  <p className="text-xs text-white/60 leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-mono mb-2">Features</p>
                  <ul className="space-y-1">
                    {project.features.map(f => (
                      <li key={f} className="text-xs text-white/60 flex gap-2">
                        <span style={{ color: project.color }}>›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Model performance table — only for projects with metrics */}
                {project.metrics && (
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-mono mb-2">Model Comparison</p>
                    <div className="rounded-xl overflow-hidden border border-white/08">
                      <table className="w-full text-xs">
                        <thead>
                          <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                            <th className="text-left px-3 py-2 text-white/40 font-mono font-medium">Model</th>
                            <th className="text-right px-3 py-2 text-white/40 font-mono font-medium">Accuracy</th>
                            <th className="text-right px-3 py-2 text-white/40 font-mono font-medium">F1</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.metrics.map((m, i) => (
                            <tr key={m.model}
                              style={{ background: i === 0 ? `${project.color}12` : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              <td className="px-3 py-1.5 font-mono" style={{ color: i === 0 ? project.color : 'rgba(255,255,255,0.6)' }}>
                                {i === 0 ? '🏆 ' : ''}{m.model}
                              </td>
                              <td className="px-3 py-1.5 text-right" style={{ color: i === 0 ? project.color : 'rgba(255,255,255,0.5)' }}>{m.accuracy}</td>
                              <td className="px-3 py-1.5 text-right" style={{ color: i === 0 ? project.color : 'rgba(255,255,255,0.5)' }}>{m.f1}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/08">
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
                style={{ color: project.color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" /> Less</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5" /> Details</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Featured', 'ML Platform / Full-Stack', 'ML / Sales Intelligence', 'AI Analytics / Automation', 'NLP / Cloud / AWS', 'ML / Recommendation', 'Deep Learning / Computer Vision', 'Data Science / FinTech', 'Data Engineering / Scraping', 'ML / Healthcare']
  const shortCats = ['All', '⭐ Featured', 'ML Platform', 'Lead AI', 'Mini Zia', 'AWS / NLP', 'Recommendation', 'Computer Vision', 'FinTech', 'Data Eng', 'Healthcare']

  const filtered = filter === 'All'
    ? [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    : filter === 'Featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.03) 50%, transparent 100%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <span className="section-tag mb-4 inline-flex">
            <Layers className="w-3 h-3" />
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto">
            End-to-end AI and data science applications — from problem discovery to production deployment.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {shortCats.map((cat, i) => {
            const fullCat = categories[i]
            const isActive = filter === fullCat
            return (
              <button
                key={cat}
                onClick={() => setFilter(fullCat)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isActive ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          variants={fadeUp}
          custom={8}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Sinwansiraj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
