import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import { Link2 } from 'lucide-react';

const IntegrationsScene = ({ tl }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene6.start;
      const duration = expoData.timings.scene6.end - sceneStart;
      
      const st = gsap.timeline();
      
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.int-header', { opacity: 0, y: -20 });
      gsap.set('.int-center', { scale: 0, opacity: 0 });
      gsap.set('.int-item', { opacity: 0, x: -30 });
      
      st.to(containerRef.current, { opacity: 1, duration: 1 }, 0)
        .to('.int-header', { opacity: 1, y: 0, duration: 1 }, 0.5)
        .to('.int-center', { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)' }, 1)
        .to('.int-item', { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 1.5)
        
        .to(containerRef.current, { opacity: 0, duration: 1.5 }, duration - 1.5);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene integrations-scene" style={{zIndex: 10}}>
      <div className="int-header">
        <h2 className="headline" style={{fontSize: '2.8rem'}}>{expoData.scene6.headline}</h2>
      </div>
      
      <div style={{display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'space-between', marginTop: '4rem'}}>
        <div className="int-center" style={{
          fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-white)', fontFamily: 'var(--font-display)'
        }}>
          PTHREE
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {expoData.scene6.integrations.map((int, i) => (
            <div key={i} className="int-item glass-panel" style={{
              display: 'flex', alignItems: 'center', padding: '1rem 2rem', gap: '1rem',
              border: '1px solid rgba(0, 210, 255, 0.2)', width: '400px'
            }}>
              <Link2 size={20} color="var(--color-cyan)" />
              <span style={{fontSize: '1.2rem', fontWeight: 500}}>{int}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsScene;
