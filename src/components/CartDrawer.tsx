import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={20} />
                <span>Your Bag</span>
                <span className="cart-count">({cart.length})</span>
              </div>
              <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <p>Your bag is empty.</p>
                  <button className="btn-shop-now" style={{ marginTop: '20px' }} onClick={() => setIsCartOpen(false)}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-id">{item.category}</div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">${item.price}</div>
                      
                      <div className="cart-item-actions">
                        <div className="qty-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={12} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={12} /></button>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button 
                  className="btn-shop-now" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    alert('Order Placed Successfully! Generating your digital collective ID...')
                    cart.forEach(item => removeFromCart(item.id))
                    setIsCartOpen(false)
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
