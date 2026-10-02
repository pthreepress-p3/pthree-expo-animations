import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';

const ExperienceScene = ({ tl, isStandalone = false }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    // If standalone, we just fade it in once.
    if (isStandalone) {
      gsap.to(containerRef.current, { opacity: 1, duration: 1 });
      return;
    }
    
    // Attract loop logic
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene8.start;
      const duration = expoData.timings.scene8.end - sceneStart;
      
      const st = gsap.timeline();
      
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.exp-content', { opacity: 0, scale: 0.95 });
      
      st.to(containerRef.current, { opacity: 1, duration: 1 }, 0)
        .to('.exp-content', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.5)
        .to(containerRef.current, { opacity: 0, duration: 1 }, duration - 1);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl, isStandalone]);
  
  return (
    <div ref={containerRef} className="scene exp-scene" style={{
      zIndex: 15, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '100%',
      opacity: 0,
      background: 'url(/bg-page20.png) center center / cover no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Subtle Blazing Fire Gradient Animation Overlay (Grey/White) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(0deg, rgba(200,200,200,0.1) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
        animation: 'blaze 8s infinite alternate',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <style>
          {`
            @keyframes blaze {
              0% { opacity: 0.3; filter: blur(20px); }
              50% { opacity: 0.5; filter: blur(30px); }
              100% { opacity: 0.3; filter: blur(20px); }
            }
            @keyframes textWave {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>

      <div className="exp-content" style={{
        zIndex: 2,
        display: 'flex', flexDirection: 'column',
        width: '100%', height: '100%',
        padding: '5rem',
        boxSizing: 'border-box',
        color: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}>
        
        {/* Top Logo */}
        <div style={{ marginBottom: 'auto' }}>
          <img src="/pthree white.png" alt="PTHREE" style={{ height: '60px' }} />
        </div>
        
        {/* Center Main Text */}
        <a 
          href="https://pthree-press.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textAlign: 'center', margin: 'auto', cursor: 'pointer', textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
        >
          <div style={{ animation: 'textWave 3s infinite ease-in-out', display: 'inline-block' }}>
            <h2 style={{ 
              fontSize: '3rem', fontWeight: 600, margin: '0 0 10px 0', letterSpacing: '2px',
              background: 'linear-gradient(90deg, #ffffff 0%, #d1d5db 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {expoData.scene8.headline}
            </h2>
            <h1 style={{ 
              fontSize: '9rem', fontWeight: 900, margin: '0 0 30px 0', 
              letterSpacing: '5px', lineHeight: 1,
              background: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(255,255,255,0.1)'
            }}>
              {expoData.scene8.mainText}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '10px', marginTop: '10px' }}>
            <div style={{ height: '3px', width: '30px', background: '#00aeef' }}></div>
            <div style={{ height: '3px', width: '30px', background: '#fff200' }}></div>
            <div style={{ height: '3px', width: '30px', background: '#ec008c' }}></div>
          </div>
          
          <h3 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '15px 0', letterSpacing: '1px' }}>
            {expoData.scene8.subHeadline}
          </h3>
          <p style={{ fontSize: '1.6rem', margin: 0, fontWeight: 300 }}>
            {expoData.scene8.subText}
          </p>
        </a>
      </div>
    </div>
  );
};

export default ExperienceScene;
