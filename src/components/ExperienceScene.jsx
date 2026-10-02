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
              0% { opacity: 0.3; transform: scale(1) translateY(0px); filter: blur(20px); }
              50% { opacity: 0.6; transform: scale(1.05) translateY(-20px); filter: blur(30px); }
              100% { opacity: 0.3; transform: scale(1) translateY(0px); filter: blur(20px); }
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
        <div style={{ textAlign: 'center', marginBottom: 'auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 600, margin: '0 0 10px 0', letterSpacing: '2px' }}>
            {expoData.scene8.headline}
          </h2>
          <h1 style={{ 
            fontSize: '9rem', fontWeight: 900, margin: '0 0 30px 0', 
            letterSpacing: '5px', lineHeight: 1 
          }}>
            {expoData.scene8.mainText}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
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
          
          <div style={{ marginTop: '50px', fontSize: '1.3rem', color: '#cbd5e1', fontWeight: 300 }}>
            <p style={{ margin: '5px 0' }}>{expoData.scene8.footerText1}</p>
            <p style={{ margin: '5px 0' }}>{expoData.scene8.footerText2}</p>
          </div>
          
          <div style={{ 
            marginTop: '40px', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '4px',
            color: '#fff'
          }}>
            {expoData.scene8.cta}
          </div>
        </div>

        {/* Footer Details */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr auto', gap: '40px',
          borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '30px',
          alignItems: 'start'
        }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#00aeef', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{width: '3px', height: '12px', background: '#00aeef'}}></span> LET'S TALK
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '5px' }}>{expoData.scene8.contact.phone}</div>
            <div style={{ fontSize: '1.2rem', color: '#00aeef', fontWeight: 600 }}>{expoData.scene8.contact.website}</div>
          </div>
          
          <div>
            <div style={{ fontSize: '0.9rem', color: '#fff200', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{width: '3px', height: '12px', background: '#fff200'}}></span> WRITE TO US
            </div>
            <div style={{ fontSize: '1.1rem', color: '#cbd5e1' }}>{expoData.scene8.contact.email}</div>
          </div>
          
          <div>
            <div style={{ fontSize: '0.9rem', color: '#ec008c', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{width: '3px', height: '12px', background: '#ec008c'}}></span> VISIT US
            </div>
            <div style={{ fontSize: '1.1rem', color: '#cbd5e1', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
              {expoData.scene8.contact.address}
            </div>
          </div>
          
          <div style={{ background: '#fff', padding: '10px' }}>
            <img src="/Pthree_press.jpeg" alt="QR Code" style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
          </div>
        </div>
        
        {/* Very bottom text */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
          <div>PTHREE | PRINT AUTOMATION SIMPLIFIED</div>
          <div>20</div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceScene;
