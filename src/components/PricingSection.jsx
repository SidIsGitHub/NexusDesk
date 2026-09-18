import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHATSAPP_URL } from '../utils/constants';
import './PricingSection.css';

const tiers = [
  {
    id: 'flagship',
    name: 'TIER 1: FLAGSHIP SUITE',
    price: '₹85,000',
    monthly: '+ ₹2,000/month',
    features: [
      'Everything in Tier 2',
      'Native iOS App Store & Google Play Store',
      'Native Android Play Store',
      'NFC tap-to-login cards',
      'Tournament organization engine',
      'Advanced analytics dashboard',
      'Priority 12-hour support',
    ],
    featured: false,
  },
  {
    id: 'core',
    name: 'TIER 2: CORE',
    price: '₹48,000',
    monthly: '+ ₹1,500/month',
    features: [
      'Everything in Tier 3',
      'Progressive Web App for iOS',
      'Loyalty engine',
      'Google Sheets admin sync',
      'PanCafe hardware sync',
      'Food & Beverage system',
      'Standard 24-hour support',
    ],
    featured: true,
  },
  {
    id: 'revenue-share',
    name: 'TIER 3: REVENUE SHARE',
    price: '₹25,000',
    monthly: '₹1000/month + 2.5% of F&B in-app revenue ',
    features: [
      'Basic feature set',
      'No large upfront investment',
      'Revenue share on food & beverage orders only',
      'Ideal for new & budget conscious cafes',
      '48-hour support'
    ],
    featured: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Cinematic stagger for Header
    const header = sectionRef.current.querySelector('.pricing__header');
    const headerChildren = header?.querySelectorAll(':scope > *');
    if (headerChildren?.length) {
      gsap.fromTo(
        headerChildren,
        { 
          y: 60, 
          opacity: 0,
          rotateX: -15,
          filter: 'blur(12px)'
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }


    // Animate cards with stagger — middle card arrives 0.05s earlier
    const cards = sectionRef.current.querySelectorAll('.pricing__card');
    const delays = [0.12, 0.07, 0.24]; // middle (index 1) arrives first
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { 
          y: 60, 
          opacity: 0,
          rotateX: -15,
          filter: 'blur(12px)'
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: delays[i] || i * 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.pricing__cards'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current && sectionRef.current.contains(t.trigger)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="pricing section-padding relative overflow-hidden" id="pricing-section" ref={sectionRef}>
      <div className="absolute -top-[5vh] -right-[5vw] text-[25vw] font-['Syne'] font-extrabold text-white/[0.02] tracking-tighter leading-none select-none pointer-events-none -z-10">
        05
      </div>
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_30%,#000_100%)] -z-20"></div>

      <div className="absolute bottom-[5vh] -left-[2vw] text-[15vw] font-['Syne'] font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] tracking-tighter leading-none select-none pointer-events-none -z-10 transform-gpu -rotate-90 origin-bottom-left">
        NEXUS
      </div>

      {/* Top Right Flare */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      
      {/* Bottom Left Flare */}
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[150px] -z-10 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
      <div className="pricing__container">
        <div className="pricing__header">
          <span className="section-label">05 — PRICING</span>
          <h2 className="section-heading pricing__heading">
            One product.
            <br />
            Three ways to start.
          </h2>
        </div>

        <div className="pricing__cards">
          {tiers.map((tier) => (
            <div
              className={`pricing__card ${tier.featured ? 'pricing__card--featured' : ''}`}
              key={tier.id}
              id={`pricing-${tier.id}`}
            >
              {tier.label && (
                <>
                  <div className="pricing__highlight-edge"></div>
                  <span className="pricing__card-label mono-text">{tier.label}</span>
                </>
              )}

              <span className="pricing__tier-name">{tier.name}</span>
              <h3 className="pricing__price display-heading">{tier.price}</h3>
              <p className="pricing__monthly">{tier.monthly}</p>

              <div className="pricing__divider" />

              <ul className="pricing__features">
                {tier.features.map((feat, i) => (
                  <li key={i} className="pricing__feature">{feat}</li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={tier.featured ? 'btn-primary pricing__btn' : 'btn-ghost pricing__btn'}
                id={`pricing-cta-${tier.id}`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
