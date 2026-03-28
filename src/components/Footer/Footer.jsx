import { Link } from 'react-router-dom'
import './Footer.css'

const links = {
  Shop: ['Store', 'iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Vision Pro'],
  Services: ['Apple Music', 'iCloud+', 'Apple TV+', 'Apple Arcade', 'Apple Pay'],
  Account: ['Sign In', 'Create Apple ID', 'Order Status', 'Shopping Help'],
  About: ['Newsroom', 'Apple Leadership', 'Career Opportunities', 'Contact Apple'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        {/* Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <svg width="24" height="28" viewBox="0 0 20 24" fill="currentColor">
              <path d="M16.462 12.558c-.028-3.241 2.647-4.81 2.768-4.885-1.51-2.208-3.854-2.511-4.685-2.543-1.988-.2-3.889 1.17-4.896 1.17-1.01 0-2.563-1.143-4.218-1.112-2.167.033-4.173 1.258-5.285 3.183C-.25 12.43.98 18.18 3.24 21.318c1.128 1.63 2.463 3.454 4.216 3.39 1.7-.067 2.34-1.089 4.392-1.089 2.051 0 2.638 1.089 4.437 1.053 1.827-.03 2.983-1.647 4.1-3.284a19.4 19.4 0 001.849-3.793c-2.46-.98-3.77-3.565-3.772-7.037zM13.184 3.424C14.12 2.3 14.77.756 14.59-.867c-1.38.056-3.052.921-4.024 2.082-.879 1.036-1.65 2.666-1.443 4.236 1.55.119 3.133-.789 4.061-2.027z"/>
            </svg>
            <p>ShopSphere</p>
          </div>
          <p className="footer-tagline">
            Premium technology for every sphere of life.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat} className="footer-col">
              <h4>{cat}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}>
                    <Link to="/products">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2024 ShopSphere. A React project for educational purposes.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
