import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onComplete, 500)
          }, 300)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }} />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative"
            >
              <div className="loader-ring" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold gradient-text">S</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-2xl font-display font-bold tracking-wide text-white/90">
                Sinwan Siraj
              </h1>
              <p className="text-sm font-mono text-white/40 mt-1 tracking-widest uppercase">
                AI / ML Engineer
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-48"
            >
              <div className="h-px bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <p className="text-center text-xs font-mono text-white/30 mt-2">
                {Math.min(Math.round(progress), 100)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
