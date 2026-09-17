import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    name: 'We Set It Up',
    desc: "We configure NexusDesk to your cafe — rigs, pricing, branding. Completely custom built to your needs. You don't touch a line of code.",
  },
  {
    num: '02',
    name: 'Customers Book',
    desc: 'Referrals, free hours and credits IS the marketing itself. They download the app or scan a QR code at your desk & will use the app henceforth.',
  },
  {
    num: '03',
    name: 'You Watch It Work',
    desc: 'Every session, order, and loyalty point tracked automatically. Your dashboard updates in real time.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Cinematic stagger for Header
    const header = sectionRef.current.querySelector('.hiw__header');
    const headerChildren = header?.querySelectorAll(':scope > *');
    if (headerChildren?.length) {
      gsap.fromTo(
        headerChildren,
        { 
          y: prefersReducedMotion ? 0 : 60, 
          opacity: 0,
          rotateX: prefersReducedMotion ? 0 : -15,
          filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)'
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: prefersReducedMotion ? 0 : 1.2,
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

    // Cinematic stagger for each step card
    const cards = sectionRef.current.querySelectorAll('.hiw__step');
    cards.forEach((card) => {
      const children = card.querySelectorAll(':scope > *');
      if (children.length) {
        gsap.fromTo(
          children,
          { 
            y: prefersReducedMotion ? 0 : 60, 
            opacity: 0,
            rotateX: prefersReducedMotion ? 0 : -15,
            filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)'
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: 'power4.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Connecting line draws from left to right
    if (lineRef.current && !prefersReducedMotion) {
      const line = lineRef.current;
      const totalLength = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.hiw__steps'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current && sectionRef.current.contains(t.trigger)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="hiw section-padding" id="how-it-works-section" ref={sectionRef}>
      <div className="hiw__container">
        <div className="hiw__header">
          <h2 className="section-heading hiw__heading">
            Live in your cafe
            <br />
            in 72 hours.
          </h2>
        </div>

        <div className="hiw__steps-wrap">
          {/* Connecting line SVG */}
          <svg
            className="hiw__line-svg"
            viewBox="0 0 900 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="0"
              y1="2"
              x2="900"
              y2="2"
              stroke="#1A1A1A"
              strokeWidth="1"
            />
          </svg>

          {/* Indigo dots */}
          <div className="hiw__dots">
            <span className="hiw__dot" />
            <span className="hiw__dot" />
            <span className="hiw__dot" />
          </div>

          <div className="hiw__steps">
            {steps.map((step) => (
              <div className="hiw__step" key={step.num}>
                <span className="hiw__step-num mono-text">{step.num}</span>
                <h3 className="hiw__step-name">{step.name}</h3>
                <p className="hiw__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
