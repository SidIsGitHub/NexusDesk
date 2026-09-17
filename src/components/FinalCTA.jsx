import { WHATSAPP_URL } from '../utils/constants';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="final-cta" id="cta-section">
      <div className="final-cta__glow" />
      <div className="final-cta__container">
        <h2 className="display-heading final-cta__heading">
          Your cafe.
          <br />
          Running itself.
        </h2>
        
        <div className="final-cta__actions">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary final-cta__btn"
          >
            Get a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
