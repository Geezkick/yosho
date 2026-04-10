import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  gender: 'MEN' | 'WOMEN' | 'UNISEX'
  image: string
  description?: string
}

const API_PRODUCTS: Product[] = [
  { id: '1', name: 'YoSho Nebula X1', price: 180, category: 'RUNNING', gender: 'UNISEX', image: '/assets/shoe1_nobg.png', description: 'Engineered with Hyperbounce™ foam for elite speed.' },
  { id: '2', name: 'YOSHO TITAN FORCE', price: 145, category: 'TRAINING', gender: 'MEN', image: '/assets/training_nobg.png', description: 'Maximum stability for heavy lifts and explosive movements.' },
  { id: '3', name: 'STREET EDGE v2 LIFESTYLE SERIES', price: 120, category: 'LIFESTYLE', gender: 'WOMEN', image: '/assets/lifestyle_nobg.png', description: 'Iconic street style blended with athletic comfort.' },
  { id: '4', name: 'ELITE CARBON ELITE SERIES', price: 250, category: 'ELITE', gender: 'MEN', image: '/assets/elite_nobg.png', description: 'The pinnacle of performance with a full carbon plate.' },
  { id: '5', name: 'VELOCITY WAVE', price: 160, category: 'RUNNING', gender: 'WOMEN', image: '/assets/shoe1_nobg.png', description: 'Ultra-lightweight mesh for long distance agility.' },
  { id: '6', name: 'URBAN NOMAD', price: 135, category: 'LIFESTYLE', gender: 'UNISEX', image: '/assets/lifestyle_nobg.png', description: 'Versatile cushion for daily city exploration.' },
  { id: '7', name: 'CORE STRENGTH X', price: 155, category: 'TRAINING', gender: 'WOMEN', image: '/assets/training_nobg.png', description: 'Precision grip and ankle support for cross-training.' },
  { id: '8', name: 'APEX RACER', price: 210, category: 'ELITE', gender: 'UNISEX', image: '/assets/elite_nobg.png', description: 'Record-shattering propulsion for the most demanding athletes.' }
]

interface CartItem extends Product {
  quantity: number
}

interface User {
  email: string
  initial: string
}

interface StoreContextType {
  products: Product[]
  cart: CartItem[]
  user: User | null
  login: (email: string) => void
  logout: () => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  isLoginOpen: boolean
  setIsLoginOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(API_PRODUCTS)
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('yosho_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    
    const savedUser = localStorage.getItem('yosho_user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('yosho_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) localStorage.setItem('yosho_user', JSON.stringify(user))
    else localStorage.removeItem('yosho_user')
  }, [user])

  const login = (email: string) => {
    const initial = email.charAt(0).toUpperCase()
    setUser({ email, initial })
    setIsLoginOpen(false)
  }

  const logout = () => {
    setUser(null)
  }

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
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
      user,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      isLoginOpen,
      setIsLoginOpen,
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
