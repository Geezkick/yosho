import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import { Navigation } from './components/UI'
import { UniverseScene } from './scenes/UniverseScene'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import './index.css'

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-wrapper">
      <UniverseScene />
      <Navigation />
      <CartDrawer />
      <SearchOverlay />
      <main>
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </SiteLayout>
      </Router>
    </StoreProvider>
  )
}

export default App
