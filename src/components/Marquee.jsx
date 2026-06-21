import { motion } from 'framer-motion'

// Skills / keywords that scroll across the screen between sections
const items = [
  'Python', 'Machine Learning', 'XGBoost', 'FastAPI', 'Streamlit',
  'Deep Learning', 'NLP', 'SHAP Explainability', 'AWS', 'Data Science',
  'Feature Engineering', 'REST APIs', 'SQL', 'Power BI', 'Pandas',
  'Scikit-learn', 'Jupyter', 'Git & GitHub', 'Data Analytics',
]

// One track — duplicated so the loop is seamless
function Track({ reverse = false }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0">
            <span className="text-sm font-mono text-white/35 whitespace-nowrap tracking-wider uppercase">
              {item}
            </span>
            <span className="text-white/15 text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      className="relative py-6 overflow-hidden border-y"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Left / right fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #020410, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #020410, transparent)' }}
      />

      <div className="flex flex-col gap-3">
        <Track />
        <Track reverse />
      </div>
    </div>
  )
}
