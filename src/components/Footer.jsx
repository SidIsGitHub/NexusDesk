import { WHATSAPP_URL } from '../utils/constants';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="global-footer" className="footer-root">
      
      {/* Massive CTA */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-cta block cursor-pointer">
        <h2 className="footer-headline">Try NexusDesk Today!</h2>
        <p className="footer-subheadline">
          Take control over your cafe and <span className="footer-link-highlight">book your demo today.</span>
        </p>
      </a>

      {/* Bottom Grid */}
      <div className="footer-grid">

        {/* Col 5-9 */}
        <div className="footer-grid-links">
          <div className="footer-link-col">
            <a href="/#hero-section" className="footer-link">Home</a>
            <a href="/#features-section" className="footer-link">Features</a>
            <a href="/#pricing-section" className="footer-link">Pricing</a>
          </div>
          <div className="footer-link-col">
            <a href="#" className="footer-link">Support</a>
            <a href="/terms" className="footer-link">Terms of Use</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
