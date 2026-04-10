import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { ShoppingBag, Star, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const ShopPage = () => {
  const { products, addToCart } = useStore()
  const [searchParams] = useSearchParams()
  const genderFilter = searchParams.get('gender')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProducts = products.filter(p => {
    const matchesGender = !genderFilter || p.gender === genderFilter || p.gender === 'UNISEX'
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesGender && matchesCategory
  })

  return (
    <motion.div 
      className="shop-page"
      initial={{ y: '20px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className={`shop-hero ${genderFilter ? genderFilter.toLowerCase() : 'all'}`}>
        <div className="shop-hero-content">
          <div className="shop-eyebrow">
            {genderFilter ? `${genderFilter} PERFORMANCE` : 'PERFORMANCE REINVENTED'}
          </div>
          <h1>
            {genderFilter === 'MEN' && 'DOMINATE THE VOID'}
            {genderFilter === 'WOMEN' && 'UNSTOPPABLE GRACE'}
            {!genderFilter && 'SHOP THE FUTURE'}
          </h1>
          <p className="hero-subtext">
            {genderFilter === 'MEN' && 'Engineered for maximum power output and relentless endurance.'}
            {genderFilter === 'WOMEN' && 'Precision tuned for agility, stability, and high-performance speed.'}
            {!genderFilter && 'The most advanced performance ecosystem ever built for human motion.'}
          </p>
        </div>
      </header>

      <div className="shop-container">
        {/* Trending Section */}
        {!genderFilter && activeCategory === 'All' && (
          <div className="trending-section">
            <div className="section-header">
              <h2><TrendingUp size={24} /> TRENDING NOW</h2>
              <p>The most coveted drops from the YoSho collective.</p>
            </div>
            <div className="trending-grid">
              {products.slice(0, 3).map(p => (
                <div key={p.id + 'trend'} className="trend-tile glass" onClick={() => addToCart(p)}>
                  <img src={p.image} alt={p.name} />
                  <h5>{p.name}</h5>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="shop-controls">
          <div className="shop-count">{filteredProducts.length} Products Found</div>
          <div className="shop-filters">
            {['All', 'Running', 'Training', 'Lifestyle', 'Elite'].map(f => (
              <button 
                key={f} 
                className={`filter-chip ${f === activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p, i) => (
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
                  <span className="pc-cat">{p.category} • {p.gender}</span>
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

        <section className="shop-craft glass" style={{ padding: '100px', margin: '80px 0' }}>
          <div className="craft-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="craft-text">
              <div className="eyebrow" style={{ opacity: 0.4, letterSpacing: '0.3em', fontWeight: 800 }}>THE CRAFT</div>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: '48px', margin: '20px 0' }}>SURGICAL PRECISION. <br/>ATHLETIC SOUL.</h2>
              <p style={{ opacity: 0.6, fontSize: '18px', lineHeight: 1.6 }}>
                Every YoSho product undergoes 400 hours of stress testing in our high-altitude labs. 
                From the molecular structure of our Hyperbounce™ foam to the aerodynamic curve 
                of our carbon plates, we leave nothing to chance.
              </p>
              <div className="craft-stats" style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
                <div className="stat"><span>-15%</span> Weight Reduction</div>
                <div className="stat"><span>+98%</span> Energy Return</div>
              </div>
            </div>
            <div className="craft-visual">
               <img src="/assets/elite_nobg.png" alt="Engineering" style={{ width: '100%', filter: 'drop-shadow(0 0 40px rgba(109, 40, 217, 0.3))' }} />
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
