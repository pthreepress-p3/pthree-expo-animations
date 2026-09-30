import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import { Target, ScanLine } from 'lucide-react';

const PainPointScene = ({ tl }) => {
  const containerRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const pointsRef = useRef([]);
  const radarRef = useRef(null);
  const resolutionRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene2.start;
      const duration = expoData.timings.scene2.end - sceneStart;
      
      const st = gsap.timeline();
      
      // Init
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(headlineLinesRef.current, { opacity: 0, x: -50 });
      gsap.set(pointsRef.current, { opacity: 0, x: 50, scale: 0.95 });
      gsap.set('.tech-bracket', { opacity: 0, x: (i) => i % 2 === 0 ? -20 : 20 }); // Left and right brackets
      gsap.set(resolutionRef.current, { opacity: 0, filter: 'blur(10px)' });
      
      // 1. Scene Enter & Background Radar
      st.to(containerRef.current, { opacity: 1, duration: 0.5 }, 0);
      st.to(radarRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' }, 0);
      st.to('.scan-line', { y: '100vh', duration: 4, repeat: -1, ease: 'none' }, 0);
      
      // 2. Simple Text Reveal for Headline
      st.fromTo(headlineLinesRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power2.out'
        }, 0.5
      );
      
      // 3. Slow Z-Axis Drop from Camera to Normal Placement
      const listStart = 1.0;
      pointsRef.current.forEach((point, i) => {
        // Drop from "top of the screen" (close to camera) backwards to its place
        st.fromTo(point, 
          { opacity: 0, z: 1000, scale: 3, filter: 'blur(20px)' },
          {
            opacity: 1, z: 0, scale: 1, filter: 'blur(0px)',
            duration: 2.0, // Slow, heavy flight
            ease: 'expo.in' // Fast landing
          }, listStart + (i * 0.8) // High stagger so they come one by one slowly
        );
        
        // Dust Shockwave upon landing
        const shockwave = point.querySelector('.dust-shockwave');
        if (shockwave) {
          st.fromTo(shockwave,
            { opacity: 0, scale: 0.5 },
            { opacity: 0.8, scale: 1.5, duration: 0.1, ease: 'none' },
            listStart + (i * 0.8) + 2.0 // Exactly when it hits its place
          )
          .to(shockwave, {
            opacity: 0, scale: 4, duration: 1.5, ease: 'power2.out'
          }, listStart + (i * 0.8) + 2.1);
        }
        
        // Heavy "Thud" recoil on landing (bounces forward slightly)
        st.to(point, {
          z: '+=100', // Bounces back towards camera
          scale: 1.05,
          duration: 0.3,
          yoyo: true, repeat: 1,
          ease: 'power2.out'
        }, listStart + (i * 0.8) + 2.0);
        
        // The tech brackets snap into place to "lock" the target
        const brackets = point.querySelectorAll('.tech-bracket');
        st.to(brackets, {
          opacity: 1, x: 0,
          duration: 0.4,
          ease: 'back.out(2)'
        }, listStart + (i * 0.8) + 2.3);
        
        // Subtle red flash on lock
        st.to(point, {
          background: 'rgba(239, 68, 68, 0.15)',
          duration: 0.2, yoyo: true, repeat: 1
        }, listStart + (i * 0.8) + 2.3);
      });
      
      // 4. Critical Warning Resolution
      const resTime = listStart + (pointsRef.current.length * 0.8) + 2.5;
      st.to(resolutionRef.current, {
        opacity: 1, filter: 'blur(0px)',
        duration: 1, ease: 'power3.out'
      }, resTime);
      
      // Make the warning pulse
      st.to('.warning-icon', {
        scale: 1.2, opacity: 0.5,
        duration: 0.5, repeat: -1, yoyo: true
      }, resTime);
      
      // 5. Exit
      const exitTime = duration - 1;
      st.to(pointsRef.current, { opacity: 0, x: 50, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, exitTime)
        .to([headlineLinesRef.current, resolutionRef.current], { opacity: 0, x: -50, duration: 0.5 }, exitTime)
        .to(containerRef.current, { opacity: 0, duration: 0.5 }, duration - 0.5);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene pain-point-scene" style={{
      zIndex: 10, 
      backgroundColor: '#000000', // Pitch black for MI theme
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden',
      fontFamily: '"Courier New", Courier, monospace' // Tech/Spy aesthetic
    }}>
      
      {/* Background Radar / Spy Lens */}
      <div ref={radarRef} style={{
        position: 'absolute', width: '120vw', height: '120vw',
        border: '1px solid rgba(239, 68, 68, 0.12)',
        borderRadius: '50%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1
      }}>
        <div style={{ width: '80%', height: '80%', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '50%' }} />
        <div style={{ width: '40%', height: '40%', border: '1px dashed rgba(239, 68, 68, 0.12)', borderRadius: '50%', position: 'absolute' }} />
        {/* Crosshairs */}
        <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(239, 68, 68, 0.12)' }} />
        <div style={{ position: 'absolute', width: '1px', height: '100%', background: 'rgba(239, 68, 68, 0.12)' }} />
      </div>
      
      {/* CRT Scan Line Effect */}
      <div className="scan-line" style={{
        position: 'absolute', top: '-10%', left: 0, width: '100%', height: '15%',
        background: 'linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.05), transparent)',
        zIndex: 20, pointerEvents: 'none'
      }} />

      <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', zIndex: 10, padding: '0 8vw' }}>
        
        {/* Left Side: Terminal Headline */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '4vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: '#EF4444', fontWeight: 'bold', letterSpacing: '4px' }}>
            <ScanLine size={24} />
            SYSTEM DIAGNOSTIC: FAILED
          </div>
          <div style={{
            fontSize: '5vw', color: '#F8FAFC', fontWeight: 900,
            letterSpacing: '-1px', lineHeight: 1.1,
            textTransform: 'uppercase' // Keep main headline highly readable
          }}>
            {expoData.scene2.headline.split('\n').map((line, i) => (
              <div key={i} ref={el => headlineLinesRef.current[i] = el} style={{ position: 'relative' }}>
                {line}
              </div>
            ))}
          </div>
          
          {/* Final Resolution Warning */}
          <div ref={resolutionRef} style={{
            marginTop: '4rem', padding: '1.5rem 2rem',
            background: 'rgba(239, 68, 68, 0.05)',
            borderLeft: '4px solid #EF4444',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            <div style={{ color: '#EF4444', fontWeight: 'bold', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="warning-icon" style={{ width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }} />
              CRITICAL VULNERABILITY
            </div>
            <div style={{
              fontSize: '1.5vw', fontWeight: 500, color: '#E2E8F0',
              lineHeight: 1.5
            }}>
              {expoData.scene2.supportingLine}
            </div>
          </div>
        </div>
        
        {/* Right Side: High-Tech Target List (Slow and Readable) */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', perspective: '1500px' }}>
          {expoData.scene2.issueCards.map((card, i) => (
            <div 
              key={i} 
              ref={el => pointsRef.current[i] = el}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 2rem',
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Dust Shockwave */}
              <div className="dust-shockwave" style={{
                position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)', opacity: 0, pointerEvents: 'none', zIndex: -1
              }} />
              
              {/* Target Brackets */}
              <div className="tech-bracket" style={{ color: '#EF4444', fontSize: '2rem', fontWeight: '100', position: 'absolute', left: '1rem' }}>[</div>
              
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '1.5rem', 
                marginLeft: '2rem', zIndex: 2
              }}>
                <Target size={20} color="#EF4444" />
                <div style={{ 
                  fontSize: '1.6vw', fontWeight: 600, color: '#F8FAFC', 
                  letterSpacing: '1px', textTransform: 'uppercase',
                  // Removed inline font family
                }}>
                  {card}
                </div>
              </div>
              
              <div className="tech-bracket" style={{ color: '#EF4444', fontSize: '2rem', fontWeight: '100', position: 'absolute', right: '1rem' }}>]</div>
              
              {/* High-tech hex grid overlay */}
              <div style={{
                position: 'absolute', right: 0, top: 0, height: '100%', width: '30%',
                background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.03))',
                zIndex: 1
              }} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default PainPointScene;
