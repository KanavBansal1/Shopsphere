import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--black)',
      textAlign: 'center',
      padding: '24px'
    }}>
      <p style={{ fontSize: '80px', marginBottom: '24px' }}>🌐</p>
      <h1 style={{ fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
        The page you're looking for can't be found.
      </h1>
      <p style={{ color: 'var(--gray-400)', marginBottom: '32px', maxWidth: '400px', lineHeight: 1.5 }}>
        You may have followed an outdated link, or the page may have moved.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
        <Link to="/products" className="btn btn-outline">Visit Store</Link>
      </div>
    </main>
  )
}
