import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { ShoppingBag, Star, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const ShopPage = () => {
  const { products, addToCart } = useStore()
  const [searchParams] = useSearchParams()
  const genderFilter = searchParams.get('gender')

  const filteredProducts = products.filter(p => 
    !genderFilter || p.gender === genderFilter || p.gender === 'UNISEX'
  )

  return (
    <motion.div 
      className="shop-page"
      initial={{ y: '20px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="shop-hero">
        <div className="shop-hero-content">
          <div className="shop-eyebrow">
            {genderFilter ? `${genderFilter} COLLECTION` : 'PERFORMANCE REINVENTED'}
          </div>
          <h1>{genderFilter ? `THE ${genderFilter} EDIT` : 'SHOP THE FUTURE'}</h1>
        </div>
      </header>

      <div className="shop-container">
        {/* Trending Section */}
        {!genderFilter && (
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
              <button key={f} className={`filter-chip ${f === 'All' ? 'active' : ''}`}>{f}</button>
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
