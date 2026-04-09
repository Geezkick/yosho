import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'

const collections = [
  { title:'RUNNING',   cat:'LIGHTWEIGHT SPEED',      image:'/assets/running.png' },
  { title:'TRAINING',  cat:'POWER & STABILITY',       image:'/assets/training.png' },
  { title:'LIFESTYLE', cat:'STREET. STYLE. COMFORT.', image:'/assets/lifestyle.png' },
  { title:'ELITE',     cat:'BUILT TO WIN',            image:'/assets/elite.png' },
]

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z"/>
  </svg>
)
const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export function BentoGrid() {
  const [subscribed, setSubscribed] = useState(false)
  const { products, addToCart } = useStore()

  const handleSelectGear = (title: string) => {
    const product = products.find(p => p.category === title)
    if (product) {
      addToCart(product)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <>
      <section className="collections-section">
        <motion.div 
          className="collections-header" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="collections-eyebrow">EXPLORE COLLECTIONS</div>
        </motion.div>

        <motion.div 
          className="selection-ring-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {collections.map((c, i) => (
            <motion.div
              key={c.title}
              className="bento-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bento-card-content">
                <div>
                  <div className="bento-title">{c.title}</div>
                  <div className="bento-cat">{c.cat}</div>
                </div>
                <motion.button 
                  className="bento-shop-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectGear(c.title)
                  }}
                >
                  SHOP
                </motion.button>
              </div>
              <motion.img 
                src={c.image} 
                alt={c.title} 
                className="bento-shoe-img"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Join the Movement ── */}
      <div className="join-bar">
        <div className="join-text">
          <h3>Join the Movement</h3>
          <p>Get exclusive drops, early access, and special offers.</p>
        </div>
        <form className="join-form" onSubmit={handleSubscribe}>
          <input className="join-input" type="email" placeholder="Enter your email" required />
          <button className="join-sub-btn" type="submit">
            {subscribed ? 'Thank You!' : 'Subscribe'}
          </button>
        </form>
        <div className="join-social">
          <span className="join-social-lbl">Follow Us</span>
          <button className="soc-btn" aria-label="Instagram"><InstagramIcon /></button>
          <button className="soc-btn" aria-label="TikTok"><TikTokIcon/></button>
          <button className="soc-btn" aria-label="YouTube"><YoutubeIcon /></button>
          <button className="soc-btn" aria-label="X/Twitter"><XIcon/></button>
        </div>
      </div>
    </>
  )
}
