import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

const navItems = [
  { label: 'Store', path: '/store' },
  { label: 'Mac', path: '/products?cat=Mac' },
  { label: 'iPad', path: '/products?cat=iPad' },
  { label: 'iPhone', path: '/products?cat=iPhone' },
  { label: 'Watch', path: '/products?cat=Watch' },
  { label: 'AirPods', path: '/products?cat=AirPods' },
  { label: 'Vision Pro', path: '/products?cat=Vision' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems, items, dispatch } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setCartOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="ShopSphere Home">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
              <path d="M16.462 12.558c-.028-3.241 2.647-4.81 2.768-4.885-1.51-2.208-3.854-2.511-4.685-2.543-1.988-.2-3.889 1.17-4.896 1.17-1.01 0-2.563-1.143-4.218-1.112-2.167.033-4.173 1.258-5.285 3.183C-.25 12.43.98 18.18 3.24 21.318c1.128 1.63 2.463 3.454 4.216 3.39 1.7-.067 2.34-1.089 4.392-1.089 2.051 0 2.638 1.089 4.437 1.053 1.827-.03 2.983-1.647 4.1-3.284a19.4 19.4 0 001.849-3.793c-2.46-.98-3.77-3.565-3.772-7.037zM13.184 3.424C14.12 2.3 14.77.756 14.59-.867c-1.38.056-3.052.921-4.024 2.082-.879 1.036-1.65 2.666-1.443 4.236 1.55.119 3.133-.789 4.061-2.027z"/>
            </svg>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.label}>
                <Link to={item.path} className="nav-link">{item.label}</Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="nav-actions">
            <button
              className="nav-icon-btn cart-btn"
              onClick={() => setCartOpen(!cartOpen)}
              aria-label={`Cart (${totalItems} items)`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <button
              className={`nav-icon-btn hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map((item, i) => (
            <li key={item.label} style={{ animationDelay: `${i * 0.06}s` }}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Cart</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-primary" onClick={() => setCartOpen(false)}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}>+</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <span>Total</span>
                <span>${items.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                Check Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(menuOpen || cartOpen) && (
        <div className="overlay" onClick={() => { setMenuOpen(false); setCartOpen(false) }} />
      )}
    </>
  )
}
