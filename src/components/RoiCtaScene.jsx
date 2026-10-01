import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';

const RoiCtaScene = ({ tl }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene7.start;
      const duration = expoData.timings.scene7.end - sceneStart;
      
      const st = gsap.timeline();
      
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.roi-content', { opacity: 0, y: 30, scale: 0.95 });
      
      st.to(containerRef.current, { opacity: 1, duration: 1 }, 0)
        .to('.roi-content', { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'expo.out' }, 0.5)
        // Final fade out before loop back to start
        .to(containerRef.current, { opacity: 0, duration: 1 }, duration - 1);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene roi-scene" style={{zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
      <div className="roi-content glass-panel" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', padding: '4rem 6rem', border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(2, 6, 23, 0.7)', borderRadius: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 174, 239, 0.25)'
      }}>
        
        <div style={{fontSize: '2rem', color: 'var(--color-text-muted)', marginBottom: '1rem'}}>
          {expoData.scene7.mainText}
        </div>
        
        <div style={{
          fontSize: '6rem', fontWeight: 800, color: 'var(--color-cyan)', 
          fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '0.5rem',
          textShadow: '0 0 40px rgba(0,174,239,0.5)'
        }}>
          {expoData.scene7.roiValue}
        </div>
        
        <div style={{fontSize: '1.5rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '3rem'}}>
          {expoData.scene7.roiSub}
        </div>
        
        <h3 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'var(--font-display)', textAlign: 'center'}}>
          {expoData.scene7.ctaText}
        </h3>
        
        <div className="qr-container" style={{
          marginBottom: '2rem',
          background: 'white',
          padding: '15px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <img 
            src="/Pthree_press.jpeg" 
            alt="Scan for Live Demo" 
            style={{
              width: '240px', height: '240px', 
              borderRadius: '12px',
              objectFit: 'contain'
            }} 
          />
        </div>
        
        <div style={{fontSize: '2rem', color: 'var(--color-text-muted)', textAlign: 'center', whiteSpace: 'pre-line', fontWeight: '600'}}>
          pthree.press
        </div>
        
      </div>
    </div>
  );
};

export default RoiCtaScene;
