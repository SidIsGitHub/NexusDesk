import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import HeroScene from './components/HeroScene';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

import { Toaster } from 'sonner';

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7, // Reduced from 1.2 so momentum stops faster
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      wheelMultiplier: 1.2, // Increased slightly to maintain scroll distance per tick
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);


  const path = window.location.pathname;

  let content;
  if (path === '/privacy') {
    content = (
      <main className="nexusdesk-main relative z-20" style={{ minHeight: '100vh', background: '#000' }}>
        <PrivacyPolicy />
      </main>
    );
  } else if (path === '/terms') {
    content = (
      <main className="nexusdesk-main relative z-20" style={{ minHeight: '100vh', background: '#000' }}>
        <TermsOfService />
      </main>
    );
  } else {
    content = (
      <main className="fullbleed-main">
        <div className="bg-grid-pattern"></div>
        <div className="vignette-overlay"></div>
        
        {/* Fixed WebGL Background Track */}
        <div className="webgl-background-track">
          <div className="volumetric-glow"></div>
          <motion.div
            className="canvas-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {!isMobile && (
              <Canvas
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
                eventSource={document.getElementById('root')}
                eventPrefix="client"
              >
                <Suspense fallback={null}>
                  <HeroScene onReady={() => setSceneReady(true)} />
                  <EffectComposer disableNormalPass>
                    <Bloom 
                      luminanceThreshold={1} 
                      mipmapBlur 
                      intensity={1.5} 
                    />

                    <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.3} />
                  </EffectComposer>
                </Suspense>
              </Canvas>
            )}
          </motion.div>
        </div>


        {/* HTML Scroll Track (Foreground Overlay) */}
        <div className="html-foreground-track">
          <HeroSection />
          <ProblemSection />
          <FeaturesSection />
          <SocialProof />
        </div>

        {/* Opaque z-50 container that slides over the fixed z-10 3D canvas */}
        <div className="solid-footer-overlap">
          <HowItWorks />
          <PricingSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <Nav />
      <SideMenu />
      
      {/* Telemetry Scroll Indicator */}
      <div className="telemetry-scroll-track hidden md:block">
        <motion.div 
          className="telemetry-scroll-fill" 
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }} 
        />
      </div>

      {content}

      <Footer />
    </>
  );
}
