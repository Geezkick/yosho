import { useRef, useState, useEffect } from 'react'
import { motion, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, ArrowRight, Play } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

// ─── Tech spec SVG icons ───────────────────────────────────────────────────
const FoamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
  </svg>
)
const PlateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 30 Q21 18 36 30" strokeOpacity="1" /><path d="M6 34 Q21 22 36 34" strokeOpacity="0.5" />
  </svg>
)
const MeshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="30" height="30" rx="2" />
  </svg>
)
const GripIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
  </svg>
)

// ─── Cinematic Helper Components Removed ─────────────────────────────────────

// ─── Magnetic Interaction Wrapper ──────────────────────────────────────────
export const Magnetic = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Kinetic Counter Removed ────────────────────────────────────────────────

// ─── Navigation ───────────────────────────────────────────────────────────
export function Navigation() {
  const { cart, setIsCartOpen, setIsSearchOpen, setIsLoginOpen } = useStore()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.nav
      className="ys-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/" className="nav-logo">
        <div className="nav-logo-badge"><span>YS</span></div>
        <div className="nav-logo-name">YoSho</div>
      </Link>

      <ul className="nav-links-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop?gender=MEN">Men</Link></li>
        <li><Link to="/shop?gender=WOMEN">Women</Link></li>
        <li><Link to="/shop">Collections</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="nav-icons">
        <button className="nav-icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
          <Search size={20}/>
        </button>
        <button className="nav-icon-btn" aria-label="Account" onClick={() => setIsLoginOpen(true)}>
          <User size={20}/>
        </button>
        <button className="nav-icon-btn" aria-label="Cart" style={{position:'relative'}} onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={20}/>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────
export function Hero() {
  const navigate = useNavigate()
  const targetRef = useRef<HTMLElement>(null)
  const { products } = useStore()
  
  // Auto-playing Carousel State
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (!products || products.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [products])

  const product = products[currentIndex] || { 
    id: '0', name: 'YOSHO', image: '/assets/shoe1_nobg.png', 
    price: 180, category: 'ELITE', description: 'Precision engineered limits.' 
  }
  
  // Track mouse position over the hero element
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!targetRef.current) return
    const { left, top, width, height } = targetRef.current.getBoundingClientRect()
    // normalize between -1 and 1
    const x = ((e.clientX - left) / width) * 2 - 1
    const y = ((e.clientY - top) / height) * 2 - 1
    setMousePosition({ x, y })
  }
  
  // Smooth out the mouse values with useSpring
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)
  
  useEffect(() => {
    xSpring.set(mousePosition.x)
    ySpring.set(mousePosition.y)
  }, [mousePosition, xSpring, ySpring])

  // Map spring values to subtle rotation and translation
  const rotateX = useTransform(ySpring, [-1, 1], [15, -15])
  const rotateY = useTransform(xSpring, [-1, 1], [-15, 15])
  
  // Inverse subtle movement for the shoe elements
  const translateX = useTransform(xSpring, [-1, 1], [-40, 40])
  const translateY = useTransform(ySpring, [-1, 1], [-40, 40])

  // Background text moves in reverse for strong parallax depth
  const bgTranslateX = useTransform(xSpring, [-1, 1], [30, -30])
  const bgTranslateY = useTransform(ySpring, [-1, 1], [30, -30])

  // Dynamic Content HUD mapping
  const hudLeftTitle = product.price > 140 ? '+87%' : 'MAX'
  const hudLeftSub = product.price > 140 ? 'ENERGY RETURN' : 'STABILITY'
  const hudRightTitle = product.category
  const hudRightSub = 'SERIES CLASS'

  // Per-category signature glow color for 3D depth effect
  const categoryGlow: Record<string, string> = {
    RUNNING:   'rgba(109, 40, 217, 0.7)',   // Nebula purple
    TRAINING:  'rgba(234, 88, 12, 0.7)',    // Titan orange
    LIFESTYLE: 'rgba(6, 182, 212, 0.7)',    // Street cyan
    ELITE:     'rgba(234, 179, 8, 0.7)',    // Elite gold
  }
  const shoeGlow = categoryGlow[product.category] || categoryGlow.RUNNING

  return (
    <section 
      className="hero-section interactive" 
      ref={targetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      style={{ '--shoe-glow': shoeGlow } as React.CSSProperties}
    >
      {/* Enormous kinetic text in background */}
      <motion.div 
        className="hero-kinetic-bg"
        style={{ x: bgTranslateX, y: bgTranslateY }}
      >
        <AnimatePresence mode="wait">
          <motion.h1 
            key={product.name}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
          >
            {product.name.replace('YoSho ', '')}
          </motion.h1>
        </AnimatePresence>
      </motion.div>

      {/* The 3D Parallax Masterpiece */}
      <motion.div 
        className="hero-3d-container"
        style={{ rotateX, rotateY, perspective: 2000 }}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={product.id}
            src={product.image} 
            alt={product.name}
            className="hero-3d-shoe"
            style={{ x: translateX, y: translateY, z: 100 }}
            initial={{ scale: 0.8, opacity: 0, rotateZ: -10 }}
            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateZ: 10 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>

        {/* Floating Glassmorphism Panels (HUD) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={product.id + "hudL"}
            className="hud-panel left"
            style={{ z: 150, x: useTransform(xSpring, [-1, 1], [-60, 60]), y: useTransform(ySpring, [-1, 1], [-60, 60]) }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="hud-val">{hudLeftTitle}</div>
            <div className="hud-lbl">{hudLeftSub}</div>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={product.id + "hudR"}
            className="hud-panel right"
            style={{ z: 120, x: useTransform(xSpring, [-1, 1], [60, -60]), y: useTransform(ySpring, [-1, 1], [60, -60]) }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="hud-val">{hudRightTitle}</div>
            <div className="hud-lbl">{hudRightSub}</div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Foreground Content (CTA) */}
      <div className="hero-foreground">
         <AnimatePresence mode="wait">
           <motion.div 
            key={product.id + "text"}
            className="hf-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
           >
             <div className="hf-eyebrow">YOSHO EXCLUSIVE ARCHIVE</div>
             <h2>{product.name}</h2>
             <p>{product.description}</p>

             <div className="hf-btns">
               <button className="btn-shop-now rainbow" onClick={() => navigate('/shop')}>
                 SHOP NOW <ArrowRight size={14}/>
               </button>
               <button className="btn-explore-tech outline">
                 EXPLORE TECH <Play size={10} fill="white"/>
               </button>
             </div>
           </motion.div>
         </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Tech Specs Bar ───────────────────────────────────────────────────────
export function TechSpecs() {
  const specs = [
    { title:'HYPERBOUNCE™ FOAM', desc:'Maximum energy return with responsive cushioning.', Icon:FoamIcon },
    { title:'CARBONFLOW PLATE',  desc:'Propulsive drive with every step you take.', Icon:PlateIcon },
    { title:'AEROFIT UPPER',     desc:'Breathable, adaptive, and locked-in support.', Icon:MeshIcon },
    { title:'GRIPX OUTSOLE',     desc:'Unmatched traction on any surface.', Icon:GripIcon },
  ]
  return (
    <div className="tech-bar">
      <div className="tech-bar-grid">
        {specs.map((s,i) => (
          <motion.div key={i} className="tech-item"
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.08 }}
          >
            <div className="tech-icon"><s.Icon/></div>
            <div className="tech-text"><h4>{s.title}</h4><p>{s.desc}</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Unstoppable Section ─────────────────────────────────────────────────
export function UnstoppableSection() {
  return (
    <div className="unstoppable-section">
      <div className="unstoppable-eyebrow">DESIGNED TO MAKE YOU</div>
      <motion.div
        className="unstoppable-word"
        initial={{ opacity:0, scale:0.94 }}
        whileInView={{ opacity:1, scale:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.7 }}
      >
        UNSTOPPABLE
      </motion.div>
      <div className="unstoppable-tagline">
        WHETHER YOU RUN, JUMP, TRAIN, OR COMPETE — YOSHO MOVES WITH YOU.
      </div>
    </div>
  )
}
