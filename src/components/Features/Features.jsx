import './Features.css'

const features = [
  { icon: '🔒', title: 'Privacy First', desc: 'Your data stays yours. Always.' },
  { icon: '♻️', title: 'Sustainable', desc: '100% recycled packaging.' },
  { icon: '🚀', title: 'Performance', desc: 'Fastest chips. Period.' },
  { icon: '🎨', title: 'Design', desc: 'Every detail intentional.' },
  { icon: '🔋', title: 'All-day Battery', desc: 'Go further, charge less.' },
  { icon: '📡', title: 'Connectivity', desc: '5G, Wi-Fi 6E, Satellite.' },
]

const marqueeItems = [
  'iPhone 15 Pro', 'MacBook Pro', 'iPad Pro', 'Apple Watch Ultra 2',
  'AirPods Pro', 'Apple Vision Pro', 'Mac Pro', 'MacBook Air',
]

export default function Features() {
  return (
    <section className="features-section">
      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="container-wide" style={{ padding: '80px 24px' }}>
        <div className="section-label reveal">Why ShopSphere</div>
        <h2 className="section-title reveal reveal-delay-1">
          Built different.<br />Better by design.
        </h2>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
