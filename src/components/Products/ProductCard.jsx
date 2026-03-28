import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: product })
    // Quick visual feedback
    const btn = e.currentTarget
    const original = btn.textContent
    btn.textContent = '✓ Added'
    btn.classList.add('added')
    setTimeout(() => {
      btn.textContent = original
      btn.classList.remove('added')
    }, 1500)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card reveal"
      style={{ animationDelay: `${index * 0.08}s`, '--card-bg': product.bgColor }}
    >
      {/* Badge */}
      {product.badge && <span className="product-badge">{product.badge}</span>}

      {/* Background */}
      <div className="product-card-bg" style={{ background: product.gradient }} />

      {/* Emoji / Product Visual */}
      <div className="product-emoji">{product.emoji}</div>

      {/* Info */}
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>

        <div className="product-footer">
          <div>
            <span className="product-from">From</span>
            <span className="product-price">${product.price.toLocaleString()}</span>
          </div>
          <button
            className="add-to-cart"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            Add +
          </button>
        </div>
      </div>

      {/* Color swatches */}
      {product.colors.length > 1 && (
        <div className="color-swatches">
          {product.colors.slice(0, 5).map((color, i) => (
            <div
              key={i}
              className="swatch"
              style={{ background: color }}
              title={product.colorNames[i]}
            />
          ))}
        </div>
      )}
    </Link>
  )
}
