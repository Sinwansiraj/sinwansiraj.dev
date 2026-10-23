import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillCategories } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.02) 50%, transparent 100%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-flex">02 / Tech Stack</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-lg">
            A curated toolkit for building end-to-end AI/ML solutions — from raw data to production.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="skill-card glass rounded-2xl p-5 transition-all duration-300 cursor-default"
              whileHover={{ y: -4 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
                >
                  {cat.icon}
                </div>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200"
                    style={{
                      background: `${cat.color}0e`,
                      border: `1px solid ${cat.color}20`,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
