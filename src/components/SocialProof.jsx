import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SocialProof.css';

const cafes = [
  {
    name: 'Hideout Gaming Cafe',
    location: 'Ulwe, Navi Mumbai',
    stat: 'Real-time booking live',
  },
  {
    name: 'Squad House Gaming',
    location: 'Ulwe, Navi Mumbai',
    stat: 'Full suite deployment',
  },
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Cinematic stagger for Header
    const header = sectionRef.current.querySelector('.social__master-header');
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

    // Cinematic fade in for Terminals
    const terminals = sectionRef.current.querySelectorAll('.social__terminal-wrapper');
    terminals.forEach((terminal) => {
      gsap.fromTo(
        terminal,
        { 
          y: prefersReducedMotion ? 0 : 80, 
          opacity: 0,
          filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: terminal,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Animate footer text
    const footer = sectionRef.current.querySelector('.social__footer');
    if (footer) {
      gsap.fromTo(
        footer,
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
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
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
    <>
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedId(null)} 
            className="social__modal-overlay"
          >
            <motion.img 
              layoutId={selectedId} 
              src={selectedId === 'hideout-screen' ? '/app-screen.webp' : '/squad-house.webp'} 
              className="social__modal-img" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="social section-padding w-full relative min-h-screen flex flex-col md:block items-center justify-center gap-16 pt-24 md:pt-0"
        id="social-proof-section"
        ref={sectionRef}
      >
        <div className="social__master-header">
          <h2 className="social__master-heading">
            Already running in<br />
            <span className="social__master-heading-stroke">Navi Mumbai.</span>
          </h2>
        </div>

        {/* Left Side: Hideout Terminal */}
        <div className="social__terminal-wrapper social__terminal-wrapper--left relative md:absolute w-full md:w-[28vw] top-auto md:top-1/2 transform-none md:-translate-y-1/2 left-0 md:left-[3vw] mb-12 md:mb-0">
          <div className="social__terminal" onClick={() => setSelectedId('hideout-screen')}>
            <div className="social__terminal-glare"></div>
            <motion.img layoutId="hideout-screen" src="/app-screen.webp" width="800" height="450" loading="lazy" alt="Hideout UI" className="social__terminal-img" />
          </div>
          <div className="social__terminal-data">
            <a href="https://share.google/ale98Bc1H0nkuTerD" target="_blank" rel="noopener noreferrer" className="social__terminal-brand">
               <img src="/hideout-logo.webp" alt="Hideout Logo" className="social__terminal-logo" />
               <h3 className="social__terminal-name">Hideout Gaming</h3>
            </a>
            
            <p className="social__terminal-address">
              90, Ananta Towers, Sector 6, Ulwe, Navi Mumbai
            </p>
          </div>
        </div>

        {/* Right Side: Squad House Terminal */}
        <div className="social__terminal-wrapper social__terminal-wrapper--right relative md:absolute w-full md:w-[28vw] top-auto md:top-1/2 transform-none md:-translate-y-1/2 right-0 md:right-[3vw]">
          <div className="social__terminal" onClick={() => setSelectedId('squad-screen')}>
            <div className="social__terminal-glare"></div>
            <motion.img layoutId="squad-screen" src="/squad-house.webp" width="800" height="450" loading="lazy" alt="Squad House UI" className="social__terminal-img" />
          </div>
          <div className="social__terminal-data">
            <a href="https://share.google/jOPK878X9NiIycod8" target="_blank" rel="noopener noreferrer" className="social__terminal-brand">
               <h3 className="social__terminal-name">Squad House Gaming</h3>
               <img src="/squadhouse-logo.png" alt="Squad House Logo" className="social__terminal-logo" />
            </a>
            
            <p className="social__terminal-address">
               112, Ananta Towers, Sector 6, Ulwe, Navi Mumbai
            </p>
          </div>
        </div>

        <p className="social__footer absolute bottom-10 text-center w-full z-40">
          Two cafes. One product. Zero operational chaos.
        </p>
      </section>
    </>
  );
}
