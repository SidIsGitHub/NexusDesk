import { useRef, useLayoutEffect, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Center } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const colorDead = new THREE.Color("#1f1f1f"); 
const colorEmissiveOff = new THREE.Color("#000000");
const colorAlive = new THREE.Color("#4f46e5"); 

export function NexusEngine({ masterTl }) {
  const scrollRef = useRef()
  const parallaxRef = useRef()
  const engineRef = useRef()
  const coreLightRef = useRef()
  const glowMaterials = useRef([])
  const gearNodes = useRef([])
  const ignitionPhase = useRef(0)
  const { scene, animations } = useGLTF('/engine.glb')
  const { actions } = useAnimations(animations, parallaxRef)

  useLayoutEffect(() => {
    glowMaterials.current = [];
    gearNodes.current = [];
    scene.traverse((node) => {
      if (node.isMesh) {
        const name = node.name.toLowerCase();
        
        // Store gear/sprocket nodes for rotation
        if (name.includes('gear') || name.includes('sprocket')) {
          // 1. Calculate the true center of the gear's geometry
          node.geometry.computeBoundingBox();
          const boundingBox = node.geometry.boundingBox;
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);

          // 2. Shift the vertices so the origin is exactly in the middle
          node.geometry.translate(-center.x, -center.y, -center.z);

          // 3. Move the mesh wrapper back by the exact same amount so it doesn't visually jump
          node.position.add(center);

          gearNodes.current.push(node);
        }

        if (name.includes('engineblockcylinder') || name.includes('spring') || name.includes('piston')) {
          const glowMat = new THREE.MeshStandardMaterial({
            color: colorDead, // Matches colorless engine block initially
            emissive: colorEmissiveOff, // No glow initially
            emissiveIntensity: 0, // Starts off
            toneMapped: false
          });
          node.material = glowMat;
          glowMaterials.current.push(glowMat);
        } else {
          node.material = new THREE.MeshStandardMaterial({
            color: '#171717',
            metalness: 1.0,
            roughness: 0.35,
            envMapIntensity: 2.5
          });
        }
        node.geometry.computeVertexNormals() 
      }
    })
  }, [scene])

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0 || !masterTl) return;
    
    const actionKey = Object.keys(actions)[0];
    const action = actions[actionKey];
    if (!action) return;

    // Start playing but pause instantly so GSAP can take over the playhead
    action.play().paused = true;
    
    const duration = action.getClip().duration;

    const tween = gsap.to(action, { time: duration, duration: 3, ease: "none" });
    masterTl.add(tween, 0);

    return () => {
      masterTl.remove(tween);
      tween.kill();
    }
  }, [actions, masterTl])

  useFrame((state, delta) => {
    if (!parallaxRef.current || !scrollRef.current) return
    const time = state.clock.getElapsedTime()

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Baseline rotation + subtle scroll offset
    scrollRef.current.rotation.y = (-Math.PI / 3) + (scrollProgress * 0.25);
    scrollRef.current.rotation.z = (Math.PI / 8) + (scrollProgress * 0.1);

    // Highly restricted mouse parallax (tilt, don't spin)
    const targetX = (state.pointer.x * Math.PI) / 16
    const targetY = (state.pointer.y * Math.PI) / 16

    // Base Angle + Parallax offset
    parallaxRef.current.rotation.y = THREE.MathUtils.lerp(parallaxRef.current.rotation.y, -0.5 + targetX, 0.05)
    parallaxRef.current.rotation.x = THREE.MathUtils.lerp(parallaxRef.current.rotation.x, -0.2 - targetY, 0.05)

    // Extremely subtle, slow vertical hover
    parallaxRef.current.position.y = Math.sin(time * 1.5) * 0.15

    // Unified Ignition Phase Interpolator
    const actionKey = actions ? Object.keys(actions)[0] : null;
    const action = actionKey ? actions[actionKey] : null;
    const isFullyAssembled = action && action.time >= (action.getClip().duration - 0.05);

    // 1. The Smooth Spool-Up (Ramps from 0 to 1 slowly)
    const targetPhase = isFullyAssembled ? 1 : 0;
    ignitionPhase.current = THREE.MathUtils.lerp(ignitionPhase.current, targetPhase, 0.003);
    const phase = ignitionPhase.current;

    // 2. Simultaneous Color Transition (Base + Emissive)
    glowMaterials.current.forEach(mat => {
      mat.color.lerpColors(colorDead, colorAlive, phase);
      mat.emissive.lerpColors(colorEmissiveOff, colorAlive, phase);
      mat.emissiveIntensity = (0.5 + Math.sin(time * 2.5) * 0.3) * phase;
    });

    // 3. The Heavy Mechanical Shiver (High-frequency vibration jitter restored)
    if (engineRef.current) {
      // Reset rotation that might have been applied by the previous torque roll
      engineRef.current.rotation.z = 0;
      
      // High-frequency jitter
      engineRef.current.position.y = Math.sin(time * 100) * 0.01 * phase;
      engineRef.current.position.x = Math.cos(time * 85) * 0.008 * phase;
    }

    // 4. The Flywheel Rev-Up
    gearNodes.current.forEach(gear => {
      // Smoothly accelerates as phase approaches 1
      gear.rotation.z += delta * 12 * phase;
    });

    // 5. Volumetric PointLight Spool-Up & Color Shift
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2 * phase;
      coreLightRef.current.color.lerpColors(colorEmissiveOff, colorAlive, phase);
    }
  })

  return (
    <group ref={scrollRef}>
      <group ref={parallaxRef}>
        <group ref={engineRef}>
          <Center position={[0, 0, 0]}>
            <pointLight ref={coreLightRef} color="#4f46e5" distance={5} decay={2} intensity={0} position={[0, 0, 0]} />
            <primitive object={scene} scale={26} />
          </Center>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/engine.glb')
