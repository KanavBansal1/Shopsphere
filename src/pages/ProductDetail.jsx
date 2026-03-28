import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  const product = products.find(p => p.id === id)

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [added, setAdded] = useState(false)

  useScrollReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedColor(0)
    setSelectedStorage(0)
    setAdded(false)
  }, [id])

  if (!product) {
    return (
      <main style={{ paddingTop: 'calc(var(--nav-height) + 100px)', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Product not found</h2>
        <Link to="/products" className="btn btn-primary">Back to Store</Link>
      </main>
    )
  }

  const storagePrice = product.storage.length > 0
    ? selectedStorage * 100
    : 0
  const finalPrice = product.price + storagePrice

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        price: finalPrice,
        selectedConfig: {
          color: product.colorNames[selectedColor],
          storage: product.storage[selectedStorage] || null
        }
      }
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter(p => p.id !== product.id).slice(0, 3)

  return (
    <main className="detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb container-wide">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Store</Link>
        <span>›</span>
        <Link to={`/products?cat=${product.category}`}>{product.category}</Link>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      {/* Main detail */}
      <div className="detail-grid container-wide">
        {/* Visual */}
        <div className="detail-visual reveal">
          <div className="detail-visual-bg" style={{ background: product.gradient }} />
          <div className="detail-emoji">{product.emoji}</div>

          {/* Color indicator */}
          {product.colors.length > 1 && (
            <div className="detail-color-preview">
              <div
                className="color-preview-dot"
                style={{ background: product.colors[selectedColor] }}
              />
              <span>{product.colorNames[selectedColor]}</span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="detail-info">
          <p className="detail-category reveal">{product.category}</p>
          <h1 className="detail-name reveal reveal-delay-1">{product.name}</h1>
          <p className="detail-tagline reveal reveal-delay-2">{product.tagline}</p>
          <p className="detail-desc reveal reveal-delay-3">{product.description}</p>

          {/* Price */}
          <div className="detail-price reveal reveal-delay-3">
            <span className="price-from">From</span>
            <span className="price-value">${finalPrice.toLocaleString()}</span>
          </div>

          {/* Color picker */}
          {product.colors.length > 1 && (
            <div className="config-section reveal">
              <p className="config-label">
                Color — <span>{product.colorNames[selectedColor]}</span>
              </p>
              <div className="color-options">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`color-option ${selectedColor === i ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(i)}
                    title={product.colorNames[i]}
                    aria-label={product.colorNames[i]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Storage picker */}
          {product.storage.length > 1 && (
            <div className="config-section reveal">
              <p className="config-label">Storage</p>
              <div className="storage-options">
                {product.storage.map((s, i) => (
                  <button
                    key={s}
                    className={`storage-option ${selectedStorage === i ? 'active' : ''}`}
                    onClick={() => setSelectedStorage(i)}
                  >
                    <span>{s}</span>
                    {i > 0 && <span className="storage-add">+${(i * 100).toLocaleString()}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="detail-cta reveal">
            <button
              className={`btn-buy ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="btn btn-outline" style={{ fontSize: '15px' }}>
              Learn more →
            </button>
          </div>

          {/* Features list */}
          <div className="detail-features reveal">
            <p className="config-label" style={{ marginBottom: '12px' }}>Key Features</p>
            <ul>
              {product.features.map(f => (
                <li key={f}>
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="related-section">
        <div className="container-wide">
          <h2 className="reveal">You might also like</h2>
          <div className="related-grid">
            {related.map((p, i) => (
              <Link key={p.id} to={`/products/${p.id}`} className="related-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="related-bg" style={{ background: p.gradient }} />
                <span className="related-emoji">{p.emoji}</span>
                <div className="related-info">
                  <h3>{p.name}</h3>
                  <p>From ${p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
