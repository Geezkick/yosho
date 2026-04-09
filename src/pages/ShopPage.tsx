import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { ShoppingBag, Star } from 'lucide-react'

const ShopPage = () => {
  const { products, addToCart } = useStore()

  return (
    <motion.div 
      className="shop-page"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="shop-hero">
        <div className="shop-hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="shop-eyebrow"
          >
            Performance Reinvented
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0em' }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            Shop the Future
          </motion.h1>
        </div>
      </header>

      <div className="shop-container">
        <div className="shop-controls">
          <div className="shop-count">{products.length} Products Found</div>
          <div className="shop-filters">
            {['All', 'Running', 'Training', 'Lifestyle'].map(f => (
              <button key={f} className={`filter-chip ${f === 'All' ? 'active' : ''}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {products.map((p, i) => (
            <motion.div 
              key={p.id}
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="pc-img-wrap">
                <img src={p.image} alt={p.name} />
                <button className="pc-add-btn" onClick={() => addToCart(p)}>
                  <ShoppingBag size={18} />
                  <span>Add to Bag</span>
                </button>
              </div>
              <div className="pc-content">
                <div className="pc-header">
                  <span className="pc-cat">{p.category}</span>
                  <div className="pc-rating"><Star size={10} fill="#6d28d9" color="#6d28d9" /> 4.9</div>
                </div>
                <h3 className="pc-name">{p.name}</h3>
                <p className="pc-desc">{p.description}</p>
                <div className="pc-footer">
                  <span className="pc-price">${p.price}</span>
                  <div className="pc-colors">
                    {[1,2,3].map(c => <div key={c} className="color-dot" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <section className="shop-features">
          <div className="section-header">
            <h2>PRO-TECH SPECS</h2>
            <p>The science of speed, delivered to your door.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass">
              <h4>Oxy-Responsive™</h4>
              <p>Breathable mapping that adapts to your foot temperature.</p>
            </div>
            <div className="feature-card glass">
              <h4>Kinetic-Return™</h4>
              <p>Energy displacement technology with 95% efficiency.</p>
            </div>
            <div className="feature-card glass">
              <h4>Gravity-Anchor™</h4>
              <p>Proprietary traction matrix for high-speed maneuvers.</p>
            </div>
          </div>
        </section>

        <section className="shop-newsletter glass">
          <div className="newsletter-content">
            <h3>JOIN THE FUTURE</h3>
            <p>Be the first to get exclusive access to limited drops and performance insights.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-shop-now rainbow">SUBSCRIBE</button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default ShopPage
