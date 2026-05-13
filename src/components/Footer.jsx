import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/05">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-display"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}>
            S
          </div>
          <span className="text-sm text-white/40">
            Sinwan Siraj &middot; AI/ML Engineer
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/Sinwansiraj" target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors text-sm">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/mohammed-sinwan-07b410162" target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors text-sm">
            LinkedIn
          </a>
          <a href="mailto:sinwanmohammed022@gmail.com"
            className="text-white/30 hover:text-white/70 transition-colors text-sm">
            Email
          </a>
        </div>

        <p className="text-xs text-white/20">
          Built with React &amp; Framer Motion &middot; 2026
        </p>
      </div>
    </footer>
  )
}
