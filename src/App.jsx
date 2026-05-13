import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const cursorRef = useRef(null)

  // ── Cursor glow effect ────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ── Scroll progress bar ───────────────────────────────────────
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    const updateProgress = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (bar) bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      {/* Scroll progress indicator */}
      <div id="scroll-progress" />

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content — hidden while loading */}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <GitHubStats />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
