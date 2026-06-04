import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, BookOpen, Code2, ExternalLink, TrendingUp, Rocket, Zap, Activity, BarChart3 } from 'lucide-react'

const GITHUB_USER = 'Sinwansiraj'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

// Language color map
const langColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
  R: '#198CE7',
  SQL: '#e38c00',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  default: '#7c3aed',
}

function getLangColor(lang) {
  return langColors[lang] || langColors.default
}

// Animated counter with optional suffix (e.g. "%+", "+", "x")
function Counter({ value, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!value) return
    const start = Date.now()
    const tick = () => {
      const elapsed = (Date.now() - start) / (duration * 1000)
      if (elapsed < 1) {
        setCount(Math.floor(value * elapsed))
        requestAnimationFrame(tick)
      } else {
        setCount(value)
      }
    }
    requestAnimationFrame(tick)
  }, [value, duration])
  return <>{count}{suffix}</>
}

export default function GitHubStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)

  // Start fetch when section comes into view
  useEffect(() => {
    if (inView && !started) {
      setStarted(true)
      fetchGitHubData()
    }
  }, [inView])

  async function fetchGitHubData() {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
      ])
      const user = await userRes.json()
      const repoList = await reposRes.json()

      setUserData(user)

      // Sort repos by stars for featured display
      const sorted = [...repoList].sort((a, b) => b.stargazers_count - a.stargazers_count)
      setRepos(sorted.slice(0, 6))

      // Aggregate languages
      const langCount = {}
      repoList.forEach(r => {
        if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
      })
      const total = Object.values(langCount).reduce((a, b) => a + b, 0)
      const sorted_langs = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([lang, count]) => ({ lang, count, pct: Math.round((count / total) * 100) }))
      setLanguages(sorted_langs)
    } catch (err) {
      console.error('GitHub API error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Curated achievement metrics — more meaningful than follower/star counts
  const statCards = [
    {
      icon: Rocket,
      label: 'Live Deployed Apps',
      value: 3,
      suffix: '',
      sublabel: 'Vercel · Render · Streamlit',
      color: '#00d4ff',
    },
    {
      icon: Zap,
      label: 'REST APIs Built',
      value: 3,
      suffix: '+',
      sublabel: 'FastAPI · Python backends',
      color: '#7c3aed',
    },
    {
      icon: Activity,
      label: 'Best Model ROC-AUC',
      value: 85,
      suffix: '%+',
      sublabel: 'XGBoost · Lead Scoring',
      color: '#10b981',
    },
    {
      icon: BarChart3,
      label: 'Sales Efficiency Gain',
      value: 70,
      suffix: '%',
      sublabel: 'Leads prioritised by AI',
      color: '#f59e0b',
    },
  ]

  return (
    <section id="github" ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.025) 50%, transparent 100%)' }}
      />

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
            <Github className="w-3 h-3" />
            Open Source
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mt-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Consistent contributions, open-source projects, and continuous learning.
          </p>
        </motion.div>

        {loading ? (
          /* Skeleton shimmer */
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                  <div className="h-3 w-16 rounded bg-white/10 mb-3" />
                  <div className="h-8 w-12 rounded bg-white/10" />
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 animate-pulse h-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-2xl p-5 animate-pulse h-28" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Stat counters */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {statCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.label}
                    variants={fadeUp}
                    custom={1 + i * 0.15}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass rounded-2xl p-5 text-center"
                    style={{ boxShadow: `0 0 0 1px ${card.color}20` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: card.color }} />
                    </div>
                    <p className="text-2xl font-display font-bold text-white">
                      {inView ? <Counter value={card.value} suffix={card.suffix} /> : '—'}
                    </p>
                    <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">{card.label}</p>
                    {card.sublabel && (
                      <p className="text-[10px] text-white/25 font-mono mt-1">{card.sublabel}</p>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Top Languages bar */}
            {languages.length > 0 && (
              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest font-mono">
                    Top Languages
                  </h3>
                </div>

                {/* Stacked bar */}
                <div className="flex rounded-full overflow-hidden h-3 mb-5 gap-0.5">
                  {languages.map(({ lang, pct }) => (
                    <motion.div
                      key={lang}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      style={{ background: getLangColor(lang), minWidth: pct > 3 ? undefined : '4px' }}
                      title={`${lang}: ${pct}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4">
                  {languages.map(({ lang, pct }) => (
                    <div key={lang} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: getLangColor(lang) }}
                      />
                      <span className="text-xs text-white/60 font-mono">{lang}</span>
                      <span className="text-xs text-white/30 font-mono">{pct}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contribution graph (activity-graph service) */}
            <motion.div
              variants={fadeUp}
              custom={2.5}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass rounded-2xl p-6 mb-8 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest font-mono">
                  Contribution Activity
                </h3>
              </div>
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&theme=react-dark&hide_border=true&bg_color=00000000&color=00d4ff&line=7c3aed&point=ec4899&area=true`}
                alt="Contribution Graph"
                className="w-full rounded-xl"
                loading="lazy"
                onError={e => {
                  e.target.style.display = 'none'
                  const fallback = document.createElement('div')
                  fallback.className = 'flex items-center justify-center h-28 gap-3'
                  fallback.innerHTML = `
                    <span class="text-white/30 text-sm font-mono">View full contribution history on</span>
                    <a href="https://github.com/${GITHUB_USER}" target="_blank"
                      style="color:#00d4ff;font-size:0.875rem;font-family:monospace;">
                      github.com/${GITHUB_USER}
                    </a>
                  `
                  e.target.parentElement.appendChild(fallback)
                }}
              />
            </motion.div>

            {/* Top Repos */}
            {repos.length > 0 && (
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest font-mono">
                    Featured Repositories
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeUp}
                      custom={3 + i * 0.1}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl p-5 flex flex-col gap-3 group hover:border-white/15 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400/70 flex-shrink-0" />
                          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors truncate">
                            {repo.name}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                      </div>

                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2 flex-1">
                        {repo.description || 'No description provided.'}
                      </p>

                      <div className="flex items-center gap-4">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: getLangColor(repo.language) }}
                            />
                            <span className="text-xs text-white/40 font-mono">{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <Star className="w-3 h-3 text-amber-400/70" />
                          <span className="text-xs text-white/40 font-mono">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-white/30" />
                          <span className="text-xs text-white/40 font-mono">{repo.forks_count}</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              Visit GitHub Profile
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
