import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description?: string
}

const API_PRODUCTS: Product[] = [
  { id: '1', name: 'YoSho Nebula X1', price: 180, category: 'RUNNING', image: '/assets/shoe1_nobg.png', description: 'Engineered with Hyperbounce™ foam for elite speed.' },
  { id: '2', name: 'YOSHO TITAN FORCE', price: 145, category: 'TRAINING', image: '/assets/training_nobg.png', description: 'Maximum stability for heavy lifts and explosive movements.' },
  { id: '3', name: 'STREET EDGE v2 LIFESTYLE SERIES', price: 120, category: 'LIFESTYLE', image: '/assets/lifestyle_nobg.png', description: 'Iconic street style blended with athletic comfort.' },
  { id: '4', name: 'ELITE CARBON ELITE SERIES', price: 250, category: 'ELITE', image: '/assets/elite_nobg.png', description: 'The pinnacle of performance with a full carbon plate.' }
]

interface CartItem extends Product {
  quantity: number
}

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(API_PRODUCTS)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Load cart from local storage
  useEffect(() => {
    const saved = localStorage.getItem('yosho_cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('yosho_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true) // Open cart when item added for feedback
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within a StoreProvider')
  return context
}
