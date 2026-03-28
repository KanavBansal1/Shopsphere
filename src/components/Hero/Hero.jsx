import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create subtle particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        if (p.x < -5) p.x = canvas.width + 5
        if (p.x > canvas.width + 5) p.x = -5
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Background gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot" />
          New Arrivals Available Now
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          <span className="hero-title-line">Technology</span>
          <span className="hero-title-line gradient-text">reimagined.</span>
        </h1>

        <p className="hero-subtitle">
          Explore the world's most innovative products.<br />
          Designed to inspire. Built to perform.
        </p>

        <div className="hero-cta">
          <Link to="/products" className="btn btn-primary hero-btn-primary">
            Shop Now
          </Link>
          <Link to="/products" className="btn btn-ghost">
            Explore all products <span className="arrow">→</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {[
            { val: '6+', label: 'Product Lines' },
            { val: '100M+', label: 'Happy Customers' },
            { val: '190+', label: 'Countries' },
          ].map(stat => (
            <div key={stat.label} className="hero-stat">
              <strong>{stat.val}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero visual */}
      <div className="hero-visual">
        <div className="device-showcase">
          <div className="device device-phone">📱</div>
          <div className="device device-laptop">💻</div>
          <div className="device device-watch">⌚</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
