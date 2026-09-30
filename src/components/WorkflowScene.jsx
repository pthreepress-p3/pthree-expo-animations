import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import * as LucideIcons from 'lucide-react';

const WorkflowScene = ({ tl }) => {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const cardsRef = useRef([]);
  
  const numItems = expoData.scene3.workflowStages.length;
  const anglePerItem = 360 / numItems;
  const radius = 35; // vh
  
  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene3.start;
      const duration = expoData.timings.scene3.end - sceneStart;
      
      const st = gsap.timeline();
      
      // Init
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.headline', { opacity: 0, scale: 1.5, filter: 'blur(20px)' });
      gsap.set(wheelRef.current, { rotationX: 0 }); 
      
      // Init Cards
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, { 
          opacity: i === 0 ? 1 : 0.1,
          filter: i === 0 ? 'blur(0px)' : 'blur(10px)',
          scale: i === 0 ? 1 : 0.8
        });
      });
      
      // 1. Explosive Enter
      st.to(containerRef.current, { opacity: 1, duration: 0.1 }, 0);
      st.to('.headline', { 
        opacity: 1, scale: 1, filter: 'blur(0px)', 
        duration: 2, ease: 'expo.out' 
      }, 0.5);
      
      // 2. The Carousel Spin Sequence
      const seqStart = 4.0;
      const spinDuration = 2.0; 
      const pauseDuration = 10.0; 
      
      for (let i = 1; i < numItems; i++) {
        const time = seqStart + ((i - 1) * (spinDuration + pauseDuration));
        
        // Spin the wheel
        st.to(wheelRef.current, {
          rotationX: `-=${anglePerItem}`,
          duration: spinDuration,
          ease: 'expo.inOut'
        }, time);
        
        // Dim the previous card
        st.to(cardsRef.current[i - 1], {
          opacity: 0.1, filter: 'blur(15px)', scale: 0.8,
          duration: spinDuration * 0.8, ease: 'power2.in'
        }, time);
        
        // Illuminate new card
        st.to(cardsRef.current[i], {
          opacity: 1, filter: 'blur(0px)', scale: 1.1,
          duration: spinDuration, ease: 'expo.out'
        }, time + (spinDuration * 0.5));
        
        st.to(cardsRef.current[i], {
          scale: 1, duration: pauseDuration, ease: 'power2.out'
        }, time + spinDuration);
      }
      
      // 3. Exit Scene
      const exitTime = duration - 1;
      st.to(containerRef.current, { opacity: 0, duration: 1 }, exitTime);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene workflow-scene" style={{
      zIndex: 10, 
      backgroundColor: '#020617', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      overflow: 'hidden', perspective: '1500px',
      paddingTop: '6vh'
    }}>
      
      {/* Background Lighting */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: '100vw', height: '100vw',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 60%)',
        zIndex: 1
      }} />

      {/* Massive Static Headline */}
      <div style={{ zIndex: 10, textAlign: 'center', width: '100%' }}>
        <h1 className="headline" style={{ 
          fontSize: '4vw', fontWeight: 900, color: '#FFF', 
          textTransform: 'uppercase', letterSpacing: '-2px', margin: 0,
          textShadow: '0 10px 30px rgba(0,0,0,0.8)'
        }}>
          {expoData.scene3.headline}
        </h1>
        <h2 className="headline" style={{ 
          fontSize: '1.5vw', fontWeight: 500, color: '#38BDF8', margin: '0.5rem 0 0 0',
          letterSpacing: '4px', textTransform: 'uppercase'
        }}>
          {expoData.scene3.supportingLine}
        </h2>
      </div>

      {/* The 3D Hyper-Carousel */}
      <div style={{ 
        position: 'relative', width: '100%', height: '55vh', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        transformStyle: 'preserve-3d',
        zIndex: 5,
        marginTop: '2vh'
      }}>
        <div ref={wheelRef} style={{
          position: 'relative', width: '60vw', height: '20vh',
          transformStyle: 'preserve-3d',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          {expoData.scene3.workflowStages.map((stage, i) => {
            const Icon = LucideIcons[stage.icon] || LucideIcons.Circle;
            const rotateX = i * anglePerItem;
            const transform = `rotateX(${rotateX}deg) translateZ(${radius}vh)`;
            
            return (
              <div 
                key={stage.id} 
                ref={el => cardsRef.current[i] = el}
                style={{
                  position: 'absolute',
                  width: '50vw', height: '18vh',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '24px',
                  display: 'flex', alignItems: 'center', padding: '0 3rem',
                  transform: transform,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Massive Number Watermark - Darkened as requested */}
                <div style={{
                  position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '14vh', fontWeight: 900, color: 'rgba(255,255,255,0.05)',
                  zIndex: -1
                }}>
                  {stage.id.toString().padStart(2, '0')}
                </div>
                
                {/* Glowing Icon */}
                <div style={{
                  width: '10vh', height: '10vh', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                  border: '2px solid rgba(56, 189, 248, 0.6)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                  marginRight: '3rem'
                }}>
                  <Icon size="5vh" color="#38BDF8" />
                </div>
                
                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    fontSize: '4vh', fontWeight: 900, color: '#FFF', 
                    textTransform: 'uppercase', letterSpacing: '1px' 
                  }}>
                    {stage.title}
                  </div>
                  <div style={{ 
                    fontSize: '2vh', fontWeight: 500, color: '#94A3B8', 
                    letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.5rem' 
                  }}>
                    {stage.subtitle}
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default WorkflowScene;
