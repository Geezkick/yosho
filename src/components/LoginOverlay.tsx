import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Globe } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useState } from 'react'

const LoginOverlay = () => {
  const { isLoginOpen, setIsLoginOpen } = useStore()
  const [isSignup, setIsSignup] = useState(false)

  if (!isLoginOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="overlay-backdrop"
        style={{ zIndex: 100000 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsLoginOpen(false)}
      >
        <motion.div 
          className="login-modal glass"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-overlay" onClick={() => setIsLoginOpen(false)}>
            <X size={24} />
          </button>

          <div className="login-header">
            <h2>{isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</h2>
            <p>{isSignup ? 'Join the elite YoSho collective.' : 'Log in to your athlete profile.'}</p>
          </div>

          <div className="login-form">
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input type="password" placeholder="Password" />
            </div>
            
            <button className="btn-shop-now rainbow w-full">
              {isSignup ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </div>

          <div className="login-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-login">
            <button className="social-btn glass"><Globe size={20} /> Google</button>
            <button className="social-btn glass"><Globe size={20} /> Github</button>
          </div>

          <div className="login-footer">
            {isSignup ? (
              <p>Already have an account? <span onClick={() => setIsSignup(false)}>Sign In</span></p>
            ) : (
              <p>New to YoSho? <span onClick={() => setIsSignup(true)}>Create Account</span></p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoginOverlay
