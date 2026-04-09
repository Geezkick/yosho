import { Link } from 'react-router-dom'
import { Globe, Mail, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="ys-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
             <Link to="/" className="nav-logo">
              <div className="nav-logo-badge"><span>YS</span></div>
              <div className="nav-logo-name">YoSho</div>
            </Link>
            <p className="footer-desc">
              The future of motion is here. Precision engineering, 
              cinematic design, and elite performance gear for every athlete.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><Mail size={20} /></a>
              <a href="#" className="social-icon"><ArrowRight size={20} /></a>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <h4>SHOP</h4>
              <ul>
                <li><Link to="/shop">Shop All</Link></li>
                <li><Link to="/shop">Mens Catalog</Link></li>
                <li><Link to="/shop">Womens Catalog</Link></li>
                <li><Link to="/shop">Elite Series</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>COLLECTIVE</h4>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/about">Technology</Link></li>
                <li><Link to="/about">Sustainability</Link></li>
                <li><Link to="/about">Careers</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>SUPPORT</h4>
              <ul>
                <li><Link to="/">Order Tracking</Link></li>
                <li><Link to="/">Shipping & Returns</Link></li>
                <li><Link to="/">Size Guide</Link></li>
                <li><Link to="/">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legals">
            <span>&copy; 2026 YOSHO LABS. ALL RIGHTS RESERVED.</span>
            <div className="legal-links">
              <a href="#">PRIVACY POLICY</a>
              <a href="#">TERMS OF SERVICE</a>
            </div>
          </div>
          <div className="footer-lang">
            KENYA / ENGLISH
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
