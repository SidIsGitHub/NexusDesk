import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturesSection.css';

const features = [
  {
    num: '01',
    name: 'Real-Time Booking Grid',
    desc: 'Every PC, PS5, and racing rig visible to customers before they leave home. No calls. No guessing. No confusion',
    significance: 'ELIMINATES CALLS',
  },
  {
    num: '02',
    name: 'Squad Mode',
    desc: 'Groups book multiple rigs in one single transaction. They arrive together, play together, pay together.',
    significance: 'MAXIMIZES GROUP SPEND',
  },
  {
    num: '03',
    name: 'Food Ordering',
    desc: 'Customers order straight from their phone. Delivered to their rig. Zero gaming interruption or calling out for placing orders.',
    significance: 'UNINTERRUPTED SESSIONS',
  },
  {
    num: '04',
    name: 'Admin Dashboard',
    desc: 'Every offer, announcement, booking & transaction logged automatically to Google Sheets Dashboard. No calling developers for changes. You have complete control.',
    significance: 'ELIMINATES MANUAL ENTRY',
  },
  {
    num: '05',
    name: 'Loyalty Engine',
    desc: 'Customers earn credits on every rupee spent. Gaming hours as rewards. Guaranteed return visits. Prices and offers set by you.',
    significance: 'GUARANTEES RETENTION',
  },
  {
    num: '06',
    name: 'PanCafe Sync',
    desc: 'Walk-in sessions from your existing PanCafe system sync automatically. NexusDesk handles both online and offline bookings flawlessly',
    significance: 'ZERO DATA DUPLICATION',
  },
];


export default function FeaturesSection() {
  const sectionRef = useRef(null);

  const renderFeatureUI = (index) => {
    switch (index) {
      case 0: // Booking Grid
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
              PC Availability
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', width: '100%' }}>
              {[...Array(24)].map((_, i) => {
                let bg = 'rgba(255,255,255,0.05)';
                let border = 'rgba(255,255,255,0.1)';
                let animationProps = {};
                
                if (i === 3 || i === 7 || i === 14) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  border = 'rgba(16, 185, 129, 0.5)';
                  animationProps = { animate: { opacity: [1, 0.4, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
                } else if (i === 12 || i === 13) {
                  bg = 'rgba(79, 70, 229, 0.2)';
                  border = 'rgba(79, 70, 229, 0.5)';
                  animationProps = { animate: { opacity: [1, 0.4, 1] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 } };
                }

                return (
                  <motion.div key={i} {...animationProps} style={{ 
                    height: '2rem', 
                    borderRadius: '0.125rem', 
                    border: `1px solid ${border}`,
                    backgroundColor: bg 
                  }}></motion.div>
                );
              })}
            </div>
          </div>
        );
      case 1: // Squad Mode
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
              <div style={{ position: 'relative', width: '0.375rem', height: '0.375rem' }}>
                <motion.div animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: [0, 0, 0.2, 1] }} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(52, 211, 153)', borderRadius: '50%' }}></motion.div>
                <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'rgb(52, 211, 153)', borderRadius: '50%' }}></div>
              </div>
              <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                Active Link: Squad_Bravo
              </div>
            </div>
            {/* Linked Group */}
            <div style={{ width: '100%', padding: '1rem', border: '1px solid rgba(99, 102, 241, 0.5)', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-0.25rem', top: '50%', width: '0.5rem', height: '2rem', backgroundColor: 'rgb(99, 102, 241)', transform: 'translateY(-50%)', borderRadius: '0 0.375rem 0.375rem 0' }}></div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[1,2,3,4].map(i => <div key={i} style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'rgba(129, 140, 248, 0.2)', border: '1px solid rgba(99, 102, 241, 0.5)' }}></div>)}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgb(129, 140, 248)' }}>4x RIGS</div>
            </div>
            {/* Unlinked User */}
            <div style={{ width: '100%', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}></div>
              <motion.div initial={{ width: 0 }} whileInView={{ width: '4rem' }} transition={{ duration: 1, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px' }}></motion.div>
            </div>
          </div>
        );
      case 2: // Food Ordering
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
              Incoming Orders
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {[1, 2, 3].map((_, i) => (
                 <div key={i} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <div style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.25rem' }}></div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '5rem' }} transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px' }}></motion.div>
                       <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1, delay: (i * 0.15) + 0.1, ease: "easeOut" }} style={{ height: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px' }}></motion.div>
                     </div>
                   </div>
                   <div style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgb(52, 211, 153)' }}>+₹120</div>
                 </div>
              ))}
            </div>
          </div>
        );
      case 3: // Admin Dashboard
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <div style={{ flex: 1, padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px' }}></motion.div>
                  <div style={{ fontSize: '18px', fontFamily: 'monospace', color: '#FFF' }}>₹83.2K</div>
               </div>
               <div style={{ flex: 1, padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 1, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px' }}></motion.div>
                  <div style={{ fontSize: '18px', fontFamily: 'monospace', color: 'rgb(52, 211, 153)' }}>96%</div>
               </div>
            </div>
            {/* Bar Chart */}
            <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.2)', borderLeft: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 0.5rem 0', gap: '0.5rem' }}>
              {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }} style={{ width: '100%', backgroundColor: 'rgba(99, 102, 241, 0.5)', borderRadius: '0.125rem 0.125rem 0 0' }}></motion.div>
              ))}
            </div>
          </div>
        );
      case 4: // Squad Coins Loyalty
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Loyalty Credits</div>
               <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'rgb(251, 191, 36)' }}>8,450 Credits</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
               <div style={{ width: '10rem', height: '10rem', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.05)', borderTopColor: 'rgba(251, 191, 36, 0.8)', borderRightColor: 'rgba(251, 191, 36, 0.8)', transform: 'rotate(45deg)' }}></div>
               <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                 <div style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(251, 191, 36, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.8, type: "spring", bounce: 0.5 }} style={{ width: '1.5rem', height: '1.5rem', backgroundColor: 'rgba(251, 191, 36, 0.8)', borderRadius: '50%', boxShadow: '0 0 10px rgba(251,191,36,0.5)' }}></motion.div>
                 </div>
               </div>
            </div>
          </div>
        );
      case 5: // PanCafe Sync
        return (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textAlign: 'center' }}>
              Synchronizing with Pancafe...
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, padding: '0 1rem' }}>
               <div style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '2rem' }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '999px' }}></motion.div>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px' }}></motion.div>
               </div>
               <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(99, 102, 241, 0.5)', position: 'relative' }}>
                  <motion.div initial={{ scale: 0, x: "-50%", y: "-50%" }} whileInView={{ scale: 1, x: "-50%", y: "-50%" }} transition={{ duration: 0.8, type: "spring" }} style={{ position: 'absolute', top: '50%', left: '50%', width: '2.5rem', height: '2.5rem', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div style={{ width: '1rem', height: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.8)', borderRadius: '50%', boxShadow: '0 0 15px rgba(99,102,241,0.8)' }}></div>
                  </motion.div>
               </div>
               <div style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '2rem' }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.5)', borderRadius: '999px' }}></motion.div>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '3rem' }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} style={{ height: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: '999px' }}></motion.div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Cinematic stagger for Header
    const header = sectionRef.current.querySelector('.features__header');
    const headerChildren = header?.querySelectorAll('*');
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


    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current && sectionRef.current.contains(t.trigger)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="features w-full pb-24 md:pb-[40vh]" id="features-section" ref={sectionRef}>
      <div className="features__container">
        <div className="features__header features__sticky-header">
          <h2 className="features__heading font-['Syne'] font-extrabold text-[clamp(3rem,6vw,8rem)] text-white tracking-tighter leading-[0.85] z-50 relative">
            Everything your<br />
            cafe needs,<br />
            <span className="features__heading-stroke text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)] block mt-2">And more.</span>
          </h2>
        </div>

        <div className="features__scroll-track">
          {features.map((feature, i) => (
            <motion.div
              key={feature.num}
              className={`feature__row relative w-full ${i % 2 === 0 ? 'feature__block--left' : 'feature__block--right'}`}
              initial="inactive"
              whileInView="active"
              viewport={{ margin: "-45% 0px -45% 0px", once: false }}
              variants={{
                inactive: { opacity: 0.2, filter: 'blur(2px)', scale: 0.95 },
                active: { opacity: 1, filter: 'blur(0px)', scale: 1 }
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="feature__row-inner">
                <div className="feature__content relative">
                  {/* The Watermark Number */}
                  <motion.div 
                    variants={{
                      inactive: { opacity: 0 },
                      active: { opacity: 1, transition: { duration: 0.5, delay: 0, ease: "easeOut" } }
                    }}
                    className="feature__watermark-num text-[12rem] md:text-[18rem] leading-none font-['Syne'] font-extrabold text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] absolute -top-32 -z-10 select-none"
                  >
                    {feature.num}
                  </motion.div>

                  {/* The Structural Title */}
                  <motion.h3 
                    variants={{
                      inactive: { opacity: 0, y: 10 },
                      active: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } }
                    }}
                    className="feature__title text-5xl md:text-6xl lg:text-7xl font-['Syne'] font-extrabold text-white mb-6"
                  >
                    {feature.name}
                  </motion.h3>

                  {/* The Technical Description */}
                  <motion.p 
                    variants={{
                      inactive: { opacity: 0, y: 10 },
                      active: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25, ease: "easeOut" } }
                    }}
                    className="feature__technical-desc text-lg md:text-2xl text-[#9CA3AF] leading-relaxed font-sans max-w-xl"
                  >
                    {feature.desc}
                  </motion.p>

                  {/* The Significance / Telemetry Tag */}
                  <motion.div 
                    variants={{
                      inactive: { opacity: 0, y: 10 },
                      active: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4, ease: "easeOut" } }
                    }}
                    className="feature__telemetry-tag mt-8 inline-flex items-center px-4 py-2 bg-transparent border border-[#333333] rounded-sm backdrop-blur-md"
                  >
                    <span className="feature__telemetry-text text-[10px] font-mono uppercase tracking-[0.3em] text-[#9CA3AF]">
                      {feature.significance}
                    </span>
                  </motion.div>
                </div>

                {/* Floating UI Wireframe */}
                <div className={`feature__ui-wireframe absolute top-1/2 -translate-y-1/2 w-[350px] md:w-[450px] h-[280px] bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-5 shadow-2xl transform-gpu pointer-events-none hidden lg:flex z-0
                  ${i % 2 === 0 ? 'feature__ui-wireframe--right right-[5vw] -rotate-y-12 rotate-x-6' : 'feature__ui-wireframe--left left-[5vw] rotate-y-12 rotate-x-6'}
                `}>
                  {/* Mock UI Header */}
                  <div className="feature__ui-wireframe-header w-full flex justify-between items-center border-b border-white/10 pb-3">
                     <div className="feature__ui-wireframe-bar1 w-32 h-3 bg-white/20 rounded-full"></div>
                     <div className="feature__ui-wireframe-bar2 w-12 h-3 bg-indigo-500/60 rounded-full"></div>
                  </div>
                  {/* Dynamic Feature UI */}
                  {renderFeatureUI(i)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
