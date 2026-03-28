import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Products/ProductCard'
import { products, categories } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Products.css'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')

  useScrollReveal()

  // Sync with URL query param
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && categories.includes(cat)) setActiveCategory(cat)
    else setActiveCategory('All')
  }, [searchParams])

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ cat })
  }

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [activeCategory, sortBy, searchQuery])

  return (
    <main className="products-page">
      {/* Page Header */}
      <div className="products-header">
        <div className="container-wide">
          <h1 className="products-title reveal">Store.</h1>
          <p className="products-subtitle reveal reveal-delay-1">
            The best of ShopSphere. In one place.
          </p>

          {/* Search */}
          <div className="search-wrap reveal reveal-delay-2">
            <span className="search-icon">🔍</span>
            <input
              type="search"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container-wide">
        {/* Filters */}
        <div className="filters-bar reveal">
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Results count */}
        <p className="results-count reveal">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>😔</p>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setActiveCategory('All'); setSearchParams({}) }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
