import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Target, Activity, ShieldCheck } from 'lucide-react'

const collections = [
  { 
    id: 'nebula',
    title: 'NEBULA SERIES',
    tagline: 'LIGHTWEIGHT SPEED',
    desc: 'The Nebula series is designed for pure agility. Featuring our lightest Hyperbounce™ foam and a feather-weight 3D mesh fly-knit, it disappears on your foot while delivering maximum energy return.',
    icon: Zap,
    color: '#6d28d9',
    image: '/assets/shoe1_nobg.png'
  },
  { 
    id: 'titan',
    title: 'TITAN SERIES',
    tagline: 'POWER & STABILITY',
    desc: 'Built for the explosive athlete. The Titan series features a dual-density midsole and an anatomical lockdown system, ensuring zero-slip performance during heavy lifts and high-intensity agility work.',
    icon: Target,
    color: '#3b82f6',
    image: '/assets/training_nobg.png'
  },
  { 
    id: 'street',
    title: 'STREET EDGE',
    tagline: 'STYLE REINVENTED',
    desc: 'Where high-fashion meets the hardwood. Street Edge brings elite cushioning to the pavement, featuring reflective 3M detailing and a futuristic silhouette meant for the city explorer.',
    icon: Activity,
    color: '#ec4899',
    image: '/assets/lifestyle_nobg.png'
  },
  { 
    id: 'elite',
    title: 'CARBON ELITE',
    tagline: 'THE PINNACLE',
    desc: 'The choice of world-record holders. A full-length carbon fiber plate integrated with high-performance nitrogen-infused pods. Every millisecond counts; the Carbon Elite ensures you don\'t waste one.',
    icon: ShieldCheck,
    color: '#10b981',
    image: '/assets/elite_nobg.png'
  }
]

const CollectionsPage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="collections-page">
      <header className="collections-hero">
        <motion.div 
          className="hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="eyebrow">THE ARCHIVE</div>
          <h1>ELITE SERIES <br/>COLLECTIONS</h1>
          <p>Defining the next generation of athletic dominance through vertical innovation.</p>
        </motion.div>
      </header>

      <section className="collections-list">
        {collections.map((c, i) => (
          <motion.div 
            key={c.id}
            className="collection-row"
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="col-info">
              <div className="col-header" style={{ color: c.color }}>
                <c.icon size={32} />
                <h3>{c.title}</h3>
              </div>
              <h4>{c.tagline}</h4>
              <p>{c.desc}</p>
              <button 
                className="btn-shop-now outline" 
                onClick={() => navigate('/shop')}
              >
                DISCOVER {c.title} <ArrowRight size={14} />
              </button>
            </div>
            <div className="col-visual glass">
              <motion.img 
                src={c.image} 
                alt={c.title} 
                className="col-img"
                whileHover={{ scale: 1.1, rotate: -5 }}
              />
              <div className="col-accent" style={{ background: c.color }} />
            </div>
          </motion.div>
        ))}
      </section>

      <section className="collections-cta glass">
        <div className="cta-content">
          <h2>CAN'T DECIDE?</h2>
          <p>Our performance lab can help you find the perfect match for your athletic goals.</p>
          <button className="btn-shop-now rainbow" onClick={() => navigate('/shop')}>TAKE THE GEAR QUIZ</button>
        </div>
      </section>
    </div>
  )
}

export default CollectionsPage
