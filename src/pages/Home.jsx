import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import ProductCard from '../components/Products/ProductCard'
import { products } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Home.css'

export default function Home() {
  useScrollReveal()

  return (
    <main>
      <Hero />

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="section-label reveal">Featured</p>
              <h2 className="section-title reveal reveal-delay-1">
                The latest.<br />And greatest.
              </h2>
            </div>
            <Link to="/products" className="btn btn-outline reveal reveal-delay-2" style={{ alignSelf: 'flex-end', marginBottom: '4px' }}>
              Shop all products →
            </Link>
          </div>

          {/* Hero product - large card */}
          <div className="featured-hero reveal reveal-delay-2">
            <ProductCard product={products[0]} index={0} />
          </div>

          {/* Grid of 3 */}
          <div className="featured-grid-3">
            {products.slice(1, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>

          {/* Grid of 2 */}
          <div className="featured-grid-2">
            {products.slice(4, 6).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why section */}
      <Features />

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content reveal">
            <p className="section-label">Ready?</p>
            <h2>Start your journey<br />with ShopSphere.</h2>
            <p className="cta-sub">Free shipping. Easy returns. And a one-year limited warranty.</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
              <Link to="/products" className="btn btn-primary" style={{ fontSize: '17px', padding: '14px 32px' }}>
                Shop Now
              </Link>
              <Link to="/products" className="btn btn-outline">
                Find a Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
