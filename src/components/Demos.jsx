import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, MonitorPlay, ArrowUpRight } from 'lucide-react'
import { projects } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

// Only projects with a live demo URL
const demoProjects = projects.filter(p => p.demo)

function DemoCard({ project, index, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index + 1}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative group glass rounded-3xl overflow-hidden flex flex-col"
      style={{ boxShadow: `0 0 0 1px ${project.color}20` }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)` }}
      />

      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => {
            e.target.parentElement.style.background = `linear-gradient(135deg, ${project.color}18, ${project.color}06)`
            e.target.style.display = 'none'
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(6,12,31,0.97) 100%)' }}
        />

        {/* Live badge */}
        <div className="absolute top-4 left-4">
          <span
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: `1px solid ${project.color}50`,
              color: project.color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.color }}
            />
            Live
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-1">{project.title}</h3>
          <p className="text-xs font-mono" style={{ color: project.color }}>{project.tagline}</p>
        </div>

        <p className="text-sm text-white/50 leading-relaxed flex-1">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: `${project.color}10`,
                border: `1px solid ${project.color}20`,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Launch button */}
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 group/btn"
          style={{
            background: `linear-gradient(135deg, ${project.color}25, ${project.color}10)`,
            border: `1px solid ${project.color}40`,
            color: project.color,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${project.color}40, ${project.color}20)`
            e.currentTarget.style.borderColor = `${project.color}70`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${project.color}25, ${project.color}10)`
            e.currentTarget.style.borderColor = `${project.color}40`
          }}
        >
          <MonitorPlay className="w-4 h-4" />
          Launch Demo
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Demos() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="demos" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' }}
        />
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
          <span className="section-tag mb-4 inline-flex">
            <MonitorPlay className="w-3 h-3" />
            Try It Live
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Available <span className="gradient-text">Demos</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Real applications, live on the web — click and explore without any setup.
          </p>
        </motion.div>

        {/* Demo cards */}
        <div className={`grid gap-8 ${demoProjects.length === 1 ? 'max-w-lg mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {demoProjects.map((project, i) => (
            <DemoCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          custom={demoProjects.length + 1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center text-xs text-white/25 font-mono mt-10"
        >
          More projects being deployed — check back soon.
        </motion.p>
      </div>
    </section>
  )
}
