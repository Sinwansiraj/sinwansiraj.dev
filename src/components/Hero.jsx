import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, Github, Mail, ChevronDown } from 'lucide-react'

// Generate floating particles
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 20}s`,
    size: Math.random() > 0.7 ? 3 : 2,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gradient overlay to fade grid */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #020410 80%)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(124,58,237,0.1) 0%, transparent 50%), #020410' }}
    >
      <GridBackground />
      <Particles />

      {/* Large glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite reverse' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="section-tag">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-4 tracking-tight"
        >
          <span className="text-white">Sinwan</span>
          <br />
          <span className="gradient-text">Siraj</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl sm:text-2xl lg:text-3xl font-mono mb-6 h-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <TypeAnimation
            sequence={[
              'AI / ML Engineer',
              2000,
              'Data Scientist',
              2000,
              'Python Developer',
              2000,
              'Streamlit & FastAPI Builder',
              2000,
              'AI Product Creator',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{ color: '#00d4ff' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building <span className="text-white/80">AI-Powered Intelligent Systems</span> &amp;{' '}
          <span className="text-white/80">Data-Driven Applications</span> — from neural networks to
          production-ready APIs.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={scrollToProjects} className="btn-primary">
            <span className="flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button onClick={scrollToContact} className="btn-outline">
            <Mail className="w-4 h-4" />
            Contact Me
          </button>

          <a
            href="https://github.com/Sinwansiraj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>

        {/* Tech stack floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mt-12"
        >
          {['Python', 'Machine Learning', 'FastAPI', 'AWS', 'Streamlit', 'Deep Learning'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}
