import { motion, AnimatePresence } from 'framer-motion'
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products } = useStore()
  const navigate = useNavigate()

  const results = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const handleSelect = (id: string) => {
    setIsSearchOpen(false)
    setSearchQuery('')
    navigate(`/shop?id=${id}`) // Navigate to shop with product focus
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="search-container">
            <div className="search-header">
              <SearchIcon className="search-input-icon" size={24} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search premium gear..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="search-results">
              {results.length > 0 ? (
                <div className="results-grid">
                  {results.slice(0, 4).map(product => (
                    <motion.div 
                      key={product.id} 
                      className="search-result-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleSelect(product.id)}
                    >
                      <img src={product.image} alt={product.name} />
                      <div className="res-info">
                        <div className="res-cat">{product.category}</div>
                        <div className="res-name">{product.name}</div>
                        <div className="res-price">${product.price}</div>
                      </div>
                      <ArrowRight size={16} className="item-arrow" />
                    </motion.div>
                  ))}
                </div>
              ) : searchQuery.trim() !== '' ? (
                <div className="search-not-found">No results found for "{searchQuery}"</div>
              ) : (
                <div className="search-suggestions">
                  <p>Try searching for:</p>
                  <div className="suggestion-chips">
                    {['Nebula', 'Elite', 'Titan', 'Running'].map(s => (
                      <button key={s} onClick={() => setSearchQuery(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchOverlay
