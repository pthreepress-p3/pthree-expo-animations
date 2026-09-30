import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import { Eye, ShieldCheck, TrendingUp } from 'lucide-react'; // Added icons for pillars

const WhyPthreeScene = ({ tl }) => {
  const containerRef = useRef(null);
  const pillarsRef = useRef([]);
  
  const icons = [Eye, ShieldCheck, TrendingUp];

  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene4.start;
      const duration = expoData.timings.scene4.end - sceneStart;
      
      const st = gsap.timeline();
      
      // Init
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(pillarsRef.current, { 
        y: '50vh', // Start below floor
        opacity: 0,
        rotationX: 10, // Slight tilt for 3D emergence
        scale: 0.9,
        filter: 'brightness(0)'
      });
      gsap.set('.closing-statement', { 
        opacity: 0, 
        scale: 2, // Start massive
        filter: 'blur(20px)',
        z: 500
      });
      gsap.set('.closing-glow', { opacity: 0, scale: 0.1 });
      
      // 1. Enter Scene
      st.to(containerRef.current, { opacity: 1, duration: 0.5 }, 0);
      
      // 2. Pillars Emerge sequentially
      const seqStart = 1.0;
      
      expoData.scene4.pillars.forEach((_, i) => {
        const time = seqStart + (i * 1.5);
        
        // Rise up and illuminate
        st.to(pillarsRef.current[i], {
          y: '0vh',
          opacity: 1,
          rotationX: 0,
          scale: 1,
          filter: 'brightness(1)',
          duration: 1.2,
          ease: 'expo.out'
        }, time);
        
        // Add a subtle continuous float after rising
        st.to(pillarsRef.current[i], {
          y: '-=15px',
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        }, time + 1.2);
      });
      
      // 3. Clear Pillars
      const clearTime = seqStart + (3 * 1.5) + 2.0; // Give time to read all 3
      st.to(pillarsRef.current, {
        y: '-50vh', // Fly up and away
        opacity: 0,
        scale: 1.2,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.in'
      }, clearTime);
      
      // 4. Slam closing statement
      const slamTime = clearTime + 0.8;
      st.to('.closing-statement', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        z: 0,
        duration: 0.6,
        ease: 'expo.in' // Hard slam
      }, slamTime);
      
      // Shockwave ring on slam
      st.to('.closing-glow', {
        opacity: 0.8,
        scale: 4,
        duration: 0.1,
        ease: 'none'
      }, slamTime + 0.6)
      .to('.closing-glow', {
        opacity: 0,
        scale: 8,
        duration: 1.0,
        ease: 'power2.out'
      }, slamTime + 0.7);

      // Camera shake on slam
      st.to(containerRef.current, {
        x: 10, y: 10, rotation: 1,
        duration: 0.05, yoyo: true, repeat: 5,
        ease: 'rough'
      }, slamTime + 0.6);
      
      // 5. Exit Scene
      const exitTime = duration - 1;
      st.to(containerRef.current, { opacity: 0, duration: 1 }, exitTime);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene why-scene" style={{
      zIndex: 10, 
      backgroundColor: '#020617', // Consistent pitch black
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', perspective: '2000px'
    }}>
      
      {/* 3D Floor Grid */}
      <div style={{
        position: 'absolute', bottom: '-20vh', width: '200vw', height: '100vh',
        background: 'linear-gradient(transparent 95%, rgba(56, 189, 248, 0.2) 100%), linear-gradient(90deg, transparent 95%, rgba(56, 189, 248, 0.2) 100%)',
        backgroundSize: '100px 100px',
        transform: 'rotateX(75deg)',
        transformOrigin: 'bottom center',
        zIndex: 1,
        opacity: 0.5
      }} />

      {/* The 3 Pillars */}
      <div style={{
        position: 'relative', width: '90vw', height: '60vh',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 5, transformStyle: 'preserve-3d'
      }}>
        {expoData.scene4.pillars.map((pillar, i) => {
          const Icon = icons[i];
          return (
            <div 
              key={i} 
              ref={el => pillarsRef.current[i] = el}
              style={{
                width: '26vw', height: '50vh',
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)',
                borderTop: '2px solid #38BDF8',
                borderLeft: '1px solid rgba(56, 189, 248, 0.3)',
                borderRight: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '1rem 1rem 0 0',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '3rem 2rem',
                boxShadow: '0 -20px 50px rgba(56, 189, 248, 0.15), inset 0 20px 40px rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                position: 'relative'
              }}
            >
              {/* Internal Glow Source */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '80%', height: '50%',
                background: 'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.2), transparent 70%)',
                zIndex: -1, pointerEvents: 'none'
              }} />

              {/* Icon */}
              <div style={{
                width: '8vh', height: '8vh', borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                marginBottom: '2rem',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
              }}>
                <Icon size="4vh" color="#38BDF8" />
              </div>

              {/* Title */}
              <div style={{
                fontSize: '2.5vw', fontWeight: 900, color: '#FFF', 
                textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem',
                textShadow: '0 0 20px rgba(56, 189, 248, 0.5)', textAlign: 'center'
              }}>
                {pillar.title}
              </div>

              {/* Description */}
              <div style={{
                fontSize: '1.2vw', color: '#94A3B8', lineHeight: 1.6,
                textAlign: 'center', fontWeight: 500
              }}>
                {pillar.desc}
              </div>
              
              {/* Decorative Tech Lines */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '3vw', height: '2px', background: 'rgba(56, 189, 248, 0.3)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '3vw', height: '2px', background: 'rgba(56, 189, 248, 0.3)' }} />
            </div>
          );
        })}
      </div>
      
      {/* Slamming Closing Statement */}
      <div className="closing-statement" style={{
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 20, pointerEvents: 'none', transformStyle: 'preserve-3d'
      }}>
        <div style={{
          fontSize: '6vw', fontWeight: 900, color: '#FFF', 
          textAlign: 'center', whiteSpace: 'pre-line',
          textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.1,
          textShadow: '0 20px 50px rgba(0,0,0,1)'
        }}>
          {expoData.scene4.closingStatement}
        </div>
      </div>
      
      {/* Shockwave for slam impact */}
      <div className="closing-glow" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '20vw', height: '20vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, transparent 60%)',
        zIndex: 19, pointerEvents: 'none'
      }} />

    </div>
  );
};

export default WhyPthreeScene;
