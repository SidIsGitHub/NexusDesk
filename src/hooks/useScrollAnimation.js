import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Reusable GSAP ScrollTrigger animation hook.
 * Animates children elements as they enter the viewport.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  const {
    from = { y: 40, opacity: 0 },
    to = { y: 0, opacity: 1 },
    start = 'top 85%',
    end = 'top 40%',
    duration = 0.55,
    ease = 'power2.out',
    stagger = 0,
    delay = 0,
    selector = null,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Instant reveal
      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : ref.current;
      gsap.set(targets, { opacity: 1 });
      return;
    }

    const targets = selector
      ? ref.current.querySelectorAll(selector)
      : ref.current;

    gsap.fromTo(targets, from, {
      ...to,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, []);

  return ref;
}
