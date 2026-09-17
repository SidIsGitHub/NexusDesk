import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, SpotLight, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { NexusEngine } from './NexusEngine';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3D Scene: Floating Smart Card
 */
export default function HeroScene({ onReady }) {
  const { camera } = useThree();
  const [masterTl, setMasterTl] = useState(null);

  useEffect(() => {
    if (onReady) {
      const timer = setTimeout(onReady, 100);
      return () => clearTimeout(timer);
    }
  }, [onReady]);

  useEffect(() => {
    camera.position.set(-18, 12, 18);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.html-foreground-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Changed from 1 to true to remove GSAP interpolation lag (Lenis already handles momentum)
      }
    });


    setMasterTl(tl);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [camera]);

  const starsRef = useRef();
  useFrame(({ camera, pointer }) => {
    camera.lookAt(0, 0, 0);

    // Reactive starfield parallax
    if (starsRef.current) {
      const targetX = (pointer.x * Math.PI) / 8;
      const targetY = (pointer.y * Math.PI) / 8;
      starsRef.current.rotation.x = THREE.MathUtils.lerp(starsRef.current.rotation.x, targetY, 0.05);
      starsRef.current.rotation.y = THREE.MathUtils.lerp(starsRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[-18, 12, 18]} fov={45} />

      {/* Volumetric Particle Engine */}
      <group ref={starsRef}>
        <Stars count={1750} depth={50} factor={6} fade radius={100} saturation={1} speed={1} color="#4F46E5" depthWrite={true} />
      </group>

      <spotLight position={[-15, 5, -5]} angle={0.5} penumbra={1} intensity={2500} color="#4F46E5" />
      <spotLight position={[15, -5, -5]} angle={0.5} penumbra={1} intensity={2500} color="#818CF8" />
      <directionalLight position={[-10, 10, 15]} intensity={1.5} color="#f8fafc" />
      <ambientLight intensity={0.8} color="#ffffff" />
      <Environment preset="studio" environmentIntensity={1.5} />

      {/* Engine Group */}
      <group>
        <Sparkles color="#818CF8" count={150} opacity={0.1} scale={25} size={2} speed={0.2} />
        <NexusEngine masterTl={masterTl} />
      </group>
    </>
  );
}
