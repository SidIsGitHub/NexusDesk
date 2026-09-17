import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import PrimaryCTA from './PrimaryCTA';
import './SideMenu.css';

export default function SideMenu() {
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const handleScroll = (e, target) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = `/${target}`;
      return;
    }
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const footer = document.getElementById('global-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsAtFooter(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAtFooter) {
      setIsOpen(false);
    }
  }, [isAtFooter]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scaleY: 0.8, y: 20, x: "-50%" }}
            animate={{ opacity: 1, scaleY: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scaleY: 0.8, y: 20, x: "-50%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sidemenu-expanded"
          >
            <a href="#hero-section" onClick={(e) => handleScroll(e, '#hero-section')} className="sidemenu-link">Home</a>
            <a href="#problem-section" onClick={(e) => handleScroll(e, '#problem-section')} className="sidemenu-link">The Problem</a>
            <a href="#features-section" onClick={(e) => handleScroll(e, '#features-section')} className="sidemenu-link">Features</a>
            <a href="#how-it-works-section" onClick={(e) => handleScroll(e, '#how-it-works-section')} className="sidemenu-link">Process</a>
            <a href="#pricing-section" onClick={(e) => handleScroll(e, '#pricing-section')} className="sidemenu-link">Pricing</a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`sidemenu-control-bar relative ${isAtFooter ? 'sidemenu-control-bar--compressed' : ''}`}>
        
        {/* Hamburger / Close Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="sidemenu-hamburger-btn"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="10" x2="20" y2="10"></line><line x1="4" y1="14" x2="20" y2="14"></line></svg>
          )}
        </button>

        {/* Brand Mark */}
        <span className="sidemenu-brand-mark transition-opacity duration-300">
          <img src="/nexusdesk-logo.png" alt="NexusDesk" className="sidemenu-logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-auto max-w-[100px] object-contain grayscale brightness-200 pointer-events-none" />
        </span>

        {/* CTA Button */}
        <div className="sidemenu-cta-wrapper">
          <PrimaryCTA text="Try NexusDesk" className="sidemenu-cta-override" />
        </div>

        {/* Compressed Icon (Up Arrow visible only when compressed) */}
        <div 
          className="sidemenu-compressed-icon" 
          onClick={(e) => {
            if (lenis) {
              lenis.scrollTo(0, { duration: 3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      </div>
    </>
  );
}
