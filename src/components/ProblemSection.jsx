import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProblemSection.css';

const problems = [
  {
    num: '01',
    statement: 'Customers have to call to check if a PC is free.',
    consequence: 'You are already busy enough with the cafe. The phone rings and you might miss the call, spend minutes for each call asking the same questions just to see if there is vacancy',
  },
  {
    num: '02',
    statement: 'Customer no-shows.',
    consequence: 'It is very common for customers to book over the phone and never show up, cancel or even worse, show up late and make you lose revenue.',
  },
  {
    num: '03',
    statement: 'No data on your most frequent visitors.',
    consequence: 'Without tracking, you have no information on who your most frequent visitors are. No data means no loyalty, no way to promote exclusive offers to each customer and guarantee returns.',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Select header children and row children for a single unified stagger
    const elements = sectionRef.current.querySelectorAll('.problem__header > *, .problem__row');
    
    gsap.fromTo(
      elements,
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
    <section className="problem w-full" id="problem-section" ref={sectionRef}>
      <div className="problem__container w-full px-[5vw] py-12 flex flex-col w-full">
        <div className="problem__header">
          <h2 className="problem__heading font-['Syne'] font-extrabold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[0.85] mb-20">
            Running a gaming cafe<br />
            is harder than it<br />
            <span className="problem__heading-stroke text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">looks.</span>
          </h2>
        </div>

        <div className="problem__rows w-full relative" onMouseMove={handleMouseMove}>
          <motion.div 
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 problem__cursor-glow"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(79,70,229,0.05), transparent 40%)`
            }}
          />
          {problems.map((p, index) => (
            <motion.div 
              initial="inactive"
              whileInView="active"
              viewport={{ margin: "-25% 0px -25% 0px", once: false }}
              className={`problem__row relative z-[5] flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-8 items-start md:items-center py-12 md:py-16 ${index !== problems.length - 1 ? 'border-b border-white/10' : ''}`} 
              key={p.num}
            >
              {/* Watermark Number */}
              <div className="absolute top-4 left-0 md:static md:col-span-2 problem__col-num md:relative -z-10 md:z-[20] opacity-30 md:opacity-100 pointer-events-none">
                <motion.span 
                  variants={{
                    inactive: { opacity: 0.3, WebkitTextStroke: '1px rgba(255,255,255,0.5)' },
                    active: { opacity: 1, WebkitTextStroke: '2px rgba(99,102,241,0.9)' }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="problem__num text-white/5 font-['Syne'] text-8xl md:text-8xl font-extrabold"
                >
                  {p.num}
                </motion.span>
              </div>
              
              {/* Center Column (The Cause) */}
              <div className="md:col-span-5 problem__col-statement relative z-[20] w-full">
                <motion.p 
                  variants={{
                    inactive: { opacity: 0.4 },
                    active: { opacity: 1 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="problem__statement text-white text-2xl md:text-xl font-medium"
                >
                  {p.statement}
                </motion.p>
              </div>

              {/* Right Column (The Effect) */}
              <div className="md:col-span-4 md:col-start-9 problem__col-consequence text-left md:text-right flex flex-col items-start md:items-end justify-center relative z-[20] w-full">
                <motion.p 
                  variants={{
                    inactive: { opacity: 0.4 },
                    active: { opacity: 1 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="problem__consequence text-white/80 text-base font-sans leading-relaxed text-left md:text-right"
                >
                  {p.consequence}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
