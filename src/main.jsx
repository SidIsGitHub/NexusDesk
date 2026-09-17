import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.jsx';
import 'lenis/dist/lenis.css';
import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
