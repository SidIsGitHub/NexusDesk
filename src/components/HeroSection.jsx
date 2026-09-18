import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHATSAPP_URL } from '../utils/constants';
import PrimaryCTA from './PrimaryCTA';
import './HeroSection.css';

export default function HeroSection() {
  const sectionRef = useRef(null);

  const handleScrollDown = () => {
    document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const elements = sectionRef.current.querySelectorAll('.hero__inner > h1, .hero__inner > div');

    gsap.fromTo(
      elements,
      {
        y: prefersReducedMotion ? 0 : 60,
        opacity: 0,
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)'
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current && sectionRef.current.contains(t.trigger)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="hero" id="hero-section" ref={sectionRef}>
      {/* Absolute Hero Logo - Hidden on mobile to prevent overlap */}
      <img src="/nexusdesk-logo.png" alt="NexusDesk" className="hero__absolute-logo hidden md:block absolute top-12 right-12 w-64 h-auto object-contain z-50 pointer-events-none opacity-90" />

      <div className="hero__inner">
        {/* Massive Typography */}
        <h1 className="hero__headline">
          <span className="hero__watermark">NEXUSDESK.</span><br />
          YOUR CAFE<br />
          RUNNING ITSELF.
        </h1>
      </div>

      {/* Subtext and Button (Absolute Positioned relative to .hero) */}
      <div className="hero__cta-wrapper">
          <p className="hero__subheadline text-white/95 font-['Syne'] font-medium text-base md:text-lg tracking-wide leading-relaxed max-w-sm">
            NexusDesk handles bookings, food orders, and customer loyalty — so you focus on running the best gaming experience for your customers.
          </p>
          <div className="hero__actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <PrimaryCTA text="Get a Demo" />
            </a>
          </div>
        </div>

      {/* Cinematic Down Arrow */}
      <div className="hero__scroll-indicator" onClick={handleScrollDown}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </section>
  );
}
