import { useState, useEffect } from 'react';
import { WHATSAPP_URL } from '../utils/constants';
import PrimaryCTA from './PrimaryCTA';
import './Nav.css';

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 100vh
      setVisible(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav transition-transform duration-500 ease-out border-b border-white/10 bg-black/80 backdrop-blur-xl ${visible ? 'nav--visible translate-y-0' : '-translate-y-full'}`} id="main-nav">
      <div className="nav__inner">
        {/* Brand */}
        <a href="/" className="nav__brand flex items-center gap-4">
          <img src="/nexusdesk-logo.png" alt="NexusDesk Logo" className="nav__logo w-14 h-14" />
          <span className="nav__wordmark text-[10px] tracking-[0.3em] font-extrabold">NEXUSDESK</span>
        </a>
        
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <PrimaryCTA text="Get a Demo" />
        </a>
      </div>
    </nav>
  );
}
