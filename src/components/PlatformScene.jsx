import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { expoData } from '../data/expoAttractData';
import { Settings, Database, Briefcase, Users, BarChart } from 'lucide-react';

const PlatformScene = ({ tl }) => {
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const linesRef = useRef([]);
  const modulesRef = useRef([]);
  
  const icons = [Settings, Database, Briefcase, Users, BarChart];
  
  useLayoutEffect(() => {
    if (!tl || !tl.current) return;
    const ctx = gsap.context(() => {
      const sceneStart = expoData.timings.scene5.start;
      const duration = expoData.timings.scene5.end - sceneStart;
      
      const st = gsap.timeline();
      
      // Init
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set('.ps-header', { opacity: 0, y: -50 });
      gsap.set(coreRef.current, { scale: 0, opacity: 0 });
      gsap.set(linesRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(modulesRef.current, { opacity: 0, scale: 0.5 });
      
      // 1. Enter
      st.to(containerRef.current, { opacity: 1, duration: 0.5 }, 0);
      st.to('.ps-header', { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }, 0.5);
      
      // 2. Core Ignition
      st.to(coreRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }, 1.0);
      
      // Core pulsing
      st.to(coreRef.current, {
        scale: 1.05, boxShadow: '0 0 80px rgba(56, 189, 248, 0.6)',
        duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
      }, 2.5);
      
      // 3. Lines shoot out
      st.to(linesRef.current, {
        scaleX: 1,
        duration: 0.8, stagger: 0.1, ease: 'power2.out'
      }, 1.8);

      // 4. Modules pop up
      st.to(modulesRef.current, {
        opacity: 1, scale: 1,
        duration: 1, stagger: 0.1, ease: 'back.out(1.5)'
      }, 2.2);
      
      // Gentle floating animation for modules for a premium feel without distortion
      modulesRef.current.forEach((mod, i) => {
        st.to(mod, {
          y: '+=15',
          duration: 2 + (i % 2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }, 3.5 + (i * 0.2));
      });
      
      // 5. Exit Scene
      const exitTime = duration - 1;
      st.to(containerRef.current, { opacity: 0, duration: 1 }, exitTime);
        
      tl.current.add(st, sceneStart);
    }, containerRef);
    
    return () => ctx.revert();
  }, [tl]);
  
  return (
    <div ref={containerRef} className="scene platform-scene" style={{
      zIndex: 10, backgroundColor: '#020617', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      
      <div className="ps-header" style={{
        position: 'absolute', top: '10vh', textAlign: 'center', zIndex: 10, width: '100%'
      }}>
        <h2 style={{ fontSize: '4.5vw', fontWeight: 900, color: '#FFF', textTransform: 'uppercase', margin: 0, letterSpacing: '2px' }}>
          {expoData.scene5.headline}
        </h2>
        <div style={{ fontSize: '1.8vw', fontWeight: 500, color: '#38BDF8', marginTop: '1rem', letterSpacing: '2px' }}>
          {expoData.scene5.supportingLine}
        </div>
      </div>
      
      {/* 2D Majestic Hub */}
      <div style={{
        position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        
        {/* Core */}
        <div ref={coreRef} style={{
          position: 'absolute', width: '16vw', height: '16vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #38BDF8 0%, #0284C7 50%, #0F172A 100%)',
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.4), inset 0 0 20px #FFF',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '3vw', fontWeight: 900, color: '#FFF', letterSpacing: '6px',
          zIndex: 20
        }}>
          PTHREE
        </div>
        
        {/* Modules array in a circle */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          zIndex: 10
        }}>
          {expoData.scene5.modules.map((mod, i) => {
            const numModules = expoData.scene5.modules.length;
            // -90deg starts at the top
            const angle = (i * 2 * Math.PI) / numModules - (Math.PI / 2);
            
            const radius = 22; // vw
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const lineLength = radius - 8; // distance minus core/module radius roughly
            const lineAngle = (angle * 180) / Math.PI;

            const Icon = icons[i];
            
            return (
              <React.Fragment key={i}>
                {/* Connecting Line */}
                <div 
                  ref={el => linesRef.current[i] = el}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: `${lineLength}vw`,
                    height: '2px',
                    background: 'linear-gradient(90deg, #38BDF8, transparent)',
                    transform: `rotate(${lineAngle}deg)`,
                    transformOrigin: 'left center',
                    zIndex: 5
                  }}
                />
                
                {/* Module Card */}
                <div 
                  ref={el => modulesRef.current[i] = el}
                  style={{
                    position: 'absolute', 
                    top: `calc(50% + ${y}vw)`, 
                    left: `calc(50% + ${x}vw)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 15
                  }}
                >
                  <div className="module-content" style={{
                    width: '14vw', height: '14vw',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '2px solid rgba(56, 189, 248, 0.6)',
                    borderRadius: '50%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    padding: '1rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Icon size="3.5vw" color="#38BDF8" style={{ marginBottom: '1rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '1.2vw', color: '#FFF', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {mod}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlatformScene;
