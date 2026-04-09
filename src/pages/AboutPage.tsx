import { motion, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const CosmicCore = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  // High-performance spring motion
  const x = useSpring(0, { stiffness: 100, damping: 30 })
  const y = useSpring(0, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      ref={ref} 
      className="cosmic-core-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="cosmic-core-3d"
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        <div className="holographic-glow" />
        <img 
          src="/assets/cosmic_core.png" 
          alt="YoSho Cosmic Core" 
          className="cosmic-core-img"
        />
        {/* Floating Data Elements */}
        <motion.div 
          className="hud-tag top-left"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          SYNC_STATUS: OPTIMAL
        </motion.div>
        <motion.div 
          className="hud-tag bottom-right"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          NEBULA_PHASE: 94%
        </motion.div>
      </motion.div>
    </div>
  )
}

const AboutPage = () => {
  const navigate = useNavigate()
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-grid">
           <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The Future <br/> is Motion.
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              YoSho was born at the intersection of high-performance physics and cinematic design. 
              We don’t just make shoes; we build gear for those who move without limits.
            </motion.p>
          </motion.div>

          <motion.div 
            className="about-hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CosmicCore />
          </motion.div>
        </div>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h3>Innovation</h3>
          <p>Every fiber, foam cell, and carbon plate is engineered for maximum energy return.</p>
        </div>
        <div className="about-card">
          <h3>Culture</h3>
          <p>Rooted in the bold, unstoppable energy of urban speed and athletic excellence.</p>
        </div>
        <div className="about-card">
          <h3>Sustain</h3>
          <p>Building the future means protecting it. 80% of our materials are ethically sourced.</p>
        </div>
      </section>

      <section className="about-roadmap">
        <div className="section-header center">
          <h2>UNSTOPPABLE ROADMAP</h2>
          <p>Defining the next standard of movement.</p>
        </div>
        <div className="roadmap-grid">
          <div className="roadmap-item glass">
            <span className="year">2026</span>
            <h4>Genesis</h4>
            <p>Launch of the first Nebula series in Nairobi. Redefining what high-performance means locally.</p>
          </div>
          <div className="roadmap-item glass">
            <span className="year">2028</span>
            <h4>Global Sync</h4>
            <p>Expansion to global markets, integrating AI-personalized fit for every athlete.</p>
          </div>
          <div className="roadmap-item glass">
            <span className="year">2030</span>
            <h4>Zero-Void</h4>
            <p>Achieving 100% closed-loop circularity. Every YoSho shoe is born to be reborn.</p>
          </div>
        </div>
      </section>

      <section className="about-footer-cta">
        <div className="cta-content glass">
          <h2>RUN THE FUTURE.</h2>
          <p>The journey has just begun. Be a part of the movement that moves with you.</p>
          <button className="btn-shop-now rainbow" onClick={() => navigate('/shop')}>ENTER THE SHOP</button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
